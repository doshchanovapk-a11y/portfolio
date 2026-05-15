// Жұмысты бастамас бұрын барлық элементтерді жүктеп алу
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LIGHTBOX GALLERY ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.gallery-item img').forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // --- 2. ACCORDION FAQ ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            
            // Басқа ашық тұрғандарын жабу
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.display = 'none';
                }
            });

            // Ағымдағы блокты ашу немесе жабу
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
// Логика выбора тарифа
const priceButtons = document.querySelectorAll('.btn-select');

priceButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Находим все карточки тарифов
        const allCards = document.querySelectorAll('.price-card');
        
        // 2. Убираем класс 'selected' и меняем текст кнопок у всех
        allCards.forEach(card => {
            card.classList.remove('selected');
            card.querySelector('.btn-select').innerText = 'Выбрать';
        });

        // 3. Добавляем класс 'selected' только той карточке, чью кнопку нажали
        const currentCard = button.closest('.price-card');
        currentCard.classList.add('selected');
        
        // 4. Меняем текст на кнопке
        button.innerText = 'Выбрано ✓';
    });
});
    // --- 5. ANIMATED COUNTERS ---
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Жылдамдығы

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Скролл кезінде счетчикті бір-ақ рет қосу үшін
    let started = false;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && !started) {
            animateCounters();
            started = true;
        }
    });

});
// Эффект появления блоков при скролле (Эксклюзивность)
const revealSections = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s ease-out";
        observer.observe(section);
    });
};

// Запускаем после загрузки
window.addEventListener('load', revealSections);