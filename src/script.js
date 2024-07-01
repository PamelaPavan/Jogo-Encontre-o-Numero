

/****************************VAIÁVEIS GLOBAIS ********************************/

let tentativa = 0;          //Variável que armazena quantidade de tentativas do usuário
let numUsuarios = [];       //Vetor para salvar os PINs inseridos pelo usuário

const pinSorteado = Array.from({ length: 4 }, () => gerarNumeroAleatorio(0, 9)); // Cria a matriz com o tamanho 4 e preenche com números aleatórios de 0 a 9

console.log(`Número sorteado: ${pinSorteado.join(' ')}`);   //Mostra no console o número sorteado


/************************FUNÇÕES PRINCIPAIS***********************************/

/**Função que inicia o programa */
function inicio(){

  let pinInserido;
  let arrayPinInserido = [];

  solicitaPin(pinInserido, arrayPinInserido);
}

/**Função que solicita o pin ao usuário */
function solicitaPin(arrayPinInserido){

  //#4.1 Solicitação feita por meio de texto no html e recebe pin
  let inputBox = document.getElementById('inputBox'); //Inserção do pin pelo usuário 
  
  inputBox.addEventListener('keypress', function(event) { // adiciona ouvinte de eventos 

    if (event.key === 'Enter') { // Caso a tecla enter seja selecionada 
  
      let pinInserido = inputBox.value;
      console.log(`Pin informado: ` + pinInserido);
      
      inputBox.value = ''; // Apaga o valor da caixa de entrada      
 
      // Inserção CORRETA de digitos de acordo com a especificação
      if (/^\d{4,6}$/.test(pinInserido)) {    //Expressão regular /^\d{4,6}$/: Esta expressão só retornará true se pinInserido consistir exclusivamente de 4 a 6 dígitos
       
        numUsuarios.push(' ' + pinInserido);  //push realizado apenas para organizar valor das tentativas mostradas na tela
        
        document.getElementById('tentativas').innerHTML = numUsuarios; //Mostra os valores de cada nova tentativa realizada pelo usuário
        
        tentativa++; //Atualiza valor da variável da quantidade de tentativas
        
        document.getElementById('qTentativas').innerHTML = tentativa; //Número de tentativas do usuário

        arrayPinInserido = pinInserido.split('').map(Number);  //transforma o PIN (string de dígitos) em um array de números inteiros correspondentes
        
        comparaPin(arrayPinInserido, inputBox); //Compara pin inserido com pin sorteado

      } 
      
      //Inserção INCORRETA de digitos de acordo com a especificação
      else {
 
        document.getElementById('textOutput').innerHTML = `Número inválido! Por favor, insira um número com a quantidade de dígitos correta.`; //Mensagem de erro

        console.log("Número inválido! Por favor, insira um número com a quantidade de dígitos correta.");
      }
    }
  });
}

/** Função que compara o pin inserido com o pin sorteado*/
function comparaPin(arrayPinInserido, inputBox){    
  
  let acertou = true;
  
  if (arrayPinInserido.length !== pinSorteado.length) { // Confere se o usuário acertou ou errou o PIN

    acertou = false;  //Os PINs têm tamanho diferente, então NÃO SÃO IGUAIS!

  } else { //PINs com mesmo tamanho
    
    for (let i = 0; i < arrayPinInserido.length; i++) { // Compara os elementos dos arrays dos PINs
      
      if (arrayPinInserido[i] !== pinSorteado[i]) { // Sai do loop se encontrar uma diferença nos elementos
      
        acertou = false;
        break; 
      
      }
    }
  }
  
  if (acertou) { // Se o usuário acertou o pin

    document.getElementById('textOutput').innerHTML = 'Parabéns, você acertou!'; //Exibe mensagem de parabéns
    
    console.log("Parabéns, você acertou!"); //#4.3
    
    inputBox.disabled = true; // Desabilita o input para evitar mais entradas

  } 
  
  else {  // Se o usuário errou o pin
   
    dica(arrayPinInserido);   // Chama a função dica para fornecer uma dica ao usuário
 
  }
}

/** Função que fornece dicas ao usuário baseado no pin inserido */
function dica(arrayPinInserido){

  let pin = toInt(arrayPinInserido); //Transforma array do pin inserido pelo usuário em um número inteiro
  let valorEsperado = toInt(pinSorteado); //Transforma array do pin sorteado pela máquina em um número inteiro
  
  //se o dobro do pin ainda for menor ou igual ao valor sorteado
  //se a metade do pin ainda for maior ou igual ao valor sorteado
  let intensidade = (pin * 2 <= valorEsperado || pin / 2 >= valorEsperado) ? 'muito ' : '';  // Define a intensidade da dica
  
  // #4.2
  let comp = pin < valorEsperado ? 'maior' : 'menor';   // Define se o valor esperado é maior ou menor

  // #4.4
  document.getElementById('textOutput').innerHTML = `O valor deve ser ${intensidade}${comp} que o PIN informado.`; // Exibe a dica

  console.log(`O valor deve ser ${intensidade}${comp} que o PIN informado.`);
}

/************************FUNÇÕES AUXÍLIARES***********************************/

/**Função que converte um array para inteiro */
function toInt(array){

  let arrayC = array.join(''); //junta elementos do array   

  let int = parseInt(arrayC, 10); // Converte a string para um número inteiro

  return int;    
}

/**Função que simula a ação que seria feita com a tecla Enter */
function simulaEnter() {

  document.getElementById('inputBox').dispatchEvent(new KeyboardEvent('keypress', {'key': 'Enter'}));
}

/**Função para reiniciar o jogo */
function novoJogo() {

  window.location.reload(); //Recarrega a página
}

/* Função para gerar um número aleatório entre min e max */
function gerarNumeroAleatorio(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}