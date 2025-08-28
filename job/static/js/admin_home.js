document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#typed', {
        strings: [
            "Welcome back! The kingdom of data awaits your command.",
            "Your dashboard, your rules — let’s make great things happen today!",
            "Managing recruiters without any errors...",
            "Overseeing the Job Pulse platform..."
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1200,
        startDelay: 300,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });

    // Section Navigation
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('.section');

    // Scroll to section when dot clicked
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const target = this.getAttribute('data-section');
            document.getElementById(target).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Update active dot on scroll
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });

    // Add scroll animation to elements
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.stat-card, .action-btn');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize elements with opacity 0
    document.querySelectorAll('.stat-card, .action-btn').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});