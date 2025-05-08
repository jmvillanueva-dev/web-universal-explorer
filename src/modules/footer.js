export default async function loadFooter() {
    const footer = document.getElementById('main-footer');
    if (footer) {
        footer.innerHTML = `
        <div class="container">
                <div class="footer-content">
                    <div class="footer-column">
                        <h3>Universe Explorer</h3>
                        <p>Explorando el universo desde la Tierra. Accede a datos, imágenes y noticias directamente de la NASA y entérate de las últimas noticias.</p>
                        <div class="social-links">
                            <a href="#">
                                <svg class="icon">
                                    <use href="../assets/icons/icons.svg#facebook"></use>
                                </svg>
                            </a>
                            <a href="#">
                                <svg class="icon">
                                    <use href="../assets/icons/icons.svg#twitter"></use>
                                </svg>
                            </a>
                            <a href="#">
                                <svg class="icon">
                                    <use href="../assets/icons/icons.svg#instagram"></use>
                                </svg>
                            </a>
                            <a href="#">
                                <svg class="icon">
                                    <use href="../assets/icons/icons.svg#youtube"></use>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="footer-column">
                        <h3>Enlaces Rápidos</h3>
                        <ul>
                            <li><a href="#hero">Inicio</a></li>
                            <li><a href="#news-section">Noticias</a></li>
                            <li><a href="#contact">Contacto</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Recursos</h3>
                        <ul>
                            <li><a href="https://api.nasa.gov/" target="_blank">API de la NASA</a></li>
                            <li><a href="https://www.spaceflightnewsapi.net/" target="_blank">API Spaceflight News</a></li>
                            <li><a href="https://www.notion.so/UNIVERSE-EXPLORE-1ecc8f511c1180a0a713c16bb47cc9c0?pvs=4">Documentación</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Contacto</h3>
                        <ul>
                            <li>
                                <a href="mailto:info@univesrexplorer.com">
                                    <div>
                                        <svg class="icon">
                                            <use href="../assets/icons/icons.svg#email"></use>
                                        </svg>
                                        info@univesrexplorer.com
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+593995910824">
                                    <div>
                                        <svg class="icon">
                                            <use href="../assets/icons/icons.svg#phone"></use>
                                        </svg>
                                        +593 99 591 0824
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="https://maps.app.goo.gl/WZiXRcc1tmfuiQEu6" target="_blank">
                                    <div>
                                        <svg class="icon">
                                            <use href="../assets/icons/icons.svg#location"></use>
                                        </svg>
                                        EPN - Quito, Ecuador
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; <span id="year"></span> Universe Explorer. Todos los derechos reservados.</p>
                </div>
            </div>
        `;
    }
}