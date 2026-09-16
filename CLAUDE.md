# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Development

No build step, no framework, no CDN framework. Open any `.html` directly or serve with `npx serve .` / `python3 -m http.server 8080`. The only external resource is Overpass + Overpass Mono from Google Fonts. All styling lives in `assets/css/pjpark.css`.

## Architecture

Multi-page static site for **PJ Park** (pjpark.com.br) - escritório online para empresas inativas, marca da Setbox Serviços Digitais.

Pages: `index` (home), `baixa-de-empresa/`, `servicos/`, `faq/`, `contato/`, `blog/`, `blog/devo-inativar-minha-empresa/`, `termos-de-uso/`, `politica-de-privacidade/`.

Visual system: **Lane Pin** (pin amarelo + faixa grafite). Full spec in `DESIGN.md`; the source of truth for the brand lives in the knowledge base at `setbox/produtos/pjpark/base_conhecimento/DESIGN.md`, with the master assets in `base_conhecimento/assets/marca/`.

## Assets

| Caminho | O que é |
|---|---|
| `assets/css/pjpark.css` | Todo o CSS do site: tokens, componentes, tema claro e escuro |
| `assets/brand/lockup-horizontal.svg` · `-escuro.svg` | Lockup do nav e do rodapé (claro e escuro) |
| `assets/brand/lane-pin-*.svg` | Símbolo isolado: principal, escuro, secundária, sólida, mono |
| `assets/brand/pin-na-vaga.svg` | Ilustração do hero da home |
| `assets/brand/cancela.svg`, `vaga.svg`, `placa-p.svg`, `faixa-*.svg`, `hachura-diagonal.svg` | Elementos auxiliares |
| `assets/favicon*`, `icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Favicons gerados do símbolo sólido |
| `assets/og-image.png` | Open Graph 1200x630, fundo grafite com lockup |
| `assets/setbox-lateral.png` | Logo Setbox do rodapé |

Regenerar favicon ou OG: os fontes estão na base de conhecimento, comando em `DESIGN.md`.

### Prefixo de `assets/` por profundidade

| Arquivo | Prefixo |
|---|---|
| `index.html` | `assets/` |
| `baixa-de-empresa/`, `servicos/`, `faq/`, `contato/`, `blog/`, `termos-de-uso/`, `politica-de-privacidade/` | `../assets/` |
| `blog/devo-inativar-minha-empresa/` | `../../assets/` |

## Nav

Lockup (duas `<img>`, `so-claro` e `so-escuro`) linkando para a home. Ordem: `[lockup]` | Baixa de empresa | Serviços adicionais | Blog | Perguntas | Contato | `[Começar]`.

Página ativa: `aria-current="page"` no `.topo__link` - o CSS desenha o traço amarelo embaixo. Nunca marcar com cor inline.

CTA `Começar` aponta para `https://app.pjpark.com.br` e usa `.botao .botao--sinal`.

Menu mobile: `#menu-movel` com `data-aberto="true|false"`, alternado pelo script no fim da página.

## Footer

Três colunas (marca, Produto, Empresa), faixa tracejada e a linha com o logo Setbox, o CNPJ 08.889.601/0001-09 e o endereço (Av. Carneiro Leão, 563 - Zona 01, Maringá / PR - 87014-010). Links Setbox sempre absolutos.

## Componentes do CSS

| Classe | Uso |
|---|---|
| `.faixa-conteudo` | Wrapper de largura máxima (1080px) e gutter |
| `.secao`, `.secao--curta`, `.secao--escura` | Blocos verticais; `--escura` é a faixa grafite |
| `.borda-asfalto` | Divisor de asfalto com faixa amarela. **Uma por página** |
| `.faixa` | Faixa tracejada fina (rodapé, divisores) |
| `.rotulo` | Label de seção em mono, caixa alta |
| `.chamada`, `.texto-apoio` | Parágrafo de destaque e parágrafo comum |
| `.botao--sinal`, `.botao--linha`, `.link-seta` | Botões e link com sublinhado amarelo |
| `.cartao`, `.grade--2/3/4`, `.pilha-*` | Cartões, grades e espaçamento vertical |
| `.passo` + `.passo__numero` | Passos numerados (só quando a ordem importa de verdade) |
| `.lista` | Lista com traço de pista no lugar do bullet |
| `.etiqueta--ok/atencao/erro/neutra` | Estado com bolinha + rótulo escrito |
| `.servico`, `.pergunta` | Linhas de catálogo e de FAQ |
| `.prosa`, `.prosa__tabela` | Texto longo: jurídico e blog |
| `.mapa` | Iframe do Google Maps na página de contato |

## Content Rules

- Português do Brasil
- Sem ponto final em título ou subtítulo (h1-h6)
- Nunca usar travessão - use hífen ou vírgula
- CTAs do app: `https://app.pjpark.com.br`
- E-mail de contato: `contato@pjpark.com.br`
- Domínio: `pjpark.com.br`
- **Não prometer o que o produto não faz.** Reativação é **assistida**, não "1 clique". Não usar "o primeiro" nem número de clientes sem lastro.
- Deixar explícito que a PJ Park não é escritório de contabilidade e que o ato contábil é de escritório parceiro com CRC ativo

## Image Rules

- Todo `<img>` precisa de `width`, `height` e `loading="lazy"`, menos os logos de nav e rodapé

## SEO

Toda página: `meta[description]`, `link[canonical]`, Open Graph (`og:type/site_name/locale/url/title/description/image`) e Twitter card `summary_large_image`. OG image: `assets/og-image.png`. `og:site_name` = "PJ Park".
