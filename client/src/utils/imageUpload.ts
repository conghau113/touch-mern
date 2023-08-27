export const checkImage = (file: { size: number; type: string }) => {
  let err = '';
  if (!file) {
    return (err = 'File does not exist.');
  }
  //?1 mb
  if (file.size > 1024 * 1024) {
    return (err = 'File size must be less than 1 Mb.');
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    return (err = 'Image must be jpeg or png.');
  }

  return err;
};

export const imageUpload = async (images: any) => {
  let imgArr: any[] = [];
  console.log('item', images);
  for (const item of images) {
    const formData = new FormData();
    if (item.camera) {
      formData.append('file', item.camera);
    } else {
      formData.append('file', item?.originFileObj);
    }

    formData.append('upload_preset', 'upload-touch-2023');
    formData.append('cloud_name', 'dqtdlxj3n');

    const res = await fetch('https://api.cloudinary.com/v1_1/dqtdlxj3n/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('data', data);
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
