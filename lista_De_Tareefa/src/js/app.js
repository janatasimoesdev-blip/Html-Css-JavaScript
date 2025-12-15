const inptNovaTarefa = document.querySelector('#inptNovaTarefa');
const btnAddTarefa = document.querySelector('#btnAddTarefa');
const listaTarefas = document.querySelector('#listaTarefas');
const janelaEdicao = document.querySelector('#janelaEdicao');
const janelaEdecaoFundo = document.querySelector('#janelaEdecaoFundo');
const janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
const btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
const idTarfaEdicao = document.querySelector('#idTarfaEdicao');
const inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');


inptNovaTarefa.addEventListener('keypress', (evento)=> {
    //keyCode == 13 , se refera a numeração da tecla enter no tecaldo. qualque coisa pesquise keyCode
    if(evento.keyCode == 13) {
        let tarefa = {
            nome: inptNovaTarefa.value,
            id: gerarId()
        };
        // Adicionar a tarefa ao HTML
        
        adicioanrTarefa(tarefa);
        
    };
    // verifcar erro da mensagem  IMPORTANTE !!!!1
});

//btn do edtirar
janelaEdicaoBtnFechar.addEventListener('click', (evento)=> {
    alternarJanelaEdicao();
})


// btn de tarefas 
btnAddTarefa.addEventListener('click', (evento)=> {
    if(inptNovaTarefa.value == '') {
        message('Erro, Campo Vazil !', 'red');
        return
    }
    let tarefa = {
        nome: inptNovaTarefa.value,
        id: gerarId()
    };
    // Adicionar a tarefa ao HTML
    adicioanrTarefa(tarefa);
});

//btn de atualizar tarefa 
btnAtualizarTarefa.addEventListener('click', (evento) => {
    evento.preventDefault()
    let idTarefa = idTarfaEdicao.innerHTML.replace('#', '');
    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    };

    let tarefaAtual = document.getElementById(''+ idTarefa +'');
    if(tarefaAtual) {        
        let li = crairTagLi(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
        message('Tarefa Editada com Sucesso !!', '#67d000');
    }else {
        message('Erro Campo Não Encontrado !', 'red');
    };
});

function gerarId() {
    return Math.floor(Math.random() * 3000);
};


function adicioanrTarefa(tarefa) {
    let li = crairTagLi(tarefa);
    listaTarefas.appendChild(li);
    inptNovaTarefa.value = '';
    message('Tarefa Adicionada com Sucesso !!', '#67d000');
};

function crairTagLi(tarefa) {
    let li = document.createElement('li');
    li.id = tarefa.id;
    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');
    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
};

function editar(idTarefa) {
    let li = document.getElementById(''+ idTarefa + '');
    if(li) {
        idTarfaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
        
    } else {
        message('Erro Campo Não Encontrado !', 'red');
    }; 
};

function excluir(idTarefa){
    // let confirma = confirm('pode esxluir');
    confrimaExlcuicao().then((confirmarEvento) => {
        if(confirmarEvento) {
            let li = document.getElementById(''+ idTarefa + '');
            if(li) {
                listaTarefas.removeChild(li);
                swal('Tarefa Excluida com Sucesso !',{
                    icon: 'success',
                });
            } else {
                swal('Erro: Tarefa Não encontrada', {
                    icon: 'error',
                });
            };
        } else {
            swal('A tarefa não foi Excluida', {
                icon: 'info',
            });
        };
    })
};
//função de confirma exclusao da tarefa
function confrimaExlcuicao() {
    return  swal({
        title: "Tem certeza ?",
        text: "Uma vez excluído, você não poderá recuperar este arquivo !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
};

//função de mensagem 
function message(text, background) {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: background,
            boxShadow: 'none',
            borderRadius: '20px'
        }
    }).showToast();
};

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdecaoFundo.classList.toggle('abrir');
};

