// ######################################################### FUNCTIONS #########################################################

document.addEventListener('DOMContentLoaded', function () {
    let botao = document.getElementById('submit'); // Obtém o botão de login pelo seu ID
    let linkCadastro = document.querySelector('.ab-3 a'); // Obtém o link de cadastro usando a classe e a tag

    botao.addEventListener('click', function logar() {
        let pegarlogin = document.getElementById('usuario').value; // Obtém o valor do campo de login
        let pegarsenha = document.getElementById('senha').value; // Obtém o valor do campo de senha
        let loginBemSucedido = false; // Inicializa a variável de controle do login como falso

        // Recuperar dados de cadastro do localStorage
        const usernameArmazenado = localStorage.getItem('username'); // Obtém o nome de usuário armazenado no localStorage
        const passwordArmazenado = localStorage.getItem('password'); // Obtém a senha armazenada no localStorage

        // Verificar se as credenciais fornecidas correspondem aos dados armazenados
        if (pegarlogin === usernameArmazenado && pegarsenha === passwordArmazenado) {
            alert('Login bem Sucedido'); // Exibe um alerta de sucesso
            loginBemSucedido = true; // Define a variável de controle do login como verdadeiro
        }

        // Verifica se o login foi bem-sucedido
        if (loginBemSucedido) {
            location.href = 'menu.html'; // Redireciona para a página menu.html
        } else {
            alert('Usuário ou senha inválidos'); // Exibe um alerta de erro
        }
    });
});

// ######################################################### MAIN CODE #########################################################
