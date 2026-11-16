let section_atual = "0";
alterar_section("0");
// const produto = {
//     nome : "",
//     valor : 0
// }
// const carrinho_texto = document.querySelector("#carrinho");
// const carrinho_array = [{nome: "", valor: 0}];
// function adicionar_ao_carrinho(){
//     carrinho_array.push({nome: produto.nome, valor: produto.valor});
//     console.log(carrinho_array)
//     carrinho_texto.textContent = carrinho_array;

//   const carrinho_json = stringfy(carrinho_array)
//   localStorage.setItem("carrinho",carrinho_json)
// }
function alterar_section(section) {
  section_atual = section;
  const title = document.querySelector("#title");
  const text = document.querySelector("#text");
  const div_jogos = document.querySelector(".div_jogos");

  switch (section_atual) {
    case "0":
      ((title.textContent = "|Sobre Nós|"),
        (text.textContent =
          "Somos um pequeno mercado de jogos físicos e digitais que entrou no mercado de trabalho no Brasil em 2023." +
          " Nossa história Começou em Uberlândia - MG, quando abrimos uma pequena unidade para alugar jogos, e agora estamos criando um site para facilitar seu envio!!"));
      break;
    case "1":
      ((title.textContent = "|Mídias Físicas|"),
        (text.textContent =
          "Veja nossa variedade de mídias físicas de video game!!"));
      break;
    case "2":
      ((title.textContent = "|Mídias Digitais|"),
        (text.textContent = "Confira os jogos digitais!!"));
      break;
  }

  div_jogos.style.display = section_atual === "1" ? "flex" : "none";
}

function adicionar(botao) {
  let items = JSON.parse(localStorage.getItem("carrinho")) || [];
  const jogo = botao.closest(".btn_imagem");

  const item = {
    valor: Number(jogo.dataset.valor),
    nome: jogo.dataset.nome,
    imagem: jogo.querySelector(".imagem").src,
  };

  items.push(item);

  localStorage.setItem("carrinho", JSON.stringify(items));
  alert(item.nome + " foi adicionado ao carrinho!");
  // const valor_guardado = JSON.stringify(valor_global);
  // localStorage.setItem("valor",valor_guardado)
  // const nome_guardado = JSON.stringify(nome_global)
  // localStorage.setItem("nome",nome_guardado)
  // const img_guardada = JSON.stringify(img_global)
  // localStorage.setItem("img",img_guardada);
  // console.log(nome_global)
  // console.log(valor_global)
  // Próximo passo: armazenar nome e valor global para local_storage
}
