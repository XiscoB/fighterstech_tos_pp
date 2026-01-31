/**
 * FightersTech Legal Portal - Common Header & Footer
 * Injects consistent header and footer across all legal pages
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    logoFile: 'fighterstech.png',
    mainSiteUrl: 'https://promo.fighterstech.com',
    socialLinks: {
      twitter: 'https://twitter.com/fighterstech',
      instagram: 'https://instagram.com/fighterstech',
      tiktok: 'https://www.tiktok.com/@fighterstech',
      bluesky: 'https://bsky.app/profile/fighterstech.bsky.social'
    },
    emails: {
      legal: 'legal@fighterstech.com',
      support: 'support@fighterstech.com'
    }
  };

  // Inject header styles (including logo hover effects)
  function injectHeaderStyles() {
    if (document.getElementById('ft-header-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'ft-header-styles';
    styles.textContent = `
      /* Header Logo Hover Effects */
      .header-logo {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      
      .header-logo-text {
        font-family: var(--font-display, 'Chakra Petch', sans-serif);
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary, #fff);
        transition: all 0.2s ease;
      }
      
      /* Text hover: Gold color with subtle glow */
      .header-logo:hover .header-logo-text {
        color: #fcaf01;
        text-shadow: 0 0 12px rgba(252, 175, 1, 0.5), 0 0 24px rgba(252, 175, 1, 0.3);
      }
      
      /* Logo image hover: Stronger gold glow + scale up */
      .header-logo img {
        height: 40px;
        width: auto;
        transition: all 0.2s ease;
        filter: drop-shadow(0 0 0 rgba(252, 175, 1, 0));
      }
      
      .header-logo:hover img {
        transform: scale(1.05);
        filter: drop-shadow(0 0 8px rgba(252, 175, 1, 0.8)) drop-shadow(0 0 16px rgba(252, 175, 1, 0.5));
      }
    `;
    document.head.appendChild(styles);
  }

  // Inject modal styles
  function injectModalStyles() {
    if (document.getElementById('ft-modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'ft-modal-styles';
    styles.textContent = `
      .ft-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 26, 51, 0.9);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .ft-modal-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .ft-modal {
        background: var(--bg-secondary, #00284e);
        border: 1px solid rgba(252, 175, 1, 0.3);
        border-radius: 16px;
        padding: 32px;
        max-width: 420px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        transform: scale(0.9);
        transition: transform 0.3s ease;
      }
      .ft-modal-overlay.active .ft-modal {
        transform: scale(1);
      }
      .ft-modal-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      .ft-modal h3 {
        font-family: var(--font-display, 'Chakra Petch', sans-serif);
        font-size: 1.5rem;
        color: var(--text-primary, #fff);
        margin-bottom: 12px;
      }
      .ft-modal p {
        color: var(--text-secondary, rgba(255,255,255,0.8));
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 24px;
      }
      .ft-modal-buttons {
        display: flex;
        gap: 12px;
        justify-content: center;
      }
      .ft-modal-btn {
        padding: 12px 24px;
        border-radius: 8px;
        font-family: var(--font-display, 'Chakra Petch', sans-serif);
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
      }
      .ft-modal-btn-primary {
        background: var(--accent-gold, #fcaf01);
        color: var(--bg-primary, #001a33);
      }
      .ft-modal-btn-primary:hover {
        background: var(--accent-gold-hover, #ffd700);
        transform: translateY(-2px);
      }
      .ft-modal-btn-secondary {
        background: transparent;
        color: var(--text-secondary, rgba(255,255,255,0.8));
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      .ft-modal-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary, #fff);
      }
      @media (max-width: 480px) {
        .ft-modal {
          padding: 24px;
        }
        .ft-modal-buttons {
          flex-direction: column;
        }
        .ft-modal-btn {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  // Create and show exit confirmation modal
  function showExitModal(targetUrl, lang) {
    injectModalStyles();
    
    const labels = {
      title: lang === 'es' ? '¿Salir del Portal Legal?' : 'Leave Legal Portal?',
      message: lang === 'es' 
        ? 'Estás a punto de salir del portal legal y serás redirigido al sitio principal de FightersTech. ¿Deseas continuar?' 
        : 'You are about to leave the legal portal and be redirected to the main FightersTech website. Do you wish to continue?',
      confirm: lang === 'es' ? 'Sí, continuar' : 'Yes, continue',
      cancel: lang === 'es' ? 'Cancelar' : 'Cancel'
    };

    // Remove existing modal if any
    const existingModal = document.getElementById('ft-exit-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'ft-exit-modal';
    modal.className = 'ft-modal-overlay';
    modal.innerHTML = `
      <div class="ft-modal">
        <div class="ft-modal-icon">🚪</div>
        <h3>${labels.title}</h3>
        <p>${labels.message}</p>
        <div class="ft-modal-buttons">
          <button class="ft-modal-btn ft-modal-btn-secondary" id="ft-modal-cancel">${labels.cancel}</button>
          <button class="ft-modal-btn ft-modal-btn-primary" id="ft-modal-confirm">${labels.confirm}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Show modal with animation
    requestAnimationFrame(() => {
      modal.classList.add('active');
    });

    // Handle buttons
    modal.querySelector('#ft-modal-confirm').addEventListener('click', () => {
      window.location.href = targetUrl;
    });

    modal.querySelector('#ft-modal-cancel').addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
      }
    });

    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Calculate path to root based on the current script location
  // This script is always at: /js/header-footer.js
  function getRootPath() {
    // Find this script's src
    const scripts = document.querySelectorAll('script[src*="header-footer.js"]');
    if (scripts.length === 0) return './';
    
    const scriptSrc = scripts[0].getAttribute('src');
    // scriptSrc could be: ./js/header-footer.js or ../js/header-footer.js or ../../js/header-footer.js
    
    // Remove the 'js/header-footer.js' part to get the root path
    const rootPath = scriptSrc.replace('js/header-footer.js', '');
    return rootPath || './';
  }

  // Get path prefix for logo and other root resources
  function getPathPrefix() {
    return getRootPath();
  }

  // Get path to root (for links that should go to language-specific landing)
  function getLanguagePrefix() {
    const path = window.location.pathname;
    const isSpanish = path.includes('/es/');
    const rootPath = getRootPath();
    
    // If we're at root or language root, use current dir
    if (rootPath === './') {
      return isSpanish ? './es/' : './en/';
    }
    
    // For nested pages, add language folder to root path
    if (isSpanish) {
      return rootPath + 'es/';
    }
    return rootPath + 'en/';
  }

  // Detect language
  function getLanguage() {
    const path = window.location.pathname;
    if (path.includes('/es/')) return 'es';
    return 'en';
  }

  // Create header HTML
  function createHeader() {
    const prefix = getPathPrefix();
    const lang = getLanguage();
    
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="header-inner">
        <a href="${CONFIG.mainSiteUrl}" class="header-logo" id="ft-header-logo">
          <img src="${prefix}${CONFIG.logoFile}" alt="FightersTech Logo">
          <span class="header-logo-text">FightersTech</span>
        </a>
        <nav class="header-nav">
          <a href="${CONFIG.mainSiteUrl}" id="ft-back-link">← ${lang === 'es' ? 'Volver al Sitio Principal' : 'Back to Main Site'}</a>
        </nav>
      </div>
    `;
    
    // Add click handlers for exit confirmation
    const logoLink = header.querySelector('#ft-header-logo');
    const backLink = header.querySelector('#ft-back-link');
    
    const handleExitClick = (e) => {
      e.preventDefault();
      showExitModal(CONFIG.mainSiteUrl, lang);
    };
    
    logoLink.addEventListener('click', handleExitClick);
    backLink.addEventListener('click', handleExitClick);
    
    return header;
  }

  // Create footer HTML
  function createFooter() {
    const prefix = getPathPrefix();
    const langPrefix = getLanguagePrefix();
    const lang = getLanguage();
    
    const currentYear = new Date().getFullYear();
    
    const labels = {
      legal: lang === 'es' ? 'Legal' : 'Legal',
      contact: lang === 'es' ? 'Contacto' : 'Contact',
      privacy: lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy',
      terms: lang === 'es' ? 'Términos y Condiciones' : 'Terms of Service',
      cookies: lang === 'es' ? 'Política de Cookies' : 'Cookie Policy',
      conduct: lang === 'es' ? 'Código de Conducta' : 'Code of Conduct',
      rights: lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'
    };

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container" style="padding-top: 0;">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="${prefix}${CONFIG.logoFile}" alt="FightersTech Logo">
            <h3>FightersTech</h3>
            <p>${lang === 'es' 
              ? 'La plataforma definitiva para la Comunidad de Juegos de Lucha. Entrena, lucha y compite al máximo.' 
              : 'The ultimate platform for the Fighting Game Community. Train, fight, and compete at your best.'}</p>
            <div class="social-links">
              <a href="${CONFIG.socialLinks.twitter}" class="social-link" target="_blank" rel="noopener" aria-label="Twitter">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="${CONFIG.socialLinks.instagram}" class="social-link" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="${CONFIG.socialLinks.tiktok}" class="social-link" target="_blank" rel="noopener" aria-label="TikTok">
                <svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="${CONFIG.socialLinks.bluesky}" class="social-link" target="_blank" rel="noopener" aria-label="Bluesky">
                <svg viewBox="0 0 24 24"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.599.9 2.15.508 2.48.172 2.9 0 3.36c-.172.46-.1.982.1 1.42.2.44.56.8 1.02 1.02.2.1.4.18.62.22-.22 2.02.28 4.18 1.52 6.06 1.76 2.7 4.78 4.76 8.74 4.76s7-2.06 8.76-4.76c1.24-1.88 1.74-4.04 1.52-6.06.22-.04.42-.12.62-.22.46-.22.82-.58 1.02-1.02.2-.44.26-.96.1-1.42-.18-.46-.52-.88-.92-1.2-.66-.56-1.66-1.2-4.3.7-2.76 1.94-5.72 5.88-6.8 8z"/></svg>
              </a>
            </div>
          </div>
          <div class="footer-column">
            <h4>${labels.legal}</h4>
            <ul class="footer-links">
              <li><a href="${langPrefix}privacy-policy/">${labels.privacy}</a></li>
              <li><a href="${langPrefix}terms-and-conditions/">${labels.terms}</a></li>
              <li><a href="${langPrefix}cookies-policy/">${labels.cookies}</a></li>
              <li><a href="${langPrefix}conduct/">${labels.conduct}</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>${labels.contact}</h4>
            <ul class="footer-links">
              <li><a href="mailto:${CONFIG.emails.legal}">${CONFIG.emails.legal}</a></li>
              <li><a href="mailto:${CONFIG.emails.support}">${CONFIG.emails.support}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${currentYear} FightersTech. ${labels.rights}</p>
        </div>
      </div>
    `;
    return footer;
  }

  // Create background grid
  function createBgGrid() {
    const bgGrid = document.createElement('div');
    bgGrid.className = 'bg-grid';
    return bgGrid;
  }

  // Main initialization
  function init() {
    // Don't run if already initialized
    if (document.querySelector('.site-header')) return;

    // Inject header styles (including logo hover effects)
    injectHeaderStyles();

    const body = document.body;
    
    // Insert bg-grid at the beginning of body
    body.insertBefore(createBgGrid(), body.firstChild);
    
    // Insert header after bg-grid
    body.insertBefore(createHeader(), body.children[1]);
    
    // Find or create container for content wrapping
    let container = document.querySelector('.container');
    if (!container) {
      // Wrap all body content in a container
      container = document.createElement('div');
      container.className = 'container';
      
      // Move all content except header/footer/bg-grid into container
      const elementsToWrap = [];
      for (let i = 0; i < body.children.length; i++) {
        const el = body.children[i];
        if (!el.classList.contains('site-header') && 
            !el.classList.contains('bg-grid') && 
            !el.classList.contains('site-footer')) {
          elementsToWrap.push(el);
        }
      }
      
      elementsToWrap.forEach(el => container.appendChild(el));
      body.appendChild(container);
    }
    
    // Insert footer after container
    const existingFooter = document.querySelector('.site-footer');
    if (!existingFooter) {
      body.appendChild(createFooter());
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
