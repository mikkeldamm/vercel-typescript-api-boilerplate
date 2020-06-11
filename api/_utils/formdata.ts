import { ReadStream } from 'fs';

import { NowRequest } from '@now/node';
import { streamToBuffer } from '@jorgeferrero/stream-to-buffer';

import Busboy from 'busboy';

const parser = require('form-parser');

interface FormDataFile {
    fileName: string;
    fileType: string;
    fileStream: ReadStream;
}

interface FormData {
    fieldType: 'file' | 'text';
    fieldName: string;
    fieldContent: FormDataFile | string;
}

export const parseFormData = async <T>(req: NowRequest) => {
    const formData: { [key: string]: any } = {};
    
    return new Promise<T>((resolve, reject) => {
        parser(req, async (field: FormData) => {

            if (field.fieldType === 'text') {
                formData[field.fieldName] = JSON.parse(field.fieldContent as string);
            } else {
                const buffer = await streamToBuffer((field.fieldContent as FormDataFile).fileStream);
                formData[field.fieldName] = buffer;
            }

        }).then(() => {

            resolve(formData as T);

        }).catch((err: any) => {

            reject(err);
        });
    });
};

export const parseMultipartFormData = async <T>(req: NowRequest) => {
    return new Promise<T>((resolve, _) => {

        const formData: any = {};
        const busboy = new Busboy({ headers: req.headers });

        busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
            if (!formData[fieldname]) {
                formData[fieldname] = [];
            }

            formData[fieldname].push({
                buffer: await streamToBuffer(<ReadStream>file),
                mimetype,
            });
        });

        busboy.on('field', (fieldname, val) => {
            formData[fieldname] = val;
        });

        busboy.on('finish', () => {
            resolve(formData);
        });

        req.pipe(busboy);
    });
};
