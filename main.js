const form = document.getElementById("form-adicionar-contato")
const inputNome = document.getElementById("nome-contato")
const inputTelefone = document.getElementById("telefone-contato")

const nomes = []
const telefones = []

let itensExistentes = 0
let itensRenderizados = 0
let id = -1

// Indicado para atualizarTabela() saber que linha deletar em caso de exclusão
let idQueSeraDeletado = -1

form.addEventListener("submit", function (e) {
    e.preventDefault()

    if (adicionarLinha()) {
        atualizarTabela()
    }

    clearInputsRedBorders()
})

function clearInputsRedBorders() {
    inputNome.classList.remove("duped")
    inputTelefone.classList.remove("duped")
}

inputNome.addEventListener("keyup", function () {
    const nome = inputNome.value.trim();

    if (nomes.includes(nome)) {
        inputNome.classList.add("duped")
    } else {
        inputNome.classList.remove("duped")
    }
})

inputTelefone.addEventListener("keyup", function () {
    const tel = inputTelefone.value.trim();
    if (telefones.includes(tel)) {
        inputTelefone.classList.add("duped")
    } else {
        inputTelefone.classList.remove("duped")
    }
})

let evtDeletarContato = function (e) {
    idQueSeraDeletado = e.target.parentElement.parentElement.dataset.id

    nomes[idQueSeraDeletado] = null
    telefones[idQueSeraDeletado] = null

    itensExistentes--

    atualizarTabela()
}

// *Impedir espaços extras* acidentais no começo, no fim e no meio de palavras
function meuTrim(string) {
    return string.replace(/\s+/g, " ").trim();
}

// true: nova linha adicionada com sucesso
// false: nenhuma linha adicionada pois a entrada estava duplicada
function adicionarLinha() {
    let successOrNot = false // Usado para re-renderizar a tabela apenas quando necessário

    const nome = meuTrim(inputNome.value);
    const tel = meuTrim(inputTelefone.value);

    if (nomes.includes(nome)) {
        alert(`ERRO: Já existe um contato com o nome "${nome}" na sua agenda!`);
    } else if (telefones.includes(tel)) {
        alert(`ERRO: Já existe um contato com o número "${tel}" na sua agenda!`);
    } else {
        nomes.push(nome)
        telefones.push(tel)

        id++
        itensExistentes++

        successOrNot = true
    }

    // Resettar formulario
    inputNome.value = ""
    inputTelefone.value = ""

    // Voltar ao primeiro campo
    inputNome.focus()

    return successOrNot
}

function atualizarTabela() {
    // Esconder ou mostrar a mensagem de "Ainda não há contatos aqui"
    if (itensRenderizados == 0 && itensExistentes == 1) {
        document.getElementById("no-contacts").classList.add("hidden")
    }
    if (itensRenderizados == 1 && itensExistentes == 0) {
        document.getElementById("no-contacts").classList.remove("hidden")
    }

    // Cancelar e avisar sobre re-renderização desnecessaria
    if (itensRenderizados == itensExistentes) {
        console.warn("atualizarTabela() chamado sem nada para atualizar")
        return
    }

    // Novo item adicionado
    if (itensRenderizados < itensExistentes) {
        let tr = document.createElement("tr")
        let tr_td_nome = document.createElement("td")
        let tr_td_tel = document.createElement("td")
        let tr_td_del = document.createElement("td")
        let tr_td_del_btn = document.createElement("button")

        tr_td_nome.innerText = nomes[id]
        tr_td_tel.innerText = telefones[id]

        tr_td_del_btn.innerText = "Excluir"
        tr_td_del_btn.addEventListener("click", evtDeletarContato)
        tr_td_del.appendChild(tr_td_del_btn)

        tr.appendChild(tr_td_nome)
        tr.appendChild(tr_td_tel)
        tr.appendChild(tr_td_del)

        tr.dataset.id = id

        document.querySelector("tbody").appendChild(tr)

        itensRenderizados++;
    }

    // Item excluido
    if (itensRenderizados > itensExistentes) {
        let rowToDelete = document.querySelector(`tr[data-id="${idQueSeraDeletado}"]`)

        rowToDelete.remove()

        itensRenderizados--;
    }

    document.getElementById("numero-contatos").innerText = itensExistentes
}
