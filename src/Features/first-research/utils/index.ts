export function convertValToUrlType(value: string) {
  if (!value) return "";
  console.log("value:" + value);

  return value
    .toLowerCase()
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, "-") // Replace multiple spaces with a single hyphen
    .replace(/[^\w-]/g, ""); // Remove non-alphanumeric characters (except hyphens)
}
