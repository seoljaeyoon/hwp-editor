// 한 번 열면 인터넷 없이도 열리도록 앱 파일을 보관합니다. 새 버전을 올릴 때는 아래 이름의 숫자를 올리세요.
const CACHE='hwp-editor-v1', FILES=['./','index.html','manifest.webmanifest','icon-180.png','icon-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).then(r=>{ if(r.ok&&new URL(e.request.url).origin===location.origin){ const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); } return r; }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html')))); });
