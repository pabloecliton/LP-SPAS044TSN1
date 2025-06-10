
campoTarefa = document.getElementById('entrada-tarefa');
botaoAddTarefa = document.getElementById('add-btn-tarefa');
listaTarefas = document.getElementById('lista-tarefa');

campoNota = document.getElementById('entrada-nota');
botaoAddNota = document.getElementById('add-btn-nota');
listaNotas = document.getElementById('lista-nota');

calendarioEl = document.getElementById('calendario');
abaCalendarioTrigger = document.getElementById('aba-calendario-tab');
let calendario;

function adicionarTarefa(texto, completada = false) {
    item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center item-tarefa';

    textoItem = document.createElement('span');
    textoItem.className = 'texto-tarefa';
    textoItem.textContent = texto;

    botaoApagar = document.createElement('button');
    botaoApagar.className = 'btn btn-sm btn-danger btn-deletar';
    botaoApagar.innerHTML = '<i class="fas fa-trash-alt"></i>';

    item.appendChild(textoItem);
    item.appendChild(botaoApagar);
    listaTarefas.appendChild(item);

    if (completada) {
        item.classList.add('completed');
    }
}

botaoAddTarefa.addEventListener('click', function () {
    texto = campoTarefa.value.trim();

    if (texto) {
        adicionarTarefa(texto);
        salvarTarefas();
        campoTarefa.value = '';
    } else {
        Swal.fire('Opa!', 'Você precisa escrever algo para a tarefa!', 'warning');
    }
});

campoTarefa.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        botaoAddTarefa.click();
    }
});

listaTarefas.addEventListener('click', function (e) {
    if (e.target.closest('.btn-deletar')) {
        tarefa = e.target.closest('.item-tarefa');
        Swal.fire({
            title: 'Tem certeza?',
            text: "Esta ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, apagar!'
        }).then((result) => {
            if (result.isConfirmed) {
                tarefa.remove();
                salvarTarefas();
            }
        });
    }
    else if (e.target.closest('.item-tarefa')) {
        tarefa = e.target.closest('.item-tarefa');
        tarefa.classList.toggle('completed');
        salvarTarefas();
    }
});

function adicionarNota(texto) {
    nota = document.createElement('div');
    nota.className = 'nota mb-3 p-3 bg-light border rounded';

    textoNota = document.createElement('div');
    textoNota.textContent = texto;

    botaoApagar = document.createElement('button');
    botaoApagar.className = 'btn btn-sm btn-danger float-end btn-deletar-nota';
    botaoApagar.innerHTML = '&times;';

    nota.appendChild(textoNota);
    nota.appendChild(botaoApagar);
    listaNotas.prepend(nota);
}

botaoAddNota.addEventListener('click', function () {
    texto = campoNota.value.trim();
    if (texto) {
        adicionarNota(texto);
        salvarNotas();
        campoNota.value = '';
    }
});

listaNotas.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-deletar-nota')) {
        e.target.parentElement.remove();
        salvarNotas();
    }
});

function adicionarEventoCalendario(titulo, data) {
    calendario.addEvent({
        title: titulo,
        start: data,
        allDay: true
    });
    salvarEventos();
}

calendario = new FullCalendar.Calendar(calendarioEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        list: 'Lista'
    },
    events: carregarEventos(),
    dateClick: function (info) {
        Swal.fire({
            title: 'Criar novo evento',
            input: 'text',
            inputPlaceholder: 'Hmm, qual o evento do dia?',
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                adicionarEventoCalendario(result.value, info.dateStr);
            }
        });
    },
    eventClick: function (info) {
        Swal.fire({
            title: 'Remover Evento?',
            text: `Tem certeza que deseja remover o evento "${info.event.title}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Remover',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                info.event.remove();
                salvarEventos();
            }
        });
    }
});

calendario.render();


abaCalendarioTrigger.addEventListener('shown.mdb.tab', function () {

    setTimeout(function () {
        calendario.updateSize();
    }, 150);
});


function salvarTarefas() {
    tarefas = [];
    document.querySelectorAll('.item-tarefa').forEach(function (item) {
        tarefas.push({
            texto: item.querySelector('.texto-tarefa').textContent,
            completada: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function salvarNotas() {
    notas = [];
    document.querySelectorAll('#lista-nota .nota').forEach(function (nota) {
        textoNota = nota.querySelector('div').textContent;
        notas.push(textoNota);
    });
    localStorage.setItem('notas', JSON.stringify(notas));
}

function salvarEventos() {
    eventos = calendario.getEvents().map(evento => ({
        title: evento.title,
        start: evento.startStr,
        allDay: evento.allDay
    }));
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

function carregarEventos() {
    eventosSalvos = localStorage.getItem('eventos');
    if (eventosSalvos) {
        return JSON.parse(eventosSalvos);
    }
    return [];
}

function iniciar() {
    tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefasSalvas.forEach(function (tarefa) {
        adicionarTarefa(tarefa.texto, tarefa.completada);
    });

    notasSalvas = JSON.parse(localStorage.getItem('notas')) || [];
    notasSalvas.forEach(adicionarNota);
}

iniciar();