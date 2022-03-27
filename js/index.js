const form = document.querySelector('#form');
const ulTarefas = document.querySelector('#tarefas');
const inputTarefa = document.querySelector('#nomeTarefa');
let id = localStorage.getItem('id') || 1;
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

form.addEventListener('submit', e => {
    e.preventDefault();

    const tarefa = Object.create(null);
    tarefa.id = Number(id);
    tarefa.nomeTarefa = e.target.nomeTarefa.value;
    tarefa.status = 'pendente';
    
    salvarNoStorage(tarefa);
});

const salvarNoStorage = tarefa => {
    id++;
    tarefas.push(tarefa);
    localStorage.setItem('id', id);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    inputTarefa.value = '';

    exibirTarefas();
}

const exibirTarefas = () => {
    ulTarefas.textContent = '';

    tarefas.map(tarefa => {
        const li = document.createElement('li');
        li.setAttribute('class', 'item');

        if (tarefa.status === 'concluído') {
            li.classList.add('border-bottom-green');
        }

        const p = document.createElement('p');
        p.setAttribute('class', 'nomeTarefa');
        p.textContent = tarefa.nomeTarefa;

        const div = document.createElement('div');

        const buttonConcluir = document.createElement('button');
        buttonConcluir.setAttribute('class','botao');
        buttonConcluir.setAttribute('onclick', `concluirTarefa(${tarefa.id})`);
        buttonConcluir.textContent = 'Concluir';

        const buttonRemover = document.createElement('button');
        buttonRemover.setAttribute('class','botao');
        buttonRemover.setAttribute('onclick', `removerTarefa(${tarefa.id})`);
        buttonRemover.textContent = 'Remover';

        div.append(buttonConcluir, buttonRemover);
        li.append(p, div);
        ulTarefas.append(li);
    });
}

exibirTarefas();

const concluirTarefa = id => {
    tarefas = tarefas.map(tarefa => {
        if (id === tarefa.id) {
            tarefa.status = 'concluído';
        } 
        
        return tarefa;
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    exibirTarefas();
}

const removerTarefa = id => {
    const novaListaDeTarefas = [];
    tarefas.map(tarefa =>  {
        if (tarefa.id !== id) {
            novaListaDeTarefas.push(tarefa);
        }
    });
    
    localStorage.setItem('tarefas', JSON.stringify(novaListaDeTarefas));
    exibirTarefas();
    location.href = '/';
}