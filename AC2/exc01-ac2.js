function checarNumeros() {

var x = document.getElementById("E1");
var y = Math.random() * 10;

  if (parseFloat(x.value) == y) {
    var p = document.createElement('p');
    p.innerHTML = "Você acertou o número: " + y;
    document.getElementById('resultado').appendChild(p);
  } else if (x.value < y) {
    alert("Muito baixo, tente novamente");
  } else {
    alert("Muito alto, quem sabe na próxima");
  }
}