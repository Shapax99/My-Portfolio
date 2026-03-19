// Timeline Animation Script

document.addEventListener('DOMContentLoaded', function() {
    // Timeline animation with Intersection Observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Timeline markers hover effects
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    
    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        marker.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Timeline content hover effects
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineContents.forEach(content => {
        content.addEventListener('mouseenter', function() {
            // Add subtle glow effect to related marker
            const timelineItem = this.closest('.timeline-item');
            const marker = timelineItem.querySelector('.timeline-marker');
            marker.style.boxShadow = '0 0 20px var(--accent-color)';
        });
        
        content.addEventListener('mouseleave', function() {
            // Remove glow effect
            const timelineItem = this.closest('.timeline-item');
            const marker = timelineItem.querySelector('.timeline-marker');
            const isEducation = marker.classList.contains('education');
            marker.style.boxShadow = isEducation 
                ? '0 4px 15px rgba(139, 92, 246, 0.4)'
                : '0 4px 15px rgba(96, 165, 250, 0.4)';
        });
    });

    // Tags interaction effects
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Smooth scroll to timeline when clicking on experience nav link
    const experienceLink = document.querySelector('a[href="#experience"]');
    if (experienceLink) {
        experienceLink.addEventListener('click', function(e) {
            e.preventDefault();
            const timelineSection = document.querySelector('#experience');
            if (timelineSection) {
                timelineSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .tag {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background-color: rgba(255, 255, 255, 0.7);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
