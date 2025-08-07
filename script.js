// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial');
const totalSlides = slides.length;

function showSlide(index) {
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Initialize testimonial slider if it exists
if (document.querySelector('.testimonial-slider')) {
    // Auto-rotate testimonials (10 seconds)
    setInterval(nextSlide, 10000);
    
    // Manual navigation
    const nextBtn = document.querySelector('.testimonial-next');
    const prevBtn = document.querySelector('.testimonial-prev');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
}

// Scroll animation for elements
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.timeline-item, .testimonial-content, .skill-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation styles
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for animated elements
    document.querySelectorAll('.timeline-item, .testimonial-content, .skill-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
    });
    
    // Trigger first animation check
    animateOnScroll();
});

// Set up scroll event listener
window.addEventListener('scroll', animateOnScroll);