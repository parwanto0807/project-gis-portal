/**
 * Client-side image compression utility.
 * Resizes large smartphone photos (e.g., 10-25MB, 4000x3000px) to a reasonable
 * resolution and compresses them to JPEG so uploads are fast and never hit
 * server or reverse-proxy payload limits.
 */
export async function compressImage(
    file: File,
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.8
): Promise<File> {
    if (!file.type.startsWith('image/')) return file;

    return new Promise((resolve) => {
        const img = new window.Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            let { width, height } = img;
            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve(file);
                return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        resolve(file);
                        return;
                    }
                    // If compressed file is somehow larger and original is already small (< 1.5MB) and valid mime type, keep original
                    const validMimes = ['image/jpeg', 'image/png', 'image/webp'];
                    if (blob.size >= file.size && file.size <= 1.5 * 1024 * 1024 && validMimes.includes(file.type)) {
                        resolve(file);
                        return;
                    }

                    const baseName = file.name.replace(/\.[^/.]+$/, '');
                    const compressedFile = new File([blob], `${baseName}.jpg`, {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                },
                'image/jpeg',
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(file);
        };

        img.src = objectUrl;
    });
}

export async function compressImages(
    files: File[],
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.8
): Promise<File[]> {
    return Promise.all(files.map((f) => compressImage(f, maxWidth, maxHeight, quality)));
}
