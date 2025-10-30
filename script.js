// No JS is strictly required for hover dropdowns, but you can enhance accessibility and mobile support here.

document.addEventListener("DOMContentLoaded", function() {
  // For mobile: toggle dropdowns on click
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
      if (window.innerWidth < 600) {
        e.preventDefault();
        const content = dropdown.querySelector('.dropdown-content');
        if (content.style.display === 'flex') {
          content.style.display = 'none';
        } else {
          content.style.display = 'flex';
        }
      }
    });
  });



   const video = document.querySelector('.hero-video');
    document.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      }
    });


document.addEventListener("DOMContentLoaded", function() {
  // Dropdown code (from previous sections) ...

  // Carousel code
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselImages = document.querySelectorAll('.carousel-img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');

  let currentIndex = 0;
  const imgWidth = carouselImages[0].offsetWidth + 16; // Adjust for margin

  function moveToSlide(index) {
    carouselTrack.style.transform = `translateX(-${imgWidth * index}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentIndex = index;
  }

  prevBtn.addEventListener('click', () => {
    let index = currentIndex - 1;
    if (index < 0) index = carouselImages.length - 1;
    moveToSlide(index);
  });

  nextBtn.addEventListener('click', () => {
    let index = currentIndex + 1;
    if (index >= carouselImages.length) index = 0;
    moveToSlide(index);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => moveToSlide(i));
  });

  // Optional: Auto-play
  let autoPlay = setInterval(() => {
    let index = currentIndex + 1;
    if (index >= carouselImages.length) index = 0;
    moveToSlide(index);
  }, 4000);

  // Pause on hover
  carouselTrack.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carouselTrack.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
      let index = currentIndex + 1;
      if (index >= carouselImages.length) index = 0;
      moveToSlide(index);
    }, 4000);
  });

  // Initialize
  moveToSlide(0);
});

// Swipe + prev/next buttons for each product card track
  (function() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      const track = card.querySelector('.card-track');
      const slides = Array.from(card.querySelectorAll('.card-slide'));
      const prevBtn = card.querySelector('.card-prev');
      const nextBtn = card.querySelector('.card-next');
      if (!track || slides.length === 0) return;

      // Calculate slide width (including gap if needed)
      function slideWidth() {
        return slides[0].getBoundingClientRect().width + 6; // 6px gap approx
      }

      // Buttons
      prevBtn && prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -slideWidth(), behavior: 'smooth' });
      });
      nextBtn && nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: slideWidth(), behavior: 'smooth' });
      });

      // Pointer drag (mouse/touch)
      let isDown = false;
      let startX;
      let scrollStart;

      track.addEventListener('pointerdown', (e) => {
        isDown = true;
        track.setPointerCapture(e.pointerId);
        startX = e.clientX;
        scrollStart = track.scrollLeft;
        track.classList.add('dragging');
      });

      track.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        track.scrollLeft = scrollStart - dx;
      });

      function endDrag() {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('dragging');

        // Snap to nearest slide
        const sw = slideWidth();
        if (sw <= 0) return;
        const index = Math.round(track.scrollLeft / sw);
        track.scrollTo({ left: index * sw, behavior: 'smooth' });
      }

      track.addEventListener('pointerup', endDrag);
      track.addEventListener('pointercancel', endDrag);
      track.addEventListener('lostpointercapture', endDrag);

      // Keyboard support: left/right arrow when track is focused
      track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          track.scrollBy({ left: -slideWidth(), behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
          track.scrollBy({ left: slideWidth(), behavior: 'smooth' });
        }
      });

      // Ensure initial snap alignment (for small JS-less fallback)
      window.addEventListener('load', () => {
        track.scrollTo({ left: 0 });
      });
    });
  })();

  (function() {
  const dropdownNav = document.getElementById('sitemapDropdownNav');
  const dropdownBtn = document.getElementById('sitemapDropdownBtn');
  const dropdownContent = document.getElementById('sitemapDropdownContent');

  // open/close dropdown on button
  dropdownBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
    dropdownNav.classList.toggle('open');
    dropdownBtn.setAttribute('aria-expanded', !expanded);
    if (!expanded) dropdownContent.focus && dropdownContent.focus();
  });

  // Keyboard accessibility for dropdown
  dropdownBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dropdownBtn.click();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Focus first link
      const firstLink = dropdownContent.querySelector('.sitemap-link, .sitemap-label');
      firstLink && firstLink.focus();
    }
  });

  // NAVBAR interactivity: dropdowns + mobile menu + keyboard accessible
    (function () {
      // Helpers
      function closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(d => {
          d.classList.remove('open');
          const btn = d.querySelector('button');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }

      // Collection dropdown
      const collection = document.getElementById('collectionDropdown');
      const collectionBtn = document.getElementById('collectionBtn');
      collectionBtn && collectionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = collection.classList.toggle('open');
        collectionBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        // close others
        if (isOpen) {
          document.querySelectorAll('.dropdown').forEach(d => { if (d !== collection) d.classList.remove('open'); });
        }
      });

      // Cart dropdown
      const cart = document.getElementById('cartDropdown');
      const cartBtn = document.getElementById('cartBtn');
      cartBtn && cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = cart.classList.toggle('open');
        cartBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) {
          document.querySelectorAll('.dropdown').forEach(d => { if (d !== cart) d.classList.remove('open'); });
        }
      });

      // Close dropdowns when clicking outside or pressing Escape
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) closeAllDropdowns();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllDropdowns();
      });

      // Mobile menu open/close
      const hamburger = document.getElementById('hamburgerBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileClose = document.getElementById('mobileClose');
      hamburger && hamburger.addEventListener('click', () => {
        mobileMenu.hidden = false;
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
      mobileClose && mobileClose.addEventListener('click', () => {
        mobileMenu.hidden = true;
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });

      // Mobile toggles for submenus
      document.querySelectorAll('.mobile-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = document.getElementById(btn.dataset.target);
          if (!target) return;
          const isHidden = target.hidden;
          target.hidden = !isHidden;
          btn.textContent = isHidden ? btn.textContent.replace('▸','▾') : btn.textContent.replace('▾','▸');
        });
      });

      // Keyboard navigation for dropdown buttons
      [collectionBtn, cartBtn].forEach(button => {
        if (!button) return;
        button.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
          }
        });
      });

          // Close mobile on resize to desktop
          window.addEventListener('resize', () => {
            if (window.innerWidth > 900 && mobileMenu && !mobileMenu.hidden) {
              mobileMenu.hidden = true;
              mobileMenu.setAttribute('aria-hidden', 'true');
              document.body.style.overflow = '';
            }
          });
        })();
      })();
    }); // Centralized, defensive JS for navbar, mobile menu, dropdowns, product card swipe, and basic media controls.

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Dropdown / Navbar logic ---------- */
  const closeAllDropdowns = () => {
    document.querySelectorAll('.dropdown').forEach(d => {
      d.classList.remove('open');
      const btn = d.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  };

  // Collection
  const collection = document.getElementById('collectionDropdown');
  const collectionBtn = document.getElementById('collectionBtn');
  if (collection && collectionBtn) {
    collectionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const opened = collection.classList.toggle('open');
      collectionBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
      // close other dropdowns
      document.querySelectorAll('.dropdown').forEach(d => { if (d !== collection) d.classList.remove('open'); });
    });

    collectionBtn.addEventListener('keydown', (e) => {
      if (['Enter',' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        collectionBtn.click();
      }
    });
  }

  // Cart
  const cart = document.getElementById('cartDropdown');
  const cartBtn = document.getElementById('cartBtn');
  if (cart && cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const opened = cart.classList.toggle('open');
      cartBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
      document.querySelectorAll('.dropdown').forEach(d => { if (d !== cart) d.classList.remove('open'); });
    });

    cartBtn.addEventListener('keydown', (e) => {
      if (['Enter',' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        cartBtn.click();
      }
    });
  }

  // Close dropdowns on outside click or Esc
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) closeAllDropdowns();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (hamburger && mobileMenu) {
    const openMobile = () => {
      mobileMenu.hidden = false;
      mobileMenu.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const closeMobile = () => {
      mobileMenu.hidden = true;
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', openMobile);
    if (mobileClose) mobileClose.addEventListener('click', closeMobile);

    // close mobile menu when tapping outside the menu content
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMobile();
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobile();
    });
  }

  // Mobile submenu toggles
  document.querySelectorAll('.mobile-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
      if (!target) return;
      const willOpen = target.hasAttribute('hidden');
      target.hidden = !willOpen;
      btn.setAttribute('aria-expanded', String(willOpen));
      // toggle arrow char
      btn.textContent = btn.textContent.includes('▸') ? btn.textContent.replace('▸','▾') : btn.textContent.replace('▾','▸');
    });
  });

  // Close mobile on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileMenu && !mobileMenu.hidden) {
      mobileMenu.hidden = true;
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Hero video minor enhancement ---------- */
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    // ensure video plays inline on mobile (already set with playsinline)
    document.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play().catch(() => {});
      }
    });
  }

  /* ---------- Product cards: swipe + prev/next ---------- */
  (function initProductCards() {
    const cards = document.querySelectorAll('.product-card');
    if (!cards || cards.length === 0) return;

    cards.forEach(card => {
      const track = card.querySelector('.card-track');
      const slides = Array.from(card.querySelectorAll('.card-slide'));
      const prevBtn = card.querySelector('.card-prev');
      const nextBtn = card.querySelector('.card-next');
      if (!track || slides.length === 0) return;

      const gap = 6; // should match CSS
      const slideWidth = () => {
        const w = slides[0].getBoundingClientRect().width;
        return w + gap;
      };

      // Prev/Next buttons (if present)
      if (prevBtn) prevBtn.addEventListener('click', () => track.scrollBy({ left: -slideWidth(), behavior: 'smooth' }));
      if (nextBtn) nextBtn.addEventListener('click', () => track.scrollBy({ left: slideWidth(), behavior: 'smooth' }));

      // Pointer drag
      let isDown = false;
      let startX = 0;
      let scrollStart = 0;
      let pointerId = null;

      const onPointerDown = (e) => {
        isDown = true;
        pointerId = e.pointerId;
        track.setPointerCapture(pointerId);
        startX = e.clientX;
        scrollStart = track.scrollLeft;
        track.classList.add('dragging');
      };
      const onPointerMove = (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        track.scrollLeft = scrollStart - dx;
      };
      const onPointerUp = () => {
        if (!isDown) return;
        isDown = false;
        if (pointerId) {
          try { track.releasePointerCapture(pointerId); } catch (err) {}
          pointerId = null;
        }
        track.classList.remove('dragging');
        // snap
        const sw = slideWidth();
        if (sw <= 0) return;
        const index = Math.round(track.scrollLeft / sw);
        track.scrollTo({ left: index * sw, behavior: 'smooth' });
      };

      track.addEventListener('pointerdown', onPointerDown);
      track.addEventListener('pointermove', onPointerMove);
      track.addEventListener('pointerup', onPointerUp);
      track.addEventListener('pointercancel', onPointerUp);
      track.addEventListener('lostpointercapture', onPointerUp);

      // keyboard
      track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') track.scrollBy({ left: -slideWidth(), behavior: 'smooth' });
        if (e.key === 'ArrowRight') track.scrollBy({ left: slideWidth(), behavior: 'smooth' });
      });

      // ensure initial alignment
      window.addEventListener('load', () => {
        track.scrollTo({ left: 0 });
      });
    });
  })();

  /* ---------- Optional: Carousel initialization (if exists) ---------- */
  (function initCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselImages = document.querySelectorAll('.carousel-img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    if (!carouselTrack || !carouselImages || carouselImages.length === 0) return;

    let currentIndex = 0;
    // compute width safely on load/resize
    const getImgWidth = () => carouselImages[0].offsetWidth + 16; // adjust if you use margin/gap

    const moveToSlide = (index) => {
      const w = getImgWidth();
      carouselTrack.style.transform = `translateX(-${w * index}px)`;
      if (dots.length) dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      currentIndex = index;
    };

    if (prevBtn) prevBtn.addEventListener('click', () => {
      let idx = currentIndex - 1;
      if (idx < 0) idx = carouselImages.length - 1;
      moveToSlide(idx);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
      let idx = currentIndex + 1;
      if (idx >= carouselImages.length) idx = 0;
      moveToSlide(idx);
    });

    dots.forEach((dot, i) => dot.addEventListener('click', () => moveToSlide(i)));

    // autoplay
    let autoPlayTimer = setInterval(() => {
      let idx = currentIndex + 1;
      if (idx >= carouselImages.length) idx = 0;
      moveToSlide(idx);
    }, 4000);

    carouselTrack.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    carouselTrack.addEventListener('mouseleave', () => {
      autoPlayTimer = setInterval(() => {
        let idx = currentIndex + 1;
        if (idx >= carouselImages.length) idx = 0;
        moveToSlide(idx);
      }, 4000);
    });

    // initialize when images are laid out
    window.addEventListener('load', () => moveToSlide(0));
    window.addEventListener('resize', () => moveToSlide(currentIndex));
  })();
});