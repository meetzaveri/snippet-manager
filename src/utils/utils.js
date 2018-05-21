
var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
// enable everything
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
var result = md.render('# markdown-it rulezz!');

export function rendermd(markdown){

  return md.render(markdown);
}