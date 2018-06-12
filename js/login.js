function start() {
    var user = document.getElementById('user')
    var form = document.getElementById('formulario');
    form.addEventListener('submit', function(e) {
        // alerta o valor do campo
        alert(user.value);
    
        // impede o envio do form
        // e.preventDefault();
    });
}