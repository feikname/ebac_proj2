const form = document.getElementById("form-atividade")
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando">'
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado">'

const atividades = []
const notas = []

const notaMinima = Number(prompt("Digite a nota mínima"))

console.log(notaMinima)

let linhas = ""

form.addEventListener("submit", function (e) {
    e.preventDefault()

    adicionarLinha()
    atualizarTabela()
    atualizaMediaFinal()
})

// TODO: str.trim()
function adicionarLinha() {
    const inputNomeAtividade = document.getElementById("nome-atividade")
    const inputNotaAtividade = document.getElementById("nota-atividade")

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`ERRO: A atividade ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value)
        notas.push(Number(inputNotaAtividade.value))

        const resultadoAprovacao = Number(inputNotaAtividade.value) >= notaMinima ? imgAprovado : imgReprovado

        // OBS: talvez document.createElement("tr") e appendChild fossem mais
        // apropriados aqui
        let linha = "<tr>"
        linha += `<td>${inputNomeAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value}</td>`
        linha += `<td>${resultadoAprovacao}</td>`
        linha += "</tr>"

        linhas += linha
    }
    inputNomeAtividade.value = ""
    inputNotaAtividade.value = ""
}

function atualizarTabela() {
    const corpoTabela = document.querySelector("tbody")
    corpoTabela.innerHTML = linhas
}

function calcularMediaFinal() {
    let soma = 0
    for (let i = 0; i < notas.length; i++) {
        soma += notas[i]
    }

    return soma / notas.length
}

function atualizaMediaFinal() {
    const mediaFinal = calcularMediaFinal()

    document.getElementById("media-final-valor").innerHTML = mediaFinal.toFixed(2)

    const resultadoMediaFinal = document.getElementById("media-final-resultado")

    if (mediaFinal >= notaMinima) {
        resultadoMediaFinal.innerHTML = "Aprovado"
        resultadoMediaFinal.classList.remove("reprovado")
        resultadoMediaFinal.classList.add("aprovado")
    } else {
        resultadoMediaFinal.innerHTML = "Reprovado"
        resultadoMediaFinal.classList.remove("aprovado")
        resultadoMediaFinal.classList.add("reprovado")
    }
}

