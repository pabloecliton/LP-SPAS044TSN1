function adicionarTarefa() {
  entradaDados = document.getElementById('E3');
  incrementaTarefa = entradaDados.value.trim();
  if (incrementaTarefa) {
      li = document.createElement('li');
      li.textContent = incrementaTarefa;
      checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      li.appendChild(checkbox);
      document.getElementById('listagemdeTarefas').appendChild(li);
      checkbox.addEventListener('change', function() {
        if (this.checked) {
        this.parentElement.style.textDecoration = 'line-through';
        this.parentElement.style.color = 'red';
        } else {
        this.parentElement.style.textDecoration = 'none';
        this.parentElement.style.color = 'black';
        }
        });
     
  }
}  