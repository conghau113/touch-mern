const mongoose = require('mongoose');
const { isEmail, contains } = require('validator');
const filter = require('../util/filter');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, 'Must be at least 6 characters long'],
      maxlength: [30, 'Must be no more than 30 characters long'],
      validate: {
        validator: (val) => !contains(val, ' '),
        message: 'Must contain no spaces',
      },
    },
    avatar: {
      type: Array,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      minlength: [6, 'Must be at least 6 characters long'],
      maxlength: [40, 'Must be no more than 40 characters long'],
    },
    location: {
      type: String,
      required: true,
      minlength: [6, 'Must be at least 6 characters long'],
      maxlength: [200, 'Must be no more than 200 characters long'],
    },
    occupation: {
      type: String,
      required: true,
      minlength: [1, 'Must be at least 6 characters long'],
      maxlength: [200, 'Must be no more than 200 characters long'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      validate: [isEmail, 'Must be valid email address'],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, 'Must be at least 8 characters long'],
    },
    biography: {
      type: String,
      default: '',
      maxLength: [250, 'Must be at most 250 characters long'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  if (filter.isProfane(this.username)) {
    throw new Error('Username cannot contain profanity');
  }

  if (this.biography.length > 0) {
    this.biography = filter.clean(this.biography);
  }

  next();
});

module.exports = mongoose.model('user', UserSchema);
