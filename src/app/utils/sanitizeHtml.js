// utils/sanitizeHtml.js
import { htmlToText } from "html-to-text";

export function stripHtml(html, wordLimit) {
  const text = htmlToText(html, { wordwrap: false });
  const words = text.split(/\s+/);
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}
