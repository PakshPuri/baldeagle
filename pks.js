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
    const createProjectTemplate = (title, tag, excerpt, author, date) => `
        <article class="article-box">
            <div class="article-image">
                <div class="article-image-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="1"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span>Image</span>
                </div>
            </div>
            <div class="article-body">
                <span class="article-tag">${tag}</span>
                <h2 class="article-title">${title}</h2>
                <div class="article-rule"></div>
                <p class="article-excerpt">${excerpt}</p>
                <div class="article-byline">
                    <span class="author">${author}</span>
                    <span class="dot">·</span>
                    <span class="date">${date}</span>
                </div>
            </div>
        </article>
    `;

    const projectDetails = {
        "pj1": createProjectTemplate("The Slow Return of the Written Word", "Culture", "Across reading rooms and quiet cafés, a quiet shift is taking place — people are putting down their phones and picking up books again.", "Eleanor Marsh", "June 5, 2026"),
        "pj2": createProjectTemplate("Digital Minimalism in a Hyper-Connected World", "Tech", "Exploring how intentional use of technology can lead to a more focused and fulfilling life in the digital age.", "Julian Vane", "May 12, 2026"),
        "pj3": createProjectTemplate("The Art of Sustainable Architecture", "Design", "How modern architects are integrating nature and sustainability into urban landscapes to create living spaces.", "Sonia Grier", "April 20, 2026"),
        "pj4": createProjectTemplate("Reimagining Urban Spaces", "Urbanism", "Cities are being redesigned to prioritize pedestrians and green spaces over cars and concrete.", "Marcus Thorne", "March 15, 2026"),
        "pj5": createProjectTemplate("The Future of Remote Collaboration", "Work", "As the office becomes optional, new tools and cultures are emerging to define how we work together.", "Lydia Chen", "February 28, 2026"),
        "pj6": createProjectTemplate("Culinary Traditions in a Globalized Kitchen", "Food", "Tracing the roots of traditional recipes and how they evolve as they travel across borders.", "Chef Rene", "January 10, 2026"),
        "pj7": createProjectTemplate("The Psychology of Creative Flow", "Psychology", "Understanding the state of 'flow' and how artists and scientists achieve peak performance through focus.", "Dr. Aris", "December 5, 2025"),
        "pj8": createProjectTemplate("Ocean Conservation: A Race Against Time", "Nature", "The latest efforts to protect our oceans and the innovative technologies being used to restore coral reefs.", "Nora Blue", "November 22, 2025"),
        "pj9": createProjectTemplate("The Rise of Indie Game Development", "Gaming", "How small studios are challenging the status quo with unique stories and experimental mechanics.", "Leo Sparks", "October 30, 2025")
    };
    // Support numeric keys too for robustness
    for (let i = 1; i <= 9; i++) {
        projectDetails[i.toString()] = projectDetails[`pj${i}`];
    }

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
                const id        = card.id || card.getAttribute('data-project');
                
                trackClick(id);

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
