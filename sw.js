const NOME_CACHE = "game-hub-cache-v1";
const NOME_CACHE_IMAGENS = "game-hub-imagens-v1";

// 1. Liste aqui todos os arquivos principais que o seu site precisa para funcionar offline
const urlsParaCachear = [
  "./",
  "./index.html",
  "./home.html",
  "./carrinho.html",
  "./index.css",
  "./index.js",
  "./home.js",
  "./carrinho.js",
  "./pwa.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
];

// 2. Instalação: salva os arquivos no cache e ativa o SW sem esperar
self.addEventListener("install", (evento) => {
  // Diz ao navegador para esperar a promessa interna ser concluída antes de finalizar a instalação
  evento.waitUntil(
    // Abre o cache com o nome especificado (ou cria um novo se não existir)
    caches
      .open(NOME_CACHE)
      .then((cache) => {
        // Mostra uma mensagem de sucesso no console quando o cache é aberto
        console.log("Arquivos em cache com sucesso");
        // Busca todos os arquivos da lista e guarda no cache, retornando essa promessa
        return cache.addAll(urlsParaCachear);
      })
      .then(() => self.skipWaiting()),
  );
});

// 3. Ativação: apaga caches de versões antigas e assume o controle das abas abertas
// self.addEventListener("activate", (evento) => {
//   evento.waitUntil(
//     caches
//       .keys()
//       .then((chaves) =>
//         Promise.all(
//           chaves
//             .filter(
//               (chave) => chave !== NOME_CACHE && chave !== NOME_CACHE_IMAGENS,
//             )
//             .map((chave) => caches.delete(chave)),
//         ),
//       )
//       .then(() => self.clients.claim()),
//   );
// });

// 4. Interceptação das requisições
self.addEventListener("fetch", (evento) => {
  const requisicao = evento.request;
  if (requisicao.method !== "GET") return;

  // Ignora esquemas que a Cache API não suporta (ex.: chrome-extension://)
  if (!requisicao.url.startsWith("http")) return;

  // Imagens (inclusive de outros domínios): usa o cache e atualiza em segundo plano
  if (requisicao.destination === "image") {
    evento.respondWith(
      caches.open(NOME_CACHE_IMAGENS).then((cache) =>
        cache.match(requisicao).then((emCache) => {
          const daRede = fetch(requisicao)
            .then((resposta) => {
              if (resposta.ok || resposta.type === "opaque") {
                cache.put(requisicao, resposta.clone()).catch(() => {});
              }
              return resposta;
            })
            .catch(() => emCache || Response.error());
          return emCache || daRede;
        }),
      ),
    );
    return;
  }

  // Demais arquivos: cache primeiro, rede como alternativa
  evento.respondWith(
    caches.match(requisicao, { ignoreSearch: true }).then((respostaCache) => {
      return respostaCache || fetch(requisicao);
    }),
  );
});
