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
                <a href="#" class="btn" id="loginBtn">
                    <div>
                        <svg class="icon">
                            <use href="../assets/icons/icons.svg#login-user"></use>
                        </svg>
                        <span>Mi cuenta</span>
                    </div>
                </a>
            </nav>
        </div>
        `;
    }
}