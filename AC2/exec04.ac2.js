function checkEscolha(){
    escolhaMago = document.getElementById('mago');
    escolhaGuerreiro = document.getElementById('guerreiro');
    escolhaArqueiro = document.getElementById('arqueiro');
    imagemResultado = document.getElementById('imagemE4');
    mensagemResultado = document.getElementById('mensagemE4');

    if (escolhaMago.checked) {
        mensagemResultado.innerHTML = "Você escolheu ser um Mago! Prepare-se para lançar feitiços!";
        imagemResultado.src = "mago.jpg";  
    } else if (escolhaGuerreiro.checked) {
        mensagemResultado.innerHTML = "Você escolheu ser um Guerreiro! Prepare-se para batalhas épicas!";
        imagemResultado.src = "guerreiro.jpg"; 
    } else if (escolhaArqueiro.checked) {
        mensagemResultado.innerHTML = "Você escolheu ser um Arqueiro! Prepare-se para acertar alvos distantes!";
        imagemResultado.src = "arqueiro.jpg"; 
    } 
}