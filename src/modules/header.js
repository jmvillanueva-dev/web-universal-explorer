export default async function loadHeader() {
    const header = document.getElementById('main-header');
    if (header) {
        header.innerHTML = `
        <div class="container">
            <nav>
            <a href="#" class="logo">
                        <svg class="icon">
                            <use href="../assets/icons/icons.svg#rocket"></use>
                        </svg>
                        <span>Universe Explorer</span>
                    </a>
                    <div class="nav-links">
                        <div class="nav-links" >
                            <a href="#hero">
                                <div>
                                    <svg class="icon">
                                        <use href="../assets/icons/icons.svg#home"></use>
                                    </svg>
                                    <span>Inicio</span>
                                </div>
                            </a>
                            <a href="#news-section">
                                <div>
                                    <svg class="icon">
                                        <use href="../assets/icons/icons.svg#news"></use>
                                    </svg>
                                    <span>Noticias</span>
                                </div>
                            </a>
                            <a href="#contact">
                                <div>
                                    <svg class="icon">
                                        <use href="../assets/icons/icons.svg#contacts"></use>
                                    </svg>
                                    <span>Contacto</span>
                                </div>
                            </a>
                        </div>
                    </div>
            <a href="dashboard.html" class="btn">Mi Cuenta</a>
            </nav>
        </div>
        `;
    }
}