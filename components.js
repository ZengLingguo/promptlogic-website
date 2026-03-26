/**
 * 珠海三界智能科技有限公司 — 公共组件加载器
 * 动态注入 Header 和 Footer，保持各页面一致性
 */

// Company Logo (SJI)
const COMPANY_LOGO = `<img src="images/sji-logo.svg" alt="三界智能" style="height:32px;width:auto">`;

// Product Logo (言绎 PromptLogic) - kept for product pages
const PRODUCT_LOGO_SVG = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#9b1b30"/><stop offset="100%" stop-color="#c9a96e"/></linearGradient></defs>
  <path d="M30 25 C30 25 60 25 70 25 C85 25 95 35 95 50 C95 65 85 75 70 75 L55 75 C40 75 30 85 30 95" stroke="url(#lg)" stroke-width="12" fill="none" stroke-linecap="round"/>
  <circle cx="80" cy="20" r="6" fill="#9b1b30"/>
  <line x1="22" y1="88" x2="22" y2="105" stroke="#9b1b30" stroke-width="3" stroke-linecap="round"/>
  <line x1="28" y1="90" x2="28" y2="105" stroke="#9b1b30" stroke-width="3" stroke-linecap="round"/>
  <line x1="34" y1="92" x2="34" y2="105" stroke="#9b1b30" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// Detect current page for active nav link
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  return page;
}

// Inject Navbar
function injectNavbar() {
  const currentPage = getCurrentPage();
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';

  const links = [
    { href: 'index.html', text: '首页' },
    { href: 'about.html', text: '关于我们' },
    { href: 'products.html', text: '产品中心' },
    { href: 'solutions.html', text: '解决方案' },
    { href: 'news.html', text: '新闻动态' },
    { href: 'contact.html', text: '联系我们' },
  ];

  const linksHTML = links.map(l => {
    const isActive = currentPage === l.href || (currentPage === '' && l.href === 'index.html');
    return `<a href="${l.href}" class="${isActive ? 'active' : ''}">${l.text}</a>`;
  }).join('');

  nav.innerHTML = `
    <a class="nav-brand" href="index.html">
      ${COMPANY_LOGO}
      <span><span class="cn">三界智能</span></span>
    </a>
    <div class="nav-links" id="navLinks">
      ${linksHTML}
      <a href="contact.html" class="btn btn-primary nav-cta">联系我们</a>
    </div>
    <button class="nav-toggle" id="navToggle" aria-label="菜单">☰</button>
  `;

  document.body.prepend(nav);
}

// Inject Footer
function injectFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand-block">
          <a class="footer-logo" href="index.html">
            ${COMPANY_LOGO}
            <span><span class="cn">三界智能</span> · 珠海三界智能科技有限公司</span>
          </a>
          <p>珠海三界智能科技有限公司 — AI 驱动的工业自动化低代码平台。用自然语言创建工业工作流，让工厂技术员「言出法随」。</p>
          <div class="footer-social">
            <a href="#" title="微信">💬</a>
            <a href="#" title="GitHub">📦</a>
            <a href="mailto:info@zhsji.com" title="邮箱">📧</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>产品</h4>
          <a href="products.html">PromptLogic 平台</a>
          <a href="products.html#features">核心功能</a>
          <a href="products.html#architecture">技术架构</a>
          <a href="products.html#pricing">定价方案</a>
        </div>
        <div class="footer-col">
          <h4>解决方案</h4>
          <a href="solutions.html">3C 电子</a>
          <a href="solutions.html">新能源</a>
          <a href="solutions.html">汽车零部件</a>
          <a href="solutions.html">医药包装</a>
        </div>
        <div class="footer-col">
          <h4>公司</h4>
          <a href="about.html">关于我们</a>
          <a href="news.html">新闻动态</a>
          <a href="contact.html">联系我们</a>
          <a href="privacy.html">隐私政策</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© 2026 珠海三界智能科技有限公司 · 粤ICP备XXXXXXXX号 · 保留所有权利</div>
        <div class="footer-legal">
          <a href="privacy.html">隐私政策</a>
          <a href="#">服务条款</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}

// Init particles background
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, pts = [];

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 80; i++) {
    pts.push({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + .5,
      dx: (Math.random() - .5) * .3, dy: (Math.random() - .5) * .3,
      o: Math.random() * .3 + .1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(155,27,48,' + (p.o * 0.5) + ')'; ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(155,27,48,' + (.04 * (1 - d / 120)) + ')'; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// Scroll-based animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(function (el) { observer.observe(el); });
}

// Navbar scroll effect
function initNavbarScroll() {
  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Mobile nav toggle
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
  }
}

// Smooth anchor scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Initialize all common features
document.addEventListener('DOMContentLoaded', function () {
  injectNavbar();
  injectFooter();
  initParticles();
  initNavbarScroll();
  initMobileNav();
  initSmoothScroll();
  // Delay scroll animations slightly to let layout settle
  setTimeout(initScrollAnimations, 100);
});
