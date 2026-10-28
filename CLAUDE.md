# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Development

No build step, no framework, no CDN framework. Open any `.html` directly or serve with `npx serve .` / `python3 -m http.server 8080`. External resources: Overpass + Overpass Mono from Google Fonts, and Microsoft Clarity + Contentsquare, both loaded only after the visitor accepts the cookie notice. All styling lives in `assets/css/pjpark.css`; all shared behavior (mobile menu, cookie consent + analytics, FAQ anchor opening) lives in `assets/js/pjpark.js`, loaded with `defer` in every page's `<head>`. Never paste analytics snippets inline in the HTML.

## Architecture

Multi-page static site for **PJ Park** (pjpark.com.br) - escritório online para empresas inativas, marca da Setbox Serviços Digitais.

Pages: `index` (home), `baixa-de-empresa/`, `regularizar-cnpj/`, `reativar-cnpj/`, `servicos/`, `faq/`, `contato/`, `sobre/`, `blog/` (índice agrupado por tema) + 31 posts em `blog/<slug>/` (4 deles casos reais anonimizados, só com fato documentado no arquivo da operação de 2020 a 2023), `termos-de-uso/`, `politica-de-privacidade/`. `404.html` na raiz (GitHub Pages serve para qualquer endereço inexistente): links e assets com caminho absoluto (`/assets/...`), `noindex`, fora do sitemap.

Visual system: **Lane Pin** (pin amarelo + faixa grafite). Full spec in `DESIGN.md`; the source of truth for the brand lives in the knowledge base at `~/obsidian/setbox/divisoes/pjpark/DESIGN.md`, with the master assets in `~/obsidian/setbox/divisoes/pjpark/assets/marca/`.

## Assets

| Caminho | O que é |
|---|---|
| `assets/css/pjpark.css` | Todo o CSS do site: tokens, componentes, tema claro e escuro |
| `assets/js/pjpark.js` | Todo o JS comum: menu móvel, aviso de cookies + Clarity e Contentsquare, abertura da FAQ pela âncora |
| `assets/brand/lockup-horizontal.svg` · `-escuro.svg` | Lockup do nav e do rodapé (claro e escuro) |
| `assets/brand/lane-pin-*.svg` | Símbolo isolado: principal, escuro, secundária, sólida, mono |
| `assets/brand/pin-na-vaga.svg` | Ilustração do hero da home |
| `assets/brand/cancela.svg`, `vaga.svg`, `placa-p.svg`, `faixa-*.svg`, `hachura-diagonal.svg` | Elementos auxiliares |
| `assets/brand/faixa-repintada.svg`, `cancela-aberta.svg`, `placa-pendencias.svg`, `pin-alinhado.svg`, `saida-da-vaga.svg`, `sinal-verde.svg` | Ilustrações das capas (as duas primeiras em uso em regularizar e reativar). PNG 256 na base, em `assets/marca/png/el-<nome>.png` |
| `assets/favicon*`, `icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Favicons gerados do símbolo sólido |
| `assets/og-image.png` | Open Graph 1200x630, fundo grafite com lockup |
| `assets/setbox-lockup.svg` | Logo Setbox do rodapé |

Regenerar favicon ou OG: os fontes estão na base de conhecimento, comando em `DESIGN.md`.

### Prefixo de `assets/` por profundidade

| Arquivo | Prefixo |
|---|---|
| `index.html` | `assets/` |
| `baixa-de-empresa/`, `regularizar-cnpj/`, `reativar-cnpj/`, `servicos/`, `faq/`, `contato/`, `sobre/`, `blog/`, `termos-de-uso/`, `politica-de-privacidade/` | `../assets/` |
| `blog/<slug>/` | `../../assets/` |

## Nav

Lockup (duas `<img>`, `so-claro` e `so-escuro`) linkando para a home. Desktop com 4 links e uma ação só, as três portas de entrada na ordem da jornada: `[lockup]` | Regularizar CNPJ | Reativar CNPJ | Baixa de empresa | Perguntas | `[Começar]`. Serviços adicionais é catálogo e fica fora do cabeçalho: menu móvel, rodapé (coluna Produto), home ("Ver serviços adicionais") e links nas páginas de serviço. Menu móvel e rodapé seguem a ordem: Regularizar, Reativar, Baixa, Serviços adicionais. Blog, Sobre e Contato ficam no menu móvel e no rodapé. Não há Entrar no cabeçalho: o cadastro do app já tem "Já tem conta? Entrar", e cliente raramente passa pelo site.

Página ativa: `aria-current="page"` no `.topo__link` (traço amarelo embaixo) e no link correspondente do `#menu-movel` (traço amarelo à esquerda). Posts marcam Blog no menu móvel. Nunca marcar com cor inline.

CTA `Começar` aponta para `https://app.pjpark.com.br/register`, na mesma aba, e usa `.botao .botao--sinal`. `Entrar` é para quem já tem conta (cliente e parceiro, o login é o mesmo) e aponta para a raiz do app: fica só no fim do menu móvel (`.menu-movel__entrar`) e na coluna Produto do rodapé.

Menu mobile: `#menu-movel` com `data-aberto="true|false"`, alternado por `assets/js/pjpark.js`, que também troca o `aria-label` (Abrir/Fechar menu), o ícone (`.menu-botao__abrir` / `.menu-botao__fechar`) e fecha com Esc.

Acessibilidade comum: `<a class="pular" href="#conteudo">` logo após o `<body>` e `<main id="conteudo">`. Alvos de toque de 44px no celular.

Links para o app (`app.pjpark.com.br`) abrem na mesma aba, sem `target="_blank"`. Nova aba só para sites de terceiros.

## Footer

Quatro colunas (marca, PJ Park, Produto, Empresa); a coluna da marca termina no ícone do LinkedIn (`.rodape__social`, SVG inline, nova aba), que também está no `sameAs` da Organization da home, com títulos em `<h2 class="rodape__titulo">` (não `h4`, para não pular nível). Empresa termina no botão `Preferências de cookies` (`data-cookies`), que reabre o aviso. Depois, faixa tracejada e a linha com o logo Setbox, o CNPJ 08.889.601/0001-09 e o endereço (Av. Carneiro Leão, 563 - Zona 01, Maringá / PR - 87014-010). Links Setbox sempre absolutos.

## Componentes do CSS

| Classe | Uso |
|---|---|
| `.faixa-conteudo` | Wrapper de largura máxima (1080px) e gutter |
| `.secao`, `.secao--curta`, `.secao--escura` | Blocos verticais; `--escura` é a faixa grafite |
| `.secao--capa`, `.secao--dobra` | Primeira seção da página: ocupa a tela menos o topo (64px), empurrando o resto para baixo da dobra. `--capa` é a da home (título + apoio); `--dobra` nas três portas de entrada (baixa, regularizar, reativar), sempre com ilustração da marca em `.capa__ilustracao`. As demais internas usam `.secao--curta`, para o conteúdo começar na primeira tela. Filho direto precisa de `width: 100%`, senão o `margin-inline: auto` da faixa encolhe o item flex |
| `.capa__rolagem` | Dica de rolagem colada no rodapé da capa da home, apontando para o preço |
| `.capa__pin` | Pin grande da home, cortado pelo topo e pela borda direita, ponta visível. Medidas em % da dobra (`height: 112%`, `right: -20%`), nunca fixas - com valor fixo ele vira logotipo grande centrado. No celular desce para o canto inferior. Usa a versão secundária (corpo asfalto), não a amarela: em amarelo briga com o CTA do cabeçalho |
| `.borda-asfalto` | Divisor de asfalto com faixa amarela. **Uma por página** |
| `.faixa` | Faixa tracejada fina (rodapé, divisores) |
| `.rotulo` | Label em mono, caixa alta, só para rotular um link ou dado (ex.: "Pergunta relacionada"). **Nunca acima de título**: o título fala sozinho |
| `.chamada`, `.texto-apoio` | Parágrafo de destaque e parágrafo comum |
| `.botao--sinal`, `.botao--linha`, `.link-seta` | Botões e link com sublinhado amarelo |
| `.cartao`, `.grade--2/3/4`, `.pilha-*` | Cartões, grades e espaçamento vertical |
| `.passo` + `.passo__numero` | Passos numerados (só quando a ordem importa de verdade) |
| `.lista` | Lista com traço de pista no lugar do bullet |
| `.etiqueta--ok/atencao/erro/neutra` | Estado com bolinha + rótulo escrito |
| `.servico` | Linhas de catálogo (título em `<h2 class="titulo-item">`) e itens do blog (`.blog__item`) |
| `.perguntas__grupo` + `details.pergunta` | FAQ agrupada por tema, cada pergunta em `<details>` com `<summary><h3>`; a âncora `#id` abre a pergunta |
| `.titulo-item` | h2 com peso visual de h3, quando a hierarquia pede h2 |
| `.titulo-porta` | H1 das portas de entrada (regularizar, reativar), limitado para quebrar em duas linhas |
| `.link-cliente` | Saída discreta para quem já é cliente (raiz do app), abaixo dos botões de conversão das portas de entrada |
| `.post__data` | Data do post (`<time datetime>`), no topo do post e no índice |
| `.consentimento` | Aviso de cookies, criado pelo JS |
| `.prosa`, `.prosa__tabela` | Texto longo: jurídico e blog |
| `.mapa` | Iframe do Google Maps na página de contato |

## Content Rules

- Português do Brasil
- Sem ponto final em título ou subtítulo (h1-h6)
- Nunca usar travessão - use hífen ou vírgula
- CTAs de conversão: `https://app.pjpark.com.br/register`. Acesso de quem já tem conta (Entrar, Acessar a plataforma): `https://app.pjpark.com.br`, que leva ao painel se já houver sessão e ao login se não
- E-mail de contato: `contato@setbox.com.br`
- Domínio: `pjpark.com.br`
- **Não prometer o que o produto não faz.** Reativação é **assistida**, não "1 clique". Não usar "o primeiro" nem número de clientes sem lastro.
- Deixar explícito que a PJ Park não é escritório de contabilidade e que o ato contábil é de escritório parceiro com CRC ativo

## Image Rules

- Todo `<img>` precisa de `width`, `height` e `loading="lazy"`, menos os logos de nav e rodapé

## SEO

Toda página: `meta[description]`, `link[canonical]`, Open Graph (`og:type/site_name/locale/url/title/description/image`) e Twitter card `summary_large_image`. OG image: `assets/og-image.png`. `og:site_name` = "PJ Park".

Dados estruturados (JSON-LD, `<script type="application/ld+json">` no fim do `<head>`): home com Organization + WebSite + Service dos planos; baixa, regularizar e reativar com Service (+ FAQPage em regularizar e reativar); serviços com OfferCatalog; FAQ com FAQPage (texto igual ao visível); posts com BlogPosting + BreadcrumbList, `og:type` article e `article:published_time`/`modified_time`. Ao mudar preço, pergunta da FAQ ou data de post, atualizar o JSON-LD junto. `llms.txt` na raiz resume o site para buscadores de IA.

Posts: começam com um parágrafo **Resposta curta:** quando o título é uma pergunta de intenção de compra, e terminam com a seção **Fontes** (links oficiais gov.br/Planalto, nova aba). Afirmação fiscal sem fonte não entra: nada de faixa de multa, score ou obrigação extinta (GFIP).
