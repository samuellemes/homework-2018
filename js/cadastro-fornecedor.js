var editRowIndex = -1

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
            createPerson(inputRazaoSocial, inputEndereco, inputCNPJ, inputInscricaoEstadual, inputEmail)
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

function createPerson(inputRazaoSocial, inputEndereco, inputCNPJ, inputInscricaoEstadual, inputEmail) {
    var tr = createLine()
    var tdRazaoSocial = createTd(inputRazaoSocial.value)
    var tdEndereco = createTd(inputEndereco.value)
    var tdCNPJ = createTd(inputCNPJ.value)
    var tdInscricaoEstadual = createTd(inputInscricaoEstadual.value)
    var tdEmail = createTd(inputEmail.value)
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
// Iniciando
init()