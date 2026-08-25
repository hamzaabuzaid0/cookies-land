// Compresses/resizes an uploaded photo client-side so it's small enough to
// store directly as a string inside a Firestore document (1MB doc limit,
// firestore.rules caps whole-document size at 900,000 bytes). This is
// instead of Firebase Storage — as of late 2024 Google requires the paid
// Blaze plan for Storage even at trivial usage, which isn't worth asking
// for on a pitch demo. Iterates down JPEG quality until it's safely under
// the limit.
//
// IMPORTANT: maxBytes below caps `dataUrl.length` directly — that string
// (not the decoded image) is what actually gets written to Firestore and
// counted against the document-size rule, so don't multiply/divide by 0.75
// here (base64 is ~33% *larger* than the raw bytes, not smaller). Kept well
// under the 900,000 rule ceiling to leave room for the rest of the ticket's
// fields (name, phone, items, etc).
export function compressImageToDataUrl(file, { maxDimension = 1000, maxBytes = 500000 } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode image'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          const scale = maxDimension / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);

        let quality = 0.8;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        while (dataUrl.length > maxBytes && quality > 0.3) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        if (dataUrl.length > maxBytes) {
          reject(new Error('Image too large even after compression'));
          return;
        }
        resolve(dataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
