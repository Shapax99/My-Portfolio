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

    // Timeline content hover — highlight related marker
    const timelineContents = document.querySelectorAll('.timeline-content');

    timelineContents.forEach(content => {
        content.addEventListener('mouseenter', function() {
            const marker = this.closest('.timeline-item').querySelector('.timeline-marker');
            marker.style.transform = 'scale(1.3)';
        });

        content.addEventListener('mouseleave', function() {
            const marker = this.closest('.timeline-item').querySelector('.timeline-marker');
            marker.style.transform = '';
        });
    });
});
