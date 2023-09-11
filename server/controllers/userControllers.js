const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const PostLike = require('../models/PostLike');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Follow = require('../models/FollowModel');
const { default: mongoose } = require('mongoose');

const options = { new: true, runValidators: true };

const getUserDict = (token, user) => {
  return {
    token,
    username: user.username,
    userId: user._id,
    isAdmin: user.isAdmin,
  };
};

const buildToken = (user) => {
  return {
    userId: user._id,
    isAdmin: user.isAdmin,
  };
};

const updateDP = async (req, res) => {
  const image = req.files?.image;
  if (!image) throw new BadRequestError('Expected an image');
  const { secure_url: profileImage } = await uploadImage(image);
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(id, { profileImage }, options).select({ password: 0 });
  if (!user) throw new NotFoundError(`No user exist with id ${id}`);
  await Post.updateMany({ createdBy: id }, { userDetails: { name: user.name, image: profileImage } });
  res.status(StatusCodes.OK).json({ user });
};

const register = async (req, res) => {
  try {
    const { username, email, password, fullName, location, occupation } = req.body;
    console.log('req.body::,', req.body);
    if (!(username && email && password && fullName && location && occupation)) {
      throw new Error('All input required');
    }

    const normalizedEmail = email.toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username }],
    });

    if (existingUser) {
      throw new Error('Email and username must be unique');
    }

    const user = await User.create({
      username,
      fullName,
      location,
      occupation,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);

    return res.json(getUserDict(token, user));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw new Error('All input required');
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      throw new Error('Email or password incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Email or password incorrect');
    }

    const token = jwt.sign(buildToken(user), process.env.TOKEN_KEY);

    return res.json(getUserDict(token, user));
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, userId } = req.body;

    const user = await User.findOne({ _id: userId });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Your password is wrong.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters long.' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);
    // user.password = newPasswordHash;
    await User.findOneAndUpdate({ _id: userId }, { password: newPasswordHash });

    res.json({ msg: 'Password updated successfully.' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters long.' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);
    // user.password = newPasswordHash;
    await User.findOneAndUpdate({ email }, { password: newPasswordHash });

    res.json({ msg: 'Password updated successfully.' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, biography, fullName, location, occupation, username } = req.body;
    const avatar = req.body ?? {};
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User does not exist');
    }
    if (avatar.avatar.length > 0) {
      user.avatar = avatar;
    } else {
      user.biography = biography;
      user.fullName = fullName;
      user.location = location;
      user.occupation = occupation;
      // user.username = username;
    }
    await user.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// const follow = async (req, res) => {
//   try {
//     const followingId = req.params.id;
//     const { userId } = req.body;
//     // console.log('followingId', followingId);
//     // console.log('userId', userId);

//     const existingFollow = await Follow.find({ userId, followingId });

//     if (existingFollow) {
//       throw new Error('Already following this user');
//     }

//     const follow = await Follow.create({ userId, followingId });

//     return res.status(200).json({ data: follow });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// };

const follow = async (req, res) => {
  console.log('req:', req.body);
  try {
    const user = await User.find({
      _id: req.params.id,
      followers: req.body.userId,
    });
    if (user.length > 0) return res.status(500).json({ msg: 'You are already following this user.' });

    const newUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          followers: req.body.userId,
        },
      },
      { new: true }
    ).populate('followers following', '-password');

    await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { following: req.params.id } }, { new: true });

    res.json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const unfollow = async (req, res) => {
  try {
    const newUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: req.body.userId },
      },
      { new: true }
    ).populate('followers following', '-password');

    await User.findOneAndUpdate({ _id: req.body.userId }, { $pull: { following: req.params.id } }, { new: true });

    res.json({ newUser });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// const unfollow = async (req, res) => {
//   try {
//     const followingId = req.params.id;
//     const { userId } = req.body;

//     const existingFollow = await Follow.find({ userId, followingId });

//     if (!existingFollow) {
//       throw new Error('Not already following user');
//     }

//     await existingFollow.remove();

//     return res.status(200).json({ data: existingFollow });
//   } catch (err) {
//     return res.status(400).json({ error: err.message });
//   }
// };

const getFollowers = async (req, res) => {
  try {
    const userId = req.params.id;

    const followers = await Follow.find({ followingId: userId });

    return res.status(200).json({ data: followers });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getFollowing = async (req, res) => {
  try {
    const userId = req.params.id;

    const following = await Follow.find({ userId });

    return res.status(200).json({ data: following });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).select('-password');

    if (!user) {
      throw new Error('User does not exist');
    }

    const posts = await Post.find({ poster: user._id }).populate('poster').sort('-createdAt');

    let likeCount = 0;

    posts.forEach((post) => {
      likeCount += post.likeCount;
    });

    const data = {
      user,
      posts: {
        count: posts.length,
        likeCount,
        data: posts,
      },
    };

    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const searchUser = async (req, res) => {
  try {
    const users = await User.find({
      username: { $regex: req.query.username },
    })
      .limit(10)
      .select('fullName username avatar');

    res.json({ users });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find().select('-password');
    console.log('useruser::', user);

    if (!user) {
      throw new Error('Post does not exist');
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getRandomUsers = async (req, res) => {
  try {
    let { size } = req.query;

    const users = await User.find().select('-password');

    const randomUsers = [];

    if (size > users.length) {
      size = users.length;
    }

    const randomIndices = getRandomIndices(size, users.length);

    for (let i = 0; i < randomIndices.length; i++) {
      const randomUser = users[randomIndices[i]];
      randomUsers.push(randomUser);
    }

    return res.status(200).json(randomUsers);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const getRandomIndices = (size, sourceSize) => {
  const randomIndices = [];
  while (randomIndices.length < size) {
    const randomNumber = Math.floor(Math.random() * sourceSize);
    if (!randomIndices.includes(randomNumber)) {
      randomIndices.push(randomNumber);
    }
  }
  return randomIndices;
};

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
  getUser,
  getAllUser,
  searchUser,
  getRandomUsers,
  updateUser,
};
