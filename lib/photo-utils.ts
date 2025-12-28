// Utility function to build photo URL (non-server)
export function buildPhotoUrl(photoReference: string, maxWidth: number = 800, apiKey: string | undefined): string {
  if (!apiKey) {
    return '';
  }
  
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${apiKey}`;
}
