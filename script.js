/* ==========================================================================
   EMIRATES PREMIUM - CARGO HUB CHINA-AFRICA
   JavaScript Interactivity & Tracking Engine
   ========================================================================== */

// Database Mock for Tracking Numbers
const MOCK_SHIPMENTS = {
  'EP2505CN23789': {
    code: 'EP2505CN23789',
    status: 'En transit',
    statusClass: 'status-transit',
    origin: 'Guangzhou Hub (Chine)',
    destination: 'Douala Port (Cameroun)',
    weight: '345 kg / 1.8 CBM',
    service: 'Fret Maritime Groupage',
    lastUpdate: '25 Mai 2025 - 14:30',
    location: 'Port de départ - Guangzhou, Chine',
    estimatedDelivery: '12 Juin 2025',
    timeline: [
      { step: 'Réception Hub Guangzhou', date: '20 Mai 2025', done: true },
      { step: 'Contrôle & Inspection Qualité', date: '21 Mai 2025', done: true },
      { step: 'Emballage & Étiquetage', date: '22 Mai 2025', done: true },
      { step: 'Consolidation Conteneur #CN892', date: '24 Mai 2025', done: true },
      { step: 'Chargement Navire - En mer', date: '25 Mai 2025', current: true },
      { step: 'Dédouanement Douala', date: 'En attente', done: false },
      { step: 'Livraison finale à Yaoundé/Douala', date: 'En attente', done: false }
    ]
  },
  'EP9988CN00123': {
    code: 'EP9988CN00123',
    status: 'Expédié - Aérien',
    statusClass: 'status-express',
    origin: 'Aéroport Guangzhou CAN',
    destination: 'Aéroport Yaoundé NSI',
    weight: '45 kg',
    service: 'Fret Aérien Super Express 24h',
    lastUpdate: '10 Septembre 2026 - 08:15',
    location: 'En vol vers Yaoundé',
    estimatedDelivery: '11 Septembre 2026',
    timeline: [
      { step: 'Réception Colis', date: '09 Sept 2026 - 16:00', done: true },
      { step: 'Contrôle Sécurité Aérienne', date: '09 Sept 2026 - 19:30', done: true },
      { step: 'Emballage Protecteur', date: '09 Sept 2026 - 21:00', done: true },
      { step: 'Embarquement Vol Cargo #EP402', date: '10 Sept 2026 - 04:00', done: true },
      { step: 'En Vol Transcontinental', date: '10 Sept 2026 - 08:15', current: true },
      { step: 'Livraison Porte-à-Porte', date: 'En attente', done: false }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
});

/* Navbar sticky scroll effect */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* Mobile Drawer Menu & Dropdowns */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    // Handle dropdown toggles on mobile
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('.nav-link');
      if (link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });
      }
    });

    // Close mobile drawer when clicking non-dropdown links
    const directLinks = document.querySelectorAll('.nav-item:not(.dropdown) .nav-link, .dropdown-menu a');
    directLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          if (mobileToggle) mobileToggle.classList.remove('open');
        }
      });
    });
  }
}

/* Scroll to Search section */
function scrollToSearch() {
  const suiviSection = document.getElementById('suivi');
  if (suiviSection) {
    suiviSection.scrollIntoView({ behavior: 'smooth' });
    const input = document.getElementById('trackingInput');
    if (input) {
      setTimeout(() => input.focus(), 600);
    }
  }
}

/* Handle Search Submit */
function handleSearch(event) {
  event.preventDefault();
  const input = document.getElementById('trackingInput');
  const query = input.value.trim().toUpperCase();

  if (!query) return;

  openDetailsModal(query);
}

/* Open Details Modal */
function openDetailsModal(trackingCode) {
  const modal = document.getElementById('trackingModal');
  const title = document.getElementById('modalTrackingTitle');
  const badge = document.getElementById('modalStatusBadge');
  const body = document.getElementById('modalTrackingBody');

  const data = MOCK_SHIPMENTS[trackingCode] || {
    code: trackingCode,
    status: 'En cours de traitement',
    statusClass: 'status-transit',
    origin: 'Guangzhou Hub (Chine)',
    destination: 'Cameroun',
    weight: 'Information en cours d\'enregistrement',
    service: 'Fret Standard',
    lastUpdate: 'Aujourd\'hui',
    location: 'Entrepôt Guangzhou',
    estimatedDelivery: '3 à 7 jours',
    timeline: [
      { step: 'Réception en agence Chine', date: 'Enregistré', done: true },
      { step: 'Préparation du conteneur/vol', date: 'En cours', current: true },
      { step: 'Expédition vers le Cameroun', date: 'En attente', done: false },
      { step: 'Livraison finale client', date: 'En attente', done: false }
    ]
  };

  title.innerText = `Expédition ${data.code}`;
  badge.innerText = data.status;

  let timelineHTML = data.timeline.map(item => `
    <div class="modal-timeline-item ${item.done ? 'done' : ''} ${item.current ? 'current' : ''}">
      <div class="timeline-dot"></div>
      <div class="timeline-info">
        <strong>${item.step}</strong>
        <span>${item.date}</span>
      </div>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="shipment-summary-box">
      <div class="summary-row">
        <div><span class="label">Origine:</span> <strong>${data.origin}</strong></div>
        <div><span class="label">Destination:</span> <strong>${data.destination}</strong></div>
      </div>
      <div class="summary-row">
        <div><span class="label">Service:</span> <strong>${data.service}</strong></div>
        <div><span class="label">Poids/Vol:</span> <strong>${data.weight}</strong></div>
      </div>
      <div class="summary-row">
        <div><span class="label">Statut actuel:</span> <strong style="color:#C89736;">${data.location}</strong></div>
        <div><span class="label">Livraison estimée:</span> <strong>${data.estimatedDelivery}</strong></div>
      </div>
    </div>

    <h4 style="margin: 20px 0 10px; font-family: 'Playfair Display', serif;">Historique et Étapes</h4>
    <div class="modal-timeline">
      ${timelineHTML}
    </div>

    <div style="margin-top: 24px; text-align: center;">
      <a href="https://wa.me/8613249700362?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20mon%20colis%20${data.code}" 
         target="_blank" 
         class="btn btn-gold btn-block">
        Assistance WhatsApp en direct pour ce colis
      </a>
    </div>
  `;

  modal.classList.add('active');
}

/* Devis Modal */
function openDevisModal() {
  const modal = document.getElementById('devisModal');
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

/* Handle Devis Submit */
function handleDevisSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('devisName').value;
  const phone = document.getElementById('devisPhone').value;
  
  alert(`Merci ${name} ! Votre demande de devis a été enregistrée avec succès. Notre équipe vous recontactera rapidement sur le numéro ${phone}.`);
  closeModal('devisModal');
}

/* ================= AUTHENTICATION (CONNEXION & INSCRIPTION) ================= */

function openAuthModal(defaultTab = 'login') {
  const modal = document.getElementById('authModal');
  if (modal) {
    switchAuthTab(defaultTab);
    modal.classList.add('active');
  }
}

function switchAuthTab(tabName) {
  const tabConnexionBtn = document.getElementById('tabConnexionBtn');
  const tabInscriptionBtn = document.getElementById('tabInscriptionBtn');
  const formConnexionTab = document.getElementById('formConnexionTab');
  const formInscriptionTab = document.getElementById('formInscriptionTab');

  if (tabName === 'login') {
    tabConnexionBtn.classList.add('active');
    tabInscriptionBtn.classList.remove('active');
    formConnexionTab.classList.add('active');
    formInscriptionTab.classList.remove('active');
  } else {
    tabInscriptionBtn.classList.add('active');
    tabConnexionBtn.classList.remove('active');
    formInscriptionTab.classList.add('active');
    formConnexionTab.classList.remove('active');
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const emailOrPhone = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!emailOrPhone || !password) return;

  const displayName = emailOrPhone.includes('@') 
    ? emailOrPhone.split('@')[0] 
    : emailOrPhone;

  const user = {
    fullName: displayName.charAt(0).toUpperCase() + displayName.slice(1),
    identifier: emailOrPhone,
    isLoggedIn: true
  };

  localStorage.setItem('ep_user', JSON.stringify(user));
  updateHeaderUserUI();
  closeModal('authModal');
  alert(`Bienvenue ${user.fullName} ! Vous êtes désormais connecté à votre espace client Emirates Premium.`);
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const fullName = document.getElementById('regFullName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;

  // Validation: Passwords match check
  if (password !== confirmPassword) {
    alert("⚠️ Erreur : Les mots de passe ne correspondent pas. Veuillez vérifier votre saisie.");
    return;
  }

  const newUser = {
    fullName: fullName,
    phone: phone,
    email: email,
    isLoggedIn: true
  };

  localStorage.setItem('ep_user', JSON.stringify(newUser));
  updateHeaderUserUI();
  closeModal('authModal');

  // Reset form
  event.target.reset();

  alert(`🎉 Félicitations ${fullName} !\n\nVotre compte d'expédition a été créé avec succès.\nUn code client unique vous sera attribué pour vos colis depuis la Chine.`);
}

function checkUserSession() {
  updateHeaderUserUI();
}

function updateHeaderUserUI() {
  const btnConnexion = document.getElementById('btnConnexion');
  if (!btnConnexion) return;

  const savedUser = localStorage.getItem('ep_user');

  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      const firstName = user.fullName ? user.fullName.split(' ')[0] : 'Client';
      
      btnConnexion.outerHTML = `
        <button class="user-menu-btn" id="btnConnexion" onclick="handleLogout()">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>${firstName}</span>
          <span style="font-size:0.75rem; opacity:0.8;">(Déconnexion)</span>
        </button>
      `;
    } catch (e) {
      console.error(e);
    }
  } else {
    btnConnexion.outerHTML = `
      <button class="btn btn-navy btn-espace" id="btnConnexion" onclick="openAuthModal('login')">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
        <span>Connexion</span>
      </button>
    `;
  }
}

function handleLogout() {
  if (confirm("Voulez-vous vraiment vous déconnecter de votre espace client ?")) {
    localStorage.removeItem('ep_user');
    updateHeaderUserUI();
  }
}

// Check user session on page load
document.addEventListener('DOMContentLoaded', () => {
  checkUserSession();
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal-overlay')) {
    event.target.classList.remove('active');
  }
});

