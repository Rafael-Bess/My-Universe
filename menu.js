// Executa o código quando o conteúdo da página é carregado
document.addEventListener('DOMContentLoaded', function () {
    loadPosts(); // Carrega as postagens existentes ao carregar a página
});

// Função para criar uma nova postagem
function createPost() {
    const title = document.getElementById('post-title').value; // Obtém o título do post
    const fileInput = document.getElementById('post-file'); // Obtém o arquivo de imagem

    if (title.trim() === '') { // Verifica se o título está vazio
        alert('Por favor, insira um título para o post.');
        return;
    }

    if (fileInput.files.length === 0) { // Verifica se nenhuma imagem foi selecionada
        alert('Por favor, selecione uma imagem para o post.');
        return;
    }

    const file = fileInput.files[0]; // Obtém o primeiro arquivo selecionado
    const reader = new FileReader(); // Cria um novo FileReader
    reader.onload = function (e) {
        const fileUrl = e.target.result; // Obtém a URL do arquivo carregado
        savePost(title, fileUrl); // Salva o post com título e URL da imagem
        showPostLink(title, fileUrl); // Exibe o link para a postagem criada
    };
    reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
}

// Função para salvar a postagem no localStorage
function savePost(title, fileUrl) {
    const posts = JSON.parse(localStorage.getItem('posts')) || []; // Obtém as postagens existentes ou inicializa um array vazio
    const post = { id: Date.now(), title, fileUrl, comments: [] }; // Cria um objeto de postagem
    posts.push(post); // Adiciona a nova postagem ao array de postagens
    localStorage.setItem('posts', JSON.stringify(posts)); // Armazena o array atualizado no localStorage
    displayPost(post); // Exibe a postagem recém-criada na página
    clearForm(); // Limpa o formulário de criação de postagens
}

// Função para exibir o link para a postagem criada
function showPostLink(title, fileUrl) {
    const linkContainer = document.getElementById('post-link-container'); // Obtém o contêiner do link
    const link = document.createElement('a'); // Cria um novo elemento de link
    link.href = `postagem.html?title=${encodeURIComponent(title)}&fileUrl=${encodeURIComponent(fileUrl)}`; // Define o href do link
    link.target = '_blank'; // Abre o link em uma nova aba
    link.textContent = 'Ver Postagem'; // Define o texto do link
    linkContainer.innerHTML = ''; // Limpa o contêiner do link
    linkContainer.appendChild(link); // Adiciona o link ao contêiner
}

// Função para carregar as postagens do localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || []; // Obtém as postagens existentes ou inicializa um array vazio
    posts.forEach(post => displayPost(post)); // Exibe cada postagem na página
}

// Função para exibir uma postagem na página
function displayPost(post) {
    const container = document.getElementById('forum-container'); // Obtém o contêiner do fórum

    const postDiv = document.createElement('div'); // Cria um novo div para a postagem
    postDiv.className = 'post'; // Define a classe do div

    const postTitle = document.createElement('h3'); // Cria um novo elemento h3 para o título da postagem
    postTitle.textContent = post.title; // Define o texto do título

    const postFile = document.createElement('img'); // Cria um novo elemento img para a imagem da postagem
    postFile.src = post.fileUrl; // Define a URL da imagem
    postFile.style.maxWidth = '100%'; // Define a largura máxima da imagem

    const commentForm = document.createElement('div'); // Cria um novo div para o formulário de comentários
    commentForm.className = 'comment-form'; // Define a classe do div
    commentForm.innerHTML = `
        <input type="text" placeholder="Seu comentário" required>
        <button onclick="addComment(${post.id}, this.previousElementSibling.value)">Comentar</button>
    `; // Define o HTML do formulário de comentários

    postDiv.appendChild(postTitle); // Adiciona o título ao div da postagem
    postDiv.appendChild(postFile); // Adiciona a imagem ao div da postagem
    postDiv.appendChild(commentForm); // Adiciona o formulário de comentários ao div da postagem

    post.comments.forEach(comment => displayComment(postDiv, comment)); // Exibe cada comentário na postagem

    container.appendChild(postDiv); // Adiciona o div da postagem ao contêiner do fórum
}

// Função para adicionar um comentário a uma postagem
function addComment(postId, commentText) {
    const posts = JSON.parse(localStorage.getItem('posts')) || []; // Obtém as postagens existentes ou inicializa um array vazio
    const post = posts.find(p => p.id === postId); // Encontra a postagem pelo ID
    if (post) {
        const comment = { id: Date.now(), text: commentText }; // Cria um objeto de comentário
        post.comments.push(comment); // Adiciona o comentário à postagem
        localStorage.setItem('posts', JSON.stringify(posts)); // Armazena o array atualizado no localStorage
        const postDiv = Array.from(document.querySelectorAll('.post')).find(div => div.querySelector('h3').textContent === post.title); // Encontra o div da postagem
        displayComment(postDiv, comment); // Exibe o comentário na postagem
    }
}

// Função para exibir um comentário em uma postagem
function displayComment(postDiv, comment) {
    const commentDiv = document.createElement('div'); // Cria um novo div para o comentário
    commentDiv.className = 'comment'; // Define a classe do div
    commentDiv.innerHTML = `<p>${comment.text}</p>`; // Define o HTML do comentário
    postDiv.appendChild(commentDiv); // Adiciona o comentário ao div da postagem
}

// Função para limpar o formulário de criação de postagens
function clearForm() {
    document.getElementById('post-title').value = ''; // Limpa o campo do título
    document.getElementById('post-file').value = ''; // Limpa o campo do arquivo
}
