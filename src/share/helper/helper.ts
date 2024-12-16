export function isEmptyString(str?: string | null): str is undefined {
  if (str == null || str.trim().length === 0) {
    return true;
  } else {
    return false;
  }
}
