var editRowIndex = -1
var materiais = []
var matFinded = []

// Iniciando
init()

//Carregar Lista
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

    find()
    function find() {
        for (let i = 0; i < materiais.length; i++) {
            const material = materiais[i];
            if(material.Codigo == inputCodigo.value || material.Nome == inputNome.value) {
                matFinded.push(material)
            }
        }
        clearTable()
        matFinded.forEach(createMaterial)
        inputCodigo.value = ""
        inputNome.value = ""
        inputCodigo.focus()
        matFinded = []
    }
}


function addMaterial() {
    var inputCodigo = document.getElementById('codigo')
    var inputNome = document.getElementById('nome')
    var inputDescricao = document.getElementById('descricao')
    var inputQuantidade = document.getElementById('quantidade')
    var inputUnidade = document.getElementById('unidade')
    
    if(isValidInput(inputCodigo) && isValidInput(inputNome) && isValidInput(inputDescricao) && isValidInput(inputQuantidade) && isValidInput(inputUnidade)) {
        if(editRowIndex == -1) {
            save(inputCodigo, inputNome, inputDescricao, inputQuantidade, inputUnidade)
        } else {
            updateMaterial(inputCodigo, inputNome, inputDescricao, inputQuantidade, inputUnidade)
        }

        clearFields(inputCodigo, inputNome, inputDescricao, inputQuantidade, inputUnidade)
        editRowIndex = -1
    } else {
        alert('Preencha todos os campos.')
    }
}

function isValidInput(input) {
    return input.value.trim() != ""
}

function save(inputCodigo, inputNome, inputDescricao, inputQuantidade, inputUnidade) {
    var material = {
        Codigo: inputCodigo.value,
        Nome: inputNome.value,
        Descricao: inputDescricao.value,
        Quantidade: inputQuantidade.value,
        Unidade: inputUnidade.value
    }
    materiais.push(material)
    clearTable()
    materiais.forEach(createMaterial)
    saveLocalStorage()
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

function createBtn(value) {
    var btn = document.createElement('input')
    btn.type = 'button'
    btn.value = value

    if(value === "Edit") { btn.className = 'btn btn-primary' }
    if(value === "Delete") { btn.className = "btn btn-danger" }

    return btn
}

function clearFields(inputCodigo, inputNome, inputDescricao, inputQuantidade, inputUnidade) {
    inputCodigo.value = ''
    inputNome.value = ''
    inputDescricao.value = ''
    inputQuantidade.value = ''
    inputUnidade.value = ''
    
    inputCodigo.focus()
}

function editMaterial(material, td) {
    var tr = td.parentNode
    editRowIndex = materiais.indexOf(material)
    
    var tableDatas = tr.childNodes
    var inputCodigo = document.getElementById('codigo')
    var inputNome = document.getElementById('nome')
    var inputDescricao = document.getElementById('descricao')
    var inputQuantidade = document.getElementById('quantidade')
    var inputUnidade = document.getElementById('unidade')

    inputCodigo.value = tableDatas[0].innerHTML
    inputNome.value = tableDatas[1].innerHTML
    inputDescricao.value = tableDatas[2].innerHTML
    inputQuantidade.value = tableDatas[3].innerHTML
    inputUnidade.value = tableDatas[4].innerHTML

    inputCodigo.focus()
}

function deleteMaterial(material, td) {
    
    if(editRowIndex != -1) {
        alert('Você está no modo de edição!')
    } else {
        var tr = td.parentNode
    
        var tblMaterial = document.getElementById('tblMaterial')
        var tbody = tblMaterial.tBodies[0]
        tbody.removeChild(tr)
        
        var pos = materiais.indexOf(material)
        materiais.splice(pos, 1)
        saveLocalStorage()
    }

    var inputCodigo = document.getElementById('codigo')
    inputCodigo.focus()
}

function updateMaterial(inputCodigo, inputNome, inputDescricao, inputQuantidade, inputUnidade) {
    
    // var tblFornecedor = document.getElementById('tblFornecedor')
    // var tbody = tblFornecedor.tBodies[0]
    // var tr = tbody.children[editRowIndex]
    var material = materiais[editRowIndex]

    material.Codigo = inputCodigo.value
    material.Nome = inputNome.value
    material.Descricao = inputDescricao.value
    material.Quantidade = inputQuantidade.value
    material.Unidade = inputUnidade.value

    // tr.childNodes[0].innerHTML = inputRazaoSocial.value
    // tr.childNodes[1].innerHTML = inputEndereco.value
    // tr.childNodes[2].innerHTML = inputCNPJ.value
    // tr.childNodes[3].innerHTML = inputIscricaoEstadual.value
    // tr.childNodes[4].innerHTML = inputEmail.value

    clearTable()
    materiais.forEach(createMaterial)
    saveLocalStorage()
}

function cancelEdit() {
    editRowIndex = -1
    
    var inputCodigo = document.getElementById('codigo')
    var inputNome = document.getElementById('nome')
    var inputDescricao = document.getElementById('descricao')
    var inputQuantidade = document.getElementById('quantidade')
    var inputUnidade = document.getElementById('unidade')
    
    clearFields(inputCodigo, inputNome, inputDescricao, inputQuantidade, inputUnidade)
}

function saveLocalStorage() {
    var materiaisTxt = JSON.stringify(materiais);
    localStorage.setItem("list-materiais", materiaisTxt);
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