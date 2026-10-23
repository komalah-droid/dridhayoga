/**
 * DRIDHA YOGA - Interactive Studio Core Engine
 * Seraya Webflow-inspired Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initClassFiltering();
  initSchedule();
  initModals();
  initNewsletter();
  initContactForm();
  initScrollEffects();
  initWhatsAppFloat();
});

/* ==========================================================================
   Navigation Bar Scroll State
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Mobile Drawer Menu
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.nav-menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  backdrop.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   Classes Data & Filtering
   ========================================================================== */
const CLASSES_DATA = [
  {
    id: 'restorative-candlelight',
    category: 'restorative',
    title: 'Restorative Candlelight',
    instructor: 'Luna Reyes',
    duration: '75 min',
    level: 'All Levels',
    intensity: 'Gentle & Calming',
    tag: 'Signature',
    bg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse yourself in a deeply soothing evening practice illuminated solely by flickering candlelight. Using bolsters, blankets, and blocks, you will hold passive restorative postures that release accumulated nervous system tension and induce deep meditative stillness.',
    benefits: ['Relieves chronic muscular tension', 'Deep nervous system regulation', 'Improves sleep and mental stillness']
  },
  {
    id: 'gentle-morning-flow',
    category: 'flow',
    title: 'Gentle Morning Flow',
    instructor: 'Elena Hart',
    duration: '60 min',
    level: 'Beginner - Intermediate',
    intensity: 'Mild Flow',
    tag: 'Popular',
    bg: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    description: 'Awaken your body with gentle, rhythmic Sun Salutations and fluid breath-synchronized movement. This morning practice invites warm circulation into the joints and sets a centered, focused tone for your entire day.',
    benefits: ['Gently boosts morning energy', 'Enhances flexibility & posture', 'Cultivates grounded mindfulness']
  },
  {
    id: 'vinyasa-vitality',
    category: 'flow',
    title: 'Vinyasa Vitality',
    instructor: 'Marcus Vance',
    duration: '65 min',
    level: 'Intermediate - Advanced',
    intensity: 'High Energy',
    tag: 'Dynamic',
    bg: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1200&q=80',
    description: 'An invigorating flow that links continuous movement with pranic breath. Build internal heat, stamina, and cardiovascular vitality while exploring playful arm balances, transitions, and standing strength poses.',
    benefits: ['Builds endurance and lean strength', 'Detoxifying heat generation', 'Fosters inner confidence & focus']
  },
  {
    id: 'yin-deep-release',
    category: 'restorative',
    title: 'Yin Deep Fascia Release',
    instructor: 'Elena Hart',
    duration: '75 min',
    level: 'All Levels',
    intensity: 'Slow & Grounding',
    tag: 'Therapeutic',
    bg: 'https://images.unsplash.com/photo-1508215885820-4523e431397e?auto=format&fit=crop&w=1200&q=80',
    description: 'A slow-paced style where seated postures are held for 3 to 5 minutes with breath awareness. Targets deep connective tissues, ligaments, and fascia rather than muscles to dramatically increase mobility and release stored tension.',
    benefits: ['Releases tight hip and spine fascia', 'Cultivates deep patience', 'Harmonizes vital meridian energy flow']
  }
];

function initClassFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const classesContainer = document.querySelector('.classes-grid');
  if (!classesContainer) return;

  const renderClasses = (category = 'all') => {
    const filtered = category === 'all' 
      ? CLASSES_DATA 
      : CLASSES_DATA.filter(item => item.category === category);

    classesContainer.innerHTML = filtered.map(item => `
      <div class="class-card" data-category="${item.category}" data-id="${item.id}">
        <img src="${item.bg}" alt="${item.title}" class="class-card-bg" loading="lazy">
        <div class="class-card-overlay"></div>
        
        <div class="class-card-top-badges">
          <span class="badge-pill">${item.duration}</span>
          <span class="badge-pill lime">${item.tag}</span>
        </div>

        <div class="class-card-content">
          <span class="class-instructor">Guided by ${item.instructor}</span>
          <h3 class="class-title">${item.title}</h3>
          <div class="class-meta">
            <span>${item.level}</span>
            <span>•</span>
            <span>${item.intensity}</span>
          </div>
          
          <div class="class-hover-btn">
            <span>Explore Details & Book</span>
            <span>→</span>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards
    document.querySelectorAll('.class-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const classObj = CLASSES_DATA.find(c => c.id === id);
        if (classObj) openClassDetailModal(classObj);
      });
    });
  };

  renderClasses('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderClasses(category);
    });
  });
}

/* ==========================================================================
   Weekly Schedule Engine
   ========================================================================== */
const SCHEDULE_DATA = {
  monday: [
    { time: '07:30 - 08:30 AM', title: 'Gentle Morning Flow', instructor: 'Elena Hart', room: 'Sun Studio', spots: '4 spots left', category: 'Yoga' },
    { time: '12:00 - 01:00 PM', title: 'Pilates Flow Strength', instructor: 'Clara Nguyen', room: 'Earth Room', spots: '2 spots left', category: 'Pilates' },
    { time: '06:00 - 07:15 PM', title: 'Restorative Candlelight', instructor: 'Luna Reyes', room: 'Sanctuary', spots: 'Full (Waitlist)', spotsClass: 'few', category: 'Restorative' }
  ],
  tuesday: [
    { time: '07:00 - 08:05 AM', title: 'Vinyasa Vitality', instructor: 'Marcus Vance', room: 'Sun Studio', spots: '5 spots left', category: 'Yoga' },
    { time: '10:30 - 11:30 AM', title: 'Sound Bath & Breathwork', instructor: 'Maya Patel', room: 'Sanctuary', spots: '6 spots left', category: 'Meditation' },
    { time: '05:30 - 06:45 PM', title: 'Yin Deep Fascia Release', instructor: 'Elena Hart', room: 'Earth Room', spots: '3 spots left', category: 'Restorative' }
  ],
  wednesday: [
    { time: '07:30 - 08:30 AM', title: 'Gentle Morning Flow', instructor: 'Elena Hart', room: 'Sun Studio', spots: '5 spots left', category: 'Yoga' },
    { time: '12:30 - 01:20 PM', title: 'Pilates Core Align', instructor: 'Clara Nguyen', room: 'Earth Room', spots: '4 spots left', category: 'Pilates' },
    { time: '07:00 - 08:15 PM', title: 'Restorative Candlelight', instructor: 'Luna Reyes', room: 'Sanctuary', spots: '3 spots left', category: 'Restorative' }
  ],
  thursday: [
    { time: '07:00 - 08:05 AM', title: 'Vinyasa Vitality', instructor: 'Marcus Vance', room: 'Sun Studio', spots: '6 spots left', category: 'Yoga' },
    { time: '05:45 - 07:00 PM', title: 'Yin & Sound Resonance', instructor: 'Maya Patel', room: 'Sanctuary', spots: '2 spots left', spotsClass: 'few', category: 'Meditation' }
  ],
  friday: [
    { time: '08:00 - 09:00 AM', title: 'Gentle Morning Flow', instructor: 'Elena Hart', room: 'Sun Studio', spots: '7 spots left', category: 'Yoga' },
    { time: '12:00 - 01:00 PM', title: 'Pilates Flow Strength', instructor: 'Clara Nguyen', room: 'Earth Room', spots: '5 spots left', category: 'Pilates' },
    { time: '06:00 - 07:30 PM', title: 'Candlelight & Sound Immersion', instructor: 'Luna Reyes & Maya Patel', room: 'Sanctuary', spots: 'Special Event', spotsClass: 'few', category: 'Special' }
  ],
  saturday: [
    { time: '09:00 - 10:15 AM', title: 'Weekend Prana Flow', instructor: 'Marcus Vance', room: 'Sun Studio', spots: '3 spots left', category: 'Yoga' },
    { time: '11:00 - 12:15 PM', title: 'Sound Bath & Breathwork', instructor: 'Maya Patel', room: 'Sanctuary', spots: '2 spots left', spotsClass: 'few', category: 'Meditation' },
    { time: '04:30 - 05:45 PM', title: 'Restorative Stillness', instructor: 'Luna Reyes', room: 'Earth Room', spots: '4 spots left', category: 'Restorative' }
  ],
  sunday: [
    { time: '09:30 - 10:45 AM', title: 'Sunday Soul Flow', instructor: 'Elena Hart', room: 'Sun Studio', spots: '5 spots left', category: 'Yoga' },
    { time: '04:00 - 05:30 PM', title: 'Full Moon Sound & Yin', instructor: 'Maya Patel', room: 'Sanctuary', spots: '1 spot left', spotsClass: 'few', category: 'Meditation' }
  ]
};

function initSchedule() {
  const dayBtns = document.querySelectorAll('.day-btn');
  const scheduleRowsContainer = document.querySelector('.schedule-rows-container');
  if (!scheduleRowsContainer) return;

  const renderDaySchedule = (dayKey) => {
    const list = SCHEDULE_DATA[dayKey] || [];
    if (list.length === 0) {
      scheduleRowsContainer.innerHTML = `<p style="padding: 2rem; text-align: center;">No scheduled classes for this day.</p>`;
      return;
    }

    scheduleRowsContainer.innerHTML = list.map(item => `
      <div class="schedule-row">
        <div class="schedule-time">${item.time}</div>
        <div>
          <div class="schedule-title">${item.title}</div>
          <div class="text-muted" style="font-size: 0.85rem;">${item.room} • ${item.category}</div>
        </div>
        <div class="schedule-instructor">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: #888;">Instructor</span><br>
          <strong>${item.instructor}</strong>
        </div>
        <div>
          <span class="schedule-spots ${item.spotsClass || ''}">${item.spots}</span>
        </div>
        <div>
          <button class="primary-button variant-dark btn-book-slot" data-title="${item.title}" data-time="${item.time}" data-instructor="${item.instructor}" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">
            <span>Reserve</span>
          </button>
        </div>
      </div>
    `).join('');

    // Attach click event to reserve buttons
    document.querySelectorAll('.btn-book-slot').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const title = btn.getAttribute('data-title');
        const time = btn.getAttribute('data-time');
        const instructor = btn.getAttribute('data-instructor');
        openBookingModal({ title, time, instructor });
      });
    });
  };

  renderDaySchedule('monday');

  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const day = btn.getAttribute('data-day');
      renderDaySchedule(day);
    });
  });
}

/* ==========================================================================
   Modals Engine (Class Detail & Live Booking)
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  if (!modalBackdrop) return;

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Global Quick Book Buttons
  document.querySelectorAll('[data-open-booking]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || 'Gentle Morning Flow';
      openBookingModal({ title: plan });
    });
  });
}

function openClassDetailModal(classObj) {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalDialog = document.querySelector('.modal-dialog');
  if (!modalBackdrop || !modalDialog) return;

  modalDialog.innerHTML = `
    <button class="modal-close-btn" aria-label="Close modal">✕</button>
    <div style="position: relative; height: 240px; border-radius: 16px; overflow: hidden; margin-bottom: 1.75rem;">
      <img src="${classObj.bg}" alt="${classObj.title}" style="width:100%; height:100%; object-fit:cover;">
      <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(42,31,8,0.85) 0%, transparent 60%);"></div>
      <div style="position:absolute; bottom: 1.25rem; left: 1.5rem; color:#fff;">
        <span class="subtitle white">${classObj.duration} • ${classObj.intensity}</span>
        <h2 style="color:#fff; font-size:2rem; margin-top:0.25rem;">${classObj.title}</h2>
      </div>
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      <div class="subtitle" style="margin-bottom: 0.5rem;">Lead Teacher</div>
      <p style="font-weight: 600; color: var(--dark-brown);">${classObj.instructor}</p>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <div class="subtitle" style="margin-bottom: 0.5rem;">Class Philosophy & Experience</div>
      <p style="color: var(--brown-grey); line-height: 1.65;">${classObj.description}</p>
    </div>

    <div style="margin-bottom: 2rem;">
      <div class="subtitle" style="margin-bottom: 0.5rem;">Key Benefits</div>
      <ul style="padding-left: 1.25rem; list-style: disc; display: flex; flex-direction: column; gap: 0.4rem; color: var(--brown-grey);">
        ${classObj.benefits.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="primary-button" id="btn-modal-reserve-class" style="flex:1;">
        <div class="button-text-wrapper">
          <div class="button-text-inner">
            <span class="button-text">Book This Class</span>
            <span class="button-text">Book This Class</span>
          </div>
        </div>
      </button>
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Attach close listener
  modalDialog.querySelector('.modal-close-btn').addEventListener('click', () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Attach reserve button
  modalDialog.querySelector('#btn-modal-reserve-class').addEventListener('click', () => {
    openBookingModal({ title: classObj.title, instructor: classObj.instructor });
  });
}

function openBookingModal({ title = 'Selected Class', time = 'Flexible Slot', instructor = 'Studio Guide' }) {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalDialog = document.querySelector('.modal-dialog');
  if (!modalBackdrop || !modalDialog) return;

  modalDialog.innerHTML = `
    <button class="modal-close-btn" aria-label="Close modal">✕</button>
    <div style="margin-bottom: 1.5rem;">
      <span class="subtitle-badge dark">Sanctuary Reservation</span>
      <h2 style="font-size: 2.25rem; margin-top: 0.5rem;">Reserve Your Mat</h2>
      <p class="text-muted" style="font-size: 0.95rem;">Join us for an intentional, grounding practice at Dridha Yoga.</p>
    </div>

    <form id="booking-form">
      <div class="form-group">
        <label class="form-label">Selected Experience</label>
        <input type="text" class="form-input" id="book-class-name" value="${title}" required>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="date" class="form-input" id="book-date" required value="${new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group">
          <label class="form-label">Time Slot</label>
          <select class="form-select" id="book-time">
            <option value="07:30 AM">07:30 AM - Morning</option>
            <option value="12:00 PM">12:00 PM - Midday Flow</option>
            <option value="06:00 PM" selected>06:00 PM - Sunset & Candlelight</option>
            <option value="07:30 PM">07:30 PM - Night Meditation</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Your Full Name</label>
        <input type="text" class="form-input" id="book-name" placeholder="e.g. Maya Lin" required>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" id="book-email" placeholder="name@email.com" required>
        </div>
        <div class="form-group">
          <label class="form-label">Phone Number (WhatsApp)</label>
          <input type="tel" class="form-input" id="book-phone" placeholder="+60 11-3341 5327" required>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Special Inquiries or Injuries (Optional)</label>
        <textarea class="form-textarea" id="book-notes" rows="2" placeholder="Let our instructors know if you have any physical considerations..."></textarea>
      </div>

      <button type="submit" class="primary-button" style="width: 100%; margin-top: 0.5rem;">
        <div class="button-text-wrapper">
          <div class="button-text-inner">
            <span class="button-text">Confirm Booking (RM65 Drop-In / Free with Pass)</span>
            <span class="button-text">Confirm Booking (RM65 Drop-In / Free with Pass)</span>
          </div>
        </div>
      </button>
    </form>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Attach close listener
  modalDialog.querySelector('.modal-close-btn').addEventListener('click', () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Handle Form Submission
  const bookingForm = modalDialog.querySelector('#booking-form');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = modalDialog.querySelector('#book-name').value;
    const cName = modalDialog.querySelector('#book-class-name').value;
    const date = modalDialog.querySelector('#book-date').value;
    const time = modalDialog.querySelector('#book-time').value;

    const phone = modalDialog.querySelector('#book-phone')?.value || '';
    const notes = modalDialog.querySelector('#book-notes')?.value || '';

    const waMessage = encodeURIComponent(`Hi Dridha Yoga, I would like to confirm my class booking:\n• Name: ${name}\n• Class: ${cName}\n• Date: ${date}\n• Time: ${time}${phone ? '\n• Phone: ' + phone : ''}${notes ? '\n• Note: ' + notes : ''}`);
    const waBookingUrl = `https://wa.me/601133415327?text=${waMessage}`;

    modalDialog.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div style="width: 68px; height: 68px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">✓</div>
        <span class="subtitle-badge dark">Booking Confirmed</span>
        <h2 style="font-size: 2.25rem; margin: 0.75rem 0;">Namaste, ${name}!</h2>
        <p style="color: var(--brown-grey); max-width: 420px; margin: 0 auto 1.75rem; line-height: 1.6;">
          Your reservation for <strong>${cName}</strong> on <strong>${date}</strong> at <strong>${time}</strong> is saved. You can also send this booking directly to our sanctuary guide on WhatsApp:
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 320px; margin: 0 auto 1.5rem;">
          <a href="${waBookingUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn-large">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 2C6.511 2 2.016 6.49 2.016 12C2.016 13.972 2.589 15.807 3.58 17.359L2.25 22.25L7.277 20.942C8.767 21.849 10.51 22.375 12.031 22.375C17.551 22.375 22.047 17.885 22.047 12.375C22.047 6.865 17.551 2 12.031 2ZM12.031 20.485C10.669 20.485 9.102 20.007 7.753 19.206L7.433 19.016L4.457 19.789L5.253 16.892L5.045 16.562C4.167 15.163 3.703 13.535 3.703 12C3.703 7.421 7.437 3.687 12.031 3.687C16.625 3.687 20.359 7.421 20.359 12C20.359 16.579 16.625 20.485 12.031 20.485ZM16.608 14.735C16.357 14.61 15.127 14.004 14.898 13.921C14.668 13.837 14.502 13.796 14.335 14.046C14.168 14.296 13.689 14.859 13.543 15.025C13.397 15.192 13.251 15.213 13 15.088C12.75 14.963 11.942 14.698 10.987 13.847C10.244 13.185 9.742 12.368 9.596 12.118C9.45 11.868 9.581 11.733 9.706 11.609C9.818 11.498 9.957 11.316 10.082 11.17C10.207 11.024 10.249 10.92 10.332 10.753C10.416 10.587 10.374 10.441 10.311 10.316C10.249 10.191 9.748 8.961 9.54 8.461C9.337 7.974 9.131 8.041 8.976 8.033L8.496 8.025C8.329 8.025 8.058 8.087 7.829 8.337C7.599 8.587 6.953 9.192 6.953 10.421C6.953 11.65 7.85 12.838 7.975 13.005C8.1 13.172 9.741 15.698 12.25 16.782C12.847 17.04 13.313 17.195 13.677 17.311C14.276 17.502 14.821 17.475 15.253 17.41C15.735 17.338 16.735 16.804 16.944 16.221C17.153 15.638 17.153 15.138 17.09 15.025C17.028 14.912 16.861 14.86 16.608 14.735Z"/></svg>
            <span>Confirm via WhatsApp</span>
          </a>
          <button class="primary-button variant-dark modal-close-btn-final" style="padding: 0.75rem 2rem;">
            <span>Done</span>
          </button>
        </div>
      </div>
    `;

    modalDialog.querySelector('.modal-close-btn-final').addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      showToast(`Reservation confirmed for ${name}! We look forward to practicing with you.`);
    });
  });
}

/* ==========================================================================
   Newsletter Subscription
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        const email = input.value;
        input.value = '';
        showToast(`Thank you for subscribing (${email})! Welcome to our mindful community.`);
      }
    });
  });
}

/* ==========================================================================
   Contact Form
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]')?.value || 'Friend';
    showToast(`Thank you ${name}, your inquiry has been received. Our studio team will reach out within 24 hours.`);
    contactForm.reset();
  });
}

/* ==========================================================================
   Toast Notifications
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="toast-icon">✓</div>
      <div class="toast-message"></div>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translate3d(0, 0, 0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translate3d(0, 30px, 0)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* ==========================================================================
   WhatsApp Floating Quick-Chat Widget
   ========================================================================== */
function initWhatsAppFloat() {
  if (document.querySelector('.whatsapp-float-btn')) return;

  const floatBtn = document.createElement('a');
  floatBtn.className = 'whatsapp-float-btn';
  floatBtn.href = 'https://wa.me/601133415327?text=Hi%20Dridha%20Yoga,%20I%20would%20like%20to%20inquire%20about%20classes%20and%20schedules.';
  floatBtn.target = '_blank';
  floatBtn.rel = 'noopener noreferrer';
  floatBtn.setAttribute('aria-label', 'Chat with Dridha Yoga on WhatsApp');

  floatBtn.innerHTML = `
    <span class="float-badge-pulse"></span>
    <svg viewBox="0 0 24 24"><path d="M12.031 2C6.511 2 2.016 6.49 2.016 12C2.016 13.972 2.589 15.807 3.58 17.359L2.25 22.25L7.277 20.942C8.767 21.849 10.51 22.375 12.031 22.375C17.551 22.375 22.047 17.885 22.047 12.375C22.047 6.865 17.551 2 12.031 2ZM12.031 20.485C10.669 20.485 9.102 20.007 7.753 19.206L7.433 19.016L4.457 19.789L5.253 16.892L5.045 16.562C4.167 15.163 3.703 13.535 3.703 12C3.703 7.421 7.437 3.687 12.031 3.687C16.625 3.687 20.359 7.421 20.359 12C20.359 16.579 16.625 20.485 12.031 20.485ZM16.608 14.735C16.357 14.61 15.127 14.004 14.898 13.921C14.668 13.837 14.502 13.796 14.335 14.046C14.168 14.296 13.689 14.859 13.543 15.025C13.397 15.192 13.251 15.213 13 15.088C12.75 14.963 11.942 14.698 10.987 13.847C10.244 13.185 9.742 12.368 9.596 12.118C9.45 11.868 9.581 11.733 9.706 11.609C9.818 11.498 9.957 11.316 10.082 11.17C10.207 11.024 10.249 10.92 10.332 10.753C10.416 10.587 10.374 10.441 10.311 10.316C10.249 10.191 9.748 8.961 9.54 8.461C9.337 7.974 9.131 8.041 8.976 8.033L8.496 8.025C8.329 8.025 8.058 8.087 7.829 8.337C7.599 8.587 6.953 9.192 6.953 10.421C6.953 11.65 7.85 12.838 7.975 13.005C8.1 13.172 9.741 15.698 12.25 16.782C12.847 17.04 13.313 17.195 13.677 17.311C14.276 17.502 14.821 17.475 15.253 17.41C15.735 17.338 16.735 16.804 16.944 16.221C17.153 15.638 17.153 15.138 17.09 15.025C17.028 14.912 16.861 14.86 16.608 14.735Z"/></svg>
    <span>WhatsApp</span>
  `;

  document.body.appendChild(floatBtn);
}
