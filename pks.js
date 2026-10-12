document.addEventListener('DOMContentLoaded', () => {

    const wrapper      = document.querySelector('.wrapper');
    const img1         = document.getElementById('img1');
    const img2         = document.getElementById('img2');
    const img3         = document.getElementById('img3');
    const img4         = document.getElementById('img4');
    const img5         = document.getElementById('img5');
    const img6         = document.getElementById('img6');
    const img7         = document.getElementById('img7');
    const img8         = document.getElementById('img8');
    const text         = document.getElementById('text');
    const arm          = document.querySelector('.arm');
    const rsec         = document.getElementById('projects');
    const navs         = document.querySelectorAll('.navigation a');
    const sections     = document.querySelectorAll('section');

    function scroll() {
        const value = window.pageYOffset || document.documentElement.scrollTop;
        const mobile = window.matchMedia('(max-width: 768px)').matches;

        if (text)  text.style.transform  = `translateY(${value * 0.5}px)`;

        if (mobile) {
            const fade = Math.max(0, 1 - value / 360);
            const side = value * 0.45;

            if (text) text.style.opacity = fade;
            if (img1) img1.style.transform = `translateX(${-side}px) rotate(var(--rot, 0deg))`;
            if (img2) img2.style.transform = `translateX(${-side}px) rotate(var(--rot, 0deg))`;
            if (img3) img3.style.transform = `translateX(${side}px) rotate(var(--rot, 0deg))`;
            if (img4) img4.style.transform = `translateX(${-side}px) rotate(var(--rot, 0deg))`;
            if (img5) img5.style.transform = `translateX(${side}px) rotate(var(--rot, 0deg))`;
            if (img6) img6.style.transform = `translateX(${-side}px) rotate(var(--rot, 0deg))`;
            if (img7) img7.style.transform = `translateX(${side}px) rotate(var(--rot, 0deg))`;
            if (img8) img8.style.transform = `translateX(${side}px) rotate(var(--rot, 0deg))`;
        } else {
            if (text) text.style.opacity = 1;
            if (img1)  img1.style.transform  = `translate(${value * -0.4}px, ${value * -0.4}px) rotate(var(--rot, 0deg))`;
            if (img2)  img2.style.transform  = `translate(${value *  0.4}px, ${value * -0.4}px) rotate(var(--rot, 0deg))`;
            if (img3)  img3.style.transform  = `translate(${value * -0.3}px, ${value *  0.2}px) rotate(var(--rot, 0deg))`;
            if (img4)  img4.style.transform  = `translate(${value *  0.3}px, ${value *  0.2}px) rotate(var(--rot, 0deg))`;
            if (img5)  img5.style.transform  = `translate(${value * -0.4}px, ${value *  0.4}px) rotate(var(--rot, 0deg))`;
            if (img6)  img6.style.transform  = `translateY(${value * 0.6}px) rotate(var(--rot, 0deg))`;
            if (img7)  img7.style.transform  = `translate(${value *  0.5}px, ${value *  0.4}px) rotate(var(--rot, 0deg))`;
            if (img8)  img8.style.transform  = `translateY(${value * -0.2}px) rotate(var(--rot, 0deg))`;
        }

        if (arm && rsec) {
            const rect = rsec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const tdist   = window.innerHeight + rect.height;
                const cdist = window.innerHeight - rect.top;
                const progress        = Math.max(0, Math.min(1, cdist / tdist));
                const wave            = Math.abs(Math.sin(progress * Math.PI * 6));
                arm.style.transform = `rotate(${wave * -40}deg)`;
            }
        }

        let current = '';
        sections.forEach(sec => {
            if (value >= sec.offsetTop - sec.clientHeight * 0.3) {
                current = sec.getAttribute('id');
            }
        });
        navs.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    if (wrapper) wrapper.addEventListener('scroll', scroll);
    window.addEventListener('scroll', scroll);


    const gen = (title, excerpt, author, date, imageUrl) => `
        <article class="box">
            <div class="abody">
                <h2 class="title">${title}</h2>
                <div class="line"></div>
                <div class="aimg">
                    ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : `
                    <div class="ahold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="1"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <span>Image</span>
                    </div>`}
                </div>
                <p class="excerpt">${excerpt}</p>
                <div class="byline">
                    <span class="author">${author}</span>
                    <span class="dot">·</span>
                    <span class="date">${date}</span>
                </div>
            </div>
        </article>
    `;

    const db = {
        "pj1": gen("Ares", "Ares is a 5kg-class RoboSumo combat robot built to compete within strict 25×25×25cm size guidelines — without compromising on power. Designed and built as a two-person team, Ares features a custom 6-wheeled Johnson motor drivetrain with a carefully re-engineered motor placement that maximises torque and drive force within the size constraints. Its signature front wedge is precision-angled to slide under opponents and drive them out of the arena. Ares was placed 3rd at the Pacific Robotics Championship, Jasola, proving its design and strategy on a competitive stage.", "Team Kinetix", "April 19, 2026", "img29.png"),
        "pj2": gen("Velocity V3", "Velocity is a line-following robot built across three versions, refined through two prototypes, and taken all the way to a 3rd place finish at TechRadiance, IIT Delhi — solo, on a first LFR attempt. The journey began with a cardboard chassis just to test wiring and components, evolved into a fully functional V2 with solid speed, and culminated in V3 — a complete rebuild around the event's demanding regulations. Where most beginner builds lean on digital sensors, PID libraries, and capable motor drivers, TechRadiance stripped it all back: analog IR sensors, single-piece IR modules, BO motors capped at 300RPM, and only L293D/L298N drivers allowed — no shortcuts. Learning to code precise, responsive line-following under those constraints, from scratch, is what makes Velocity special. Not just a podium finish — a reminder that limitations build better engineers.","Team Kinetix", "April 6, 2026", "img26.png"),
        "pj3": gen("Cosmo", "Cosmo is a cheerful purple desk robot companion that knows who you are. Hand-crafted using a 3D pen, it uses OpenCV-powered face recognition to identify people from a personal database in real time — and greets them with a physical wave. The wave is delivered through a hinged arm mechanism, driven by an N20 motor via an L293D IC at the elbow joint, giving it a surprisingly lifelike gesture. Built with an Arduino Nano and the laptop's built-in camera, Cosmo sits happily on your desk until it sees a familiar face — then it waves hi.", "Team Kinetix", "December 24, 2025", "img33.png"),
        "pj4": gen("Hermes", "Hermes is a 5kg-class RoboRace bot engineered for speed and precision within 25×25×25cm competition guidelines. Built by a team of four, Hermes went through rigorous real-world testing across multiple RPM configurations — 300, 600, and 900 — before settling on a finely tuned 600RPM AWD 4-Johnson-motor drivetrain that delivers the ideal balance of speed and control. The motor shafts were custom-cut to reduce weight and improve handling, pushing performance right to the edge of the weight class. Hermes qualified at PRC Tagore Garden and went on to finish Top 5 at PRC Jasola, a result earned through hands-on iteration and competitive refinement.", "Team Kinetix", "April 18, 2026", "img25.png"),
        "pj5": gen("Epimetheus V2", "Epimetheus V2 is the most advanced line follower built to date. At its core is a 2000RPM N20 motor drivetrain paired with a TB6612 motor driver and an Arduino Nano, pushing performance well beyond previous builds. An 8-channel IR sensor array ensures exceptional line detection accuracy. A custom impeller generates active downforce, keeping the bot planted and grippy through tight curves at high speed. The entire system is built on a full PCB bot architecture where the custom PCB doubles as the structural chassis. Epimetheus V2 represents a complete rethink of high-speed line follower engineering.", "Team Kinetix", "April 17, 2026", "img24.png"),
        "pj6": gen("DodgeX", "DodgeX is a retro-style, minimalist block-dodging game controlled entirely by hand — no keyboard or mouse needed. Built in Python using OpenCV and MediaPipe, the game uses real-time hand tracking to detect left and right hand movements, switching the player between lanes to dodge incoming blocks. The project was a self-driven dive into computer vision and game logic, combining both the hand tracker and the game from scratch. DodgeX captures the charm of pixel-art aesthetics while serving as a hands-on foundation in Python, CV pipelines, and interactive programming.", "Team Kinetix", "December 31, 2025", "img30.png"),
        "pj7": gen("Arduino Radar", "Arduino Radar is a functional proximity radar built using an ultrasonic sensor and visualized in real-time through a Python interface. With no servo and no motor encoder on hand, what could've been a dead end turned into a lesson in persistence: the motor sweep was painstakingly tuned entirely through manual hardcoding, dialling in timing and angles by trial and error alone. Built as a foundational project that refused to take shortcuts — and the result is a working radar.", "Team Kinetix", "June 24, 2025", "img28.png"),
        "pj8": gen("PocketRC", "PocketRC is a hand-built, remotely operated car controlled through a custom Android app built in Android Studio. Powered by an Arduino Nano and communicating over Bluetooth, the car supports variable speed control, giving smooth, responsive handling straight from a phone. Designed and built entirely as a collaborative hardware project, this laid the foundation for all future embedded systems, wireless communication, and mobile app development.", "Team Kinetix", "October 20, 2025", "img23.png"),
        "pj9": gen("Unity", "Unity is the website that started it all. Built in plain HTML, CSS, and JavaScript for a competition centred around the theme of unity and diversity, it placed in the Top 5 — a strong result. The site was humble in stack but meaningful in purpose, and looking back, it marks the exact moment a journey into web development began. In the months since, that foundation has grown into full-stack development — a testament to how far one first project can take you.", "Team Kinetix", "March 15, 2025", "img32.png"),
        "pj10": gen("Theseus", "Micromouse is an autonomous maze-solving robot that brings together hardware, algorithms, and fabrication in one compact build. Developed as a team, it runs on an Arduino Nano and navigates using a flood fill algorithm followed by shortest path calculation — both of which were implemented and tested successfully. The proximity sensing at its core builds directly on radar tech, making Micromouse a natural evolution of earlier work. Its chassis was fully 3D printed, and the bot proved itself reliably in testing.", "Team Kinetix", "July 10, 2025", "img27.png"),
        "pj11": gen("Icarus", "Icarus is a specialized robosoccer competition bot engineered directly from the mechanical architecture of Ares. Retaining the robust drivetrain and drive capabilities, Icarus introduces a newly designed and precision-angled front wedge optimized specifically for aggressive ball control, accurate striking, and rapid maneuverability on the robosoccer pitch. Built for fast-paced competitive gameplay and tight ball handling.", "Team Kinetix", "May 12, 2026", "img29.png")
    };
    for (let i = 1; i <= 11; i++) {
        db[i.toString()] = db[`pj${i}`];
    }

    const modal     = document.getElementById('pmodal');
    const mbody     = document.getElementById('mbody');
    const cbtn      = document.querySelector('.close');

    if (modal && mbody) {
        async function track(slug) {
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

        document.querySelectorAll('.box').forEach((card, index) => {
            if (!card.getAttribute('dataid')) {
                card.setAttribute('dataid', (index + 1).toString());
            }
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const id        = card.id || card.getAttribute('dataid');
                
                track(id);

                mbody.innerHTML = db[id]
                    || `<h2 style="color:#FFFFFF;">Project ${id}</h2><p style="color:#CBD5E1;margin-top:15px;">Expanded details coming soon!</p>`;
                modal.classList.add('active');
            });
        });

        function kill() { modal.classList.remove('active'); }

        if (cbtn) cbtn.addEventListener('click', kill);
        modal.addEventListener('click', (e) => { if (e.target === modal) kill(); });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) kill();
        });
    }


    const cform = document.querySelector('.cform');
    if (cform) {
        cform.addEventListener('submit', async function (e) {
            e.preventDefault();
            const form  = e.target;
            const toast = document.getElementById('toast');

            if (form.elements['website'] && form.elements['website'].value) return;

            const payload = {
                vemail: form.elements['vemail'].value.trim(),
                vsub:   form.elements['vsub'].value.trim(),
                vphone: form.elements['vphone'].value.trim(),
                vmsg:   form.elements['vmsg'].value.trim()
            };

            try {
                const response = await fetch('/api/submit', {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify(payload)
                });

                if (response.ok) {
                    if (toast) {
                        toast.classList.add('tshow');
                        setTimeout(() => toast.classList.remove('tshow'), 3000);
                    }
                    form.reset();
                } else {
                    const err = await response.json().catch(() => ({}));
                    alert(`Submission failed: ${err.error || `Server returned ${response.status}`}`);
                }
            } catch (nerr) {
                console.error('Form error:', nerr);
                alert('Could not reach the server. Check your connection and try again.');
            }
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    document.addEventListener('keydown', (event) => {
        const isModifier = event.ctrlKey || event.metaKey;
        const isShift = event.shiftKey;
        const key = event.key.toLowerCase();

        if (event.key === 'F12' || 
            (isModifier && isShift && key === 'i') ||
            (isModifier && isShift && key === 'j') ||
            (isModifier && key === 'u')) {
            event.preventDefault();
        }
    });
});
