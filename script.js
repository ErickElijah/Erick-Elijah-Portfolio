// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Testimonial slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial');
const totalSlides = slides.length;

function showSlide(index) {
    document.querySelector('.testimonial-slider').style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-rotate testimonials (10 seconds)
setInterval(nextSlide, 10000);

// Manual navigation
document.querySelector('.testimonial-next').addEventListener('click', nextSlide);
document.querySelector('.testimonial-prev').addEventListener('click', prevSlide);

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Client-side validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            if (!isValid) return;
            
            // Submit form via Netlify
            const formData = new FormData(contactForm);
            
            fetch('/', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded' 
                },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Show success message
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                alert('Error sending message. Please try again later.');
                console.error('Form submission error:', error);
            });
        });
    }
    
    // Show success message if coming from redirect
    if (window.location.search.includes('form-submitted=true')) {
        if (contactForm) contactForm.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';
    }
});

// Animate elements when they come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.timeline-item, .testimonial-content, .skill-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements with hidden state
document.querySelectorAll('.timeline-item, .testimonial-content, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);