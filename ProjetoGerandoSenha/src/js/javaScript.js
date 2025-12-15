
// função para intificar qula cheack de opção vai ser adicionado para gera a senha
function getCharTypes() {
    const number = document.querySelector('#include_number').checked;
    const LowCaser = document.querySelector('#include_LowCaser').checked;
    const upperCase = document.querySelector('#include_UpCaser').checked;
    const characters = document.querySelector('#include_characters').checked;
    
    // chartypes é um array vaziu para armazrna
    // os tipos de caracteres para incrementação
    const charTypes = [];
    if(number) {
        charTypes.push('0123456789');
    }
    if(LowCaser) {
        charTypes.push('abcdefghijlmnopqrstuvxz')
    }
    if(upperCase) {
        charTypes.push('ABCDEFGHIJLMNOPQRSTUVXZ')
    }
    if(characters) {
        charTypes.push('!@#$?&_^-*~{[}]<>');
    }

    return charTypes;
}

// função para definir tamanho de senha 
function getPassawordSize() {
    const size = Number(document.querySelector('#size').value);
    if(isNaN(size) || size < 4 || size > 20) {
        message( 'Tamanho Invalido, Digite um Número entre 4 e 128!', '#dc2626');
        return
    }
    return size
} 

//função de incrementar tipos de caracteres 
function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);

    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
};

//função de gera senha 
function generatePassaword(size, charTypes) {
    let passawordGenerated = '';
    while(passawordGenerated.length < size) {
        passawordGenerated += randomCharType(charTypes)
    }
    return passawordGenerated;
}

// função de messagem de erro ou acerto 
function message(text, background) {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: background,
            boxShadow: 'none'
        }
    }).showToast();
}

// validação de senha para imprimir
document.querySelector('#btn-senha').addEventListener('click',function(){
    const size = getPassawordSize();
    const charTypes = getCharTypes();

    if(!size) {
        return;
    }
    if(!charTypes.length) {
        message('Selecione um tipo de Caractere!', '#dc2626');
        return
    }
    const passawordGenerated = generatePassaword(size, charTypes);

    document.querySelector('#passaword').textContent = passawordGenerated;
    document.querySelector('#passaword_container').classList.add('show');
});



// validação de copia 
document.querySelector('#copy').addEventListener('click', function() {
    const copyPassaword = document.querySelector('#passaword').textContent;
    
    if(copyPassaword === '') {
        message('Copia Invalida, Campo Vazil !',  '#dc2626');
        return
    } 
    navigator.clipboard.writeText(copyPassaword);
    if(copyPassaword) {
        message('Copiado Com Sucesso !','#84cc16' )
    }
});