let websiteStarted = false;
let loveTimerInterval = null;

document.addEventListener('DOMContentLoaded', function () {
    showLoveMessage();
});

function startWebsiteExperience() {
    if (websiteStarted) {
        return;
    }

    websiteStarted = true;
    document.body.style.overflow = 'auto';
    document.body.classList.remove('popup-active');

    createParticles();
    initializeAnimations();
    setupScrollAnimations();
    initializeProposalSection();
    updateLoveTimer();
    loveTimerInterval = setInterval(updateLoveTimer, 1000);
}

// Create floating particles
function createParticles() {
    const particles = document.getElementById('particles');
    const particleEmojis = ['❤️', '💕', '💖', '💗', '🌸', '🌺', '✨', '💫', '🦋'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation duration and delay
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        particles.appendChild(particle);
    }
}

// Initialize typewriter and other animations
function initializeAnimations() {
    // Typewriter effect is handled by CSS

    // Add staggered animation delays to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.2) + 's';
    });

    const text = "Happy 3rd Anniversary My Love 😍💕";
    let i = 0;
    const speed = 80;
    const typewriter = document.getElementById("typewriter");

    typewriter.innerHTML = "";

    function typeEffect() {
        if (i < text.length) {
            typewriter.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeEffect, speed);
        }
    }

    typeEffect();
}

// Scroll animations (AOS - Animate On Scroll)
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');

                // Special handling for message text
                if (entry.target.classList.contains('message-card')) {
                    animateMessageText();
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('[data-aos], .section-title, .message-card');
    elementsToObserve.forEach(element => {
        observer.observe(element);

        // Add delay based on data-delay attribute
        const delay = element.getAttribute('data-delay');
        if (delay) {
            element.style.transitionDelay = delay + 'ms';
        }
    });
}

// Animate message text with staggered effect
function animateMessageText() {
    const messageTexts = document.querySelectorAll('.message-text');
    messageTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('fade-in-animate');
        }, index * 500);
    });
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle like functionality for photos
function toggleLike(button) {
    const heartIcon = button.querySelector('.heart-icon');
    button.classList.toggle('liked');

    if (button.classList.contains('liked')) {
        heartIcon.textContent = '❤️';
        // Create floating heart effect
        createFloatingHeart(button);
    } else {
        heartIcon.textContent = '🤍';
    }
}

// Create floating heart animation when photo is liked
function createFloatingHeart(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';

    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + 'px';
    heart.style.top = rect.top + 'px';

    document.body.appendChild(heart);

    // Animate the heart
    heart.animate([
        { transform: 'translateY(0px) scale(1)', opacity: 1 },
        { transform: 'translateY(-60px) scale(1.5)', opacity: 0 }
    ], {
        duration: 1500,
        easing: 'ease-out'
    }).onfinish = () => {
        document.body.removeChild(heart);
    };
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    if (!websiteStarted) {
        return;
    }

    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const parallaxSpeed = 0.5;

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed * 0.2}px)`;
    }

    // Update particles position based on scroll
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.2 + (index % 3) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add mouse movement effect to hero section
document.addEventListener('mousemove', (e) => {
    if (!websiteStarted) {
        return;
    }

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Subtle movement effect
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;

    const floatingHearts = document.querySelector('.floating-hearts');
    if (floatingHearts) {
        floatingHearts.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Add click effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add entrance animations for photos when they come into view
const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img) {
                img.style.animation = 'photoEnter 0.8s ease-out forwards';
            }
        }
    });
}, { threshold: 0.2 });

// Observe all photo cards
document.querySelectorAll('.photo-card').forEach(card => {
    photoObserver.observe(card);
});

// Add photo enter animation
const photoStyle = document.createElement('style');
photoStyle.textContent = `
    @keyframes photoEnter {
        from {
            transform: scale(0.8) rotate(-5deg);
            opacity: 0;
        }
        to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(photoStyle);

const startDate = new Date("2023-04-18T00:00:00");
const targetDate = new Date("2026-04-18T00:00:00");

function updateLoveTimer() {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  document.getElementById("years").innerText = years;
  document.getElementById("months").innerText = months;
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  // 🎉 Trigger celebration when 3 years completed
  if (now >= targetDate && !window.celebrated) {
    window.celebrated = true;
    triggerCelebration(); // already in your code
  }
}

function showLoveMessage() {
    const popup = document.createElement("div");
    popup.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            z-index: 9999;
            box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        ">
            <h2 style="color:#ff4d6d;">Oii Chella kuttyyy😁😘</h2>
            <p>Surprise! This is just for you 😌💕</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                style="margin-top:15px; padding:10px 20px; border:none; border-radius:10px; background:#ff4d6d; color:white;">
                Continue 💫
            </button>
        </div>
    `;
    document.body.appendChild(popup);
}




document.addEventListener("click", function(e) {
    if (!websiteStarted) {
        return;
    }

    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.fontSize = "20px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";

    document.body.appendChild(heart);

    heart.animate([
        { transform: "translateY(0) scale(1)", opacity: 1 },
        { transform: "translateY(-100px) scale(2)", opacity: 0 }
    ], {
        duration: 1000
    });

setTimeout(() => heart.remove(), 1000);
});

function initializeProposalSection() {
    const playground = document.getElementById('proposalPlayground');
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const overlay = document.getElementById('proposalOverlay');

    if (!playground || !noBtn || !yesBtn || !overlay) {
        return;
    }

    const triggerMove = (event) => {
        event.preventDefault();
        moveProposalNoButton(playground, noBtn, yesBtn);
    };

    noBtn.addEventListener('mouseenter', () => moveProposalNoButton(playground, noBtn, yesBtn));
    noBtn.addEventListener('pointerdown', triggerMove);
    noBtn.addEventListener('touchstart', triggerMove, { passive: false });
    noBtn.addEventListener('click', triggerMove);

    yesBtn.addEventListener('click', () => {
        showProposalCelebration(overlay);
    });

    window.addEventListener('resize', () => {
        keepButtonInsidePlayground(playground, noBtn);
    });

    setTimeout(() => {
        keepButtonInsidePlayground(playground, noBtn);
    }, 100);
}

function moveProposalNoButton(playground, noBtn, yesBtn) {
    const areaRect = playground.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const padding = 12;
    const maxX = areaRect.width - noRect.width - padding;
    const maxY = areaRect.height - noRect.height - padding;

    if (maxX <= padding || maxY <= padding) {
        return;
    }

    let nextLeft = padding + Math.random() * (maxX - padding);
    let nextTop = padding + Math.random() * (maxY - padding);

    const yesLeft = yesRect.left - areaRect.left;
    const yesTop = yesRect.top - areaRect.top;
    const yesRight = yesLeft + yesRect.width;
    const yesBottom = yesTop + yesRect.height;

    let attempts = 0;
    while (attempts < 20) {
        const overlapsYes =
            nextLeft < yesRight + 16 &&
            nextLeft + noRect.width > yesLeft - 16 &&
            nextTop < yesBottom + 16 &&
            nextTop + noRect.height > yesTop - 16;

        if (!overlapsYes) {
            break;
        }

        nextLeft = padding + Math.random() * (maxX - padding);
        nextTop = padding + Math.random() * (maxY - padding);
        attempts++;
    }

    noBtn.style.left = `${nextLeft}px`;
    noBtn.style.top = `${nextTop}px`;
    noBtn.style.right = 'auto';
    noBtn.style.transform = 'none';
}

function keepButtonInsidePlayground(playground, noBtn) {
    const areaRect = playground.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    const currentLeft = parseFloat(noBtn.style.left);
    const currentTop = parseFloat(noBtn.style.top);

    if (Number.isNaN(currentLeft) || Number.isNaN(currentTop)) {
        return;
    }

    const maxLeft = Math.max(12, areaRect.width - noRect.width - 12);
    const maxTop = Math.max(12, areaRect.height - noRect.height - 12);

    noBtn.style.left = `${Math.min(Math.max(12, currentLeft), maxLeft)}px`;
    noBtn.style.top = `${Math.min(Math.max(12, currentTop), maxTop)}px`;
}

function showProposalCelebration(overlay) {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    createProposalBurst(overlay, 42);

    setTimeout(() => {
        createProposalBurst(overlay, 28);
    }, 350);

    setTimeout(() => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.querySelectorAll('.proposal-burst').forEach((item) => item.remove());
    }, 10000);
}

function createProposalBurst(container, count) {
    const emojis = ['❤️', '💖', '💕', '✨'];

    for (let i = 0; i < count; i++) {
        const burst = document.createElement('span');
        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.45;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        burst.className = 'proposal-burst';
        burst.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        burst.style.left = `${window.innerWidth / 2}px`;
        burst.style.top = `${window.innerHeight / 2}px`;
        burst.style.setProperty('--tx', `${x}px`);
        burst.style.setProperty('--ty', `${y}px`);
        burst.style.setProperty('--rotate', `${Math.random() * 220 - 110}deg`);
        burst.style.animationDelay = `${Math.random() * 180}ms`;

        container.appendChild(burst);

        setTimeout(() => {
            burst.remove();
        }, 1900);
    }
}

if (loveTimerInterval) {
    clearInterval(loveTimerInterval);
    loveTimerInterval = null;
}

document.body.style.overflow = 'hidden';
document.body.classList.add('popup-active');

showLoveMessage = function () {
    const existingOverlay = document.querySelector('.welcome-overlay');
    if (existingOverlay) {
        return;
    }

    document.body.style.overflow = 'hidden';
    document.body.classList.add('popup-active');

    const popup = document.createElement('div');
    popup.className = 'welcome-overlay';
    popup.innerHTML = `
        <div class="welcome-popup">
            <h2 class="welcome-popup-title">Oii Chella kuttyyy 😁😘</h2>
            <p class="welcome-popup-text">Surprise! This is just for you 😌💖</p>
            <button class="welcome-popup-button" type="button">Continue 💫</button>
        </div>
    `;

    popup.querySelector('.welcome-popup-button').addEventListener('click', () => {
        popup.remove();
        startWebsiteExperience();
    });

    document.body.appendChild(popup);
};
