// ######################################################### FUNCTIONS #########################################################

document.addEventListener('DOMContentLoaded', function () {
    let botao = document.getElementById('submit');
    let linkCadastro = document.querySelector('.ab-3 a');

    botao.addEventListener('click', function logar() {
        let pegarlogin = document.getElementById('usuario').value;
        let pegarsenha = document.getElementById('senha').value;
        let loginBemSucedido = false;

        // Recuperar dados de cadastro do localStorage
        const usernameArmazenado = localStorage.getItem('username');
        const passwordArmazenado = localStorage.getItem('password');

        // Verificar se as credenciais fornecidas correspondem aos dados armazenados
        if (pegarlogin === usernameArmazenado && pegarsenha === passwordArmazenado) {
            alert('Login bem Sucedido');
            loginBemSucedido = true;
        }

        // Verifica se o login foi bem-sucedido
        if (loginBemSucedido) {
            location.href = 'menu.html';
        } else {
            alert('Usuário ou senha inválidos');
        }
    });
});

// ######################################################### MAIN CODE #########################################################
