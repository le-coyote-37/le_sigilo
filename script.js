document.addEventListener('DOMContentLoaded', function() {
    // Array de posts (no futuro pode ser carregado de um JSON ou API)
    const posts = [
        {
            id: 1,
            title: "O Voo da Entrega",
            excerpt: "Eles trocavam mensagens há meses. Mensagens longas, carregadas de desejo, fantasias e frustração. Nunca se tocaram. Nunca se viram de verdade...",
            image: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            date: "15 de Outubro, 2023",
            category: "Proibidos",
            content: "o_voo_da_entrega.md" // Nome do arquivo MD
        }
        // Adicione mais posts conforme necessário
    ];

    const postsList = document.getElementById('postsList');
    
    // Carrega os posts na página
    function loadPosts() {
        postsList.innerHTML = '';
        
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            
            postCard.innerHTML = `
                <div class="post-image" style="background-image: url('${post.image}')"></div>
                <div class="post-content">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span>${post.category}</span>
                        <span>${post.date}</span>
                    </div>
                    <a href="#" class="read-more" data-id="${post.id}">Ler mais</a>
                </div>
            `;
            
            postsList.appendChild(postCard);
        });
        
        // Adiciona event listeners para os botões "Ler mais"
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = this.getAttribute('data-id');
                loadPostContent(postId);
            });
        });
    }
    
    // Carrega o conteúdo completo de um post
    function loadPostContent(postId) {
        const post = posts.find(p => p.id == postId);
        if (!post) return;
        
        // Aqui você pode carregar o conteúdo do arquivo MD
        // Por enquanto, vamos apenas exibir o título como exemplo
        postsList.innerHTML = `
            <div class="post-full">
                <h1>${post.title}</h1>
                <p>Conteúdo do post seria carregado aqui a partir do arquivo MD.</p>
                <p>No implementação real, você precisaria de um parser Markdown para JavaScript.</p>
                <a href="#" class="read-more" id="back-to-list">← Voltar para a lista</a>
            </div>
        `;
        
        document.getElementById('back-to-list').addEventListener('click', function(e) {
            e.preventDefault();
            loadPosts();
        });
    }
    
    // Inicializa a página carregando os posts
    loadPosts();
    
    // Função de busca simples
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.trim() === '') {
            loadPosts();
            return;
        }
        
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm)
        );
        
        // Exibe os posts filtrados
        postsList.innerHTML = '';
        
        if (filteredPosts.length === 0) {
            postsList.innerHTML = '<p class="no-results">Nenhum conto encontrado com esses termos.</p>';
            return;
        }
        
        filteredPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            
            postCard.innerHTML = `
                <div class="post-image" style="background-image: url('${post.image}')"></div>
                <div class="post-content">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span>${post.category}</span>
                        <span>${post.date}</span>
                    </div>
                    <a href="#" class="read-more" data-id="${post.id}">Ler mais</a>
                </div>
            `;
            
            postsList.appendChild(postCard);
        });
        
        // Adiciona novamente os event listeners
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const postId = this.getAttribute('data-id');
                loadPostContent(postId);
            });
        });
    });
});