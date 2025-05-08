document.addEventListener('DOMContentLoaded', function() {
    // Variables para el control de noticias
    let currentPage = 1;
    const newsGrid = document.getElementById('newsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Función para formatear la fecha
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    // Función para obtener imagen de placeholder si no hay imagen
    function getImageUrl(imageUrl) {
        return imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80';
    }

    // Función para cargar noticias
    async function loadNews(page = 1) {
        try {
            
            // Hacer la petición a la API
            const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=6&offset=${(page - 1) * 6}`);
            const data = await response.json();
            
            // Limpiar el grid si es la primera página
            if (page === 1) {
                newsGrid.innerHTML = '';
            }
            
            // Crear cards para cada noticia
            data.results.forEach(article => {
                const card = document.createElement('div');
                card.className = 'news-card';
                card.innerHTML = `
                    <img src="${getImageUrl(article.image_url)}" alt="${article.title}" class="card-image">
                    <div class="card-content">
                        <h3>${article.title}</h3>
                        <p>${article.summary || 'No hay descripción disponible.'}</p>
                        <div class="card-meta">
                            <span class="news-source">${article.news_site}</span>
                            <span class="news-date">${formatDate(article.published_at)}</span>
                        </div>
                        <a href="${article.url}" target="_blank" class="btn btn-outline" style="margin-top: 15px; display: inline-block;">Leer más</a>
                    </div>
                `;
                newsGrid.appendChild(card);
            });
            
            // Actualizar la página actual
            currentPage = page;
            
            // Ocultar botón si no hay más resultados
            if (!data.next) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        } catch (error) {
            console.error('Error al cargar noticias:', error);
            newsGrid.innerHTML = '<p>Error al cargar las noticias. Por favor, intenta nuevamente más tarde.</p>';
        }
    }

    // Cargar noticias iniciales
    loadNews();

    // Cargar más noticias al hacer clic en el botón
    loadMoreBtn.addEventListener('click', () => {
        loadNews(currentPage + 1);
    });

});