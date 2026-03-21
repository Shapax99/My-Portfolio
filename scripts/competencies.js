// Competencias

document.addEventListener('DOMContentLoaded', function() {
    addSVGGradients();
    
    const competencyItems = document.querySelectorAll('.competency-item');
    
    const competencyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateChart(entry.target);
                competencyObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    competencyItems.forEach(item => {
        competencyObserver.observe(item);
    });

    competencyItems.forEach(item => {
        const chartProgress = item.querySelector('.chart-progress');
        const percentage = item.querySelector('.chart-percentage');
        
        item.addEventListener('mouseenter', function() {
            chartProgress.style.filter = 'drop-shadow(0 0 10px var(--accent-color))';
            percentage.style.transform = 'translate(-50%, -50%) scale(1.1)';
            percentage.style.color = 'var(--secondary-color)';
        });
        
        item.addEventListener('mouseleave', function() {
            chartProgress.style.filter = 'none';
            percentage.style.transform = 'translate(-50%, -50%) scale(1)';
            percentage.style.color = 'var(--accent-color)';
        });
    });
});

function addSVGGradients() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    
    const defs = document.createElementNS(svgNS, "defs");
    
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", "gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "100%");
    
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("style", "stop-color:#60a5fa");
    
    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("style", "stop-color:#8b5cf6");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    document.body.appendChild(svg);
}

function animateChart(competencyItem) {
    const chartProgress = competencyItem.querySelector('.chart-progress');
    const percentage = parseInt(competencyItem.dataset.percentage);
    const circumference = 2 * Math.PI * 60; // radius = 60
    const offset = circumference - (percentage / 100) * circumference;
    
    setTimeout(() => {
        chartProgress.style.strokeDashoffset = offset;
    }, 300);
    
    const percentageElement = competencyItem.querySelector('.chart-percentage');
    animateNumber(percentageElement, 0, percentage, 2000);
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.round(start + (end - start) * easedProgress);
        
        element.textContent = currentNumber + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

const style = document.createElement('style');
style.textContent = `
    .competency-item:hover .chart-progress {
        animation: chartPulse 2s ease-in-out infinite;
    }
    
    @keyframes chartPulse {
        0%, 100% { stroke-width: 8; }
        50% { stroke-width: 12; }
    }
    
    .chart-percentage {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
