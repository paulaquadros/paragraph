/* Módulo str_helper.js */
function upper(str) {
  return str.toUpperCase();
}
function lower(str) {
  return str.toLowerCase();
}
export default {
  createLink,
};
export function createLink(file) {
  return `<a href="/file/${file}">${file}</a><br>`;
}
