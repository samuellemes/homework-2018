var editRowIndex = -1
var materiais = []
var matFinded = []

// Iniciando
init()

////Pegar Lista do LocalStorage
getList()

function init() {
    var btnConsultar = document.getElementById('btn-consultar')
    btnConsultar.onclick = function() {
        getMaterial()
    }
}

function getMaterial() {
    var inputCodigo = document.getElementById('codigo')
    var inputNome = document.getElementById('nome')

    for (let i = 0; i < materiais.length; i++) {
        const material = materiais[i];
        if(material.Codigo == inputCodigo.value || material.Nome == inputNome.value) {
             matFinded.push(material)
        }
    }
    if(matFinded.length) {
        clearTable()
        matFinded.forEach(createMaterial)
        matFinded = []
    } else {
        alert('Nenhum item encontrado!')
    }
    inputCodigo.value = ""
    inputNome.value = ""
    inputCodigo.focus()
}

function createMaterial(material) {
    var tr = createLine()
    var tdCodigo = createTd(material.Codigo)
    var tdNome = createTd(material.Nome)
    var tdDescricao = createTd(material.Descricao)
    var tdQuantidade = createTd(material.Quantidade)
    var tdUnidade = createTd(material.Unidade)
    
    var tblMaterial = document.getElementById('tblMaterial')
    var tbody = tblMaterial.tBodies[0]

    tr.appendChild(tdCodigo)
    tr.appendChild(tdNome)
    tr.appendChild(tdDescricao)
    tr.appendChild(tdQuantidade)
    tr.appendChild(tdUnidade)

    tbody.appendChild(tr)
}

function createLine() {
    var tr = document.createElement('tr')
    return tr
}

function createTd(content) {
    var td = document.createElement('td')
    td.innerHTML = content
    return td
}

function getList() {
    var materiaisTxt = window.localStorage.getItem('list-materiais');
    if(materiaisTxt) {
        materiais = JSON.parse(materiaisTxt);
        materiais.forEach(createMaterial)
    }
}

function clearTable() {
    var table = document.getElementById('tblMaterial');
    var tBody = table.tBodies[0];

    for (var i = tBody.children.length; i > 0; i--) {
        var tr = tBody.children[i - 1];
        tBody.removeChild(tr);
    }
}