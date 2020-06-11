/*

///
/// SHARP RESIZE EXAMPLE
///

import sharp from 'sharp';

interface ResizeSize {
    width?: number;
    height?: number;
}

// HOW TO USE:
// const resizedFiles = await resizeImage(file.buffer, [{ width: 256 }, { width: 512 }], 'jpg');

export const resizeImage = (buffer: Buffer, sizes: ResizeSize[], type: 'png' | 'jpg' = 'png'): Promise<Buffer[]> => {
    return Promise.all(sizes.map(size => {
        if (type === 'jpg') {
            return sharp(buffer).rotate().resize(size.width || null, size.height || null).jpeg().toBuffer();
        }

        return sharp(buffer).rotate().resize(size.width || null, size.height || null).png().toBuffer();
    }));
};
*/