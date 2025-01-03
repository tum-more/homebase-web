export function isEmptyString(str?: string | null): str is undefined {
  if (str == null || str.trim().length === 0) {
    return true;
  } else {
    return false;
  }
}

export function encodeId(id: number): string {
  return Buffer.from(id.toString()).toString("base64");
}

export function decodeId(encodedId: string): number | null {
  try {
    return parseInt(Buffer.from(encodedId, "base64").toString("utf-8"), 10);
  } catch (error) {
    console.error("Failed to decode ID:", error);
    return null;
  }
}
