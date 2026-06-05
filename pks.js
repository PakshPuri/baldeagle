document.addEventListener('DOMContentLoaded', () => {

    // ─── ELEMENTS ────────────────────────────────────────────────────────────
    const wrapper      = document.querySelector('.app-scrollbar-wrapper');
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

    // ─── SCROLL ───────────────────────────────────────────────────────────────
    // The CSS sets html/body to overflow:hidden and scrolls via .app-scrollbar-wrapper.
    // BUT if the CSS ever fails to load, window scrolls instead.
    // Solution: listen to both and read whichever gives a real value.
    // Scroll events don't bubble, so only one listener will ever fire at a time.

    function handleScroll() {
        const value = (wrapper ? wrapper.scrollTop : 0) || window.scrollY || 0;

        // Parallax
        if (text)  text.style.transform  = `translateY(${value * 0.8}px)`;
        if (img1)  img1.style.transform  = `translate(${value * -0.5}px, ${value * -0.5}px) rotate(var(--rot))`;
        if (img2)  img2.style.transform  = `translate(${value *  0.5}px, ${value * -0.5}px) rotate(var(--rot))`;
        if (img3)  img3.style.transform  = `translate(${value * -0.5}px, ${value *  0.3}px) rotate(var(--rot))`;
        if (img4)  img4.style.transform  = `translate(${value *  0.5}px, ${value *  0.3}px) rotate(var(--rot))`;
        if (img5)  img5.style.transform  = `translate(${value * -0.5}px, ${value *  0.5}px) rotate(var(--rot))`;
        if (img6)  img6.style.transform  = `translateY(${value * 0.9}px) rotate(var(--rot))`;
        if (img7)  img7.style.transform  = `translate(${value *  0.8}px, ${value *  0.5}px) rotate(var(--rot))`;
        if (img8)  img8.style.transform  = `translateY(${value * -0.3}px) rotate(var(--rot))`;

        // Robot arm (getBoundingClientRect is always viewport-relative, works either way)
        if (robotArm && robotSection) {
            const rect = robotSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const totalDistance   = window.innerHeight + rect.height;
                const currentDistance = window.innerHeight - rect.top;
                const progress        = Math.max(0, Math.min(1, currentDistance / totalDistance));
                const wave            = Math.abs(Math.sin(progress * Math.PI * 6));
                robotArm.style.transform = `rotate(${wave * -40}deg)`;
            }
        }

        // Active nav link
        let current = '';
        sections.forEach(sec => {
            if (value >= sec.offsetTop - sec.clientHeight * 0.3) {
                current = sec.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    // Attach to BOTH — only one fires depending on which element the CSS makes the scroll container
    if (wrapper) wrapper.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);


    // ─── PROJECT MODAL ────────────────────────────────────────────────────────
    const projectDetails = {
        "1": `
            <h2 style="color:#1C3A27;border-bottom:2px solid #7D4F37;padding-bottom:10px;">Project One</h2>
            <p style="color:#2B2625;line-height:1.6;margin-top:15px;">Add your expanded project one content here.</p>
        `,
        "2": `
            <h2 style="color:#1C3A27;border-bottom:2px solid #7D4F37;padding-bottom:10px;">Project Two</h2>
            <p style="color:#2B2625;line-height:1.6;margin-top:15px;">Add your expanded project two content here.</p>
        `
        // Add "3", "4" etc. following the same pattern
    };

    const modal     = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn  = document.querySelector('.modal-close');

    if (modal && modalBody) {
        async function trackClick(slug) {
            try {
                await fetch('/api/clicks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ slug: slug })
                });
            } catch (err) {
                console.error('Analytics error:', err);
            }
        }

        document.querySelectorAll('.article-box').forEach((card, index) => {
            if (!card.getAttribute('data-project')) {
                card.setAttribute('data-project', (index + 1).toString());
            }
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const id        = card.getAttribute('data-project');
                
                trackClick(`project-${id}`);

                modalBody.innerHTML = projectDetails[id]
                    || `<h2 style="color:#1C3A27;">Project ${id}</h2><p style="color:#2B2625;margin-top:15px;">Expanded details coming soon!</p>`;
                modal.classList.add('active');
            });
        });

        function closeModal() { modal.classList.remove('active'); }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });
    }


    // ─── CONTACT FORM ─────────────────────────────────────────────────────────
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const form  = e.target;
            const toast = document.getElementById('success-toast');

            // Honeypot: bot filled the hidden field — bail silently
            if (form.elements['website'] && form.elements['website'].value) return;

            const payload = {
                visitor_email:   form.elements['visitor_email'].value.trim(),
                email_subject:   form.elements['email_subject'].value.trim(),
                visitor_phone:   form.elements['visitor_phone'].value.trim(),
                visitor_message: form.elements['visitor_message'].value.trim()
            };

            try {
                const response = await fetch('/api/submit', {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify(payload)
                });

                if (response.ok) {
                    if (toast) {
                        toast.classList.add('toast-show');
                        setTimeout(() => toast.classList.remove('toast-show'), 3000);
                    }
                    form.reset();
                } else {
                    const err = await response.json().catch(() => ({}));
                    alert(`Submission failed: ${err.error || `Server returned ${response.status}`}`);
                }
            } catch (networkError) {
                console.error('Form error:', networkError);
                alert('Could not reach the server. Check your connection and try again.');
            }
        });
    }

});