function checarNumeros() {

var x = document.getElementById("E1");
var y = Math.random() * 10;
var p = document.createElement('p');
var resultado = document.getElementById('resultado');

  if (parseFloat(x.value) == y) {
    p.innerHTML = "Você acertou o número: " + y;
    resultado.innerHTML = "";
    resultado.appendChild(p);
  } else if (x.value < y) {
    p.innerHTML = "Muito baixo, tente novamente";
    resultado.innerHTML = "";
    resultado.appendChild(p);
  } else {
    p.innerHTML = "Muito alto, quem sabe na próxima";
    resultado.innerHTML = "";
    resultado.appendChild(p);
  }
}