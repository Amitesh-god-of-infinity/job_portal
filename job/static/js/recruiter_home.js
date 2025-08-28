// Typing Animation
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#typed', {
        strings: [
            "Welcome back! Your recruiting dashboard is ready.",
            "Find the perfect candidates for your company.",
            "Manage your job postings with ease.",
            "Streamline your hiring process with Job Pulse."
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
});