# El Vacile: página web

Sitio estático (HTML, CSS y JavaScript). No usa pagos ni suscripciones. Lo único que se conecta por fuera es la fuente de Google Fonts (gratuita) y, para guardar las zonas de domicilio, el almacenamiento KV de tu propio Cloudflare.

## Secciones

| Ruta | Qué muestra |
|---|---|
| `#/` | Inicio: logo, botones de pedido, atajos del menú, domicilios y redes |
| `#/menu` | Todas las secciones del menú, en Comida y Bebidas |
| `#/burgers`, `#/asados`, etc. | Cada sección del menú como una hoja independiente |
| `#/domicilios` | Zonas y precios (desde el mapa) y el mapa para buscar tu barrio |
| `#/contacto` | WhatsApp, Instagram y TikTok |

## Archivos (todos sueltos, en la raíz del repositorio)

- `index.html`, `vacile.css`, `vacile.js`: la página.
- `vacile-menu.js`: **aquí editas todo** (platos, precios, WhatsApp, redes, horario y dirección).
- `domicilios.html` y `_worker.js`: el mapa de zonas y el guardado de precios.
- `_headers`: cabeceras de seguridad.
- `arte-logo.svg`, `arte-sombrero.svg`, `arte-jaguar.svg`, `arte-insignia.svg`, `arte-trazos.webp`: el arte, tomado de tu PDF.
- 19 fotos `foto-....webp`.

Si tu repositorio tiene archivos de versiones anteriores (`styles.css`, `app.js`, `menu-data.js`, `estilos.css`, `app-menu.js`, `datos-menu.js`, `img/`), puedes borrarlos. La página nueva no los usa.

## Subir a GitHub

1. En tu repositorio: **Add file → Upload files**.
2. Sube todos los archivos de la lista (puedes hacerlo en dos o tres tandas).
3. **Commit changes**. Cloudflare Pages publica solo en 1 o 2 minutos.
4. Abre la página en una pestaña de incógnito para evitar versiones guardadas.

Si falta `vacile.css`, la página muestra un aviso amarillo arriba. Si falta una foto, se omite y el resto se ve igual.

## Domicilios (zonas y precios)

El mapa guarda las zonas en el almacenamiento KV de Cloudflare, protegido con tu contraseña. Dos casos:

**A. Ya configuraste el KV y la contraseña en un proyecto de Pages (lo más simple)**
Sube todos estos archivos a ese mismo proyecto o repositorio. Las zonas que ya guardaste se conservan.

**B. Proyecto nuevo**
1. En Cloudflare: Storage & Databases → KV → Create namespace, con el nombre `zonas`.
2. En tu proyecto Pages → Settings → Bindings → Add → KV namespace: variable `ZONAS`, elige el namespace `zonas`.
3. En Variables and secrets: agrega `ADMIN_PASSWORD` como Secret, con una contraseña larga.
4. Haz un despliegue nuevo (los cambios de bindings solo aplican a despliegues nuevos).

Para editar zonas: **Domicilios → Editar zonas (solo el dueño)**, toca "Editor" y escribe la contraseña.
Sin el KV configurado, la página funciona, pero la sección de domicilios dirá que aún no hay zonas publicadas.
Los nombres de los menús de Cloudflare pueden variar; si algo no aparece, busca "Pages bindings" en su documentación.

## Pendientes en `vacile-menu.js`

- `horario` y `direccion`: están vacíos y no se muestran hasta que los completes.
- Asados: los precios están rotulados 300 g y 600 g, pero algunas descripciones dicen 350 g y 400 g.
- Fotos por reemplazar con originales: chuzo desgranado, micheladas, cócteles y botellas de cerveza.

## Movimiento

La página cambia de vista con una transición suave, los elementos aparecen al llegar a la pantalla y las fotos entran con un fundido. Todo se desactiva si el dispositivo tiene activado "reducir movimiento".
