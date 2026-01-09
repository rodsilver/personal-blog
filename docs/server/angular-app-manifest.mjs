
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1827, hash: '8ff61538fe4ef7199a846bf26576b84bf51223b477f2aee8d3577a2a1532534a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 949, hash: '1e06609413b8002e4aa3d3097ce96401c23f84a10324e04b888725831ce6546d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 23109, hash: '58f1271d4202d233d4011223744be05a91695291041ed1572f3f0cdd3ff099a6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-OQEVJGTC.css': {size: 4595, hash: '2WItD8kn+Tg', text: () => import('./assets-chunks/styles-OQEVJGTC_css.mjs').then(m => m.default)}
  },
};
