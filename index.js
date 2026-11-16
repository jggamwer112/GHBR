const form = document.querySelector(".form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  verificar_dados();
});

function verificar_dados() {
  const nome = document.querySelector("#login_nome");
  const idade = document.querySelector("#idade");
  const email = document.querySelector("#email");
  // const button = document.querySelector("#btn_criar")
  const nameIsString = typeof nome.value === "string";
  const nameIsEmpty = nome.value.trim() === "";
  const idadeIsvalid = idade.value >= 10;
  // const emailIsvalid = typeof email.value === "string" && email.value.includes("@")

  if (!nameIsString || nameIsEmpty) {
    alert("Insira seu nome !!");
    return;
  }

  if (!idadeIsvalid) {
    alert("Insira uma idade maior que 10 anos!!");
    return;
  }

  criar_conta(nome.value, idade.value, email.value);
  //   if (!emailIsvalid){
  //     alert("Insira um E-mail válido!!")
  //     return;
  // }

  form.reset();
  alert("Sua conta foi criada com suscesso!");
  window.location.href = "./home.html";
}

// button.addEventListener("click",verificar_dados)

function criar_conta(nome, idade, email) {
  const userId = Date.now().toString();
  const user = { userId, nome, idade, email };

  // const guardar_nome = JSON.stringify(nome.value);
  // const guardar_idade = JSON.stringify(idade.value);
  // const guardar_email = JSON.stringify(email.value);
  console.log(JSON.stringify(user));
  localStorage.setItem("usuario_conta", JSON.stringify(user));
}
