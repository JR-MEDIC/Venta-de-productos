document.addEventListener('DOMContentLoaded', function() {
  let productos = [];
  let swiperInstance = null;
console.log('Script cargado correctamente');
console.log('Swiper disponible:', typeof Swiper !== 'undefined');
console.log('Elemento swiper-wrapper:', document.querySelector('.swiper-wrapper'));
  // ============ VARIABLES GLOBALES ============
  const productGrid = document.querySelector('.product-grid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const modal = document.getElementById('modal');

  // ============ FUNCIONES PRINCIPALES ============

  // Renderiza todos los productos
  function renderProducts(products) {
    if (!productGrid) return;
    
    productGrid.innerHTML = '';

    products.forEach(product => {
      const productEl = document.createElement('div');
      productEl.className = 'product';

      const img = document.createElement('img');
      img.src = product.img;
      img.alt = product.titulo;

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
    if (!swiperWrapper) return;
    
    swiperWrapper.innerHTML = '';
    
    ofertas.forEach(oferta => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide oferta-card';
      slide.innerHTML = `
        <div class="oferta-tag">-${oferta.descuento}%</div>
        <img src="${oferta.img}" alt="${oferta.titulo}">
        <div class="oferta-info">
          <h3>${oferta.titulo}</h3>
          ${oferta.precioAntiguo ? `<p class="precio-antiguo">${oferta.precioAntiguo}</p>` : ''}
          <p class="precio-oferta">${oferta.precio}</p>
          <button class="oferta-button" onclick="mostrarModal('${oferta.titulo.replace(/'/g, "\\'")}', '${oferta.desc.replace(/'/g, "\\'")}', '${oferta.precio.replace(/'/g, "\\'")}', '${oferta.img.replace(/'/g, "\\'")}', '${oferta.marca.replace(/'/g, "\\'")}')">Ver Detalles</button>
        </div>
      `;
      swiperWrapper.appendChild(slide);
    });

    // Reiniciar Swiper después de renderizar
    if (swiperInstance) {
      swiperInstance.destroy();
    }
    swiperInstance = initSwiper();
  }

  // Configura el menú móvil
  function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
  }

  // ============ SWIPER (CARRUSEL) ============

function renderOfertas() {
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
    console.log('No se encontró .swiper-wrapper');
    return;
  }
  
  swiperWrapper.innerHTML = '';
  
  ofertas.forEach(oferta => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide oferta-card';
    
    // Usamos createElement en lugar de innerHTML para mayor seguridad
    const tag = document.createElement('div');
    tag.className = 'oferta-tag';
    tag.textContent = `-${oferta.descuento}%`;
    
    const img = document.createElement('img');
    img.src = oferta.img;
    img.alt = oferta.titulo;
    
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

  // Retrasamos ligeramente la inicialización para asegurar que el DOM está listo
  setTimeout(() => {
    swiperInstance = initSwiper();
    if (!swiperInstance) {
      console.error('No se pudo inicializar Swiper');
    }
  }, 100);
}
  // Filtra productos según búsqueda y categoría
  function filtrarProductos() {
    if (!searchInput || !categoryFilter) return;
    
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
    const closeBtn = document.querySelector('.close');
    if (!modal || !closeBtn) return;
    
    // Función global para mostrar el modal
    window.mostrarModal = function(titulo, desc, precio, img, marca) {
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
    window.comprarProducto = function() {
      const producto = document.getElementById('modal-titulo')?.textContent || '';
      const precio = document.getElementById('modal-precio')?.textContent || '';
      const url = `https://wa.me/51928299305?text=Hola, estoy interesado en: ${encodeURIComponent(producto)} (${encodeURIComponent(precio)})`;
      window.open(url, '_blank');
    };
  }

  // ============ INICIALIZACIÓN ============

  function loadProducts() {
    if (window.location.pathname.includes("productos")) {
      fetch('productos.json')
        .then(response => response.json())
        .then(data => {
          productos = data.map(p => ({
            titulo: p.nombre,
            desc: p.descripcion,
            categoria: p.categoria,
            precio: `S/ ${p.precio.toFixed(2)}`,
            img: p.imagen,
            marca: p.marca || 'Sin marca'
          }));
          
          // Renderizar productos después de cargarlos
          renderProducts(productos);
          setupEventListeners();
        })
        .catch(error => console.error('Error cargando productos:', error));
    }
  }

  function setupEventListeners() {
    if (searchInput) {
      searchInput.addEventListener('input', filtrarProductos);
    }
    if (categoryFilter) {
      categoryFilter.addEventListener('change', filtrarProductos);
    }
  }

  function init() {
    loadProducts();
    setupModal();
    setupWhatsApp();
    setupMobileMenu();
    
    // Iniciar Swiper y ofertas solo en la página principal
    if (!window.location.pathname.includes("productos")) {
      renderOfertas();
    }
  }

  // Iniciar todo
  init();
});
