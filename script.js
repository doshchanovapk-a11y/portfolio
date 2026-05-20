document.addEventListener('DOMContentLoaded', () => {

    // 1. LIGHTBOX — анимациямен
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    const openLightbox = (src) => {
        lightbox.style.display = 'flex';
        lightboxImg.src = src;
        lightbox.classList.remove('closing');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.add('closing');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightbox.classList.remove('closing');
        }, 300);
    };

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) openLightbox(img.src);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox();
    });

    // 2. ACCORDION
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.accordion-content').style.display = 'none';
            });

            if (!isOpen) {
                item.classList.add('open');
                content.style.display = 'block';
            }
        });
    });

    // 3. PRICING SELECT
    document.querySelectorAll('.btn-select').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.price-card').forEach(card => {
                card.classList.remove('selected');
                card.querySelector('.btn-select').innerText = 'Выбрать';
            });
            const currentCard = button.closest('.price-card');
            currentCard.classList.add('selected');
            button.innerText = 'Выбрано ✓';
        });
    });

    // 4. ANIMATED COUNTERS (ОБНОВЛЕНО: Исправлен шаг анимации для маленьких чисел)
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            
            // Если целевое значение маленькое (например, 2 или 4), увеличиваем по 1, иначе рассчитываем шаг
            const inc = target.toFixed() <= 5 ? 1 : Math.max(1, Math.ceil(target / 80));
            
            const update = () => {
                count += inc;
                if (count < target) {
                    counter.innerText = count;
                    setTimeout(update, 35); // Слегка увеличили задержку для плавности маленьких чисел
                } else {
                    counter.innerText = target;
                }
            };
            update();
        });
    };

    const heroSection = document.querySelector('#hero');
    
    // ОБНОВЛЕНО: Изменен порог threshold на 0.15 и уменьшена задержка запуска до 200мс,
    // чтобы анимация срабатывала идеально под новую компактную высоту CSS.
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
            setTimeout(animateCounters, 200); 
            countersStarted = true;
        }
    }, { threshold: 0.15 }); 

    if (heroSection) counterObserver.observe(heroSection);
    // 5. SCROLL REVEAL
    const revealElements = document.querySelectorAll('section, .skill-card, .price-card, .gallery-item');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealElements.forEach(el => revealObserver.observe(el));

});