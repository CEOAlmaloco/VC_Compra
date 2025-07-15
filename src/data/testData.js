// Datos de prueba para la aplicación VC Compra
// Para activar/desactivar el modo de testing, modifica la variable ENABLE_TEST_DATA

export const ENABLE_TEST_DATA = true; // Cambiar a true para activar datos de prueba

export const testProducts = [
  // CATEGORÍA: ALIMENTOS
  {
    id: 1,
    name: 'Arroz Integral Orgánico',
    price: 2500,
    quantity: 2,
    category: 'Alimentos',
    subcategory: 'Granos',
    description: 'Arroz integral orgánico de 1kg, rico en fibra y nutrientes naturales',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&h=120&fit=crop',
    links: 'https://www.jumbo.cl/arroz-integral,https://www.santaisabel.cl/arroz-integral'
  },
  {
    id: 2,
    name: 'Aceite de Oliva Extra Virgen',
    price: 12000,
    quantity: 3,
    category: 'Alimentos',
    subcategory: 'Aceites',
    description: 'Aceite de oliva extra virgen 500ml, prensado en frío, origen español',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=120&h=120&fit=crop',
    links: 'https://www.jumbo.cl/aceite-oliva,https://www.santaisabel.cl/aceite-extra-virgen'
  },
  {
    id: 3,
    name: 'Quinoa Real Premium',
    price: 8500,
    quantity: 1,
    category: 'Alimentos',
    subcategory: 'Granos',
    description: 'Quinoa real premium 500g, sin gluten, alto contenido proteico',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&h=120&fit=crop',
    links: 'https://www.jumbo.cl/quinoa-real,https://www.santaisabel.cl/quinoa-premium'
  },
  {
    id: 4,
    name: 'Miel Orgánica de Abejas',
    price: 6500,
    quantity: 2,
    category: 'Alimentos',
    subcategory: 'Endulzantes',
    description: 'Miel orgánica pura de abejas 500g, sin procesar, origen local',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=120&h=120&fit=crop',
    links: 'https://www.jumbo.cl/miel-organica,https://www.santaisabel.cl/miel-pura'
  },
  {
    id: 5,
    name: 'Nueces de Macadamia',
    price: 15000,
    quantity: 1,
    category: 'Alimentos',
    subcategory: 'Frutos Secos',
    description: 'Nueces de macadamia premium 250g, sin sal, ricas en omega-3',
    imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=120&h=120&fit=crop',
    links: 'https://www.jumbo.cl/nueces-macadamia,https://www.santaisabel.cl/nueces-premium'
  },
  {
    id: 6,
    name: 'Almendras Tostadas',
    price: 8500,
    quantity: 2,
    category: 'Alimentos',
    subcategory: 'Frutos Secos',
    description: 'Almendras tostadas sin sal 300g, ricas en proteínas y vitamina E',
    imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=120&h=120&fit=crop',
    links: 'https://www.jumbo.cl/almendras-tostadas,https://www.santaisabel.cl/almendras'
  },
  {
    id: 7,
    name: 'Azúcar Mascabado',
    price: 3500,
    quantity: 1,
    category: 'Alimentos',
    subcategory: 'Endulzantes',
    description: 'Azúcar mascabado orgánico 500g, sin refinar, rico en minerales',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=120&h=120&fit=crop',
    links: 'https://www.jumbo.cl/azucar-mascabado,https://www.santaisabel.cl/azucar-organico'
  },

  // CATEGORÍA: ELECTRÓNICA
  {
    id: 8,
    name: 'Laptop HP Pavilion Gaming',
    price: 450000,
    quantity: 1,
    category: 'Electrónica',
    subcategory: 'Computadoras',
    description: 'Laptop HP Pavilion Gaming 15.6" Intel Core i5, 8GB RAM, 512GB SSD, GTX 1650',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop',
    links: 'https://www.falabella.com/laptop-hp-gaming,https://www.paris.cl/laptop-hp-pavilion'
  },
  {
    id: 9,
    name: 'Smartphone Samsung Galaxy S23',
    price: 320000,
    quantity: 1,
    category: 'Electrónica',
    subcategory: 'Móviles',
    description: 'Samsung Galaxy S23, 128GB, color negro, cámara 50MP, 5G',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop',
    links: 'https://www.samsung.cl/galaxy-s23,https://www.falabella.com/samsung-galaxy'
  },
  {
    id: 10,
    name: 'Auriculares Sony WH-1000XM4',
    price: 180000,
    quantity: 1,
    category: 'Electrónica',
    subcategory: 'Audio',
    description: 'Auriculares inalámbricos Sony WH-1000XM4, cancelación de ruido activa',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop',
    links: 'https://www.sony.cl/auriculares-wh1000xm4,https://www.falabella.com/sony-wh1000xm4'
  },
  {
    id: 11,
    name: 'Tablet iPad Air 5ta Gen',
    price: 280000,
    quantity: 1,
    category: 'Electrónica',
    subcategory: 'Tablets',
    description: 'iPad Air 5ta generación, 64GB, WiFi, chip M1, pantalla 10.9"',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=120&h=120&fit=crop',
    links: 'https://www.apple.cl/ipad-air,https://www.falabella.com/ipad-air-5ta-gen'
  },
  {
    id: 12,
    name: 'Smart TV LG OLED 55"',
    price: 650000,
    quantity: 1,
    category: 'Electrónica',
    subcategory: 'TV y Video',
    description: 'Smart TV LG OLED 55", 4K UHD, webOS, HDR, WiFi integrado',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=120&h=120&fit=crop',
    links: 'https://www.lg.cl/smart-tv-oled,https://www.falabella.com/lg-oled-55'
  },
  {
    id: 13,
    name: 'Cámara Canon EOS R6',
    price: 1200000,
    quantity: 1,
    category: 'Electrónica',
    subcategory: 'Fotografía',
    description: 'Cámara mirrorless Canon EOS R6, 20MP, 4K video, estabilización IBIS',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop',
    links: 'https://www.canon.cl/eos-r6,https://www.falabella.com/canon-eos-r6'
  },
  {
    id: 14,
    name: 'Drone DJI Mini 3 Pro',
    price: 450000,
    quantity: 1,
    category: 'Electrónica',
    subcategory: 'Drones',
    description: 'Drone DJI Mini 3 Pro, 4K video, 34 min vuelo, menos de 250g',
    imageUrl: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=120&h=120&fit=crop',
    links: 'https://www.dji.cl/mini-3-pro,https://www.falabella.com/dji-mini-3-pro'
  },
  {
    id: 15,
    name: 'Consola PlayStation 5',
    price: 550000,
    quantity: 1,
    category: 'Electrónica',
    subcategory: 'Gaming',
    description: 'PlayStation 5, 825GB SSD, control DualSense, 4K gaming',
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=120&h=120&fit=crop',
    links: 'https://www.playstation.cl/ps5,https://www.falabella.com/playstation-5'
  },

  // CATEGORÍA: HOGAR
  {
    id: 16,
    name: 'Sofá 3 Plazas Moderno',
    price: 180000,
    quantity: 1,
    category: 'Hogar',
    subcategory: 'Muebles',
    description: 'Sofá moderno 3 plazas, color gris, tela resistente, estructura de madera',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop',
    links: 'https://www.ripley.cl/sofa-3-plazas,https://www.paris.cl/sofa-moderno'
  },
  {
    id: 17,
    name: 'Mesa de Comedor Extensible',
    price: 95000,
    quantity: 1,
    category: 'Hogar',
    subcategory: 'Muebles',
    description: 'Mesa de comedor extensible, 6-8 personas, madera natural, patas de acero',
    imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=120&h=120&fit=crop',
    links: 'https://www.ripley.cl/mesa-comedor,https://www.paris.cl/mesa-extensible'
  },
  {
    id: 18,
    name: 'Juego de Sábanas Algodón',
    price: 25000,
    quantity: 2,
    category: 'Hogar',
    subcategory: 'Textiles',
    description: 'Juego de sábanas 100% algodón, 2 fundas, 1 sábana bajera, 1 sobrecama',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=120&h=120&fit=crop',
    links: 'https://www.ripley.cl/sabanas-algodon,https://www.paris.cl/sabanas-premium'
  },
  {
    id: 19,
    name: 'Lámpara de Mesa LED',
    price: 35000,
    quantity: 1,
    category: 'Hogar',
    subcategory: 'Iluminación',
    description: 'Lámpara de mesa LED moderna, luz regulable, diseño minimalista',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=120&h=120&fit=crop',
    links: 'https://www.ripley.cl/lampara-mesa-led,https://www.paris.cl/lampara-moderna'
  },
  {
    id: 20,
    name: 'Set de Ollas Antiadherentes',
    price: 75000,
    quantity: 1,
    category: 'Hogar',
    subcategory: 'Cocina',
    description: 'Set de 5 ollas antiadherentes, incluye sartén, tapa de vidrio',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop',
    links: 'https://www.ripley.cl/set-ollas-antiadherentes,https://www.paris.cl/ollas-cocina'
  },
  {
    id: 21,
    name: 'Aspiradora Robot Xiaomi',
    price: 120000,
    quantity: 1,
    category: 'Hogar',
    subcategory: 'Limpieza',
    description: 'Aspiradora robot Xiaomi Mi Robot Vacuum, mapeo láser, app control',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop',
    links: 'https://www.xiaomi.cl/aspiradora-robot,https://www.falabella.com/xiaomi-robot-vacuum'
  },
  {
    id: 22,
    name: 'Cafetera Nespresso Vertuo',
    price: 85000,
    quantity: 1,
    category: 'Hogar',
    subcategory: 'Cocina',
    description: 'Cafetera Nespresso Vertuo, cápsulas exclusivas, espuma cremosa',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&h=120&fit=crop',
    links: 'https://www.nespresso.cl/vertuo,https://www.falabella.com/nespresso-vertuo'
  },

  // CATEGORÍA: ROPA
  {
    id: 23,
    name: 'Zapatillas Nike Air Max 270',
    price: 85000,
    quantity: 1,
    category: 'Ropa',
    subcategory: 'Calzado',
    description: 'Zapatillas deportivas Nike Air Max 270, talla 42, color negro/blanco',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop',
    links: 'https://www.nike.cl/zapatillas-air-max-270,https://www.footlocker.cl/nike-air-max-270'
  },
  {
    id: 24,
    name: 'Jeans Levi\'s 501 Original',
    price: 45000,
    quantity: 2,
    category: 'Ropa',
    subcategory: 'Pantalones',
    description: 'Jeans clásicos Levi\'s 501 Original, talla 32x32, color azul vintage',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=120&h=120&fit=crop',
    links: 'https://www.levis.cl/jeans-501-original,https://www.falabella.com/levis-501'
  },
  {
    id: 25,
    name: 'Chaqueta Bomber Adidas',
    price: 65000,
    quantity: 1,
    category: 'Ropa',
    subcategory: 'Chaquetas',
    description: 'Chaqueta bomber Adidas, talla M, color negro, material transpirable',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=120&h=120&fit=crop',
    links: 'https://www.adidas.cl/chaqueta-bomber,https://www.falabella.com/adidas-bomber'
  },
  {
    id: 26,
    name: 'Vestido Casual H&M',
    price: 28000,
    quantity: 1,
    category: 'Ropa',
    subcategory: 'Vestidos',
    description: 'Vestido casual H&M, talla S, color azul marino, 100% algodón',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=120&h=120&fit=crop',
    links: 'https://www.hm.cl/vestido-casual,https://www.falabella.com/hm-vestido'
  },
  {
    id: 27,
    name: 'Camisa Formal Tommy Hilfiger',
    price: 35000,
    quantity: 3,
    category: 'Ropa',
    subcategory: 'Camisas',
    description: 'Camisa formal Tommy Hilfiger, talla L, color blanco, planchado permanente',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=120&h=120&fit=crop',
    links: 'https://www.tommyhilfiger.cl/camisa-formal,https://www.falabella.com/tommy-camisa'
  },
  {
    id: 28,
    name: 'Reloj Casio G-Shock',
    price: 55000,
    quantity: 1,
    category: 'Ropa',
    subcategory: 'Accesorios',
    description: 'Reloj Casio G-Shock resistente a impactos, cronógrafo, 200m waterproof',
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=120&h=120&fit=crop',
    links: 'https://www.casio.cl/g-shock,https://www.falabella.com/casio-g-shock'
  },
  {
    id: 29,
    name: 'Bolso Tote de Cuero',
    price: 45000,
    quantity: 1,
    category: 'Ropa',
    subcategory: 'Bolsos',
    description: 'Bolso tote de cuero genuino, color marrón, múltiples compartimentos',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&h=120&fit=crop',
    links: 'https://www.falabella.com/bolso-tote-cuero,https://www.paris.cl/bolso-cuero'
  },

  // CATEGORÍA: ENTRETENIMIENTO
  {
    id: 30,
    name: 'Nintendo Switch OLED',
    price: 280000,
    quantity: 1,
    category: 'Entretenimiento',
    subcategory: 'Videojuegos',
    description: 'Nintendo Switch OLED, 64GB, pantalla 7" OLED, incluye Joy-Con',
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=120&h=120&fit=crop',
    links: 'https://www.nintendo.cl/switch-oled,https://www.falabella.com/nintendo-switch-oled'
  },
  {
    id: 31,
    name: 'Guitarra Acústica Yamaha',
    price: 120000,
    quantity: 1,
    category: 'Entretenimiento',
    subcategory: 'Instrumentos',
    description: 'Guitarra acústica Yamaha F310, tapa de abeto, diapasón de palisandro',
    imageUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=120&h=120&fit=crop',
    links: 'https://www.yamaha.cl/guitarra-f310,https://www.falabella.com/yamaha-guitarra'
  },
  {
    id: 32,
    name: 'Libro "El Señor de los Anillos"',
    price: 15000,
    quantity: 1,
    category: 'Entretenimiento',
    subcategory: 'Libros',
    description: 'Trilogía completa "El Señor de los Anillos" de J.R.R. Tolkien, tapa dura',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=120&fit=crop',
    links: 'https://www.buscalibre.cl/senor-anillos,https://www.antartica.cl/libro-senor-anillos'
  },
  {
    id: 33,
    name: 'Puzzle 1000 Piezas Ravensburger',
    price: 18000,
    quantity: 2,
    category: 'Entretenimiento',
    subcategory: 'Juegos de Mesa',
    description: 'Puzzle Ravensburger 1000 piezas, paisaje de montaña, calidad premium',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=120&fit=crop',
    links: 'https://www.ravensburger.cl/puzzle-1000,https://www.falabella.com/ravensburger-puzzle'
  },
  {
    id: 34,
    name: 'Bicicleta de Spinning Pro',
    price: 180000,
    quantity: 1,
    category: 'Entretenimiento',
    subcategory: 'Deportes',
    description: 'Bicicleta de spinning profesional, resistencia magnética, pantalla LCD',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=120&fit=crop',
    links: 'https://www.falabella.com/bicicleta-spinning,https://www.paris.cl/bicicleta-pro'
  },
  {
    id: 35,
    name: 'Piano Digital Yamaha P-45',
    price: 250000,
    quantity: 1,
    category: 'Entretenimiento',
    subcategory: 'Instrumentos',
    description: 'Piano digital Yamaha P-45, 88 teclas, 10 voces, auriculares incluidos',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=120&h=120&fit=crop',
    links: 'https://www.yamaha.cl/piano-p45,https://www.falabella.com/yamaha-p-45'
  },
  {
    id: 36,
    name: 'Set de Pinturas Acrílicas',
    price: 25000,
    quantity: 1,
    category: 'Entretenimiento',
    subcategory: 'Arte',
    description: 'Set de 24 pinturas acrílicas profesionales, pinceles incluidos',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=120&h=120&fit=crop',
    links: 'https://www.falabella.com/pinturas-acrilicas,https://www.paris.cl/set-pinturas'
  }
];

// Función para obtener datos de prueba
export const getTestData = () => {
  return ENABLE_TEST_DATA ? testProducts : [];
}; 