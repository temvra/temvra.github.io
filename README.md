# temvra.github.io

Web de Temvra: portada, política de privacidad y soporte. La app vive en [temvra/app](https://github.com/temvra/app) y su página de descarga y de compartir está en `temvra.es/app/`.

- `index.html`, `privacidad.html`, `soporte.html` y `styles.css`: la web.
- `temvP/a/` reenvía los enlaces de compartir antiguos a `temvra.es/app/a/`, conservando lo compartido (lo que va detrás de `#`).
- `404.html` reenvía cualquier otra dirección de `/temvP/…` a `/app/…`; el resto de direcciones que no existen muestran un aviso.

Dominio: `CNAME` apunta la web a temvra.es; temvra.github.io y las páginas de los proyectos (por ejemplo `/app/`) redirigen allí solas.
