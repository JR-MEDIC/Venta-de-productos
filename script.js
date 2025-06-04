document.addEventListener('DOMContentLoaded', function() {
  console.log('Script cargado - DOM completamente cargado');
  
  let productos = [];
  let swiperInstance = null;

  // ============ VARIABLES GLOBALES ============
  const productGrid = document.querySelector('.product-grid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const modal = document.getElementById('modal');

  // ============ FUNCIONES PRINCIPALES ============

  // Renderiza todos los productos
  function renderProducts(products) {
    console.log('Renderizando productos...');
    if (!productGrid) {
      console.error('No se encontró .product-grid');
      return;
    }
    
    productGrid.innerHTML = '';

    products.forEach(product => {
      const productEl = document.createElement('div');
      productEl.className = 'product';

      const img = document.createElement('img');
      img.src = product.img;
      img.alt = product.titulo;
      img.loading = 'lazy'; // Mejora el rendimiento

      const h3 = document.createElement('h3');
      h3.textContent = product.titulo;

      const marcaP = document.createElement('p');
      marcaP.textContent = product.marca || 'Sin marca';

      const priceP = document.createElement('p');
      priceP.className = 'price';
      priceP.textContent = product.precio;

      const btn = document.createElement('button');
      btn.className = 'oferta-button';
      btn.textContent = 'Ver Detalles';
      btn.addEventListener('click', () => {
        mostrarModal(product.titulo, product.desc, product.precio, product.img, product.marca);
      });

      img.addEventListener('click', () => {
        mostrarModal(product.titulo, product.desc, product.precio, product.img, product.marca);
      });

      productEl.appendChild(img);
      productEl.appendChild(h3);
      productEl.appendChild(marcaP);
      productEl.appendChild(priceP);
      productEl.appendChild(btn);

      productGrid.appendChild(productEl);
    });
  }

  // Renderiza las ofertas en el carrusel
  function renderOfertas() {
    console.log('Renderizando ofertas...');
    const ofertas = [
      {
        titulo: "Termómetro Digital",
        desc: "Termómetro infrarrojo sin contacto",
        precio: "S/ 120.00",
        precioAntiguo: "S/ 150.00",
        img: "Img/Oferta1.jpg",
        marca: "Braun",
        descuento: 20,
        oferta: true
      },
      {
        titulo: "Oxímetro de Pulso",
        desc: "Monitor de saturación de oxígeno",
        precio: "S/ 153.00",
        precioAntiguo: "S/ 180.00",
        img: "Img/Oferta2.jpg",
        marca: "Contec",
        descuento: 15,
        oferta: true
      },
      {
        titulo: "Mascarillas N95",
        desc: "Caja con 10 unidades",
        precio: "S/ 70.00",
        precioAntiguo: "S/ 100.00",
        img: "Img/Oferta3.jpg",
        marca: "3M",
        descuento: 30,
        oferta: true
      }
    ];

    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (!swiperWrapper) {
      console.error('No se encontró .swiper-wrapper');
      return;
    }
    
    swiperWrapper.innerHTML = '';
    
    ofertas.forEach(oferta => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide oferta-card';
      
      // Crear elementos DOM en lugar de usar innerHTML para mayor seguridad
      const tag = document.createElement('div');
      tag.className = 'oferta-tag';
      tag.textContent = `-${oferta.descuento}%`;
      
      const img = document.createElement('img');
      img.src = oferta.img;
      img.alt = oferta.titulo;
      img.loading = 'lazy';
      
      const info = document.createElement('div');
      info.className = 'oferta-info';
      
      const h3 = document.createElement('h3');
      h3.textContent = oferta.titulo;
      
      if (oferta.precioAntiguo) {
        const precioAntiguo = document.createElement('p');
        precioAntiguo.className = 'precio-antiguo';
        precioAntiguo.textContent = oferta.precioAntiguo;
        info.appendChild(precioAntiguo);
      }
      
      const precioOferta = document.createElement('p');
      precioOferta.className = 'precio-oferta';
      precioOferta.textContent = oferta.precio;
      
      const button = document.createElement('button');
      button.className = 'oferta-button';
      button.textContent = 'Ver Detalles';
      button.addEventListener('click', () => {
        mostrarModal(oferta.titulo, oferta.desc, oferta.precio, oferta.img, oferta.marca);
      });
      
      info.appendChild(h3);
      info.appendChild(precioOferta);
      info.appendChild(button);
      
      slide.appendChild(tag);
      slide.appendChild(img);
      slide.appendChild(info);
      
      swiperWrapper.appendChild(slide);
    });

    // Inicializar Swiper con retraso para asegurar que el DOM está listo
    setTimeout(() => {
      swiperInstance = initSwiper();
      if (!swiperInstance) {
        console.error('No se pudo inicializar Swiper');
      } else {
        console.log('Swiper inicializado correctamente');
      }
    }, 300);
  }

  // Configura el menú móvil
  function setupMobileMenu() {
    console.log('Configurando menú móvil...');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (!menuToggle || !nav) {
      console.error('No se encontraron elementos del menú móvil');
      return;
    }
    
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
  }

  // ============ SWIPER (CARRUSEL) ============

  function initSwiper() {
    console.log('Intentando inicializar Swiper...');
    const swiperEl = document.querySelector('.ofertas-swiper');
    if (!swiperEl) {
      console.error('No se encontró el elemento .ofertas-swiper');
      return null;
    }

    if (typeof Swiper === 'undefined') {
      console.error('Swiper no está disponible');
      return null;
    }

    try {
      const swiper = new Swiper('.ofertas-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          }
        }
      });
      console.log('Swiper inicializado con éxito');
      return swiper;
    } catch (error) {
      console.error('Error al inicializar Swiper:', error);
      return null;
    }
  }

  // Filtra productos según búsqueda y categoría
  function filtrarProductos() {
    console.log('Filtrando productos...');
    if (!searchInput || !categoryFilter) {
      console.error('No se encontraron elementos de filtrado');
      return;
    }
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value.toLowerCase();

    const filtrados = productos.filter(p => {
      const coincideBusqueda =
        p.titulo.toLowerCase().includes(searchTerm) ||
        (p.desc && p.desc.toLowerCase().includes(searchTerm)) ||
        (p.marca && p.marca.toLowerCase().includes(searchTerm));

      const coincideCategoria = category === 'all' || 
        (p.categoria && p.categoria.toLowerCase() === category);
      
      return coincideBusqueda && coincideCategoria;
    });

    renderProducts(filtrados);
  }

  // ============ MODAL ============

  function setupModal() {
    console.log('Configurando modal...');
    const closeBtn = document.querySelector('.close');
    if (!modal || !closeBtn) {
      console.error('No se encontraron elementos del modal');
      return;
    }
    
    // Función global para mostrar el modal
    window.mostrarModal = function(titulo, desc, precio, img, marca) {
      console.log('Mostrando modal para:', titulo);
      const modalImg = document.getElementById('modal-img');
      const modalTitulo = document.getElementById('modal-titulo');
      const modalDesc = document.getElementById('modal-desc');
      const modalMarca = document.getElementById('modal-marca');
      const modalPrecio = document.getElementById('modal-precio');
      
      if (modalImg) modalImg.src = img;
      if (modalTitulo) modalTitulo.textContent = titulo;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalMarca) modalMarca.textContent = `Marca: ${marca || 'Sin marca'}`;
      if (modalPrecio) modalPrecio.textContent = precio;
      
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };
    
    // Cerrar modal
    closeBtn.addEventListener('click', cerrarModal);
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
      if (e.target === modal) cerrarModal();
    });
    
    function cerrarModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  // ============ WHATSAPP ============

  function setupWhatsApp() {
    console.log('Configurando WhatsApp...');
    window.comprarProducto = function() {
      const producto = document.getElementById('modal-titulo')?.textContent || '';
      const precio = document.getElementById('modal-precio')?.textContent || '';
      const url = `https://wa.me/51928299305?text=Hola, estoy interesado en: ${encodeURIComponent(producto)} (${encodeURIComponent(precio)})`;
      console.log('Redirigiendo a WhatsApp:', url);
      window.open(url, '_blank');
    };
  }

  // ============ CARGA DE PRODUCTOS ============

  function loadProducts() {
    console.log('Cargando productos...');
    if (window.location.pathname.includes("productos")) {
      fetch('productos.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar productos.json');
          }
          return response.json();
        })
        .then(data => {
          console.log('Productos cargados:', data.length);
          productos = data.map(p => ({
            titulo: p.nombre,
            desc: p.descripcion,
            categoria: p.categoria,
            precio: `S/ ${p.precio.toFixed(2)}`,
            img: p.imagen,
            marca: p.marca || 'Sin marca'
          }));
          
          renderProducts(productos);
          setupEventListeners();
        })
        .catch(error => {
          console.error('Error cargando productos:', error);
          // Mostrar mensaje de error al usuario
          if (productGrid) {
            productGrid.innerHTML = '<p class="error">Error al cargar los productos. Por favor intenta más tarde.</p>';
          }
        });
    }
  }

  function setupEventListeners() {
    console.log('Configurando event listeners...');
    if (searchInput) {
      searchInput.addEventListener('input', filtrarProductos);
    }
    if (categoryFilter) {
      categoryFilter.addEventListener('change', filtrarProductos);
    }
  }

  // ============ INICIALIZACIÓN PRINCIPAL ============

  function init() {
    console.log('Inicializando aplicación...');
    loadProducts();
    setupModal();
    setupWhatsApp();
    setupMobileMenu();
    
    // Iniciar Swiper y ofertas solo en la página principal
    if (!window.location.pathname.includes("productos")) {
      renderOfertas();
    }

    // Verificar si Swiper está disponible
    if (typeof Swiper === 'undefined') {
      console.error('Swiper no está cargado');
      // Intentar cargar Swiper dinámicamente si falla
      loadSwiperDynamically();
    }
  }

  function loadSwiperDynamically() {
    console.log('Intentando cargar Swiper dinámicamente...');
    const swiperCSS = document.createElement('link');
    swiperCSS.rel = 'stylesheet';
    swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(swiperCSS);
    
    const swiperJS = document.createElement('script');
    swiperJS.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    swiperJS.onload = function() {
      console.log('Swiper cargado dinámicamente');
      if (!window.location.pathname.includes("productos")) {
        renderOfertas(); // Volver a renderizar las ofertas
      }
    };
    swiperJS.onerror = function() {
      console.error('Error al cargar Swiper dinámicamente');
    };
    document.body.appendChild(swiperJS);
  }

  // Iniciar todo
  init();
});
