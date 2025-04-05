// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Screenshots carousel functionality
    const carousel = document.querySelector('.screenshots-carousel');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && dots.length > 0 && prevBtn && nextBtn) {
        const screenshots = carousel.querySelectorAll('.screenshot');
        let currentIndex = 0;
        
        // Function to update carousel display
        function updateCarousel() {
            screenshots.forEach((screenshot, index) => {
                screenshot.style.display = index === currentIndex ? 'block' : 'none';
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Initialize carousel
        updateCarousel();
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % screenshots.length;
            updateCarousel();
        });
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
            updateCarousel();
        });
        
        // Dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Auto-rotate carousel every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % screenshots.length;
            updateCarousel();
        }, 5000);
    }

    // Scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to add animation classes based on section
    function animateOnScroll() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                // Determine which animation to apply based on element or parent
                if (element.closest('#features')) {
                    element.classList.add('fadeInUp');
                } else if (element.closest('#screenshots')) {
                    element.classList.add('fadeIn');
                } else if (element.closest('#roadmap')) {
                    if (element.classList.contains('roadmap-phase')) {
                        const index = Array.from(element.parentNode.children).indexOf(element);
                        if (index % 2 === 0) {
                            element.classList.add('fadeInRight');
                        } else {
                            element.classList.add('fadeInLeft');
                        }
                    } else {
                        element.classList.add('fadeIn');
                    }
                } else if (element.closest('#about')) {
                    if (element.classList.contains('about-image')) {
                        element.classList.add('fadeInLeft');
                    } else {
                        element.classList.add('fadeInRight');
                    }
                } else {
                    element.classList.add('fadeInUp');
                }
                
                // Add visible class to all animated elements
                element.classList.add('visible');
            }
        });
    }
    
    // Run on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate background stars
    const stars = document.querySelector('.stars');
    if (stars) {
        window.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            stars.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // Play button functionality
    const playButton = document.querySelector('.play-game-btn');
    if (playButton) {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Add pulse animation when clicked
            this.classList.add('animate__animated', 'animate__pulse');
            
            // Show a message or redirect to game
            alert('Game coming soon! Stay tuned for the release.');
            
            // Remove animation classes after animation ends
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        });
    }
    
    // Add parallax effect to hero section
    const hero = document.querySelector('#hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPos * 0.5}px`;
        });
    }
}); 