var editRowIndex = -1
var fornecedores = []

// Iniciando
init()

//Carregar Lista
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
            updatePerson(inputRazaoSocial, inputEndereco, inputCNPJ, inputInscricaoEstadual, inputEmail)
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
    var tdEdit = createTd('')
    var tdDelete = createTd('')

    var btnEdit = createBtn('Edit')
    btnEdit.onclick = editPerson
    var btnDelete = createBtn('Delete')
    btnDelete.onclick = deletePerson
    
    tdEdit.appendChild(btnEdit)
    tdDelete.appendChild(btnDelete)
    
    var tblFornecedor = document.getElementById('tblFornecedor')
    var tbody = tblFornecedor.tBodies[0]

    tr.appendChild(tdRazaoSocial)
    tr.appendChild(tdEndereco)
    tr.appendChild(tdCNPJ)
    tr.appendChild(tdInscricaoEstadual)
    tr.appendChild(tdEmail)
    tr.appendChild(tdEdit)
    tr.appendChild(tdDelete)

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

function editPerson() {
    var td = this.parentNode
    var tr = td.parentNode
    editRowIndex = tr.rowIndex
    
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

function deletePerson() {
    
    if(editRowIndex != -1) {
        alert('Você está no modo de edição!')
    } else {
        var td = this.parentNode
        var tr = td.parentNode
    
        var tblFornecedor = document.getElementById('tblFornecedor')
        var tbody = tblFornecedor.tBodies[0]
        tbody.removeChild(tr)
    }

    var inputRazaoSocial = document.getElementById('razao_social')
    inputRazaoSocial.focus()
}

function updatePerson(inputRazaoSocial, inputEndereco, inputCNPJ, inputIscricaoEstadual, inputEmail) {
    
    var tblFornecedor = document.getElementById('tblFornecedor')
    var tbody = tblFornecedor.tBodies[0]
    var tr = tbody.children[editRowIndex]

    tr.childNodes[0].innerHTML = inputRazaoSocial.value
    tr.childNodes[1].innerHTML = inputEndereco.value
    tr.childNodes[2].innerHTML = inputCNPJ.value
    tr.childNodes[3].innerHTML = inputIscricaoEstadual.value
    tr.childNodes[4].innerHTML = inputEmail.value
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
    
    // tBody.children.forEach(tBody.removeChild)

    for (var i = tBody.children.length; i > 0; i--) {
        var tr = tBody.children[i - 1];
        tBody.removeChild(tr);
    }
}