// ######################################################### FUNCTIONS #########################################################
const usuarios = [
    {
        login: 'Rafael',
        senha: '12345'
    },
    {
        login: 'Julio',
        senha: '1234'
    },
    {
        login: 'admin',
        senha: 'admin'
    }
]

document.addEventListener('DOMContentLoaded', function () {
    let botao = document.getElementById('submit')
    let linkCadastro = document.querySelector('.ab-3 a');


    botao.addEventListener('click', function logar() {
        let pegarlogin = document.getElementById('usuario').value
        let pegarsenha = document.getElementById('senha').value
        let loginbemsucedido = false;

        for (let i in usuarios) {
            if (pegarlogin == usuarios[i].login && pegarsenha == usuarios[i].senha) {
                alert('Login bem Sucedido');
                loginBemSucedido = true;
                break;
            }
        }

        // Verifica se o login foi bem-sucedido após o loop
        if (loginBemSucedido) {
            location.href = 'Armazenar_fotos.html';
        } else {
            alert('Usuário ou senha inválidos');
        }
    });
});
// ######################################################### MAIN CODE #########################################################
