/* Função para gerar um número aleatório entre min e max (inclusivo) */
function gerarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/****************************VAIÁVEIS GLOBAIS ********************************/

let tentativa = 0;
let numUsuarios = [];
let maxTentativas = 15;

// Cria a matriz com o tamanho 4 e preenche com números aleatórios de 0 a 9
const pinSorteado = Array.from({ length: 4 }, () => gerarNumeroAleatorio(0, 9));

console.log(`Número sorteado: ${pinSorteado.join(' ')}`);


/************************FUNÇÕES PRINCIPAIS ***********************************/

function newGame() {
  window.location.reload()
}

/**Função que inicia o programa */
function inicio(){
  let pinInserido;
  let arrayPinInserido = [];
  solicitaPin(pinInserido, arrayPinInserido);
}

/**Função que solicita o pin ao usuário */
function solicitaPin(arrayPinInserido){
  let inputBox = document.getElementById('inputBox');
  
  inputBox.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Impede o envio do formulário ao pressionar Enter

      let pinInserido = inputBox.value;
      console.log(`Pin informado: ` + pinInserido);
      inputBox.value = ''; // Apaga o valor da caixa de entrada      

      /**Inserção Correta pelo usuário */ //Verifica se usuário inseriu o mesmo número. Não deixar ele inserir o mesmo número?
      if (/^\d{4,6}$/.test(pinInserido)) {
        numUsuarios.push(' ' + pinInserido);
        document.getElementById('guesses').innerHTML = numUsuarios;
        tentativa++;
        document.getElementById('tentativas').innerHTML = tentativa;

        arrayPinInserido = pinInserido.split('').map(Number);
        comparaPin(arrayPinInserido, inputBox);
      } else {
        /**Inserção Incorreta pelo usuário */
        document.getElementById('textOutput').innerHTML = `Número inválido! Por favor, insira um número com a quantidade de dígitos correta.`;
        console.log("Número inválido! Por favor, insira um número com a quantidade de dígitos correta.");
      }

      // Verifica se o número de tentativas excedeu o limite
      if (tentativa >= maxTentativas) {
        document.getElementById('textOutput').innerHTML = 'Você perdeu! O número do computador era ' + pinSorteado.join(' ');
        console.log('Você perdeu! O número do computador era ' + pinSorteado.join(' '));
        inputBox.disabled = true; // Desabilita o input para evitar mais entradas
      }
    }
  });
}
/** Função que compara o pin inserido com o pin sorteado e fornece dicas */
function comparaPin(arrayPinInserido, inputBox){    
  let acertou = true;

  // Verifica se o tamanho dos arrays é diferente
  if (arrayPinInserido.length !== pinSorteado.length) {
    acertou = false;
  } else {
    // Compara os elementos dos arrays
    for (let i = 0; i < arrayPinInserido.length; i++) { 
      if (arrayPinInserido[i] !== pinSorteado[i]) {
        acertou = false;
        break; // Sai do loop se encontrar uma diferença
      }
    }
  }
  // Se o usuário acertou o pin
  if (acertou) {
    document.getElementById('textOutput').innerHTML = 'Parabéns, você acertou!';
    console.log("Parabéns, você acertou!");
    inputBox.disabled = true; // Desabilita o input para evitar mais entradas
  } else {
    // Chama a função dica para fornecer uma dica ao usuário
    dica(arrayPinInserido);
  }
}
/** Função que fornece dicas ao usuário baseado no pin inserido */
function dica(arrayPinInserido){
  let pin = toInt(arrayPinInserido);
  let valorEsperado = toInt(pinSorteado);
  
  // Define a intensidade da dica
  let intensidade = (pin * 2 <= valorEsperado || pin / 2 >= valorEsperado) ? 'muito ' : ''; 
  // Define se o valor esperado é maior ou menor
  let comp = pin < valorEsperado ? 'maior' : 'menor';

  // Exibe a dica
  document.getElementById('textOutput').innerHTML = `O valor deve ser ${intensidade}${comp} que o PIN informado.`;
  console.log(`O valor deve ser ${intensidade}${comp} que o PIN informado.`);
}
/**Função que converte um array para inteiro */
function toInt(array){

  let arrayC = array.join(''); //junta elementos do array   

  let int = parseInt(arrayC, 10); // Converte a string para um número inteiro

  return int;    
}
function simulaEnter() {
  // Simula a ação que seria feita com a tecla Enter
  // Por exemplo, enviar um formulário ou ativar um evento específico
  document.getElementById('inputBox').dispatchEvent(new KeyboardEvent('keypress', {'key': 'Enter'}));
}
inicio();