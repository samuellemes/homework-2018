var editRowIndex = -1
var fornecedores = []

// Iniciando
init()

//Pegar Lista do LocalStorage
getList()

function init() {
    var btSave = document.getElementById('btn-save')
    btSave.onclick = function() {
        addFornecedor()
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

function addFornecedor() {
    var inputRazaoSocial = document.getElementById('razao_social')
    var inputEndereco = document.getElementById('endereco')
    var inputCNPJ = document.getElementById('cnpj')
    var inputInscricaoEstadual = document.getElementById('inscricao')
    var inputEmail = document.getElementById('email')
    
    if(isValidInput(inputRazaoSocial) && isValidInput(inputEndereco) && isValidInput(inputCNPJ) && isValidInput(inputInscricaoEstadual) && isValidInput(inputEmail)) {
        if(editRowIndex == -1) {
            save(inputRazaoSocial, inputEndereco, inputCNPJ, inputInscricaoEstadual, inputEmail)
        } else {
            updateFornecedor(inputRazaoSocial, inputEndereco, inputCNPJ, inputInscricaoEstadual, inputEmail)
        }

        clearFields(inputRazaoSocial, inputEndereco, inputCNPJ, inputInscricaoEstadual, inputEmail)
        editRowIndex = -1
    } else {
        alert('Preencha todos os campos.')
    }
}

function isValidInput(input) {
    return input.value.trim() != ""
}

function save(inputRazaoSocial, inputEndereco, inputCNPJ, inputInscricaoEstadual, inputEmail) {
    var fornecedor = {
        Razao: inputRazaoSocial.value,
        Endereco: inputEndereco.value,
        CNPJ: inputCNPJ.value,
        Inscricao: inputInscricaoEstadual.value,
        Email: inputEmail.value
    }
    fornecedores.push(fornecedor)
    clearTable()
    fornecedores.forEach(createFornecedor)
    saveLocalStorage()
}

function createFornecedor(fornecedor) {
    var tr = createLine()
    var tdRazaoSocial = createTd(fornecedor.Razao)
    var tdEndereco = createTd(fornecedor.Endereco)
    var tdCNPJ = createTd(fornecedor.CNPJ)
    var tdInscricaoEstadual = createTd(fornecedor.Inscricao)
    var tdEmail = createTd(fornecedor.Email)
    var tdAcao = createTd('')

    var btnEdit = createBtn('Edit')
    btnEdit.onclick = function() {
        editFornecedor(fornecedor, tdAcao)
    }
    var btnDelete = createBtn('Delete')
    btnDelete.onclick = function() {
        deleteFornecedor(fornecedor, tdAcao)
    }
    
    tdAcao.appendChild(btnEdit)
    tdAcao.appendChild(btnDelete)
    
    var tblFornecedor = document.getElementById('tblFornecedor')
    var tbody = tblFornecedor.tBodies[0]

    tr.appendChild(tdRazaoSocial)
    tr.appendChild(tdEndereco)
    tr.appendChild(tdCNPJ)
    tr.appendChild(tdInscricaoEstadual)
    tr.appendChild(tdEmail)
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

function clearFields(inputRazaoSocial, inputEndereco, inpinputCNPJ, inputInscricaoEstadual, inputEmail) {
    inputRazaoSocial.value = ''
    inputEndereco.value = ''
    inpinputCNPJ.value = ''
    inputInscricaoEstadual.value = ''
    inputEmail.value = ''
    
    inputRazaoSocial.focus()
}

function editFornecedor(fornecedor, td) {
    var tr = td.parentNode
    editRowIndex = fornecedores.indexOf(fornecedor)
    
    var tableDatas = tr.childNodes
    var inputRazaoSocial = document.getElementById('razao_social')
    var inputEndereco = document.getElementById('endereco')
    var inputCNPJ = document.getElementById('cnpj')
    var inputInscricaoEstadual = document.getElementById('inscricao')
    var inputEmail = document.getElementById('email')

    inputRazaoSocial.value = tableDatas[0].innerHTML
    inputEndereco.value = tableDatas[1].innerHTML
    inputCNPJ.value = tableDatas[2].innerHTML
    inputInscricaoEstadual.value = tableDatas[3].innerHTML
    inputEmail.value = tableDatas[4].innerHTML

    inputRazaoSocial.focus()
}

function deleteFornecedor(fornecedor, td) {
    
    if(editRowIndex != -1) {
        alert('Você está no modo de edição!')
    } else {
        var tr = td.parentNode
    
        var tblFornecedor = document.getElementById('tblFornecedor')
        var tbody = tblFornecedor.tBodies[0]
        tbody.removeChild(tr)
        
        var pos = fornecedores.indexOf(fornecedor)
        fornecedores.splice(pos, 1)
        saveLocalStorage()
    }

    var inputRazaoSocial = document.getElementById('razao_social')
    inputRazaoSocial.focus()
}

function updateFornecedor(inputRazaoSocial, inputEndereco, inputCNPJ, inputIscricaoEstadual, inputEmail) {
    
    var fornecedor = fornecedores[editRowIndex]

    fornecedor.Razao = inputRazaoSocial.value
    fornecedor.Endereco = inputEndereco.value
    fornecedor.CNPJ = inputCNPJ.value
    fornecedor.Inscricao = inputIscricaoEstadual.value
    fornecedor.Email = inputEmail.value

    clearTable()
    fornecedores.forEach(createFornecedor)
    saveLocalStorage()
}

function cancelEdit() {
    editRowIndex = -1
    
    var inputRazaoSocial = document.getElementById('razao_social')
    var inputEndereco = document.getElementById('endereco')
    var inputCNPJ = document.getElementById('cnpj')
    var inputInscricaoEstadual = document.getElementById('inscricao')
    var inputEmail = document.getElementById('email')
    
    clearFields(inputRazaoSocial, inputEndereco, inputCNPJ, inputInscricaoEstadual, inputEmail)
}

function saveLocalStorage() {
    var fornecedoresTxt = JSON.stringify(fornecedores);
    localStorage.setItem("list-fornecedores", fornecedoresTxt);
}

function getList() {
    var fornecedoresTxt = window.localStorage.getItem('list-fornecedores');
    if(fornecedoresTxt) {
        fornecedores = JSON.parse(fornecedoresTxt);
        fornecedores.forEach(createFornecedor)
    }
}

function clearTable() {
    var table = document.getElementById('tblFornecedor');
    var tBody = table.tBodies[0];

    for (var i = tBody.children.length; i > 0; i--) {
        var tr = tBody.children[i - 1];
        tBody.removeChild(tr);
    }
}