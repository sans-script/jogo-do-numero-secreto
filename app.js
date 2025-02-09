// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do Número Secreto";

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número entre 1 e 10";

let tentativas = 1;
let listaDeNumerosSorteados = [];
let numeroLimite = 10;

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == 4) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

let numeroSecreto = gerarNumeroAleatorio();

function limparCampo() {
  document.querySelector("input").value = "";
}

function exibirTextoInicial() {
  exibirTextoNaTela("h1", "Jogo do Número Secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  limparCampo();
  exibirTextoInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

function exibirTextoNaTela(tag, texto) {
  let paragrafo = document.querySelector(tag);
  paragrafo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Male", { rate: 1.2 });
}

exibirTextoNaTela("h1", "Jogo do Número Secreto");

exibirTextoNaTela("p", "Escolha um número entre 1 e 10");

function verificarChute() {
  let chute = document.querySelector("input").value;
  if (numeroSecreto == chute) {
    exibirTextoNaTela("h1", "Parabéns! Você acertou!");
    let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você acertou o número secreto! com ${tentativas} ${palavraTentativas}`;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}
