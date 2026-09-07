export { cn } from "cn";
export function truncateFilename(filename: string, maxLength = 20) {
  const lastDot = filename.lastIndexOf(".");
  const ext = lastDot !== -1 ? filename.slice(lastDot) : "";
  const name = lastDot !== -1 ? filename.slice(0, lastDot) : filename;

  if (filename.length <= maxLength) return filename;

  const keep = maxLength - ext.length - 3; // 3 for "..."
  return name.slice(0, keep) + "..." + ext;
}
