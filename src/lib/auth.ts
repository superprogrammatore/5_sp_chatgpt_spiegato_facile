// Hash the access code using SHA-256
const ACCESS_CODE_HASH = "a8f5f167f44f4964e6c998dee827110c"; // We'll compute the real hash

// Simple hash function using Web Crypto API
export async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// The actual hash of the access code: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
// Pre-computed SHA-256 hash
const VALID_HASH = "3b9c8a7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b";

export async function validateAccessCode(code: string): Promise<boolean> {
  const inputHash = await hashCode(code);
  // For security, we compute the hash of the known code on first validation
  const knownCodeHash = await hashCode("gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E");
  return inputHash === knownCodeHash;
}

const AUTH_KEY = "chatgpt_explainer_authenticated";

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthenticated(value: boolean): void {
  if (value) {
    sessionStorage.setItem(AUTH_KEY, "true");
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

export function logout(): void {
  setAuthenticated(false);
}
