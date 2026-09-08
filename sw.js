/* Fim do Mês — service worker
   Guarda o app inteiro no aparelho para funcionar sem internet.
   Ao publicar uma versão nova, troque o número em VERSAO. */
const VERSAO = 'fim-do-mes-v3';
const ARQUIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icone-192.png',
  './icone-512.png',
  './icone-192-maskable.png',
  './icone-512-maskable.png',
  './apple-touch-icon.png',
  './favicon.png',
];

self.addEventListener('install', evento => {
  evento.waitUntil((async () => {
    const cache = await caches.open(VERSAO);
    // addAll falha inteiro se um arquivo faltar; guarda um a um para ser tolerante
    await Promise.all(ARQUIVOS.map(a => cache.add(a).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', evento => {
  evento.waitUntil((async () => {
    const nomes = await caches.keys();
    await Promise.all(nomes.filter(n => n !== VERSAO && n !== VERSAO + '-fontes').map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', evento => {
  const req = evento.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // fontes do Google: guarda na primeira vez, para o app não mudar de cara sem internet
  if (url.origin !== self.location.origin) {
    if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
      evento.respondWith((async () => {
        const cache = await caches.open(VERSAO + '-fontes');
        const guardada = await cache.match(req);
        if (guardada) return guardada;
        try {
          const resposta = await fetch(req);
          cache.put(req, resposta.clone());
          return resposta;
        } catch (e) {
          return guardada || Response.error();
        }
      })());
    }
    return;
  }

  // navegação: tenta a rede primeiro para pegar atualizações, cai para o cache offline
  if (req.mode === 'navigate') {
    evento.respondWith((async () => {
      try {
        const resposta = await fetch(req);
        const cache = await caches.open(VERSAO);
        cache.put('./index.html', resposta.clone());
        return resposta;
      } catch (e) {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // demais arquivos: cache primeiro, que é instantâneo
  evento.respondWith((async () => {
    const emCache = await caches.match(req);
    if (emCache) return emCache;
    try {
      const resposta = await fetch(req);
      if (resposta && resposta.status === 200 && resposta.type === 'basic') {
        const cache = await caches.open(VERSAO);
        cache.put(req, resposta.clone());
      }
      return resposta;
    } catch (e) {
      return Response.error();
    }
  })());
});

self.addEventListener('message', e => {
  if (e.data === 'atualizar') self.skipWaiting();
});
