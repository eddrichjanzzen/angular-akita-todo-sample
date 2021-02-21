const SESSION_KEY = 'session';

export function getSession(): any {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : {};
}

export function saveSession(session: any): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
