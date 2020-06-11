/*

///
/// AWS EXAMPLE
///

import AWS from 'aws-sdk';

const bucketName = process.env.AWS_BUCKET;
const s3 = new AWS.S3({
    apiVersion: '2006-03-01', accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
});

export const uploadFile = async (fullPath: string, file: Buffer, contentType = 'image/jpg') => {

    const params = {
        Bucket: bucketName,
        Key: fullPath,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read'
    };

    await s3.upload(params).promise();
};

export const uploadFiles = async (files: Buffer[], paths: string[], contentTypes: string[]) => {
    return await Promise.all(files.map((file, i) => uploadFile(paths[i], file, contentTypes[i])));
};

export const deleteFile = async (fullPath: string) => {

    const params = {
        Bucket: bucketName,
        Key: fullPath,
    };

    await s3.deleteObject(params).promise();
};

export const deleteFiles = async (paths: string[]) => {
    return await Promise.all(paths.map(p => deleteFile(p)));
};
*/

/*

///
/// BUNNY CDN EXAMPLE
///

import fetch from 'node-fetch';

export const STORAGE_KEY = process.env.BUNNY_API_KEY;
export const STORAGE_URL = `https://storage.bunnycdn.com/${process.env.BUNNY_NAME}`;

export const PURGE_KEY = process.env.BUNNY_API_TOKEN;
export const PURGE_URL = `https://bunnycdn.com/api/pullzone/${process.env.BUNNY_ID}/purgeCache`;

export const uploadFile = async (path: string, file: ArrayBuffer) => {

    const options = {
        method: 'PUT',
        headers: {
            'AccessKey': STORAGE_KEY,
        },
        body: file,
    };

    const uploadResponse = await fetch(`${STORAGE_URL}${path}`, options);
    return uploadResponse.ok;
};

export const uploadFiles = async (files: Buffer[], paths: string[]) => {
    return await Promise.all(files.map((file, i) => uploadFile(paths[i], file)));
};

export const deleteFile = async (path: string) => {
    const options = {
        method: 'DELETE',
        headers: {
            'AccessKey': STORAGE_KEY,
        },
    };

    const uploadResponse = await fetch(`${STORAGE_URL}${path}`, options);
    return uploadResponse.ok;
};

export const deleteFiles = async (paths: string[]) => {
    return await Promise.all(paths.map(p => deleteFile(p)));
};

export const purge = async () => {

    const options = {
        method: 'POST',
        headers: {
            'AccessKey': PURGE_KEY,
        },
    };

    const uploadResponse = await fetch(PURGE_URL, options);
    return uploadResponse.ok;
};
*/