const img1        = document.getElementById('img1');
const img2        = document.getElementById('img2');
const img3        = document.getElementById('img3');
const img4        = document.getElementById('img4');
const img5        = document.getElementById('img5');
const img6        = document.getElementById('img6');
const img7        = document.getElementById('img7');
const img8        = document.getElementById('img8');
const text        = document.getElementById('text');
const robotArm    = document.querySelector('.robot-arm');
const robotSection = document.getElementById('projects');
const navLinks    = document.querySelectorAll('.navigation a');
const sections    = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    const value = window.scrollY;

    // --- Parallax ---
    text.style.transform = `translateY(${value * 0.8}px)`;
    img1.style.transform  = `translate(${value * -0.5}px, ${value * -0.5}px) rotate(var(--rot))`;
    img2.style.transform  = `translate(${value *  0.5}px, ${value * -0.5}px) rotate(var(--rot))`;
    img3.style.transform  = `translate(${value * -0.5}px, ${value *  0.3}px) rotate(var(--rot))`;
    img4.style.transform  = `translate(${value *  0.5}px, ${value *  0.3}px) rotate(var(--rot))`;
    img5.style.transform  = `translate(${value * -0.5}px, ${value *  0.5}px) rotate(var(--rot))`;
    img6.style.transform  = `translateY(${value * 0.9}px) rotate(var(--rot))`;
    img7.style.transform  = `translate(${value *  0.8}px, ${value *  0.5}px) rotate(var(--rot))`;
    img8.style.transform  = `translateY(${value * -0.3}px) rotate(var(--rot))`;

    // --- Robot arm ---

    // --- Active nav link ---
    let current = '';
    sections.forEach(sec => {
        if (value >= sec.offsetTop - sec.clientHeight * 0.3) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});
window.addEventListener('scroll', () => {
    // Get the robot's real-time position relative to the viewport
    const rect = robotSection.getBoundingClientRect();
    
    // ONLY animate if the robot is actually visible on the screen
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        
        // 1. SCREEN PROGRESS MATH (0 = enters bottom of screen, 1 = leaves top of screen)
        const totalDistance  = window.innerHeight + rect.height;
        const currentDistance = window.innerHeight - rect.top;
        const progress        = Math.max(0, Math.min(1, currentDistance / totalDistance));
        
        // 2. THE WAVE FREQUENCY
        // Because the screen is large, let's bump it up to 5 or 6 waves 
        // so it keeps hyperactively waving the entire time it passes by!
        const waveCount = 6; 
        const wave      = Math.abs(Math.sin(progress * Math.PI * waveCount));
        
        // 3. THE WAVE ANGLE
        robotArm.style.transform = `rotate(${wave * -40}deg)`;
    }
});
// 1. Your custom expanded content configurations
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

// 2. Wait for the HTML document to fully load before running the code
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');

    // Safety check: Make sure the modal HTML actually exists on the page
    if (!modal || !modalBody) return;

    // 3. Attach click event listeners to all your project cards
    document.querySelectorAll('.article-box').forEach((card, index) => {
        // Automatically assigns an ID fallback if you didn't add data-project="1" in HTML
        if (!card.getAttribute('data-project')) {
            card.setAttribute('data-project', (index + 1).toString());
        }

        card.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents 3D environment selection glitches
            
            const projectId = card.getAttribute('data-project');
            
            // Populate and open modal
            modalBody.innerHTML = projectDetails[projectId] || `<h2>Project ${projectId}</h2><p>Expanded details coming soon!</p>`;
            modal.classList.add('active');
        });
    });

    // 4. Close functions
    function closeModal() {
        modal.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) closeModal(); 
    });

    // 5. Escape Key listener (YouTube Style)
    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
  e.preventDefault(); // STOPS the page reload / 405 error!

  const form = e.target;
  const toast = document.getElementById('success-toast');

  // Trigger the visual fade-in / slide-down animation instantly
  toast.classList.add('toast-show');

  // Clear your form input values cleanly
  form.reset();

  // Keep it visible for 3 seconds, then slide up and fade away cleanly
  setTimeout(() => {
    toast.classList.remove('toast-show');
  }, 3000);

  // In the background, this shoots the data quietly to your Vercel endpoint
  try {
    await fetch(form.action, {
      method: form.method,
      body: new FormData(form)
    });
  } catch (error) {
    console.log("Local server warning: Python environment will initialize once live on Vercel.");
  }
});
