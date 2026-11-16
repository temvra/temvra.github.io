# temvra.github.io

Web de Temvra: portada, política de privacidad y soporte. La app vive en [temvra/app](https://github.com/temvra/app) y su página de descarga y de compartir está en `temvra.github.io/app/`.

- `index.html`, `privacidad.html`, `soporte.html` y `styles.css`: la web.
- `temvP/a/` reenvía los enlaces de compartir antiguos a `temvra.github.io/app/a/`, conservando lo compartido (lo que va detrás de `#`).
- `app/a/` es la página de los enlaces de compartir de la app (`temvra.github.io/app/a/#…`) y `app/` lleva a la portada. Antes se publicaban desde `temvra/app`, que ahora es privado.
- `404.html` reenvía cualquier otra dirección de `/temvP/…` a `/app/…`; el resto de direcciones que no existen muestran un aviso.
