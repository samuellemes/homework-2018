var editRowIndex = -1
var usuarios = []

// Iniciando
init()

////Pegar Lista do LocalStorage
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
            updateUsuario(inputNome, inputEmail, inputSenha)
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

function editUsuario(usuario, td) {
    var tr = td.parentNode
    editRowIndex = usuarios.indexOf(usuario)
    
    var tableDatas = tr.childNodes
    var inputNome = document.getElementById('nome')
    var inputEmail = document.getElementById('email')
    var inputSenha = document.getElementById('senha')

    inputNome.value = tableDatas[0].innerHTML
    inputEmail.value = tableDatas[1].innerHTML
    inputSenha.value = tableDatas[2].innerHTML

    inputNome.focus()
}

function deleteUsuario(usuario, td) {
    
    if(editRowIndex != -1) {
        alert('Você está no modo de edição!')
    } else {
        var tr = td.parentNode
    
        var tblUsuario = document.getElementById('tblUsuario')
        var tbody = tblUsuario.tBodies[0]
        tbody.removeChild(tr)
        
        var pos = usuarios.indexOf(usuario)
        usuarios.splice(pos, 1)
        saveLocalStorage()
    }

    var inputNome = document.getElementById('nome')
    inputNome.focus()
}

function updateUsuario(inputNome, inputEmail, inputSenha) {
    
    var usuario = usuarios[editRowIndex]

    usuario.Nome = inputNome.value
    usuario.Email = inputEmail.value
    usuario.senha = inputSenha.value

    clearTable()
    usuarios.forEach(createUsuario)
    saveLocalStorage()
}

function cancelEdit() {
    editRowIndex = -1
    
    var inputNome = document.getElementById('nome')
    var inputEmail = document.getElementById('email')
    var inputSenha = document.getElementById('senha')
    
    clearFields(inputNome, inputEmail, inputSenha)
}

function saveLocalStorage() {
    var usuariosTxt = JSON.stringify(usuarios);
    localStorage.setItem("list-usuarios", usuariosTxt);
}

function getList() {
    var usuariosTxt = window.localStorage.getItem('list-usuarios');
    if(usuariosTxt) {
        usuarios = JSON.parse(usuariosTxt);
        usuarios.forEach(createUsuario)
    }
}

function clearTable() {
    var tblUsuario = document.getElementById('tblUsuario');
    var tBody = tblUsuario.tBodies[0];

    for (var i = tBody.children.length; i > 0; i--) {
        var tr = tBody.children[i - 1];
        tBody.removeChild(tr);
    }
}