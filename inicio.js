/* Portada de Temvra: las pantallas se turnan, el rayo de la hora y el widget «Ahora» usan la hora de quien visita la web */
(() => {
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n).padStart(2, '0');

  /* Escaparate: cambia de pantalla cada 5 s; se para al poner el ratón encima o al tocar una pestaña */
  const vista = document.querySelector('.vista');
  const pics = [...document.querySelectorAll('.pantallas picture')];
  const tabs = [...document.querySelectorAll('.pestanas [role=tab]')];
  if (vista && pics.length === tabs.length) {
    let i = 0, parado = quieto, encima = false;
    const ir = (n, foco) => {
      i = (n + pics.length) % pics.length;
      pics.forEach((p, k) => p.classList.toggle('on', k === i));
      tabs.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
      if (foco) tabs[i].focus();
      vista.dataset.i = i;
    };
    tabs.forEach((b, k) => {
      b.addEventListener('click', () => { parado = true; ir(k); });
      b.addEventListener('keydown', e => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); parado = true; ir(i + d, true); }
      });
    });
    vista.addEventListener('mouseenter', () => { encima = true; });
    vista.addEventListener('mouseleave', () => { encima = false; });
    setInterval(() => { if (!parado && !encima && !document.hidden) ir(i + 1); }, 5000);
  }

  /* El día en vivo, el widget y el circuito */
  const dia = document.querySelector('.dia-vivo');
  const horas = [...document.querySelectorAll('.dia-vivo .horas li')];
  const fecha = new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  const $ = s => document.querySelector(s);
  const aro = $('.circuito .aro'), cSeg = $('.c-seg');
  let vuelta = 45;
  const tic = () => {
    const d = new Date(), h = d.getHours(), m = d.getMinutes();
    document.querySelectorAll('.hora-ahora').forEach(e => { e.textContent = pad(h) + ':' + pad(m); });
    /* Línea de tiempo de cuatro horas que empieza en la hora anterior */
    const ini = new Date(d); ini.setHours(h - 1, 0, 0, 0);
    horas.forEach((li, k) => { li.textContent = pad((h + 23 + k) % 24) + ':00'; });
    if (dia) dia.style.setProperty('--ahora', ((d - ini) / 144e5).toFixed(4));
    /* Widget «Ahora»: la cena empieza dentro de dos horas en punto */
    const wh = $('.w-hora'), ws = $('.w-seg'), wf = $('.w-fecha'), wc = $('.w-cuenta');
    if (wh) wh.textContent = pad(h) + ':' + pad(m);
    if (ws) ws.textContent = pad(d.getSeconds());
    if (wf) { const t = fecha.format(d).replace(/\./g, ''); wf.textContent = t.charAt(0).toUpperCase() + t.slice(1); }
    if (wc) {
      const cena = new Date(d); cena.setHours(h + 2, 0, 0, 0);
      const r = Math.floor((cena - d) / 1000);
      wc.textContent = Math.floor(r / 3600) + ':' + pad(Math.floor(r / 60) % 60) + ':' + pad(r % 60);
    }
    /* Circuito: 45 s de sentadillas que vuelven a empezar */
    if (!quieto && aro && cSeg) {
      vuelta = vuelta <= 0 ? 45 : vuelta - 1;
      cSeg.textContent = '0:' + pad(vuelta);
      aro.style.setProperty('--p', (vuelta / 45).toFixed(3));
    }
  };
  tic();
  setInterval(tic, 1000);

  /* A tu gusto: los colores cambian el del rayo de la demostración */
  const gusto = document.querySelector('.gusto-demo');
  document.querySelectorAll('.g-colores button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.g-colores button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    if (gusto) gusto.style.setProperty('--rc', b.style.getPropertyValue('--s'));
  }));
})();
