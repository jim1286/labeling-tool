export function load<T>(key: string, defaultValue: T): T {
  try {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving SessionStorage item ${key}: ${error}`);
    return defaultValue;
  }
}

export function save<T>(key: string, value: T): void {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting SessionStorage item ${key}: ${error}`);
  }
}

export function remove(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing SessionStorage item ${key}: ${error}`);
  }
}
