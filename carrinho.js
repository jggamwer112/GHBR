const div = document.querySelector("#lista_compras");

function ler_carrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function remover(indice) {
  const itens = ler_carrinho();
  itens.splice(indice, 1);
  localStorage.setItem("carrinho", JSON.stringify(itens));
  renderizar();
}

function renderizar() {
  const itens = ler_carrinho();
  div.replaceChildren();

  if (itens.length === 0) {
    const vazio = document.createElement("p");
    vazio.textContent = "Seu carrinho está vazio.";
    div.appendChild(vazio);
    return;
  }

  itens.forEach(function (item, indice) {
    const card = document.createElement("div");
    card.className = "item_carrinho";
    const img = document.createElement("img");
    const info = document.createElement("div");
    info.className = "info";
    const nome = document.createElement("p");
    const valor = document.createElement("p");
    const btn_remover = document.createElement("button");

    img.src = item.imagem;
    img.style.width = "250px";
    img.style.height = "250px";
    img.style.borderRadius = "12px";
    nome.textContent = "Nome do produto: " + item.nome;
    valor.textContent = "Valor: " + item.valor + "R$";
    btn_remover.textContent = "🗑️ Remover";
    btn_remover.className = "button btn_remover";
    btn_remover.onclick = function () {
      remover(indice);
    };

    card.appendChild(img);
    card.appendChild(info);
    info.appendChild(nome);
    info.appendChild(valor);
    info.appendChild(btn_remover);
    div.appendChild(card);
  });
}

if (ler_carrinho().length === 0) {
  alert("Nenhum jogo encontrado!!!");
}
renderizar();
// localStorage.removeItem("carrinho")
