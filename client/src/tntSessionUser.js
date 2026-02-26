const STORAGE_KEY = "tntUser";

export function setTntUser(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getTntUser() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearTntUser() {
  sessionStorage.removeItem(STORAGE_KEY);
}
