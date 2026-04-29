const { marked } = require('marked');
const hljs = require('highlight.js');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Custom renderer untuk syntax highlighting
const renderer = new marked.Renderer();
renderer.code = (code, lang) => {
  const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(code, { language, ignoreIllegals: true }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

// Buka link eksternal di tab baru
renderer.link = (href, title, text) => {
  const isExternal = href && /^https?:\/\//i.test(href);
  const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}"${titleAttr}${attrs}>${text}</a>`;
};

// Wrap image dengan figure
renderer.image = (href, title, text) => {
  const titleAttr = title ? ` title="${title}"` : '';
  const altAttr = text ? ` alt="${text}"` : '';
  const caption = text ? `<figcaption>${text}</figcaption>` : '';
  return `<figure><img src="${href}"${altAttr}${titleAttr} loading="lazy">${caption}</figure>`;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

/**
 * Render markdown -> sanitized HTML
 */
exports.render = (text) => {
  if (!text) return '';
  const html = marked.parse(text);
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target', 'rel', 'class', 'loading', 'id'],
    ADD_TAGS: ['iframe', 'video', 'source', 'audio', 'figure', 'figcaption'],
    ALLOW_UNKNOWN_PROTOCOLS: false
  });
};

/**
 * Bersihkan markdown jadi plain text (untuk excerpt / meta description)
 */
exports.stripMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/```[\s\S]*?```/g, '')               // code block
    .replace(/`([^`]+)`/g, '$1')                  // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')         // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')      // links -> text
    .replace(/^#{1,6}\s+/gm, '')                  // headings
    .replace(/^\s*[-*+>]\s+/gm, '')               // list/quote markers
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, '$1') // bold/italic
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Auto-generate excerpt dari markdown (max N chars)
 */
exports.makeExcerpt = (markdown, maxLen = 200) => {
  const plain = exports.stripMarkdown(markdown);
  if (plain.length <= maxLen) return plain;
  return plain.substring(0, maxLen).replace(/\s+\S*$/, '') + '…';
};
