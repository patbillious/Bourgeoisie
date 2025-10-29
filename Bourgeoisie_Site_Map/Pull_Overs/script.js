// Minimal Three.js Lava Lamp Background (optional, can be removed if not needed)
if (typeof THREE !== 'undefined') {
  const canvas = document.getElementById('lava-bg');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4( position, 1.0 );
    }
  `;
  const fragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);}
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      uv.x *= resolution.x / resolution.y;
      float t = time * 0.5;
      float v = 0.0;
      for(int i=0; i<4; i++) {
        float a = float(i) * 1.6 + t * (0.6 + float(i)*0.1);
        vec2 pos = vec2(sin(a), cos(a*1.12)) * (0.3 + sin(t+float(i))*0.1);
        float d = length(uv - pos);
        v += 0.25 / (d*d + 0.05);
      }
      v += 0.5 * noise(uv * 2.0 + t);
      vec3 col;
      if(v < 0.9) {
        float f = smoothstep(0.3, 0.9, v);
        col = mix(color1, color2, f);
      } else {
        float f = smoothstep(0.9, 1.6, v);
        col = mix(color2, color3, f);
      }
      gl_FragColor = vec4(col, 1.0);
    }
  `;
  const uniforms = {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    color1: { value: new THREE.Color('#4528ff') },
    color2: { value: new THREE.Color('#f1f2f4') },
    color3: { value: new THREE.Color('#182b41') }
  };
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', resize);
  resize();
  function animate(t) {
    uniforms.time.value = t * 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate(0);
}

// ----- Product Selection -----
class Product {
  constructor({name, img, materials, shirtColor, info, price, id}) {
    this.name = name;
    this.img = img;
    this.materials = materials;
    this.shirtColor = shirtColor;
    this.info = info;
    this.price = price;
    this.id = id; // unique identifier
  }
}

const items = [
  new Product({
    id: '0',
    name: "Cropped Hoodies",
    shirtColor: "Moss",
    img: "https://res.cloudinary.com/dzs3y7aj6/image/upload/v1760723635/image_15_dner5k.png",
    materials: "100% Wool Fabric",
    info: "100% Humanely Sourced Wool. The warmest wool comes from the coldest sheep in the world.",
    price: 64.99
  }),
  new Product({
    id: '1',
    name: "Cropped Hoodies",
    shirtColor: "Sand",
    img: "https://res.cloudinary.com/dzs3y7aj6/image/upload/v1761702495/Gemini_Generated_Image_u64mnnu64mnnu64m_erqggo.png",
    materials: "100% Wool Fabric",
    info: "The warmest wool comes from the coldest sheep in the world.",
    price: 64.99
  }),
  new Product({
    id: '2',
    name: "Cropped Hoodies",
    shirtColor: "Blue",
    img: "https://res.cloudinary.com/dzs3y7aj6/image/upload/v1760723634/image_29_hdnlp2.png",
    materials: "100% Wool Fabric",
    info: "The warmest wool comes from the coldest sheep in the world.",
    price: 64.99
  }),
  new Product({
    id: '3',
    name: "Cropped Hoodies",
    shirtColor: "Pink",
    img: "https://res.cloudinary.com/dzs3y7aj6/image/upload/v1760723627/image_36_pvrua9.png",
    materials: "100% Wool Fabric",
    info: "100% Humanely Sourced Wool. The warmest wool comes from the coldest sheep in the world.",
    price: 64.99
  }),

    new Product({
    id: '4',
    name: "Cropped Hoodies",
    shirtColor: "Purple",
    img: "https://res.cloudinary.com/dzs3y7aj6/image/upload/v1760723629/image_17_lidu5e.png",
    materials: "Wool Fabric",
    info: "100% Humanely Sourced Wool. The warmest wool comes from the coldest sheep in the world.",
    price: 64.99
  }),

    new Product({
    id: '5',
    name: "Cropped Hoodies",
    shirtColor: "Black",
    img: "https://res.cloudinary.com/dzs3y7aj6/image/upload/v1760723631/image_14_rrvx7d.png",
    materials: "100% Himalayan Wool",
    info: "The warmest wool comes from the coldest sheep in the world.",
    price: 64.99
  }),

    new Product({
    id: '6',
    name: "Cropped Hoodies",
    shirtColor: "White",
    img: "https://res.cloudinary.com/dzs3y7aj6/image/upload/v1760723628/image_31_nkg2c3.png",
    materials: "100% Himalayan Wool",
    info: "The coldest sheep in the world produce the warmest wool.",
    price: 64.99
  }),
];

// Map color name to index in items array for quick lookup
const colorToIndex = {
  moss: 0,
  sand: 1,
  blue: 2,
  pink: 3,
  purple: 4,
  black: 5,
  white: 6
};

let currentIndex = 0;
let selectedSize = null;

// DOM elements
const itemImage = document.getElementById('itemImage');
const itemName = document.getElementById('itemName');
const itemMaterials = document.getElementById('itemMaterials');
const itemInfo = document.getElementById('itemInfo');
const itemPrice = document.getElementById('itemPrice');
const itemColor = document.getElementById('itemColor');
const sizeBtns = document.querySelectorAll('.size-btn');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartCount = document.getElementById('cartCount');
const cartCountSummary = document.getElementById('cartCountSummary');
const cartList = document.getElementById('cartList');
const cartStatus = document.getElementById('cartStatus');
const clearCartBtn = document.getElementById('clearCartBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cartSummary = document.getElementById('cartSummary');
const toggleCartBtn = document.getElementById('toggleCartBtn');
const colorBtns = document.querySelectorAll('.color-btn');

function loadItem(idx) {
  const item = items[idx];
  itemImage.src = item.img;
  itemName.textContent = item.name;
  itemMaterials.textContent = item.materials;
  itemInfo.textContent = item.info;
  itemPrice.textContent = `$${item.price.toFixed(2)}`;
  itemColor.textContent = item.shirtColor;
  selectedSize = null;
  sizeBtns.forEach(btn => btn.classList.remove('selected'));
  cartStatus.textContent = "";
  // Highlight correct color button
  colorBtns.forEach(btn => {
    btn.classList.toggle('selected', btn.getAttribute('data-color') === item.shirtColor);
  });
}

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  loadItem(currentIndex);
};
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % items.length;
  loadItem(currentIndex);
};
// Color selector logic (link button to item by color)
colorBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const color = this.getAttribute('data-color');
    if (color in colorToIndex) {
      currentIndex = colorToIndex[color];
      loadItem(currentIndex);
    }
    // Remove highlight from other buttons, add to this
    colorBtns.forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
  });
});

// Set initial selected color on page load
window.addEventListener('DOMContentLoaded', () => {
  loadItem(currentIndex);
  colorBtns.forEach(btn => btn.classList.remove('selected'));
  colorBtns[0].classList.add('selected');
});

// Size selection
sizeBtns.forEach(btn => {
  btn.onclick = () => {
    sizeBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSize = btn.dataset.size;
  };
});

// Cart handling
function getCart() {
  return JSON.parse(localStorage.getItem('cart_v1') || "[]");
}
function setCart(cart) {
  localStorage.setItem('cart_v1', JSON.stringify(cart));
}
function updateCartUI() {
  const cart = getCart();
  cartCount.textContent = cart.length;
  cartCountSummary.textContent = cart.length;
  cartList.innerHTML = cart.map(item =>
    `<li>${item.name} (${item.size}) - $${item.price.toFixed(2)}</li>`
  ).join('');
}
function addToCart() {
  if (!selectedSize) {
    cartStatus.textContent = "Please select a size!";
    return;
  }
  const product = items[currentIndex];
  const cart = getCart();
  cart.push({
    id: product.id,
    name: product.name,
    size: selectedSize,
    price: product.price
  });
  setCart(cart);
  updateCartUI();
  cartStatus.textContent = "Added to cart!";
  setTimeout(() => { cartStatus.textContent = ""; }, 1300);
}
addToCartBtn.onclick = addToCart;

clearCartBtn.onclick = () => {
  setCart([]);
  updateCartUI();
};

toggleCartBtn.onclick = function() {
  if (cartSummary.style.display === "none" || cartSummary.style.display === "") {
    cartSummary.style.display = "block";
    toggleCartBtn.textContent = "Hide Cart";
  } else {
    cartSummary.style.display = "none";
    toggleCartBtn.innerHTML = `See Cart (<span id="cartCount">${getCart().length}</span>)`;
    cartCount.textContent = getCart().length;
  }
};
updateCartUI();
// Check for missing DOM elements
if (
  !itemImage || !itemName || !itemMaterials || !itemInfo || !itemPrice ||
  !addToCartBtn || !cartCount || !cartCountSummary || !cartList ||
  !cartStatus || !clearCartBtn || !prevBtn || !nextBtn || !cartSummary || !toggleCartBtn
) {
  throw new Error("One or more required DOM elements are missing. Please check your HTML.");
}



// Swipe controls
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  loadItem(currentIndex);
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % items.length;
  loadItem(currentIndex);
};

// Touch swipe support
let touchStartX = null;
itemImage.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
});
itemImage.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  let dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) {
    if (dx > 0) prevBtn.onclick();
    else nextBtn.onclick();
  }
  touchStartX = null;
});

// Size selection
sizeBtns.forEach(btn => {
  btn.onclick = () => {
    sizeBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSize = btn.dataset.size;
  };
});

// Cart handling
function getCart() {
  return JSON.parse(localStorage.getItem('cart_v1') || "[]");
}
function setCart(cart) {
  localStorage.setItem('cart_v1', JSON.stringify(cart));
}
function updateCartUI() {
  const cart = getCart();
  cartCount.textContent = cart.length;
  cartCountSummary.textContent = cart.length;
  cartList.innerHTML = cart.map(item =>
    `<li>${item.name} (${item.size}) - $${item.price.toFixed(2)}</li>`
  ).join('');
}
function addToCart() {
  if (!selectedSize) {
    cartStatus.textContent = "Please select a size!";
    return;
  }
  const product = items[currentIndex];
  const cart = getCart();
  cart.push({
    id: product.id,
    name: product.name,
    size: selectedSize,
    price: product.price
  });
  setCart(cart);
  updateCartUI();
  cartStatus.textContent = "Added to cart!";
  setTimeout(() => { cartStatus.textContent = ""; }, 1300);
}
addToCartBtn.onclick = addToCart;

clearCartBtn.onclick = () => {
  setCart([]);
  updateCartUI();
};

toggleCartBtn.onclick = function() {
  // Toggle cart display
  if (cartSummary.style.display === "none" || cartSummary.style.display === "") {
    cartSummary.style.display = "block";
    toggleCartBtn.textContent = "Hide Cart";
  } else {
    cartSummary.style.display = "none";
    toggleCartBtn.innerHTML = `See Cart (<span id="cartCount">${getCart().length}</span>)`;
    // Update cart count in toggle button
    cartCount.textContent = getCart().length;
  }
};

// Initial load
loadItem(currentIndex);
updateCartUI();
// No JS is strictly required for hover dropdowns, but you can enhance accessibility and mobile support here.

document.addEventListener('DOMContentLoaded', () => {
  // For mobile: toggle dropdowns on click
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
      if (window.innerWidth < 600) {
        e.preventDefault();
        const content = dropdown.querySelector('.dropdown-content');
        if (content) {
          if (content.style.display === 'flex') {
            content.style.display = 'none';
          } else {
            content.style.display = 'flex';
          }
        }
      }
    });
  });

  // Sitemap dropdown accessibility
  const dropdownNav = document.getElementById('sitemapDropdownNav');
  const dropdownBtn = document.getElementById('sitemapDropdownBtn');
  const dropdownContent = document.getElementById('sitemapDropdownContent');
  if (dropdownBtn && dropdownNav && dropdownContent) {
    dropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
      dropdownNav.classList.toggle('open');
      dropdownBtn.setAttribute('aria-expanded', !expanded);
      if (!expanded && dropdownContent.focus) dropdownContent.focus();
    });

    dropdownBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdownBtn.click();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstLink = dropdownContent.querySelector('.sitemap-link, .sitemap-label');
        firstLink && firstLink.focus();
      }
    });
  }

  // NAVBAR interactivity: dropdowns + mobile menu + keyboard accessible
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
  if (collection && collectionBtn) {
    collectionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = collection.classList.toggle('open');
      collectionBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        document.querySelectorAll('.dropdown').forEach(d => { if (d !== collection) d.classList.remove('open'); });
      }
    });

    collectionBtn.addEventListener('keydown', (e) => {
      if (['Enter',' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        collectionBtn.click();
      }
    });
  }

  // Cart dropdown
  const cart = document.getElementById('cartDropdown');
  const cartBtn = document.getElementById('cartBtn');
  if (cart && cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = cart.classList.toggle('open');
      cartBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        document.querySelectorAll('.dropdown').forEach(d => { if (d !== cart) d.classList.remove('open'); });
      }
    });

    cartBtn.addEventListener('keydown', (e) => {
      if (['Enter',' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        cartBtn.click();
      }
    });
  }

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

  // Mobile toggles for submenus
  document.querySelectorAll('.mobile-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
      if (!target) return;
      const willOpen = target.hasAttribute('hidden');
      target.hidden = !willOpen;
      btn.setAttribute('aria-expanded', String(willOpen));
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

  // Hero video minor enhancement
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    document.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play().catch(() => {});
      }
    });
  }

  // Product cards: swipe + prev/next
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


  

  // Carousel initialization (if exists)
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

// Shirt color selector logic
document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove highlight from other buttons
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');

    // Get index from data-index
    const idx = parseInt(this.getAttribute('data-index'), 10);
    if (isNaN(idx)) return;

    currentIndex = idx;
    loadItem(currentIndex);
  });
});

// Optional: Set initial selected color on page load
window.addEventListener('DOMContentLoaded', () => {
  const colorBtns = document.querySelectorAll('.color-btn');
  if (colorBtns.length) {
    colorBtns[0].classList.add('selected');
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const pantsBtn = document.getElementById('pantsMenuBtn');
  const pantsNested = document.getElementById('pantsMenuNested');
  if (pantsBtn && pantsNested) {
    pantsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const expanded = pantsBtn.getAttribute('aria-expanded') === 'true';
      pantsBtn.setAttribute('aria-expanded', !expanded);
      pantsNested.style.display = expanded ? 'none' : 'block';
    });
  }
});
