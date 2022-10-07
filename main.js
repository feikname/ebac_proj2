const form = document.getElementById("form-adicionar-contato")
const inputNome = document.getElementById("nome-contato")
const inputTelefone = document.getElementById("telefone-contato")

const nomes = []
const telefones = []

let itensRenderizados = 0

form.addEventListener("submit", function (e) {
    e.preventDefault()

    if(adicionarLinha()) {
        atualizarTabela()
    }
})

inputNome.addEventListener("keyup", function() {
    const nome=inputNome.value.trim();
    if(nomes.includes(nome)) {
        inputNome.classList.add("duped")
    } else {
        inputNome.classList.remove("duped")
    }
})

inputTelefone.addEventListener("keyup", function() {
    const tel=inputTelefone.value.trim();
    if(telefones.includes(tel)) {
        inputTelefone.classList.add("duped")
    } else {
        inputTelefone.classList.remove("duped")
    }
})


// let evtDeletarContato = function(e) {

// }

// function removerLinha(i) {

// }

// TODO: Adicionar funcionalidade de deleção
// true: nova linha adicionada
// false: nenhuma linha adiciona
function adicionarLinha() {
    let retValue = false

    const nome=inputNome.value.trim();
    const tel=inputTelefone.value.trim();

    if (nomes.includes(nome)) {
        alert(`ERRO: Já existe um contato com o nome "${nome}" na sua agenda!`);
    } else if (telefones.includes(tel)) {
        alert(`ERRO: Já existe um contato com o número "${tel}" na sua agenda!`);
    } else {
        nomes.push(nome)
        telefones.push(tel)

        retValue = true
    }

    inputNome.value = ""
    inputTelefone.value = ""

    return retValue
}

function atualizarTabela() {
    const itensExistentes = nomes.length;

    if(itensRenderizados == 0 && itensExistentes==1) {
        document.getElementById("no-contacts").classList.add("hidden")
    }
    if(itensRenderizados == 1 && itensExistentes==0) {
        document.getElementById("no-contacts").classList.remove("hidden")
    }

    if(itensRenderizados == itensExistentes) {
        console.warn("atualizarTabela() chamado sem nada para atualizar")
        return
    }

    if(itensRenderizados < itensExistentes) {
        let tr = document.createElement("tr")
        let tr_td_nome = document.createElement("td")
        let tr_td_tel = document.createElement("td")
    
        tr_td_nome.innerText=nomes[nomes.length-1]
        tr_td_tel.innerText=telefones[telefones.length-1]
    
        tr.appendChild(tr_td_nome)
        tr.appendChild(tr_td_tel)
    
        document.querySelector("tbody").appendChild(tr)

        itensRenderizados++;
    }
}
