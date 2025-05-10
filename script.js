
document.addEventListener('DOMContentLoaded', function () {
    // Typing effect
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        new Typed('.typed-text', {
            strings: [
                '웹 개발자',
                'UI/UX 디자이너',
                '크리에이티브 문제 해결사',
                '풀스택 개발자'
            ],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1000,
            loop: true
        });
    }

    // Fade-in animation
    const fadeElements = document.querySelectorAll('.section-title, .hero-content, .about-content, .skill-card, .project-card, .timeline-content, .contact-item');
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        fadeElements.forEach(element => {
            element.classList.add('fade-element');
            fadeObserver.observe(element);
        });
    }

    // Filtering function for skills categories
    function setupFiltering(buttonSelector, itemSelector, categoryAttribute) {
        const filterButtons = document.querySelectorAll(buttonSelector);
        const items = document.querySelectorAll(itemSelector);

        if (filterButtons.length && items.length) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.getAttribute('data-' + categoryAttribute);

                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    items.forEach(item => {
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            item.style.display = '';
                            setTimeout(() => {
                                item.classList.add('show');
                            }, 10);
                        } else {
                            item.classList.remove('show');
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });

            const activeBtn = document.querySelector(buttonSelector + '.active');
            if (activeBtn) {
                activeBtn.click();
            }
        }
    }

    setupFiltering('.skill-cat-btn', '.skill-card', 'category');
    // Portfolio filter removed

    // Experience tabs
    const experienceTabs = document.querySelectorAll('.exp-tab');
    const experienceContents = document.querySelectorAll('.experience-content');

    if (experienceTabs.length && experienceContents.length) {
        experienceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');

                experienceTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                experienceContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId + '-content') {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // Scroll top button
    const scrollTopButton = document.querySelector('.scroll-top');
    if (scrollTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopButton.classList.add('show');
            } else {
                scrollTopButton.classList.remove('show');
            }
        });

        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Navigation scroll
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (header && navLinks.length) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                }
            });
        });
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('메시지가 성공적으로 전송되었습니다!');
            this.reset();
        });
    }
});
