var hljs = require('highlight.js') // https://highlightjs.org/

var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str, true).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

export function rendermd(markdown){
  
  return md.render(markdown);
}