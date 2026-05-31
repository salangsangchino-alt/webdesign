
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
    });
