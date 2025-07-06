document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scroll para links âncora ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Fecha o navbar em mobile se estiver aberto
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    bsCollapse.hide();
                }

                // Calcula a posição de rolagem com offset do navbar fixo
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                // Adiciona um pequeno offset extra para garantir que o topo da seção não fique exatamente sob o navbar
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 30; 

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Efeito Parallax na imagem de fundo da Hero ---
    const heroBgImage = document.querySelector('.hero-bg-image');
    if (heroBgImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            // Ajuste o fator (0.15) para controlar a velocidade do parallax, mantendo-o sutil
            heroBgImage.style.transform = 'translateY(' + scrollPosition * 0.15 + 'px)'; 
        });
    }

    // --- Ticker Text Loop (garante que o texto se repita) ---
    const tickerTextSpan = document.querySelector('.ticker-text');
    if (tickerTextSpan) {
        // Duplica o conteúdo para garantir um loop contínuo e sem 'gap'
        tickerTextSpan.innerHTML += ' &bull; &bull; &bull; ' + tickerTextSpan.innerHTML; 
    }

    // --- Inicializa o Carousel de Depoimentos (Bootstrap) ---
    const depoimentosCarousel = document.getElementById('depoimentosCarousel');
    if (depoimentosCarousel) {
        new bootstrap.Carousel(depoimentosCarousel, {
            interval: 5000, // Tempo em milissegundos para a troca automática
            pause: 'hover' // Pausa o carousel no hover
        });
    }
});