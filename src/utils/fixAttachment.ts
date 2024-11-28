/**
 * Converts a base64 string to a data URL with the appropriate MIME type.
 *
 * @param base64String - The base64 string to convert.
 * @returns A data URL with the detected MIME type, or null if the image type is unsupported.
 */
export const fixAttachment = (
  base64String: string | undefined
): string | null => {
  if (!base64String) return null;

  // Convert base64 string to ArrayBuffer
  const binaryString = window.atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Detect the image type based on its signature
  const signature = bytes[0] * 256 + bytes[1];
  let mimeType: string | undefined;

  switch (signature) {
    case 0xffd8: // JPEG
      mimeType = "image/jpeg";
      break;
    case 0x8950: // PNG
      mimeType = "image/png";
      break;
    case 0x4749: // GIF
      mimeType = "image/gif";
      break;
    case 0x424d: // BMP
      mimeType = "image/bmp";
      break;
    case 0x4949: // TIFF (Little-endian)
    case 0x4d4d: // TIFF (Big-endian)
      mimeType = "image/tiff";
      break;
    default:
      console.error("Unsupported image type.");
      return null;
  }

  // Set the appropriate MIME type and prefix
  const prefix = `data:${mimeType};base64,`;

  return `${prefix}${base64String}`;
};
