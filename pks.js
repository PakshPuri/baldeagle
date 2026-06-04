document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 JavaScript Engine initialized safely!");

    // =========================================================================
    // 1. CHOOSE ELEMENT DEFINITIONS (Safely scoped inside DOM gate)
    // =========================================================================
    const img1         = document.getElementById('img1');
    const img2         = document.getElementById('img2');
    const img3         = document.getElementById('img3');
    const img4         = document.getElementById('img4');
    const img5         = document.getElementById('img5');
    const img6         = document.getElementById('img6');
    const img7         = document.getElementById('img7');
    const img8         = document.getElementById('img8');
    const text         = document.getElementById('text');
    const robotArm     = document.querySelector('.robot-arm');
    const robotSection = document.getElementById('projects');
    const navLinks     = document.querySelectorAll('.navigation a');
    const sections     = document.querySelectorAll('section');
    const contactForm  = document.querySelector('.contact-form');
    const toast        = document.getElementById('success-toast');

    // =========================================================================
    // 2. PARALLAX & ROBOT ANIMATION MECHANICS
    // =========================================================================
    window.addEventListener('scroll', () => {
        const value = window.scrollY;

        // Parallax Engine (Only runs if elements exist)
        if (text) text.style.transform = `translateY(${value * 0.8}px)`;
        if (img1) img1.style.transform  = `translate(${value * -0.5}px, ${value * -0.5}px) rotate(var(--rot))`;
        if (img2) img2.style.transform  = `translate(${value *  0.5}px, ${value * -0.5}px) rotate(var(--rot))`;
        if (img3) img3.style.transform  = `translate(${value * -0.5}px, ${value *  0.3}px) rotate(var(--rot))`;
        if (img4) img4.style.transform  = `translate(${value *  0.5}px, ${value *  0.3}px) rotate(var(--rot))`;
        if (img5) img5.style.transform  = `translate(${value * -0.5}px, ${value *  0.5}px) rotate(var(--rot))`;
        if (img6) img6.style.transform  = `translateY(${value * 0.9}px) rotate(var(--rot))`;
        if (img7) img7.style.transform  = `translate(${value *  0.8}px, ${value *  0.5}px) rotate(var(--rot))`;
        if (img8) img8.style.transform  = `translateY(${value * -0.3}px) rotate(var(--rot))`;

        // Active Navigation Highlights
        sections.forEach(sec => {
            if (value >= sec.offsetTop - sec.clientHeight * 0.3) {
                const current = sec.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
                });
            }
        });

        // Waving Robot Arm Math
        if (robotSection && robotArm) {
            const rect = robotSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const totalDistance  = window.innerHeight + rect.height;
                const currentDistance = window.innerHeight - rect.top;
                const progress        = Math.max(0, Math.min(1, currentDistance / totalDistance));
                const waveCount = 6; 
                const wave      = Math.abs(Math.sin(progress * Math.PI * waveCount));
                robotArm.style.transform = `rotate(${wave * -40}deg)`;
            }
        }
    });

    // =========================================================================
    // 3. PROJECT MODAL POPUPS
    // =========================================================================
    const projectDetails = {
        "1": `
            <h2 style="color: #1C3A27; border-bottom: 2px solid #7D4F37; padding-bottom: 10px;">Project One Deep Dive</h2>
            <p style="color: #2B2625; line-height: 1.6; margin-top: 15px;">This is your expanded project showcase area!</p>
        `,
        "2": `
            <h2 style="color: #1C3A27; border-bottom: 2px solid #7D4F37; padding-bottom: 10px;">Project Two Deep Dive</h2>
            <p style="color: #2B2625; line-height: 1.6; margin-top: 15px;">Details for project two go here.</p>
        `
    };

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');

    if (modal && modalBody) {
        document.querySelectorAll('.article-box').forEach((card, index) => {
            if (!card.getAttribute('data-project')) {
                card.setAttribute('data-project', (index + 1).toString());
            }

            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = card.getAttribute('data-project');
                modalBody.innerHTML = projectDetails[projectId] || `<h2>Project ${projectId}</h2><p>Expanded details coming soon!</p>`;
                modal.classList.add('active');
            });
        });

        const closeModal = () => modal.classList.remove('active');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        window.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.classList.contains('active')) closeModal();
        });
    }

    // =========================================================================
    // 4. BULLETPROOF JSON FORM DISPATCH
    // =========================================================================
    if (contactForm) {
        console.log("🎯 Form detected and attached successfully!");
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            console.log("Form submit event captured.");

            if (toast) toast.classList.add('toast-show');

            // Explicitly pick input field query paths
            const formData = {
                visitor_email: contactForm.querySelector('#email')?.value || '',
                email_subject: contactForm.querySelector('#subject')?.value || '',
                visitor_phone: contactForm.querySelector('#phone')?.value || '',
                visitor_message: contactForm.querySelector('#message')?.value || '',
                website: contactForm.querySelector('#website')?.value || ''
            };

            contactForm.reset();

            setTimeout(() => {
                if (toast) toast.classList.remove('toast-show');
            }, 3000);

            try {
                console.log("Transmitting payload package to Vercel...", formData);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                console.log("Server verification status:", result);
            } catch (error) {
                console.error("Network interface pipeline error:", error);
            }
        });
    } else {
        console.error("Critical Form Error: Could not find class '.contact-form' inside your HTML layout.");
    }
});
