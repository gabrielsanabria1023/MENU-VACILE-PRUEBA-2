/* ==========================================================================
   DATOS DEL MENÚ: EL VACILE
   Este es el único archivo que necesitas editar para actualizar el menú.
   No toques index.html, styles.css ni app.js.

   REGLAS RÁPIDAS
   - Todo texto va entre comillas "así".
   - Los precios son números completos, sin puntos ni símbolo: 12000.
     La página los muestra como $12K.
   - Cada producto, bloque y sección termina con una coma, menos el último.
   - Para ocultar algo, bórralo o ponle // al inicio de cada línea.

   CÓMO ESTÁ ORGANIZADO
   Cada "sección" es una hoja independiente del menú (como una página del PDF).
   Una sección puede tener varios "bloques" (por ejemplo Salchi Personal y Premium).

   Campos de una sección:
     id          nombre corto sin espacios ni tildes (se usa en el enlace)
     grupo       "comida" o "bebidas"
     nombre      nombre en la tarjeta y en la barra de secciones
     antetitulo  opcional, línea pequeña sobre el título
     titulo      título grande de la hoja
     apodo       opcional, línea en cursiva bajo el título
     tema        color de la hoja: "morado", "rosa", "amarillo", "verde" o "azul"
     incluye     opcional, texto "Todas incluyen: ..."
     nota        opcional, texto aclaratorio
     miniatura   opcional, foto pequeña de la tarjeta del inicio
     foto        opcional, foto grande de la hoja
     bloques     lista de bloques

   Campos de un bloque: titulo, antetitulo, tema (opcional, cambia el color
   solo de ese bloque), incluye, nota, foto, extra y productos.
     extra: { texto: "Adiciónale gratinado", precio: 4000 }

   Campos de un producto:
     nombre       obligatorio
     descripcion  opcional
     precio       un solo precio (número)
     opciones     varios precios: [ { nombre: "2 personas", precio: 39000 }, ... ]
                  (si usas opciones, no pongas precio)
     etiqueta     opcional, ej. "Para 2 personas"
     agotado      opcional, true para mostrarlo como agotado

   Fotos: súbelas junto a los demás archivos y escribe su nombre, ej. "foto-mi-foto.webp".
     { src: "foto-x.webp", alt: "Descripción de la foto", ancho: 760, alto: 400,
       recorte: false }     (recorte: true solo si la foto tiene fondo transparente)
   ========================================================================== */

window.MENU_DATA = {

  /* ---------- Datos del negocio ---------- */
  negocio: {
    nombre: "El Vacile",
    eslogan: "Comida costeña. Sabrosura quillera.",
    lema: "Vacílatelo que te conviene",
    horario: "",                             // ejemplo: "Todos los días, 12:00 m a 11:00 pm"
    direccion: "",                           // ejemplo: "Calle 00 # 00-00"
    instagram: "@elvacile_bq",
    logo: "",                                // ejemplo: "foto-logo.png"

    /* WhatsApp: código de país + número, solo dígitos */
    whatsapp: "573105031577",
    mensajeWhatsApp: "Hola, quisiera hacer un pedido.",
    mensajeProducto: "Hola, quisiera pedir:",
    botonPorProducto: false,                 // true = cada producto tiene su botón "Pedir"

    moneda: "$",
    formatoPrecio: "K",                      // "K" muestra $12K; "completo" muestra $12.000
    formatoNumeros: "es-CO"
  },

  grupos: [
    { id: "comida", nombre: "Comida" },
    { id: "bebidas", nombre: "Bebidas" }
  ],

  secciones: [

    /* ===================== COMIDA ===================== */

    {
      id: "entradas",
      grupo: "comida",
      nombre: "Entradas",
      antetitulo: "Entradas pa'",
      titulo: "La Vaciladera",
      tema: "morado",
      miniatura: { src: "foto-entradas-mini.webp", alt: "", recorte: false },
      foto: { src: "foto-entradas.webp", alt: "Chicharrón crocante y mazorca con queso", ancho: 760, alto: 714, recorte: false },
      bloques: [
        {
          productos: [
            { nombre: "Yuquitas Vacile", descripcion: "6 yuquitas fritas, queso costeño, salsa de ajo, salsa de la casa.", precio: 12000 },
            { nombre: "Aros Espanta Jopo", descripcion: "8 aros de cebolla crocante, salsa de ajo y salsa de la casa.", precio: 12000 },
            { nombre: "Patacón Pisa'o", descripcion: "6 patacones crocantes, queso costeño, salsa de ajo, salsa de la casa.", precio: 14000 },
            { nombre: "Mazorca Quesua", descripcion: "1 mazorca con 4 quesos: mozzarella, costeño, americano (cheddar) y polvo de parmesano.", precio: 16000 },
            { nombre: "Chicharrones Mono Cuco", descripcion: "250 g de chicharrón crocante, bollo, queso costeño, salsa de la casa, limón.", precio: 25000 },
            { nombre: "Tacos Quilleros", descripcion: "3 tacos, carne desmechada, queso costeño, salsa de ajo, cebolla morada, cilantro, piña artesanal, chongo, BBQ picante y limón.", precio: 25000 }
          ]
        }
      ]
    },

    {
      id: "burgers",
      grupo: "comida",
      nombre: "Burgers",
      titulo: "Burgers",
      apodo: "Bakanas",
      tema: "rosa",
      incluye: "Todas incluyen: pan brioche, salsa de la casa, tomate, lechuga crespa y papa francesa",
      miniatura: { src: "foto-burgers-mini.webp", alt: "", recorte: false },
      foto: { src: "foto-burgers.webp", alt: "Hamburguesa con lechuga, tomate, aro de cebolla y queso", ancho: 760, alto: 631, recorte: false },
      bloques: [
        {
          productos: [
            {
              nombre: "Clásica de res o pollo",
              descripcion: "150 g de carne premium o pechuga de pollo, mix de queso mozzarella y americano, jamón, cebolla caramelizada.",
              opciones: [
                { nombre: "Sin papas", precio: 18000 },
                { nombre: "Con papas", precio: 22000 }
              ]
            },
            { nombre: "Tronco e' Pollo", descripcion: "150 g de pollo crispy, mix de queso mozzarella y americano, tocineta, miel picante, cebolla caramelizada.", precio: 25000 },
            { nombre: "Tiburona", descripcion: "150 g de carne premium, mix de queso mozzarella y americano, chorizo santarosano, chimichurri, salsa ahumada, cebolla morada.", precio: 25000 },
            { nombre: "Pupi Bacon", descripcion: "150 g de carne premium, mix de queso mozzarella y americano, doble tocineta, 2 aros de cebolla, salsa BBQ, cebolla caramelizada.", precio: 27000 },
            { nombre: "Quejeso", descripcion: "Salsa cremosa de 3 quesos (mozzarella, americano, parmesano), tocineta, 150 g de carne premium, jamón, pollo desmechado, aros de cebolla, cebolla caramelizada.", precio: 29000 },
            { nombre: "Callejera", descripcion: "150 g de carne premium, mix de queso mozzarella y americano, pollo desmechado, maíz, tocineta, jamón, chongo, salsa de tomate, mostaza, cebolla morada.", precio: 32000 },
            { nombre: "Piñua", descripcion: "Doble carne premium de 150 g, mix de queso mozzarella y americano, queso costeño asado, doble tocineta, salsa ahumada, cebolla caramelizada.", precio: 35000 },
            { nombre: "Pincharrón", descripcion: "150 g de carne premium, mix de queso mozzarella y americano, carne desmechada, tocineta, pincho de chicharrón, cebolla caramelizada.", precio: 38000 }
          ]
        }
      ]
    },

    {
      id: "perros",
      grupo: "comida",
      nombre: "Perros",
      titulo: "Perros",
      apodo: "con Flow",
      tema: "amarillo",
      incluye: "Todos incluyen: pan brioche, salsa de la casa, piña artesanal, queso costeño, chongo y lechuga",
      miniatura: { src: "foto-perros-mini.webp", alt: "", recorte: false },
      foto: { src: "foto-perros.webp", alt: "Perro caliente largo con carne desmechada y salsa de queso", ancho: 760, alto: 570, recorte: false },
      bloques: [
        {
          productos: [
            { nombre: "Clásico", descripcion: "Salchicha Zenú, cebolla caramelizada.", precio: 10000 },
            { nombre: "Desmenuzado", descripcion: "Salchicha Zenú, pollo desmechado y cebolla morada.", precio: 14000 },
            { nombre: "Americano", descripcion: "Salchicha americana, jamón, salsa de tomate, mostaza, cebolla morada.", precio: 15000 },
            { nombre: "El Ranchero", descripcion: "2 salchichas rancheras, queso mozzarella, cebolla caramelizada.", precio: 16000 },
            { nombre: "Suizo", descripcion: "Salchicha suiza, queso mozzarella, cebolla caramelizada.", precio: 18000 },
            { nombre: "Mete Mono", descripcion: "Salchicha Zenú, queso mozzarella, tocineta, salsa ahumada, cebolla caramelizada.", precio: 18000 },
            { nombre: "Pumarejo", descripcion: "Salchicha suiza, pollo crispy, doble queso mozzarella, maíz, salsa ahumada, cebolla caramelizada.", precio: 26000 },
            { nombre: "Krypto", etiqueta: "Para 2 personas", descripcion: "Pan brioche de 35 cm, 2 salchichas americanas, carne y pollo desmechado, doble queso mozzarella, salsa ahumada, doble tocineta y cebolla caramelizada.", precio: 39000 }
          ]
        }
      ]
    },

    {
      id: "salchi-personal",
      grupo: "comida",
      nombre: "Salchi personal",
      antetitulo: "Salchi",
      titulo: "Personal",
      tema: "morado",
      incluye: "Todas incluyen: papa francesa, tártara, piña artesanal, queso costeño, chongo y lechuga",
      miniatura: { src: "foto-salchi-personal-mini.webp", alt: "", recorte: true },
      bloques: [
        {
          extra: { texto: "Adiciónale gratinado", precio: 4000 },
          productos: [
            { nombre: "Clásica", descripcion: "Salchicha tradicional.", precio: 15000 },
            { nombre: "Salchi-Buti", descripcion: "Salchicha tradicional y butifarra.", precio: 18000 },
            { nombre: "Chori-Buti", descripcion: "Chorizo santarosano, butifarra, salchicha tradicional.", precio: 20000 },
            { nombre: "Salchi-Pollo", descripcion: "Salchicha tradicional, pollo.", precio: 21000 },
            { nombre: "Suiza", descripcion: "Salchicha suiza.", precio: 21000 },
            { nombre: "Suiza-Ranchera", descripcion: "Salchicha suiza, salchicha ranchera.", precio: 22000 },
            { nombre: "Suiza-Pollo", descripcion: "Salchicha suiza, pollo.", precio: 24000 },
            { nombre: "Mixta", descripcion: "Carne, pollo, salchicha tradicional.", precio: 26000 }
          ]
        },
        {
          antetitulo: "Salchi",
          titulo: "Premium",
          tema: "rosa",
          incluye: "Todas incluyen: papa francesa, tártara, piña artesanal, queso costeño, chongo y lechuga",
          foto: { src: "foto-salchi-personal.webp", alt: "Plato de salchipapa premium con maíz y queso gratinado", ancho: 760, alto: 411, recorte: true },
          productos: [
            { nombre: "Toxi", descripcion: "Salchicha ranchera y suiza, queso gratinado, tocineta y BBQ.", precio: 27000 },
            { nombre: "Valecita", descripcion: "Pollo crispy, salchicha americana, maíz, queso gratinado y salsa ahumada.", precio: 29000 },
            { nombre: "Gordita", descripcion: "Punta gorda, chimichurri, suiza, pollo, queso costeño chui chui.", precio: 32000 },
            { nombre: "Costeñita", descripcion: "Suiza, ranchera, chorizo santarosano, butifarra y queso gratinado.", precio: 29000 }
          ]
        }
      ]
    },

    {
      id: "salchi-compartir",
      grupo: "comida",
      nombre: "Salchi pa' compartir",
      antetitulo: "Salchi pa'",
      titulo: "Compartir",
      tema: "amarillo",
      incluye: "Todas incluyen: papa francesa, tártara, piña artesanal, queso costeño, chongo y lechuga",
      miniatura: { src: "foto-salchi-compartir-mini.webp", alt: "", recorte: true },
      foto: { src: "foto-salchi-compartir.webp", alt: "Tres cuencos de salchipapa para compartir", ancho: 760, alto: 378, recorte: true },
      bloques: [
        {
          productos: [
            {
              nombre: "La Coleta",
              descripcion: "Pollo, salchicha, chorizo, butifarra, tocineta, BBQ.",
              opciones: [
                { nombre: "2 personas", precio: 39000 },
                { nombre: "3 personas", precio: 60000 },
                { nombre: "5 personas", precio: 90000 }
              ]
            }
          ]
        },
        {
          antetitulo: "Salchi",
          titulo: "Premium pa' compartir",
          tema: "morado",
          incluye: "Todas incluyen: papa francesa, tártara, piña artesanal, queso costeño, chongo y lechuga",
          productos: [
            {
              nombre: "Bacana",
              descripcion: "Suiza, ranchera, pollo y lomo de cerdo, salchicha tradicional, queso gratinado, salsa ahumada.",
              opciones: [{ nombre: "2 personas", precio: 45000 }]
            },
            {
              nombre: "Cule Suprema",
              descripcion: "Pollo, lomo de cerdo, ranchera, chorizo, butifarra, salchicha, queso gratinado, maíz, chicharrón crocante, pollo crispy, doble tocineta, BBQ.",
              opciones: [{ nombre: "2 personas", precio: 65000 }]
            },
            {
              nombre: "Vaciladora",
              descripcion: "Pollo, lomo de cerdo, ranchera, chorizo santarosano, butifarra, salchicha, queso gratinado, maíz.",
              opciones: [
                { nombre: "2 personas", precio: 50000 },
                { nombre: "3 personas", precio: 75000 },
                { nombre: "5 personas", precio: 120000 }
              ]
            }
          ]
        }
      ]
    },

    {
      id: "picadas",
      grupo: "comida",
      nombre: "Las más picadas",
      antetitulo: "Las más",
      titulo: "Picadas",
      tema: "amarillo",
      incluye: "Todas incluyen: papa casco, yuquita frita, salsa de ajo, mazorca asada con queso costeño, salsa de la casa, BBQ",
      miniatura: { src: "foto-picadas-mini.webp", alt: "", recorte: true },
      bloques: [
        {
          productos: [
            {
              nombre: "Quillera",
              descripcion: "Chicharrón crocante, costillas BBQ al barril, pollo.",
              opciones: [{ nombre: "2 personas", precio: 50000 }, { nombre: "4 personas", precio: 90000 }]
            },
            {
              nombre: "Currambera",
              descripcion: "Alitas BBQ, chicharrón crocante, costillas BBQ al barril, carne, pollo, chorizo santarosano.",
              opciones: [{ nombre: "2 personas", precio: 65000 }, { nombre: "4 personas", precio: 120000 }]
            },
            {
              nombre: "Carnavalera",
              descripcion: "Carne, pollo, chorizo santarosano, butifarra.",
              opciones: [{ nombre: "2 personas", precio: 47000 }, { nombre: "4 personas", precio: 85000 }]
            },
            {
              nombre: "Caribeña",
              descripcion: "Alitas BBQ, carne, costillas BBQ al barril, salchicha suiza.",
              opciones: [{ nombre: "2 personas", precio: 55000 }, { nombre: "4 personas", precio: 100000 }]
            }
          ]
        }
      ]
    },

    {
      id: "chuzo",
      grupo: "comida",
      nombre: "Chuzo desgranado",
      antetitulo: "Chuzo",
      titulo: "Desgranado",
      tema: "verde",
      incluye: "Todos incluyen: bollo limpio, queso costeño, tártara, piña artesanal, maíz, chongo y lechuga",
      bloques: [
        {
          extra: { texto: "Adiciónale grille", precio: 3000 },
          productos: [
            { nombre: "Pollo", precio: 22000 },
            { nombre: "Joselito", descripcion: "Pollo, chorizo santarosano, butifarra.", precio: 24000 },
            { nombre: "Mixto", descripcion: "Pollo, carne.", precio: 24000 },
            { nombre: "El Cacique", descripcion: "Lomo de cerdo, suiza, ranchera, doble tocineta, BBQ.", precio: 28000 },
            { nombre: "Pibe Valderrama", descripcion: "Carne, pollo, chorizo santarosano, butifarra, grille.", precio: 32000 },
            { nombre: "Emparejao pa' 2", descripcion: "Ranchera, pollo, lomo de cerdo, chorizo santarosano, butifarra, salchicha, queso gratinado, grille y maíz.", precio: 50000 }
          ]
        }
      ]
    },

    {
      id: "sandwich",
      grupo: "comida",
      nombre: "Sándwich",
      titulo: "Sándwich",
      apodo: "con Flow",
      tema: "amarillo",
      incluye: "Todos incluyen: pan brioche, salsa de la casa, lechuga crespa y tomate",
      miniatura: { src: "foto-sandwich-mini.webp", alt: "", recorte: false },
      bloques: [
        {
          productos: [
            { nombre: "Chirri", descripcion: "Jamón, queso mozzarella, cebolla caramelizada.", precio: 13000 },
            { nombre: "Pechy", descripcion: "Pollo desmechado, doble tocineta, mix de quesos mozzarella y americano, cebolla caramelizada.", precio: 22000 },
            { nombre: "Arrebatao", descripcion: "Pollo crispy, maíz, doble queso mozzarella, salsa ahumada, cebolla caramelizada.", precio: 22000 },
            { nombre: "Rebolero", descripcion: "Carne y lomo de cerdo, grille, jamón, queso costeño, salsa BBQ, cebolla caramelizada.", precio: 25000 }
          ]
        }
      ]
    },

    {
      id: "alitas",
      grupo: "comida",
      nombre: "Alitas",
      titulo: "Alitas",
      tema: "azul",
      incluye: "Todos incluyen: papas a la francesa y la salsa de tu elección",
      nota: "Elige tu salsa: BBQ, miel mostaza, ahumada, BBQ picante, miel picante.",
      miniatura: { src: "foto-alitas-mini.webp", alt: "", recorte: false },
      bloques: [
        {
          productos: [
            { nombre: "6 piezas", precio: 20000 },
            { nombre: "12 piezas", precio: 35000 },
            { nombre: "24 piezas", precio: 60000 },
            { nombre: "36 piezas", precio: 85000 }
          ]
        }
      ]
    },

    {
      id: "asados",
      grupo: "comida",
      nombre: "Asados parchados",
      antetitulo: "Asados",
      titulo: "Parchados",
      tema: "rosa",
      incluye: "Todos los asados incluyen: ensalada, papa o bollo, salsa de la casa, BBQ, chimichurri",
      nota: "Elige tu porción: 300 g o 600 g de proteína.",
      miniatura: { src: "foto-asados-mini.webp", alt: "", recorte: false },
      foto: { src: "foto-asados.webp", alt: "Costillas BBQ, papas en gajos y maíz", ancho: 760, alto: 397, recorte: false },
      bloques: [
        {
          productos: [
            { nombre: "Punta gorda", descripcion: "350 g de punta gorda.", opciones: [{ nombre: "300 g", precio: 38000 }, { nombre: "600 g", precio: 67000 }] },
            { nombre: "Churrasco de res", descripcion: "350 g de lomo ancho.", opciones: [{ nombre: "300 g", precio: 35000 }, { nombre: "600 g", precio: 65000 }] },
            { nombre: "Costillas de cerdo BBQ", descripcion: "400 g de costillas BBQ al barril.", opciones: [{ nombre: "300 g", precio: 35000 }, { nombre: "600 g", precio: 62000 }] },
            { nombre: "Carne asada", descripcion: "300 g de carne asada a la plancha.", opciones: [{ nombre: "300 g", precio: 28000 }, { nombre: "600 g", precio: 50000 }] },
            { nombre: "Lomo de cerdo", descripcion: "300 g de lomo de cerdo a la plancha.", opciones: [{ nombre: "300 g", precio: 24000 }, { nombre: "600 g", precio: 42000 }] },
            { nombre: "Pechuga asada", descripcion: "300 g de pechuga a la plancha.", opciones: [{ nombre: "300 g", precio: 24000 }, { nombre: "600 g", precio: 42000 }] },
            { nombre: "Pechuga gratinada con champiñones", descripcion: "300 g de pechuga, queso gratinado con champiñones, polvo de parmesano.", opciones: [{ nombre: "300 g", precio: 35000 }, { nombre: "600 g", precio: 62000 }] },
            { nombre: "Pechuga gratinada con tocineta", descripcion: "300 g de pechuga, queso gratinado, doble tocineta, salsa BBQ.", opciones: [{ nombre: "300 g", precio: 35000 }, { nombre: "600 g", precio: 62000 }] }
          ]
        },
        {
          titulo: "Combis",
          tema: "morado",
          foto: { src: "foto-combis.webp", alt: "Parrillada con pechuga, chorizo, carne y papas", ancho: 760, alto: 570, recorte: false },
          productos: [
            { nombre: "Combi 1", descripcion: "180 g de carne, 180 g de pechuga asada, chorizo santarosano, bollo con queso, papa francesa, ensalada.", precio: 38000 },
            { nombre: "Combi 2", descripcion: "200 g de costilla BBQ al barril, 200 g de chicharrón crocante, bollo con queso, papa francesa, ensalada.", precio: 42000 },
            { nombre: "Combi 3", descripcion: "350 g de churrasco de res, chorizo santarosano, butifarra, mazorca con queso costeño, papa francesa, ensalada.", precio: 45000 }
          ]
        }
      ]
    },

    {
      id: "infantil",
      grupo: "comida",
      nombre: "Menú infantil",
      antetitulo: "Menú",
      titulo: "Infantil",
      tema: "verde",
      miniatura: { src: "foto-infantil-mini.webp", alt: "", recorte: false },
      bloques: [
        {
          productos: [
            { nombre: "Minisalchipapa", descripcion: "Papa francesa, salchicha Zenú, queso costeño, chongo, salsa de la casa, piña artesanal.", precio: 22000 },
            { nombre: "Mini pechuga", descripcion: "150 g de pechuga asada, papa a la francesa, salsa de la casa.", precio: 20000 },
            { nombre: "Nuggets", descripcion: "6 nuggets de pollo, papa a la francesa, salsa de la casa.", precio: 22000 },
            { nombre: "Salchinuggets", descripcion: "6 nuggets, pulpitos de salchicha ranchera, papas a la francesa y salsa de la casa.", precio: 26000 }
          ]
        }
      ]
    },

    /* ===================== BEBIDAS ===================== */

    {
      id: "cervezas",
      grupo: "bebidas",
      nombre: "Cervezas y micheladas",
      titulo: "Cervezas",
      apodo: "y micheladas",
      tema: "morado",
      bloques: [
        {
          titulo: "Cervezas",
          productos: [
            { nombre: "Costeñita", precio: 4000 },
            { nombre: "Águila Negra", precio: 5000 },
            { nombre: "Águila Light", precio: 5000 },
            { nombre: "Club Colombia", precio: 6000 },
            { nombre: "Coronita", precio: 6000 },
            { nombre: "Corona", precio: 9000 },
            { nombre: "Stella", precio: 9000 },
            { nombre: "Smirnoff", precio: 12000 }
          ]
        },
        {
          titulo: "Micheladas",
          tema: "rosa",
          productos: [
            { nombre: "Limón, sal y Tajín", precio: 3000 },
            { nombre: "Maracuyá", precio: 5000 },
            { nombre: "Corozo", precio: 5000 },
            { nombre: "Tamarindo", precio: 5000 },
            { nombre: "Frutos rojos", precio: 8000 }
          ]
        }
      ]
    },

    {
      id: "sodas",
      grupo: "bebidas",
      nombre: "Sodas micheladas",
      antetitulo: "Sodas",
      titulo: "Micheladas",
      tema: "azul",
      miniatura: { src: "foto-sodas-mini.webp", alt: "", recorte: false },
      foto: { src: "foto-sodas.webp", alt: "Tres bebidas con borde de Tajín: azul, roja con frutas y amarilla", ancho: 704, alto: 1009, recorte: false },
      bloques: [
        {
          productos: [
            { nombre: "Soda de maracuyá", precio: 10000 },
            { nombre: "Soda de fresa", precio: 10000 },
            { nombre: "Soda de cereza", precio: 12000 },
            { nombre: "Soda de corozo", precio: 12000 },
            { nombre: "Soda de tamarindo", precio: 12000 },
            { nombre: "Soda de blackberry", etiqueta: "Con perlas explosivas", precio: 12000 },
            { nombre: "Soda de frutos rojos", etiqueta: "Con perlas explosivas", precio: 15000 },
            { nombre: "Soda de frutos verdes", etiqueta: "Con perlas explosivas", precio: 15000 }
          ]
        }
      ]
    },

    {
      id: "bebidas",
      grupo: "bebidas",
      nombre: "Bebidas",
      titulo: "Bebidas",
      tema: "rosa",
      bloques: [
        {
          productos: [
            { nombre: "Gaseosa personal", precio: 4000 },
            { nombre: "Soda", precio: 5000 },
            { nombre: "Ginger", precio: 5000 },
            { nombre: "Agua tónica", precio: 5000 },
            { nombre: "Té Hatsu", precio: 8000 },
            { nombre: "Soda Hatsu", precio: 8000 },
            { nombre: "Jugo Hit caja personal", precio: 3000 },
            { nombre: "Agua", precio: 4000 },
            { nombre: "Agua con gas", precio: 4000 },
            { nombre: "Agua pequeña", precio: 2000 },
            { nombre: "Gaseosa 1,5 L", precio: 12000 }
          ]
        }
      ]
    },

    {
      id: "limonadas",
      grupo: "bebidas",
      nombre: "Limonadas y jugos",
      titulo: "Limonadas",
      apodo: "y jugos",
      tema: "verde",
      bloques: [
        {
          titulo: "Limonadas",
          productos: [
            { nombre: "Limonada natural", precio: 7000 },
            { nombre: "Granizado de naranja", precio: 7000 },
            { nombre: "Granizado de mandarina", precio: 8000 },
            { nombre: "Limonada de hierbabuena", precio: 8000 },
            { nombre: "Limonada cerezada", precio: 9000 },
            { nombre: "Limonada de coco", precio: 10000 }
          ]
        },
        {
          titulo: "Jugos",
          tema: "morado",
          productos: [
            { nombre: "Natural en agua", descripcion: "Maracuyá, fresa, mora, corozo, tamarindo, piña.", precio: 8000 },
            { nombre: "Natural en leche", descripcion: "Maracuyá, fresa, mora.", precio: 9000 }
          ]
        }
      ]
    },

    {
      id: "cocteles-clasicos",
      grupo: "bebidas",
      nombre: "Cócteles clásicos",
      antetitulo: "Cócteles",
      titulo: "Clásicos",
      tema: "morado",
      bloques: [
        {
          productos: [
            { nombre: "Mojito clásico", precio: 20000 },
            { nombre: "Mojito de coco", descripcion: "Frescura del mojito clásico con el toque cremoso y fresco del coco.", precio: 24000 },
            { nombre: "Piña colada", precio: 22000 },
            { nombre: "Cuba libre", precio: 20000 },
            { nombre: "Gin tonic", precio: 22000 },
            { nombre: "Margarita Ice", descripcion: "Limón, maracuyá, cereza, corozo, tamarindo.", precio: 25000 },
            { nombre: "Daiquiri", descripcion: "Limón, maracuyá, fresa, cereza, corozo, tamarindo.", precio: 22000 },
            { nombre: "Tequila Sunrise", precio: 23000 }
          ]
        }
      ]
    },

    {
      id: "cocteles-autor",
      grupo: "bebidas",
      nombre: "Cócteles de autor",
      antetitulo: "Cócteles",
      titulo: "De autor",
      tema: "amarillo",
      bloques: [
        {
          productos: [
            { nombre: "Nieve Quillera", descripcion: "Cóctel espumoso a base de guayaba agria y tequila, aromatizado con romero.", precio: 26000 },
            { nombre: "Junior Manda", descripcion: "Experiencia ahumada a base de gin y corozo, toque de lychee refrescante y frutal. Tan apasionada como Junior.", precio: 28000 },
            { nombre: "Centurión de la Noche", descripcion: "Cóctel a base de whisky con notas de madera y humo, acidez de tamarindo y toques de mandarina y cerveza negra.", precio: 30000 },
            { nombre: "Tropi Coqueto", descripcion: "Cóctel fresco, la dulzura del kiwi con la acidez de la maracuyá, jugosidad de la piña y frescor de hierbabuena con la fuerza del ron blanco.", precio: 26000 }
          ]
        }
      ]
    }

  ]
};
