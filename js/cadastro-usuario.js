var editRowIndex = -1
var usuarios = []

// Iniciando
init()

//Carregar Lista
getList()

function init() {
    var btSave = document.getElementById('btn-save')
    btSave.onclick = function() {
        addUsuario()
    }

    var btCancel = document.getElementById('btn-cancel')
    btCancel.onclick = function() {
        if(editRowIndex != -1) {
            if(window.confirm("Você realmente deseja cancelar edição?")) {
                cancelEdit()
            }
        }
    }
}

function addUsuario() {
    var inputNome = document.getElementById('nome')
    var inputEmail = document.getElementById('email')
    var inputSenha = document.getElementById('senha')
    
    if(isValidInput(inputNome) && isValidInput(inputEmail) && isValidInput(inputSenha)) {
        if(editRowIndex == -1) {
            save(inputNome, inputEmail, inputSenha)
        } else {
            updateMaterial(inputNome, inputEmail, inputSenha)
        }

        clearFields(inputNome, inputEmail, inputSenha)
        editRowIndex = -1
    } else {
        alert('Preencha todos os campos.')
    }
}

function isValidInput(input) {
    return input.value.trim() != ""
}

function save(inputNome, inputEmail, inputSenha) {
    var usuario = {
        Nome: inputNome.value,
        Email: inputEmail.value,
        senha: inputSenha.value,
    }
    usuarios.push(usuario)
    clearTable()
    usuarios.forEach(createUsuario)
    saveLocalStorage()
}

function createUsuario(usuario) {
    var tr = createLine()
    var tdNome = createTd(usuario.Nome)
    var tdEmail = createTd(usuario.Email)
    var tdSenha = createTd(usuario.senha)
    var tdAcao = createTd('')

    var btnEdit = createBtn('Edit')
    btnEdit.onclick = function() {
        editUsuario(usuario, tdAcao)
    }
    var btnDelete = createBtn('Delete')
    btnDelete.onclick = function() {
        deleteUsuario(usuario, tdAcao)
    }
    
    tdAcao.appendChild(btnEdit)
    tdAcao.appendChild(btnDelete)
    
    var tblUsuario = document.getElementById('tblUsuario')
    var tbody = tblUsuario.tBodies[0]

    tr.appendChild(tdNome)
    tr.appendChild(tdEmail)
    tr.appendChild(tdSenha)
    tr.appendChild(tdAcao)

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

function clearFields(inputNome, inputEmail, inputSenha) {
    inputNome.value = ''
    inputEmail.value = ''
    inputSenha.value = ''
    
    inputNome.focus()
}

function editUsuario(material, td) {
    var tr = td.parentNode
    editRowIndex = usuarios.indexOf(material)
    
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
        
        var pos = usuarios.indexOf(material)
        usuarios.splice(pos, 1)
        saveLocalStorage()
    }

    var inputCodigo = document.getElementById('codigo')
    inputCodigo.focus()
}

function updateMaterial(inputCodigo, inputNome, inputDescricao, inputQuantidade, inputUnidade) {
    
    // var tblFornecedor = document.getElementById('tblFornecedor')
    // var tbody = tblFornecedor.tBodies[0]
    // var tr = tbody.children[editRowIndex]
    var material = usuarios[editRowIndex]

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
    usuarios.forEach(createUsuario)
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
    var materiaisTxt = JSON.stringify(usuarios);
    localStorage.setItem("list-materiais", materiaisTxt);
}

function getList() {
    var materiaisTxt = window.localStorage.getItem('list-materiais');
    if(materiaisTxt) {
        usuarios = JSON.parse(materiaisTxt);
        usuarios.forEach(createUsuario)
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