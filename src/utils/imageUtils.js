/**
 * Prefix an image path with PUBLIC_URL for correct resolution in both
 * development (localhost) and production (GitHub Pages subdirectory).
 */
export const imagePath = (path) => {
  const publicUrl = process.env.PUBLIC_URL || '';
  return `${publicUrl}${path}`;
};
