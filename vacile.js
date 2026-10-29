/* ==========================================================================
   EL VACILE: LÓGICA DE LA PÁGINA
   Lee los datos de vacile-menu.js y arma las vistas:
     #/            Inicio
     #/menu        Menú (tarjetas de todas las secciones)
     #/<seccion>   Una hoja del menú (ej. #/burgers)
     #/domicilios  Zonas, precios y mapa
     #/contacto    WhatsApp y redes
   No necesitas editar este archivo para actualizar productos o precios.
   ========================================================================== */

(function () {
  "use strict";

  var data = window.MENU_DATA;
  var vista = document.getElementById("vista");

  if (!data || !Array.isArray(data.secciones)) {
    vista.textContent = "No se encontró vacile-menu.js (o es de una versión anterior). Súbelo junto a index.html.";
    return;
  }

  var negocio = data.negocio || {};
  var dom = data.domicilios || {};
  var grupos = data.grupos || [];
  var secciones = data.secciones || [];
  var domActivo = dom.activo !== false;

  var barra = document.getElementById("barra");
  var chips = document.getElementById("chips");
  var tabs = document.getElementById("tabs");
  var wa = document.getElementById("wa");

  var actual = null;        // { tipo, i, orden } de la vista abierta
  var grupoChips = null;
  var primeraCarga = true;

  var reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var usaVT = !reducir && typeof document.startViewTransition === "function";
  if (usaVT) document.documentElement.classList.add("vt");

  /* ---------- Utilidades ---------- */

  function el(tag, clase, texto) {
    var nodo = document.createElement(tag);
    if (clase) nodo.className = clase;
    if (texto !== undefined && texto !== null) nodo.textContent = texto;
    return nodo;
  }

  var ICONOS = {
    inicio: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    menu: '<path d="M7 3v7a2 2 0 0 0 4 0V3M9 3v18M17 3c-2 2-3 5-3 8h3v10"/>',
    domicilios: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    contacto: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    whatsapp: '<path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2 4.2 5 4.5"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };

  function icono(nombre) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("focusable", "false");
    s.innerHTML = ICONOS[nombre];
    return s;
  }

  function precio(valor) {
    if (typeof valor !== "number") return String(valor);
    var moneda = negocio.moneda || "$";
    if (negocio.formatoPrecio !== "completo" && valor % 1000 === 0) {
      return moneda + valor / 1000 + "K";
    }
    return moneda + valor.toLocaleString(negocio.formatoNumeros || "es-CO");
  }

  var numeroWA = String(negocio.whatsapp || "").replace(/\D/g, "");

  function enlaceWA(texto) {
    return "https://wa.me/" + numeroWA + "?text=" + encodeURIComponent(texto);
  }

  function telefonoBonito() {
    var m = numeroWA.match(/^57(\d{3})(\d{3})(\d{4})$/);
    return m ? "+57 " + m[1] + " " + m[2] + " " + m[3] : numeroWA ? "+" + numeroWA : "";
  }

  function usuario(red) {
    return String(red || "").replace(/^@/, "").trim();
  }

  function enlaceExterno(href, clase, hijos) {
    var a = el("a", clase);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    (hijos || []).forEach(function (h) { a.appendChild(h); });
    return a;
  }

  /* ---------- Movimiento: aparición al llegar a la pantalla y fotos con fundido ---------- */

  var observador = null;
  if (!reducir && "IntersectionObserver" in window) {
    observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("rev--in");
          observador.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
  }

  function marcar(nodo) {
    if (observador) nodo.classList.add("rev");
    return nodo;
  }

  function revelar(raiz) {
    if (!observador) return;
    Array.prototype.forEach.call(raiz.querySelectorAll(".rev"), function (n) {
      if (n.getBoundingClientRect().top < window.innerHeight) {
        n.classList.add("rev--in");
      } else {
        observador.observe(n);
      }
    });
  }

  function conFundido(img, alFallar) {
    img.classList.add("img-fade");
    img.addEventListener("load", function () { img.classList.add("lista"); });
    img.addEventListener("error", function () {
      if (window.console) console.warn("No se pudo cargar: " + img.getAttribute("src"));
      if (alFallar) alFallar();
    });
    if (img.complete && img.naturalWidth > 0) img.classList.add("lista");
  }

  function imagenArte(archivo, clase) {
    var img = el("img", clase);
    img.src = archivo;
    img.alt = "";
    img.decoding = "async";
    img.setAttribute("aria-hidden", "true");
    conFundido(img, function () { img.remove(); });
    return img;
  }

  /* ---------- Zonas de domicilio (las publica _worker.js) ---------- */

  var zonasPromesa = null;

  function cargarZonas() {
    if (!zonasPromesa) {
      zonasPromesa = fetch("/api/zonas", { cache: "no-store" })
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function (d) { return { Z: d.Z || [], bz: d.bz || {} }; })
        .catch(function () { return null; })
        .then(function (res) { if (!res) zonasPromesa = null; return res; });
    }
    return zonasPromesa;
  }

  /* ---------- Piezas comunes ---------- */

  function arteDelTema(tema) {
    return tema === "amarillo" ? "arte-sombrero.svg" : "arte-jaguar.svg";
  }

  function encabezado(obj, tag, esBloque) {
    var h = el(tag, "encabezado" + (esBloque ? " encabezado--bloque" : ""));
    if (obj.antetitulo) {
      h.appendChild(el("span", "antetitulo", obj.antetitulo));
      h.appendChild(document.createTextNode(" "));
    }
    if (obj.titulo) {
      h.appendChild(el("span", "titulo", obj.titulo));
      h.appendChild(document.createTextNode(" "));
    }
    if (obj.apodo) h.appendChild(el("span", "apodo", obj.apodo));
    return h;
  }

  // Cabecera de color con trazos, título y el dibujo de la marca en la esquina
  function cabeceraPagina(obj, tema) {
    var conArte = obj.arte !== "ninguno";
    var sec = el("section", "bloque bloque--cabecera tema-" + tema + (conArte ? " con-arte" : ""));
    var deco = el("div", "patron");
    deco.setAttribute("aria-hidden", "true");
    sec.appendChild(deco);
    if (conArte) sec.appendChild(imagenArte(arteDelTema(tema), "hoja__arte"));
    var cont = el("div", "contenedor");
    cont.appendChild(encabezado(obj, "h2", false));
    sec.appendChild(cont);
    return { sec: sec, cont: cont };
  }

  function crearFoto(f) {
    var alta = f.ancho && f.alto && f.alto > f.ancho;
    var fig = el("figure", "foto" + (f.recorte ? " foto--recorte" : "") + (alta ? " foto--alta" : ""));
    var img = el("img");
    img.src = f.src;
    img.alt = f.alt || "";
    if (f.ancho && f.alto) {
      img.width = f.ancho;
      img.height = f.alto;
    }
    img.decoding = "async";
    conFundido(img, function () { fig.remove(); });
    fig.appendChild(img);
    return fig;
  }

  function crearDeco() {
    var deco = el("span", "patron tile__patron");
    deco.setAttribute("aria-hidden", "true");
    return deco;
  }

  function crearTile(s) {
    var item = el("li");
    var a = el("a", "tile tema-" + (s.tema || "morado"));
    a.href = "#/" + s.id;
    a.appendChild(el("span", "tile__nombre", s.nombre));

    var mini = s.miniatura;
    if (mini && mini.src) {
      var img = el("img", "tile__foto" + (mini.recorte ? " tile__foto--recorte" : ""));
      img.src = mini.src;
      img.alt = "";
      img.width = 92;
      img.height = 92;
      img.loading = "lazy";
      img.decoding = "async";
      conFundido(img, function () { img.replaceWith(crearDeco()); });
      a.appendChild(img);
    } else {
      a.appendChild(crearDeco());
    }
    item.appendChild(a);
    return item;
  }

  function botonWA(texto, mensaje, clase) {
    var a = el("a", "btn btn--wa " + (clase || ""));
    a.href = enlaceWA(mensaje);
    a.target = "_blank";
    a.rel = "noopener";
    a.appendChild(icono("whatsapp"));
    a.appendChild(document.createTextNode(texto));
    return a;
  }

  function cierre() {
    var sec = el("section", "cierre");
    var cont = el("div", "contenedor");
    if (negocio.lema) cont.appendChild(el("p", "cierre__lema", negocio.lema));
    var enlaces = el("p", "cierre__enlaces");
    if (negocio.instagram) {
      enlaces.appendChild(enlaceExterno("https://www.instagram.com/" + encodeURIComponent(usuario(negocio.instagram)), null, [document.createTextNode("Instagram")]));
    }
    if (negocio.tiktok) {
      enlaces.appendChild(enlaceExterno("https://www.tiktok.com/@" + encodeURIComponent(usuario(negocio.tiktok)), null, [document.createTextNode("TikTok")]));
    }
    if (enlaces.children.length) cont.appendChild(enlaces);
    sec.appendChild(cont);
    sec.appendChild(imagenArte("arte-insignia.svg", "cierre__arte"));
    return sec;
  }

  function filaRed(tipo) {
    var usr = usuario(negocio[tipo]);
    if (!usr) return null;
    var item = marcar(el("li"));
    var href = tipo === "instagram"
      ? "https://www.instagram.com/" + encodeURIComponent(usr)
      : "https://www.tiktok.com/@" + encodeURIComponent(usr);
    var ic = el("span", "red__icono");
    ic.appendChild(icono(tipo));
    var txt = el("span");
    txt.appendChild(el("strong", null, tipo === "instagram" ? "Instagram" : "TikTok"));
    txt.appendChild(el("small", null, "@" + usr));
    item.appendChild(enlaceExterno(href, "red", [ic, txt]));
    return item;
  }

  /* ---------- Vista: Inicio ---------- */

  function vistaInicio() {
    var raiz = el("div", primeraCarga && !reducir ? "entrada" : "");

    // Portada
    var hero = el("section", "hero");
    var c = el("div", "contenedor");
    c.appendChild(el("h1", "sr-only", negocio.nombre || "El Vacile"));

    var logo = el("img", "hero__logo");
    logo.src = "arte-logo.svg";
    logo.alt = (negocio.nombre || "El Vacile") + ": comida costeña con sabrosura quillera";
    logo.width = 324;
    logo.height = 268;
    logo.addEventListener("error", function () {
      logo.replaceWith(el("p", "hero__lema", negocio.nombre || "El Vacile"));
    });
    c.appendChild(logo);

    var base = el("div", "hero__base");
    var texto = el("div", "hero__texto");
    if (negocio.lema) texto.appendChild(el("p", "hero__lema", negocio.lema));
    var acciones = el("div", "hero__acciones");
    var ver = el("a", "btn btn--morado");
    ver.href = "#/menu";
    ver.appendChild(icono("menu"));
    ver.appendChild(document.createTextNode("Ver el menú"));
    acciones.appendChild(ver);
    if (numeroWA) acciones.appendChild(botonWA("Pedir por WhatsApp", negocio.mensajeWhatsApp || "Hola, quisiera hacer un pedido."));
    texto.appendChild(acciones);
    base.appendChild(texto);
    base.appendChild(imagenArte("arte-sombrero.svg", "hero__personaje"));
    c.appendChild(base);
    hero.appendChild(c);
    raiz.appendChild(hero);
    raiz.appendChild(el("div", "franja"));

    // Atajos a las secciones del menú
    var atajos = el("section", "seccion");
    var cab = el("div", "contenedor seccion__cab");
    cab.appendChild(el("h2", null, "¿Qué se te antoja?"));
    var mas = el("a", "seccion__mas", "Ver todo");
    mas.href = "#/menu";
    cab.appendChild(mas);
    atajos.appendChild(cab);
    var ul = el("ul", "carrusel");
    secciones.forEach(function (s) { ul.appendChild(crearTile(s)); });
    atajos.appendChild(ul);
    raiz.appendChild(atajos);

    // Domicilios
    if (domActivo) {
      var cd = el("section", "contenedor seccion");
      var banda = marcar(el("div", "banda tema-verde"));
      var bt = el("div", "banda__texto");
      bt.appendChild(el("h2", null, "Domicilios"));
      bt.appendChild(el("p", null, "Consulta el precio de tu zona y pide por WhatsApp."));
      var desde = el("span", "precio");
      desde.hidden = true;
      bt.appendChild(desde);
      var verZ = el("a", "btn btn--claro", "Ver zonas y precios");
      verZ.href = "#/domicilios";
      bt.appendChild(verZ);
      banda.appendChild(bt);
      banda.appendChild(imagenArte("arte-jaguar.svg", "banda__arte"));
      cd.appendChild(banda);
      raiz.appendChild(cd);

      cargarZonas().then(function (res) {
        if (!res) return;
        var precios = res.Z.map(function (z) { return z.p; }).filter(function (p) { return p > 0; });
        if (!precios.length) return;
        desde.textContent = "Desde " + precio(Math.min.apply(null, precios));
        desde.hidden = false;
      });
    }

    // Redes
    var filas = [filaRed("instagram"), filaRed("tiktok")].filter(Boolean);
    if (filas.length) {
      var sr = el("section", "contenedor seccion");
      sr.appendChild(el("h2", null, "Síguenos")).style.marginBottom = "0.9rem";
      var lista = el("ul", "redes");
      filas.forEach(function (f) { lista.appendChild(f); });
      sr.appendChild(lista);
      raiz.appendChild(sr);
    }

    var espacio = el("div");
    espacio.style.height = "2.5rem";
    raiz.appendChild(espacio);
    raiz.appendChild(cierre());
    return raiz;
  }

  /* ---------- Vista: Menú ---------- */

  function vistaMenu() {
    var raiz = el("div", "hoja");
    var cab = cabeceraPagina({ antetitulo: "Nuestro", titulo: "Menú" }, "morado");
    raiz.appendChild(cab.sec);

    var cont = el("div", "contenedor menu-grupos");
    grupos.forEach(function (g) {
      var lista = secciones.filter(function (s) { return s.grupo === g.id; });
      if (!lista.length) return;
      var bloque = el("section", "grupo");
      bloque.appendChild(el("h2", "grupo__titulo", g.nombre));
      var ul = el("ul", "tiles");
      lista.forEach(function (s) { ul.appendChild(crearTile(s)); });
      bloque.appendChild(ul);
      cont.appendChild(bloque);
    });
    raiz.appendChild(cont);
    return raiz;
  }

  /* ---------- Vista: una hoja del menú ---------- */

  function crearProducto(p, tag) {
    var item = marcar(el("li", "producto" + (p.agotado ? " agotado" : "")));
    var cuerpo = el("div", "producto__cuerpo");

    var titulo = el("div", "producto__titulo");
    titulo.appendChild(el(tag, "producto__nombre", p.nombre));
    if (p.etiqueta) titulo.appendChild(el("span", "etiqueta", p.etiqueta));
    cuerpo.appendChild(titulo);

    if (p.descripcion) cuerpo.appendChild(el("p", "producto__desc", p.descripcion));

    var tieneOpciones = Array.isArray(p.opciones) && p.opciones.length > 0;
    if (tieneOpciones) {
      var lista = el("ul", "opciones");
      p.opciones.forEach(function (o) {
        var fila = el("li");
        fila.appendChild(el("span", "op-nombre", o.nombre));
        fila.appendChild(el("span", "precio", p.agotado ? "Agotado" : precio(o.precio)));
        lista.appendChild(fila);
      });
      cuerpo.appendChild(lista);
    }

    if (negocio.botonPorProducto && numeroWA && !p.agotado) {
      var pedir = el("a", "pedir", "Pedir");
      pedir.href = enlaceWA((negocio.mensajeProducto || "Hola, quisiera pedir:") + " " + p.nombre);
      pedir.target = "_blank";
      pedir.rel = "noopener";
      pedir.setAttribute("aria-label", "Pedir " + p.nombre + " por WhatsApp");
      cuerpo.appendChild(pedir);
    }

    item.appendChild(cuerpo);

    if (!tieneOpciones && p.precio !== undefined && p.precio !== null) {
      item.appendChild(el("span", "precio", p.agotado ? "Agotado" : precio(p.precio)));
    }
    return item;
  }

  function contenidoBloque(cont, b) {
    var conTitulo = !!(b.titulo || b.antetitulo);
    if (conTitulo) cont.appendChild(encabezado(b, "h3", true));
    if (b.incluye) cont.appendChild(el("p", "incluye", b.incluye));
    if (b.nota) cont.appendChild(el("p", "nota", b.nota));
    if (b.foto) cont.appendChild(crearFoto(b.foto));

    var lista = el("ul", "productos");
    (b.productos || []).forEach(function (p) {
      lista.appendChild(crearProducto(p, conTitulo ? "h4" : "h3"));
    });
    cont.appendChild(lista);

    if (b.extra) {
      var extra = el("p", "extra");
      extra.appendChild(el("span", null, b.extra.texto));
      extra.appendChild(el("span", "precio", precio(b.extra.precio)));
      cont.appendChild(extra);
    }
  }

  function enlacePager(s, rotulo, siguiente) {
    var a = el("a", "pager__a" + (siguiente ? " pager__sig" : ""));
    a.href = "#/" + s.id;
    a.appendChild(el("span", null, siguiente ? rotulo + " \u2192" : "\u2190 " + rotulo));
    a.appendChild(el("strong", null, s.nombre));
    return a;
  }

  function crearPager(i) {
    var nav = el("nav", "pager");
    nav.setAttribute("aria-label", "Cambiar de sección");
    var cont = el("div", "contenedor");
    var fila = el("div", "pager__fila");
    fila.appendChild(i > 0 ? enlacePager(secciones[i - 1], "Anterior", false) : el("span"));
    fila.appendChild(i < secciones.length - 1 ? enlacePager(secciones[i + 1], "Siguiente", true) : el("span"));
    cont.appendChild(fila);

    var todas = el("p", "pager__todas");
    var a = el("a", null, "Ver todas las secciones");
    a.href = "#/menu";
    todas.appendChild(a);
    cont.appendChild(todas);
    cont.appendChild(el("p", "pista", "Desliza hacia los lados para cambiar de sección"));

    nav.appendChild(cont);
    return nav;
  }

  function vistaHoja(i) {
    var s = secciones[i];
    var tema = s.tema || "morado";
    var hoja = el("article", "hoja");
    var bloques = (s.bloques || []).slice();

    var cab = cabeceraPagina(s, tema);
    var cont = cab.cont;
    if (s.incluye) cont.appendChild(el("p", "incluye", s.incluye));
    if (s.nota) cont.appendChild(el("p", "nota", s.nota));
    if (s.foto) cont.appendChild(crearFoto(s.foto));

    // El primer bloque comparte color con la cabecera: se muestra seguido.
    if (bloques.length && (!bloques[0].tema || bloques[0].tema === tema)) {
      contenidoBloque(cont, bloques.shift());
    }
    hoja.appendChild(cab.sec);

    bloques.forEach(function (b) {
      var sec = el("section", "bloque tema-" + (b.tema || tema));
      var c = el("div", "contenedor");
      contenidoBloque(c, b);
      sec.appendChild(c);
      hoja.appendChild(sec);
    });

    hoja.appendChild(crearPager(i));
    return hoja;
  }

  /* ---------- Vista: Domicilios ---------- */

  function vistaDomicilios() {
    var raiz = el("div", "hoja");
    var cab = cabeceraPagina({ antetitulo: "Precios de", titulo: "Domicilios" }, "verde");
    raiz.appendChild(cab.sec);

    var cont = el("div", "contenedor dom");
    cont.appendChild(el("p", "dom__aviso", "El precio del domicilio depende de tu zona. Revisa las zonas o busca tu barrio en el mapa."));

    cont.appendChild(el("h2", null, "Zonas y precios"));
    var lista = el("ul", "zonas");
    lista.appendChild(el("li", "zonas__estado", "Cargando zonas…"));
    cont.appendChild(lista);

    cargarZonas().then(function (res) {
      lista.replaceChildren();
      if (!res) {
        lista.appendChild(el("li", "zonas__estado", "No se pudieron cargar las zonas. Recarga la página o escríbenos por WhatsApp."));
        return;
      }
      if (!res.Z.length) {
        lista.appendChild(el("li", "zonas__estado", "Aún no hay zonas publicadas. Escríbenos por WhatsApp para cotizar tu domicilio."));
        return;
      }
      res.Z.forEach(function (z) {
        var n = Object.keys(res.bz).filter(function (k) { return res.bz[k] === z.id; }).length;
        var item = marcar(el("li", "zona"));
        item.style.setProperty("--zc", z.c || "#34134A");
        var t = el("div");
        t.appendChild(el("strong", null, z.t));
        if (n) t.appendChild(el("small", null, n + (n === 1 ? " barrio" : " barrios")));
        item.appendChild(t);
        item.appendChild(el("span", "precio", precio(z.p)));
        lista.appendChild(item);
      });
      revelar(lista);
    });

    if (dom.pagina) {
      cont.appendChild(el("h2", null, "Busca tu barrio"));
      var mapa = el("div", "mapa");
      var marco = el("iframe");
      marco.src = dom.pagina + "?embed=1";
      marco.title = "Mapa de zonas de domicilio";
      marco.loading = "lazy";
      mapa.appendChild(marco);
      cont.appendChild(mapa);
    }

    var acciones = el("div", "dom__acciones");
    if (numeroWA) acciones.appendChild(botonWA("Pedir a domicilio por WhatsApp", dom.mensaje || "Hola, quiero pedir a domicilio. Mi barrio es:"));
    if (dom.pagina) {
      var full = el("a", "btn btn--claro", "Mapa en pantalla completa");
      full.href = dom.pagina;
      acciones.appendChild(full);
      var ed = el("a", "btn btn--claro", "Editar zonas (solo el dueño)");
      ed.href = dom.pagina + "#editor";
      acciones.appendChild(ed);
    }
    cont.appendChild(acciones);

    raiz.appendChild(cont);
    return raiz;
  }

  /* ---------- Vista: Contacto ---------- */

  function tarjetaContacto(clase, nombreIcono, titulo, detalle, href) {
    var item = marcar(el("li"));
    var ic = el("span", "red__icono");
    ic.appendChild(icono(nombreIcono));
    var txt = el("span");
    txt.appendChild(el("strong", null, titulo));
    txt.appendChild(el("small", null, detalle));
    if (href) {
      item.appendChild(enlaceExterno(href, "red", [ic, txt]));
    } else {
      var caja = el("div", "red");
      caja.appendChild(ic);
      caja.appendChild(txt);
      item.appendChild(caja);
    }
    return item;
  }

  function vistaContacto() {
    var raiz = el("div", "hoja");
    var cab = cabeceraPagina({ titulo: "Contacto" }, "morado");
    raiz.appendChild(cab.sec);

    var cont = el("div", "contenedor contacto-pagina");
    var lista = el("ul", "contactos");
    if (numeroWA) {
      lista.appendChild(tarjetaContacto("wa", "whatsapp", "WhatsApp", telefonoBonito(), enlaceWA(negocio.mensajeWhatsApp || "Hola, quisiera hacer un pedido.")));
    }
    ["instagram", "tiktok"].forEach(function (t) {
      var f = filaRed(t);
      if (f) lista.appendChild(f);
    });
    if (negocio.horario) lista.appendChild(tarjetaContacto("", "reloj", "Horario", negocio.horario, null));
    if (negocio.direccion) lista.appendChild(tarjetaContacto("", "domicilios", "Dirección", negocio.direccion, null));
    cont.appendChild(lista);
    raiz.appendChild(cont);
    raiz.appendChild(cierre());
    return raiz;
  }

  /* ---------- Pestañas y barra de secciones ---------- */

  var rutas = [
    { id: "inicio", hash: "#/", nombre: "Inicio" },
    { id: "menu", hash: "#/menu", nombre: "Menú" }
  ];
  if (domActivo) rutas.push({ id: "domicilios", hash: "#/domicilios", nombre: "Domicilios" });
  rutas.push({ id: "contacto", hash: "#/contacto", nombre: "Contacto" });

  rutas.forEach(function (r) {
    var a = el("a");
    a.href = r.hash;
    a.dataset.ruta = r.id;
    a.appendChild(icono(r.id));
    a.appendChild(el("span", null, r.nombre));
    tabs.appendChild(a);
  });

  function marcarTab(id) {
    Array.prototype.forEach.call(tabs.children, function (a) {
      if (a.dataset.ruta === id) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  function armarBarra(s) {
    if (grupoChips !== s.grupo) {
      grupoChips = s.grupo;
      chips.replaceChildren();
      secciones.forEach(function (x) {
        if (x.grupo !== s.grupo) return;
        var a = el("a", "chip", x.nombre);
        a.href = "#/" + x.id;
        a.dataset.id = x.id;
        chips.appendChild(a);
      });
    }

    var activo = null;
    Array.prototype.forEach.call(chips.children, function (a) {
      if (a.dataset.id === s.id) {
        a.setAttribute("aria-current", "true");
        activo = a;
      } else {
        a.removeAttribute("aria-current");
      }
    });

    if (activo) {
      var r = activo.getBoundingClientRect();
      var c = chips.getBoundingClientRect();
      chips.scrollTo({
        left: chips.scrollLeft + r.left - c.left - (c.width - r.width) / 2,
        behavior: reducir ? "auto" : "smooth"
      });
    }
  }

  /* ---------- Navegación ---------- */

  function interpretar() {
    var h = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    if (h === "menu") return { tipo: "menu", orden: 1 };
    if (h === "domicilios" && domActivo) return { tipo: "domicilios", orden: 2 };
    if (h === "contacto") return { tipo: "contacto", orden: 3 };
    for (var n = 0; n < secciones.length; n++) {
      if (secciones[n].id === h) return { tipo: "hoja", i: n, orden: 1 + (n + 1) / 100 };
    }
    return { tipo: "inicio", orden: 0 };
  }

  var TITULOS = {
    inicio: null,
    menu: "Menú",
    domicilios: "Domicilios",
    contacto: "Contacto"
  };

  function mostrar(r) {
    var nombre = negocio.nombre || "El Vacile";
    var contenido;
    if (r.tipo === "hoja") {
      contenido = vistaHoja(r.i);
      document.title = secciones[r.i].nombre + " | " + nombre;
      barra.hidden = false;
      armarBarra(secciones[r.i]);
      marcarTab("menu");
    } else {
      contenido = r.tipo === "menu" ? vistaMenu()
        : r.tipo === "domicilios" ? vistaDomicilios()
        : r.tipo === "contacto" ? vistaContacto()
        : vistaInicio();
      document.title = TITULOS[r.tipo] ? TITULOS[r.tipo] + " | " + nombre : nombre + " | Comida costeña, sabrosura quillera";
      barra.hidden = true;
      marcarTab(r.tipo);
    }

    actual = r;
    vista.replaceChildren(contenido);
    window.scrollTo(0, 0);
    revelar(contenido);

    var h = vista.querySelector("h2, h1");
    if (h) {
      h.setAttribute("tabindex", "-1");
      h.focus({ preventScroll: true });
    }
  }

  function render() {
    var r = interpretar();
    var dir = actual && r.orden < actual.orden ? "atras" : "adelante";

    if (primeraCarga || !usaVT) {
      mostrar(r);
    } else {
      // Transición entre vistas (API nativa del navegador, con respaldo en CSS)
      var raiz = document.documentElement;
      raiz.dataset.dir = dir;
      var t = document.startViewTransition(function () { mostrar(r); });
      var limpiar = function () { delete raiz.dataset.dir; };
      t.finished.then(limpiar, limpiar);
      t.ready.catch(function () {});
    }
    primeraCarga = false;
  }

  window.addEventListener("hashchange", render);

  // Deslizar a los lados cambia de hoja del menú (se ignoran los bordes de la pantalla)
  var x0 = null;
  var y0 = null;

  function irA(indice) {
    if (indice < 0 || indice >= secciones.length) return;
    location.hash = "#/" + secciones[indice].id;
  }

  vista.addEventListener("touchstart", function (e) {
    var t = e.touches[0];
    if (!actual || actual.tipo !== "hoja" || t.clientX < 24 || t.clientX > window.innerWidth - 24) {
      x0 = null;
      return;
    }
    x0 = t.clientX;
    y0 = t.clientY;
  }, { passive: true });

  vista.addEventListener("touchend", function (e) {
    if (x0 === null || !actual || actual.tipo !== "hoja") return;
    var t = e.changedTouches[0];
    var dx = t.clientX - x0;
    var dy = t.clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.8) {
      irA(dx < 0 ? actual.i + 1 : actual.i - 1);
    }
  }, { passive: true });

  /* ---------- Botón de WhatsApp ---------- */

  if (numeroWA) {
    wa.href = enlaceWA(negocio.mensajeWhatsApp || "Hola, quisiera hacer un pedido.");
    wa.hidden = false;
  }

  render();

  // Aviso solo si el archivo de estilos no se cargó (para detectar una subida incompleta a GitHub)
  window.addEventListener("load", function () {
    if (window.getComputedStyle(document.body).backgroundColor !== "rgb(241, 235, 220)") {
      if (window.console) console.error("No se cargó vacile.css");
      var aviso = el("div", null, "No se cargó el archivo vacile.css. Verifica que esté subido junto a index.html en tu repositorio.");
      aviso.style.cssText = "padding:12px 16px;background:#fff3cd;color:#5c3b00;font:14px system-ui,sans-serif";
      document.body.insertBefore(aviso, document.body.firstChild);
    }
  });
})();
