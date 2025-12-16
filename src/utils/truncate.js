export const truncate = (text, maxLength) => {
  if (!text || typeof text !== "string" || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};
