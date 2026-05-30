    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.style.opacity = match ? '1' : '0.15';
          item.style.pointerEvents = match ? 'auto' : 'none';
        });
      });
    });

    /* ── LIGHTBOX ── */
    const lightbox = document.getElementById('lightbox');
    const backdrop = document.getElementById('lightbox-backdrop');
    const lbImg    = document.getElementById('lightbox-img');
    const lbCat    = document.getElementById('lightbox-category');
    const lbTitle  = document.getElementById('lightbox-title');
    const lbClose  = document.getElementById('lightbox-close');
    const lbPrev   = document.getElementById('lightbox-prev');
    const lbNext   = document.getElementById('lightbox-next');

    let currentIndex = 0;
    const visibleItems = () => [...items].filter(i => i.style.opacity !== '0.15');

    function openLightbox(index) {
      const list = visibleItems();
      currentIndex = index;
      const item = list[currentIndex];
      lbImg.src   = item.querySelector('img').src;
      lbImg.alt   = item.querySelector('img').alt;
      lbCat.textContent   = item.querySelector('.item-category').textContent;
      lbTitle.textContent = item.querySelector('h3').textContent;
      lightbox.setAttribute('aria-hidden', 'false');
      lightbox.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      backdrop.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        const list = visibleItems();
        const visIndex = list.indexOf(item);
        openLightbox(visIndex);
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);

    lbPrev.addEventListener('click', () => {
      const list = visibleItems();
      currentIndex = (currentIndex - 1 + list.length) % list.length;
      openLightbox(currentIndex);
    });

    lbNext.addEventListener('click', () => {
      const list = visibleItems();
      currentIndex = (currentIndex + 1) % list.length;
      openLightbox(currentIndex);
    });

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbPrev.click();
      if (e.key === 'ArrowRight') lbNext.click();
    });