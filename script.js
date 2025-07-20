document.addEventListener('DOMContentLoaded', async function() {
    const app = document.getElementById('app');
    const baseUrl = window.location.pathname.includes('/le_sigilo') 
        ? '/le_sigilo/' 
        : '/';

    // Carrega lista de posts
    async function loadPosts() {
        try {
            const response = await fetch(`${baseUrl}posts/posts.json`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar posts:', error);
            return [];
        }
    }

    // Mostra página inicial
    async function showHome() {
        const posts = await loadPosts();
        
        let html = `
            <h2>Acervo Completo</h2>
            <div class="posts-list">
        `;
        
        posts.forEach(post => {
            html += `
                <div class="post-card">
                    <div class="post-image" style="background-image: url('${post.image}')"></div>
                    <div class="post-content">
                        <h3 class="post-title">${post.title}</h3>
                        <p>${post.excerpt}</p>
                        <a href="?post=${post.id}" class="read-more">Ler conto completo</a>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        app.innerHTML = html;
    }

    // Carrega post individual
    async function loadPost(postId) {
        const posts = await loadPosts();
        const post = posts.find(p => p.id === postId);
        
        if (!post) return showHome();
        
        try {
            const response = await fetch(`${baseUrl}posts/${post.file}`);
            const markdown = await response.text();
            const content = marked.parse(markdown);
            
            app.innerHTML = `
                <div class="post-full">
                    <h2>${post.title}</h2>
                    <div class="post-content">${content}</div>
                    <a href="./" class="back-button">← Voltar ao acervo</a>
                </div>
            `;
        } catch (error) {
            app.innerHTML = `
                <p>Erro ao carregar o conto</p>
                <a href="./" class="back-button">Voltar</a>
            `;
        }
    }

    // Roteamento
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    
    postId ? await loadPost(postId) : await showHome();
});
