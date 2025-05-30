document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------------
    // Sticky Header Shadow on Scroll
    // This adds a subtle shadow to the header when the user scrolls down,
    // making it stand out more against the content.
    // ------------------------------------
    const header = document.querySelector('.main-header');
    if (header) { // Ensure the header element exists
        window.addEventListener('scroll', function() {
            if (window.scrollY > 0) { // Check if user has scrolled past the top
                header.classList.add('scrolled'); // Add 'scrolled' class
            } else {
                header.classList.remove('scrolled'); // Remove 'scrolled' class if at top
            }
        });
    }

    // ------------------------------------
    // Mobile Navigation Toggle
    // This handles the opening and closing of the navigation menu
    // on smaller screens when the hamburger icon is clicked.
    // ------------------------------------
    const menuToggle = document.querySelector('.menu-toggle'); // The hamburger icon
    const mainNav = document.querySelector('.main-nav');       // The navigation menu itself

    if (menuToggle && mainNav) { // Ensure both elements exist
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active'); // Toggles the 'active' class on the nav
                                                // CSS rules in style.css control its display based on 'active'
        });

        // Close menu when a nav link is clicked (for smoother UX)
        // This makes the mobile menu automatically close when a user selects a page/section.
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active'); // Remove 'active' class to hide menu
                }
            });
        });
    }

    // ------------------------------------
    // Scroll-Triggered Fade-in Animations (using Intersection Observer API)
    // This is the CRITICAL part that makes your content visible.
    // It detects when an element enters the viewport and then adds the 'animate-in' class,
    // which in turn triggers the CSS fadeIn animation and makes the element visible.
    // ------------------------------------
    const animateElements = document.querySelectorAll(
        '.hero-section .hero-content, ' +
        '.hero-section .hero-content h1, ' +
        '.hero-section .hero-content p, ' +
        '.hero-section .hero-content .btn, ' +
        '.services-section h2, ' +
        '.service-item, ' +
        '.about-us-section .about-content, ' +
        '.about-us-section .about-images img, ' +
        '.testimonials-section h2, ' +
        '.testimonial-item, ' +
        '.blog-section h2, ' +
        '.blog-post-card, ' +
        '.cta-section h2, ' +
        '.cta-section p, ' +
        '.cta-section .btn, ' +
        '.footer-columns'
        // This is a list of all CSS selectors for elements that should fade in.
        // Make sure these selectors accurately target the elements you want to animate.
    );

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // 'root: null' means the viewport is the root (what we observe against)
        rootMargin: '0px', // No extra margin around the root
        threshold: 0.1 // Trigger when 10% of the element is visible in the viewport
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the element is currently visible in the viewport
                entry.target.classList.add('animate-in'); // Add the 'animate-in' class (which triggers the CSS animation)
                observer.unobserve(entry.target); // Stop observing once the element has animated in
                                                  // This prevents the animation from re-triggering on scroll back up.
            }
        });
    }, observerOptions);

    // Loop through all the elements we want to observe and start observing them
    animateElements.forEach(element => {
        observer.observe(element);
    });
});