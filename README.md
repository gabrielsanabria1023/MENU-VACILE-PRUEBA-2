[LEEME.md](https://github.com/user-attachments/files/33277749/LEEME.md)
# MENU-VACILE-PRUEBA-2
MENU VACILE PRUEBA 2
# Menú digital de El Vacile

Sitio estático: solo HTML, CSS y JavaScript. No usa base de datos, pagos ni servicios de mensualidad.
La única conexión externa es la fuente de Google Fonts (gratuita).

## Qué debe quedar en la raíz de tu repositorio de GitHub

Todos los archivos van sueltos, al lado de `index.html`, sin carpetas:

- `index.html`
- `estilos.css`
- `app-menu.js`
- `datos-menu.js`
- `_headers`
- Las 19 fotos: todas las que empiezan por `foto-` y terminan en `.webp`

Si tu repositorio tiene archivos de la versión anterior (`styles.css`, `app.js`, `menu-data.js` o una carpeta `img`), puedes borrarlos: la página nueva ya no los usa.

## Cómo subirlos (GitHub, sin carpetas)

1. Abre tu repositorio → **Add file** → **Upload files**.
2. Arrastra o elige todos los archivos de la lista (puedes hacerlo en dos tandas).
3. Escribe un mensaje y pulsa **Commit changes**.
4. Espera 1 o 2 minutos a que Cloudflare Pages publique y abre la página con recarga completa
   (en el celular, ábrela en una pestaña de incógnito).

Si falta `estilos.css`, la página muestra un aviso amarillo arriba. Si falta una foto, simplemente no se muestra y el resto se ve igual.

## Actualizar precios o platos

1. Abre `datos-menu.js` (en GitHub, con el lápiz de editar).
2. Los precios van completos y sin puntos: `12000` se muestra como `$12K`.
3. Pulsa **Commit changes**.

Para marcar un plato como agotado, agrégale `agotado: true`. Para quitarlo, bórralo.

## Pendientes en `datos-menu.js`

- `horario` y `direccion` (el PDF no los trae; vacíos, no se muestran).
- Asados: los precios están rotulados como 300 g y 600 g, pero algunas descripciones dicen 350 g y 400 g.

## Fotos

- Súbelas junto a los demás archivos (mejor `.webp` o `.jpg`, menos de 150 KB) y escribe su nombre en `datos-menu.js`.
- Las fotos del PDF tienen resolución limitada. Si tienes los originales, reemplazarlas mejora la nitidez.
- Pendientes por reemplazar: chuzo desgranado, micheladas, cócteles clásicos y de autor, botellas de cerveza.
- Para quitar una foto, borra su línea `foto:` o `miniatura:` en `datos-menu.js`.

## Movimiento

La página cambia de hoja con una transición suave, las tarjetas y los productos aparecen al llegar a la pantalla y las fotos entran con un fundido.
Todo se desactiva solo si la persona tiene activado "reducir movimiento" en su dispositivo.
