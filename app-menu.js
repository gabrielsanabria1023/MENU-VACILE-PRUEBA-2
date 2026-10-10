/* ==========================================================================
   LÓGICA DEL MENÚ
   Lee los datos de menu-data.js y arma dos vistas:
     - Inicio: tarjetas con todas las secciones.
     - Hoja: una sección a la vez (enlace #/id-de-la-seccion).
   No necesitas editar este archivo para actualizar productos o precios.
   ========================================================================== */

(function () {
  "use strict";

  var data = window.MENU_DATA;
  var vista = document.getElementById("vista");

  if (!data || !Array.isArray(data.secciones)) {
    vista.textContent = "No se encontró datos-menu.js (o es de una versión anterior). Súbelo junto a index.html.";
    return;
  }

  var negocio = data.negocio || {};
  var grupos = data.grupos || [];
  var secciones = data.secciones || [];

  var portada = document.getElementById("portada");
  var barra = document.getElementById("barra");
  var chips = document.getElementById("chips");
  var pie = document.getElementById("pie");
  var wa = document.getElementById("wa");

  var actual = null;        // índice de la hoja abierta (null = inicio)
  var grupoChips = null;    // grupo cuyas secciones están en la barra
  var primeraCarga = true;

  var reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var usaVT = !reducir && typeof document.startViewTransition === "function";
  if (usaVT) document.documentElement.classList.add("vt");

  // Los productos aparecen suavemente al llegar a la pantalla
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

  // Las fotos aparecen con un fundido; si una no carga, se quita sin dejar un hueco roto
  function conFundido(img, alFallar) {
    img.classList.add("img-fade");
    img.addEventListener("load", function () { img.classList.add("lista"); });
    img.addEventListener("error", function () {
      if (window.console) console.warn("No se pudo cargar la foto: " + img.getAttribute("src"));
      if (alFallar) alFallar();
    });
    if (img.complete && img.naturalWidth > 0) img.classList.add("lista");
  }

  /* ---------- Utilidades ---------- */

  function el(tag, clase, texto) {
    var nodo = document.createElement(tag);
    if (clase) nodo.className = clase;
    if (texto !== undefined && texto !== null) nodo.textContent = texto;
    return nodo;
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

  function irA(indice) {
    if (indice < 0 || indice >= secciones.length) return;
    location.hash = "#/" + secciones[indice].id;
  }

  /* ---------- Portada, pie y botón de WhatsApp ---------- */

  document.getElementById("nombre").textContent = negocio.nombre || "Menú";

  var eslogan = document.getElementById("eslogan");
  if (negocio.eslogan) {
    eslogan.textContent = negocio.eslogan;
  } else {
    eslogan.remove();
  }

  if (negocio.logo) {
    var logo = el("img", "portada__logo");
    logo.src = negocio.logo;
    logo.alt = negocio.nombre ? "Logo de " + negocio.nombre : "Logo";
    logo.width = 72;
    logo.height = 72;
    var h1 = document.getElementById("nombre");
    h1.parentNode.insertBefore(logo, h1);
  }

  function enlaceInstagram() {
    var usuario = String(negocio.instagram).replace(/^@/, "");
    var a = el("a", null, "@" + usuario);
    a.href = "https://instagram.com/" + encodeURIComponent(usuario);
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  var datos = document.getElementById("datos");
  if (negocio.horario) datos.appendChild(el("li", null, negocio.horario));
  if (negocio.direccion) datos.appendChild(el("li", null, negocio.direccion));
  if (negocio.instagram) {
    var li = el("li");
    li.appendChild(enlaceInstagram());
    datos.appendChild(li);
  }

  var contPie = el("div", "contenedor");
  if (negocio.lema) contPie.appendChild(el("p", "pie__lema", negocio.lema));
  if (negocio.instagram) {
    var pIg = el("p", "pie__ig");
    pIg.appendChild(enlaceInstagram());
    contPie.appendChild(pIg);
  }
  pie.appendChild(contPie);

  if (numeroWA) {
    wa.href = enlaceWA(negocio.mensajeWhatsApp || "Hola, quisiera hacer un pedido.");
    wa.hidden = false;
  }

  /* ---------- Inicio ---------- */

  function crearDeco() {
    var deco = el("span", "patron tile__patron");
    deco.setAttribute("aria-hidden", "true");
    return deco;
  }

  function crearTile(s, n) {
    var item = el("li");
    item.style.setProperty("--i", n);
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

  function mostrarInicio() {
    actual = null;
    portada.hidden = false;
    barra.hidden = true;
    document.title = (negocio.nombre || "Menú") + " | Menú";

    var cont = el("div", "inicio contenedor" + (primeraCarga && !reducir ? " entrada" : ""));
    if (negocio.lema) cont.appendChild(el("p", "lema", negocio.lema));

    var indiceTile = 0;
    grupos.forEach(function (g) {
      var lista = secciones.filter(function (s) { return s.grupo === g.id; });
      if (!lista.length) return;
      var bloque = el("section", "grupo");
      bloque.appendChild(el("h2", "grupo__titulo", g.nombre));
      var ul = el("ul", "tiles");
      lista.forEach(function (s) { ul.appendChild(crearTile(s, indiceTile++)); });
      bloque.appendChild(ul);
      cont.appendChild(bloque);
    });

    vista.replaceChildren(cont);
    window.scrollTo(0, 0);
  }

  /* ---------- Hoja de una sección ---------- */

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

  function crearProducto(p, tag) {
    var item = el("li", "producto" + (p.agotado ? " agotado" : "") + (observador ? " rev" : ""));
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
    a.href = "#/";
    todas.appendChild(a);
    cont.appendChild(todas);
    cont.appendChild(el("p", "pista", "Desliza hacia los lados para cambiar de sección"));

    nav.appendChild(cont);
    return nav;
  }

  function crearHoja(s, i) {
    var tema = s.tema || "morado";
    var hoja = el("article", "hoja");
    var bloques = (s.bloques || []).slice();

    var cabecera = el("section", "bloque bloque--cabecera tema-" + tema);
    var deco = el("div", "patron");
    deco.setAttribute("aria-hidden", "true");
    cabecera.appendChild(deco);

    var cont = el("div", "contenedor");
    cont.appendChild(encabezado(s, "h2", false));
    if (s.incluye) cont.appendChild(el("p", "incluye", s.incluye));
    if (s.nota) cont.appendChild(el("p", "nota", s.nota));
    if (s.foto) cont.appendChild(crearFoto(s.foto));

    // El primer bloque comparte color con la cabecera: se muestra seguido.
    if (bloques.length && (!bloques[0].tema || bloques[0].tema === tema)) {
      contenidoBloque(cont, bloques.shift());
    }
    cabecera.appendChild(cont);
    hoja.appendChild(cabecera);

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

  /* ---------- Barra de secciones ---------- */

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

  function mostrarHoja(i) {
    var s = secciones[i];
    actual = i;
    portada.hidden = true;
    barra.hidden = false;
    armarBarra(s);
    document.title = s.nombre + " | " + (negocio.nombre || "Menú");

    var hoja = crearHoja(s, i);
    vista.replaceChildren(hoja);
    window.scrollTo(0, 0);
    revelar(hoja);

    var h = vista.querySelector("h2");
    if (h) {
      h.setAttribute("tabindex", "-1");
      h.focus({ preventScroll: true });
    }
  }

  /* ---------- Navegación ---------- */

  function render() {
    var id = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    var i = -1;
    secciones.forEach(function (s, n) { if (s.id === id) i = n; });

    var dir = i < 0 ? "atras" : (actual === null || i > actual ? "adelante" : "atras");
    var hacer = function () {
      if (i >= 0) {
        mostrarHoja(i);
      } else {
        mostrarInicio();
      }
    };

    if (primeraCarga || !usaVT) {
      hacer();
    } else {
      // Transición entre hojas (API nativa del navegador, con respaldo en CSS)
      var raiz = document.documentElement;
      raiz.dataset.dir = dir;
      var t = document.startViewTransition(hacer);
      var limpiar = function () { delete raiz.dataset.dir; };
      t.finished.then(limpiar, limpiar);
      t.ready.catch(function () {});
    }
    primeraCarga = false;
  }

  window.addEventListener("hashchange", render);

  // Deslizar a los lados cambia de hoja (se ignoran los bordes de la pantalla)
  var x0 = null;
  var y0 = null;

  vista.addEventListener("touchstart", function (e) {
    var t = e.touches[0];
    if (actual === null || t.clientX < 24 || t.clientX > window.innerWidth - 24) {
      x0 = null;
      return;
    }
    x0 = t.clientX;
    y0 = t.clientY;
  }, { passive: true });

  vista.addEventListener("touchend", function (e) {
    if (x0 === null || actual === null) return;
    var t = e.changedTouches[0];
    var dx = t.clientX - x0;
    var dy = t.clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.8) {
      irA(dx < 0 ? actual + 1 : actual - 1);
    }
  }, { passive: true });

  render();

  // Aviso solo si el archivo de estilos no se cargó (para detectar una subida incompleta a GitHub)
  window.addEventListener("load", function () {
    var fondo = window.getComputedStyle(portada).backgroundColor;
    if (fondo !== "rgb(61, 10, 90)") {
      if (window.console) console.error("No se cargó estilos.css");
      var aviso = el("div", null, "No se cargó el archivo estilos.css. Verifica que esté subido junto a index.html en tu repositorio.");
      aviso.style.cssText = "padding:12px 16px;background:#fff3cd;color:#5c3b00;font:14px system-ui,sans-serif";
      document.body.insertBefore(aviso, document.body.firstChild);
    }
  });
})();
