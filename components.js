/**
 * 珠海三界智能科技有限公司 — 公共组件 v2
 * Navbar / Footer / Banner Slider / Scroll Animations
 */

// Company Logo
const COMPANY_LOGO = '<img src="images/sji-logo.svg" alt="" style="height:30px;width:auto">';

// Current page detection
function getCurrentPage() {
  var p = window.location.pathname.split('/').pop() || 'index.html';
  return p;
}

// ── Navbar ──
function injectNavbar() {
  var cur = getCurrentPage();
  var nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';

  var links = [
    { href: 'index.html', text: '首页' },
    { href: 'about.html', text: '关于我们' },
    { href: 'products.html', text: '产品中心' },
    { href: 'solutions.html', text: '解决方案' },
    { href: 'news.html', text: '新闻资讯' },
    { href: 'contact.html', text: '联系我们' },
  ];

  var linksHTML = links.map(function(l) {
    var active = cur === l.href || (cur === '' && l.href === 'index.html');
    return '<a href="' + l.href + '" class="' + (active ? 'active' : '') + '">' + l.text + '</a>';
  }).join('');

  nav.innerHTML =
    '<a class="nav-brand" href="index.html">' + COMPANY_LOGO + '</a>' +
    '<div class="nav-links" id="navLinks">' + linksHTML + '</div>' +
    '<button class="nav-toggle" id="navToggle" aria-label="菜单">☰</button>';

  document.body.prepend(nav);
}

// ── Footer ──
function injectFooter() {
  var footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-contact">' +
          '<h4>珠海三界智能科技有限公司</h4>' +
          '<p>AI 驱动的工业自动化低代码平台</p>' +
          '<p>地址：广东省珠海市香洲区</p>' +
          '<p>邮箱：<a href="mailto:info@zhsji.com">info@zhsji.com</a></p>' +
          '<p>电话：<a href="tel:400-888-8888">400-888-8888</a></p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>快速链接</h4>' +
          '<a href="index.html">首页</a>' +
          '<a href="about.html">关于我们</a>' +
          '<a href="products.html">产品中心</a>' +
          '<a href="solutions.html">解决方案</a>' +
          '<a href="news.html">新闻资讯</a>' +
          '<a href="contact.html">联系我们</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<div class="footer-copy">© 2026 珠海三界智能科技有限公司 · 粤ICP备XXXXXXXX号</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(footer);
}

// ── Banner Slider ──
function initBanner() {
  var slides = document.querySelectorAll('.banner-slide');
  var dots = document.querySelectorAll('.banner-dot');
  if (slides.length === 0) return;
  var current = 0;

  function goTo(i) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  dots.forEach(function(dot, idx) {
    dot.addEventListener('click', function() { goTo(idx); });
  });

  setInterval(function() {
    goTo((current + 1) % slides.length);
  }, 5000);
}

// ── Particles ──
function initParticles() {
  var canvas = document.getElementById('particles');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w, h, pts = [];

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  for (var i = 0; i < 60; i++) {
    pts.push({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.2 + .4,
      dx: (Math.random() - .5) * .25, dy: (Math.random() - .5) * .25,
      o: Math.random() * .15 + .05
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(155,27,48,' + p.o + ')'; ctx.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(155,27,48,' + (.03 * (1 - d / 110)) + ')'; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Scroll Animations ──
function initScrollAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(function(el) { observer.observe(el); });
}

// ── Navbar Scroll ──
function initNavbarScroll() {
  window.addEventListener('scroll', function() {
    var nb = document.getElementById('navbar');
    if (nb) nb.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── Mobile Nav ──
function initMobileNav() {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
  }
}

// ── Init ──
document.addEventListener('DOMContentLoaded', function() {
  injectNavbar();
  injectFooter();
  initParticles();
  initBanner();
  initNavbarScroll();
  initMobileNav();
  setTimeout(initScrollAnimations, 80);
});
