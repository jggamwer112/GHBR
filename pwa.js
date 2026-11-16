// Registra o Service Worker. Incluído em todas as páginas para que o PWA
// funcione independente de qual delas o usuário abrir primeiro.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => {
      console.log('Service Worker registrado com sucesso!');
    })
    .catch((erro) => {
      console.error('Erro no Service Worker:', erro);
    });
}
