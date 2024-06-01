document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir o envio do formulário

    const username = document.getElementById('username').value; // Obter o valor do campo de nome de usuário
    const password = document.getElementById('password').value; // Obter o valor do campo de senha
    const confirmPassword = document.getElementById('confirmPassword').value; // Obter o valor do campo de confirmação de senha

    // Verificar se a senha e a confirmação da senha são iguais
    if (password !== confirmPassword) {
        alert('As senhas não coincidem.'); // Mostrar um alerta se as senhas não coincidirem
        return; // Parar a execução da função
    }

    // Armazenar os dados no localStorage
    localStorage.setItem('username', username); // Armazenar o nome de usuário
    localStorage.setItem('password', password); // Armazenar a senha

    alert('Cadastro realizado com sucesso!'); // Mostrar um alerta de sucesso
    // Limpar os campos do formulário
    document.getElementById('cadastroForm').reset(); // Resetar o formulário

    // Redirecionar para a tela de home
    window.location.href = 'home.html'; // Redirecionar para a página home.html
});
