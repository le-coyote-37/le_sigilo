document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');
    const path = window.location.pathname;
    
    // Detecta se está no GitHub Pages
    const isGitHub = path.includes('/le_sigilo');
    const baseUrl = isGitHub ? '/le_sigilo/' : '/';
    
    // Posts disponíveis
    const posts = [
        {
            id: 1,
            title: "O Voo da Entrega",
            excerpt: "Eles trocavam mensagens há meses. Mensagens longas, carregadas de desejo...",
            image: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            file: "o_voo_da_entrega.md"
        },
        {
            id: 2,
            title: "O presente de mulher",
            excerpt: "...",
            image: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            date: "15 de Outubro, 2023",
            category: "Proibidos",
            file: "o_presente_de_mulher.md" // Nome do arquivo MD
        }
    ];

    // Roteamento simples
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    
    if (postId) {
        loadPost(postId);
    } else {
        showHome();
    }

    // Página inicial
    function showHome() {
        let html = `
            <h2>Últimos Contos</h2>
            <div class="posts-list">
        `;
        
        posts.forEach(post => {
            html += `
                <div class="post-card">
                    <div class="post-image" style="background-image: url('${post.image}')"></div>
                    <div class="post-content">
                        <h3 class="post-title">${post.title}</h3>
                        <p>${post.excerpt}</p>
                        <a href="${baseUrl}?post=${post.id}" class="read-more">Ler mais</a>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        app.innerHTML = html;
    }

    // Carrega post completo
    async function loadPost(postId) {
        const post = posts.find(p => p.id === postId);
        
        if (!post) {
            app.innerHTML = `<p>Post não encontrado</p>`;
            return;
        }
        
        try {
            const response = await fetch(`${baseUrl}posts/${post.file}`);
            const markdown = await response.text();
            const content = marked.parse(markdown);
            
            app.innerHTML = `
                <div class="post-full">
                    <h2>${post.title}</h2>
                    <div class="post-content">${content}</div>
                    <a href="${baseUrl}" class="back-button">← Voltar</a>
                </div>
            `;
        } catch (error) {
            app.innerHTML = `
                <p>Erro ao carregar o post</p>
                <a href="${baseUrl}" class="back-button">Voltar</a>
            `;
        }
    }
});
