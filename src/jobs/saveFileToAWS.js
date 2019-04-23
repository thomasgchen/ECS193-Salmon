/* eslint-disable no-loop-func */
/* eslint-disable no-console */
const AWS = require('aws-sdk');

const uploadFile = (graphData, fileName) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const S3 = new AWS.S3();
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: fileName,
    Body: JSON.stringify(graphData),
    ACL: 'public-read',
    ContentType: 'application/JSON'
  };

  S3.upload(params, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Uploaded.');
      console.log(res);
    }
  });
};

module.exports = { uploadFile };
