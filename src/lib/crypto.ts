/**
 * Hashes a list of strings (typically emoji names for picture passwords)
 * into a SHA-256 hex string.
 */
export async function hashPictures(pictures: string[]): Promise<string> {
  const data = pictures.join('|');
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
