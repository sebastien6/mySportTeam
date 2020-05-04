import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

const s3 = S3Connection()
const bucketName = process.env.IMAGES_S3_BUCKET;
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION);

export function getUploadUrl(imageId: string) {
    return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: imageId,
      Expires: urlExpiration
    })
}

function S3Connection() {
  if (process.env.IS_OFFLINE) {
    console.log("Serverless Offline detected; skipping AWS X-Ray setup")
    const options: AWS.S3.Types.ClientConfiguration = {
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER', // This specific key is required when working offline
      secretAccessKey: 'S3RVER',
      endpoint: 'http://localhost:8001',
      signatureVersion: 'v4',
    };
    return new AWS.S3(options);
  } else {
    const XAWS = AWSXRay.captureAWS(AWS);
    const options: AWS.S3.Types.ClientConfiguration = {
      signatureVersion: 'v4',
    };
    return new XAWS.S3(options);
  }
}