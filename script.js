document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Icon toggle
        const icon = menuToggle.querySelector('ion-icon');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('name', 'close-outline');
        } else {
            icon.setAttribute('name', 'menu-outline');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('ion-icon');
            if (icon) icon.setAttribute('name', 'menu-outline');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for Fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Keep animating or not? Let's leave it.
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section, .hero');
    sections.forEach(section => {
        section.classList.add('fade-in-section'); // Add initial class via JS to not hide content if JS disabled
        observer.observe(section);
    });

});

// Matrix Digital Rain Animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

// Resize Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Matrix Characters (Katakana + Latin + Nums)
const characters = 'アィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヰヱヲンヴヵヶ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 16;
let columns;
let drops;

function init() {
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1; // Start at top
    }
}

function draw() {
    // Translucent black background to show trail effect
    ctx.fillStyle = 'rgba(10, 25, 47, 0.05)'; // Dark blue bg with low opacity
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Green text (Matrix style) - Or use Theme Cyan: '#64ffda'
    // Let's go with Theme Cyan for consistency? No, user wants best cyber look. Green is classic matrix. 
    // But Cyan fits the site theme better. Let's use the site accent color '#64ffda'.
    ctx.fillStyle = '#64ffda';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomly reset drop to top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    draw();
}

// Start
init();
animate();
