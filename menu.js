// menu.js

document.addEventListener('DOMContentLoaded', function () {
    loadPosts();
});

function createPost() {
    const title = document.getElementById('post-title').value;
    const fileInput = document.getElementById('post-file');

    if (title.trim() === '') {
        alert('Por favor, insira um título para o post.');
        return;
    }

    if (fileInput.files.length === 0) {
        alert('Por favor, selecione uma imagem para o post.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const fileUrl = e.target.result;
        savePost(title, fileUrl);
        showPostLink(title, fileUrl);
    };
    reader.readAsDataURL(file);
}

function savePost(title, fileUrl) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = { id: Date.now(), title, fileUrl, comments: [] };
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPost(post);
    clearForm();
}

function showPostLink(title, fileUrl) {
    const linkContainer = document.getElementById('post-link-container');
    const link = document.createElement('a');
    link.href = `postagem.html?title=${encodeURIComponent(title)}&fileUrl=${encodeURIComponent(fileUrl)}`;
    link.target = '_blank';
    link.textContent = 'Ver Postagem';
    linkContainer.innerHTML = '';
    linkContainer.appendChild(link);
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => displayPost(post));
}

function displayPost(post) {
    const container = document.getElementById('forum-container');

    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;

    const postFile = document.createElement('img');
    postFile.src = post.fileUrl;
    postFile.style.maxWidth = '100%';

    const commentForm = document.createElement('div');
    commentForm.className = 'comment-form';
    commentForm.innerHTML = `
        <input type="text" placeholder="Your comment" required>
        <button onclick="addComment(${post.id}, this.previousElementSibling.value)">Comment</button>
    `;

    postDiv.appendChild(postTitle);
    postDiv.appendChild(postFile);
    postDiv.appendChild(commentForm);

    post.comments.forEach(comment => displayComment(postDiv, comment));

    container.appendChild(postDiv);
}

function addComment(postId, commentText) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id === postId);
    if (post) {
        const comment = { id: Date.now(), text: commentText };
        post.comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        const postDiv = Array.from(document.querySelectorAll('.post')).find(div => div.querySelector('h3').textContent === post.title);
        displayComment(postDiv, comment);
    }
}

function displayComment(postDiv, comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `<p>${comment.text}</p>`;
    postDiv.appendChild(commentDiv);
}

function clearForm() {
    document.getElementById('post-title').value = '';
    document.getElementById('post-file').value = '';
}
