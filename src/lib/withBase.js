export function withBase(url = '') {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url; // external link
  const base = import.meta.env.BASE_URL || './';
  return url.startsWith('/') ? base + url.slice(1) : base + url;
}
