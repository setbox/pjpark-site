/* PJ Park - comportamento comum a todas as páginas:
   menu móvel, consentimento de cookies (Clarity e Contentsquare) e abertura da FAQ pela âncora. */

(function () {
  var raiz = (document.currentScript && document.currentScript.src || '').replace(/assets\/js\/pjpark\.js.*$/, '');

  /* ---------- menu móvel ---------- */

  var botao = document.getElementById('menu-botao');
  var menu = document.getElementById('menu-movel');

  function definirMenu(aberto) {
    menu.setAttribute('data-aberto', String(aberto));
    botao.setAttribute('aria-expanded', String(aberto));
    botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  }

  if (botao && menu) {
    botao.addEventListener('click', function () {
      definirMenu(menu.getAttribute('data-aberto') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.getAttribute('data-aberto') === 'true') {
        definirMenu(false);
        botao.focus();
      }
    });
  }

  /* ---------- FAQ: a âncora abre a pergunta fechada ---------- */

  function abrirAncora() {
    if (!location.hash) return;
    var alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    var detalhe = alvo && alvo.closest('details');
    if (detalhe) {
      detalhe.open = true;
      alvo.scrollIntoView();
    }
  }

  abrirAncora();
  window.addEventListener('hashchange', abrirAncora);

  /* ---------- consentimento, Clarity e Contentsquare ---------- */

  var CHAVE = 'pjpark-consentimento';

  function lerEscolha() {
    try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
  }

  function gravarEscolha(valor) {
    try {
      if (valor) localStorage.setItem(CHAVE, valor);
      else localStorage.removeItem(CHAVE);
    } catch (e) {}
  }

  function carregarAnalise() {
    if (window.clarity) return;
    var cs = document.createElement('script');
    cs.defer = true;
    cs.src = 'https://t.contentsquare.net/uxa/ad43e56ead802.js';
    document.head.appendChild(cs);

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'ythvsgjalt');
  }

  var aviso = null;

  function mostrarAviso() {
    if (aviso) return;
    aviso = document.createElement('div');
    aviso.className = 'consentimento';
    aviso.setAttribute('role', 'region');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML =
      '<p class="consentimento__texto">Usamos o Microsoft Clarity e o Contentsquare para entender como o site é usado: cliques, rolagem e páginas visitadas. ' +
      'Eles só são ativados se você aceitar. <a href="' + raiz + 'politica-de-privacidade/#cookies">Como tratamos esses dados</a></p>' +
      '<div class="acoes">' +
      '<button type="button" class="botao botao--sinal" data-escolha="aceito">Aceitar</button>' +
      '<button type="button" class="botao botao--linha" data-escolha="recusado">Recusar</button>' +
      '</div>';
    aviso.addEventListener('click', function (e) {
      var escolha = e.target.getAttribute('data-escolha');
      if (!escolha) return;
      var anterior = lerEscolha();
      gravarEscolha(escolha);
      aviso.remove();
      aviso = null;
      if (escolha === 'aceito') carregarAnalise();
      // Recusar depois de aceitar: recarrega para a análise sair da página
      else if (anterior === 'aceito') location.reload();
    });
    var topo = document.querySelector('.topo');
    document.body.insertBefore(aviso, topo || document.body.firstChild);
  }

  if (lerEscolha() === 'aceito') carregarAnalise();
  else if (lerEscolha() !== 'recusado') mostrarAviso();

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cookies]')) mostrarAviso();
  });
})();
