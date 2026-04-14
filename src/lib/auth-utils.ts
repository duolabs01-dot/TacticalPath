/**
 * Utilities for student picture password authentication
 */

/**
 * Hash student picture password selection using PBKDF2 with a salt.
 * Using a salt (like classroom ID) prevents pre-computation attacks (rainbow tables)
 * and ensures that the same picture combination in different classrooms
 * results in different hashes.
 *
 * @param pictures Array of picture identifiers (emojis)
 * @param salt A unique salt for the student/classroom (e.g., classroom ID)
 * @returns Hex string of the derived key
 */
export async function hashPicturesWithSalt(pictures: string[], salt: string): Promise<string> {
  const data = pictures.join('|');
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(data);
  const saltBuffer = encoder.encode(salt);

  // Import the password as a base key
  const baseKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  // Derive the hash using PBKDF2
  const derivedKeyBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    256 // 256 bits = 32 bytes
  );

  const hashArray = Array.from(new Uint8Array(derivedKeyBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
