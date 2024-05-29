document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir o envio do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verificar se a senha e a confirmação da senha são iguais
    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    // Armazenar os dados no localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert('Cadastro realizado com sucesso!');
    // Limpar os campos do formulário
    document.getElementById('cadastroForm').reset();

    // Redirecionar para a tela de home
    window.location.href = 'home.html';
});
