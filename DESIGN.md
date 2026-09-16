# DESIGN - pjpark.com.br

Referência visual do site. O sistema completo da marca (construção do símbolo, lockup, elementos, regras de aplicação) está na base de conhecimento, em `setbox/produtos/pjpark/base_conhecimento/DESIGN.md`. Este arquivo cobre só o que o site usa.

Ideia central: **estacionamento de rua**. Asfalto, faixa amarela, placa, vaga, cancela. Se um elemento não existe numa rua ou num estacionamento, provavelmente não entra aqui.

---

## Tokens

Todos em `assets/css/pjpark.css`, no `:root`, redefinidos no bloco `prefers-color-scheme: dark`.

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--bg` | `#F2F1ED` | `#14171B` | Fundo da página |
| `--surface` | `#FFFFFF` | `#1B1F24` | Cartão |
| `--ink` | `#1C2026` | `#ECEBE6` | Texto principal |
| `--ink-2` | `#5A626D` | `#9AA2AD` | Texto secundário |
| `--line` | `#DEDCD5` | `#2E343C` | Divisores e bordas |
| `--sinal` | `#F5B301` | `#FFC81F` | Cor da marca: botão, faixa, destaque |
| `--grafite` | `#2A2F36` | `#0E1114` | Tinta |
| `--grafite-fundo` | `#22262C` | `#22262C` | Fundo das seções escuras |
| `--asfalto` | `#6B7380` | `#848C99` | Cinza de apoio, rótulos |

Estado (separado da marca): `--ok #2FA36B`, `--atencao #F5B301`, `--erro #D14B3D`.

**Contraste:** amarelo é superfície, não é tinta. Texto grafite sobre amarelo dá 7,3:1. Amarelo como texto sobre branco dá 1,8:1 e é proibido.

---

## Tipografia

**Overpass** (Red Hat, OFL 1.1), inspirada nas FHWA Series, o alfabeto das placas de rodovia. **Overpass Mono** para rótulo, número de passo e qualquer dado que se alinhe em coluna.

| Papel | Classe | Tamanho |
|---|---|---|
| H1 | `h1` | `clamp(34px, 6vw, 56px)`, peso 800, tracking -0.02em |
| H2 | `h2` | `clamp(26px, 3.6vw, 38px)`, peso 800 |
| H3 | `h3` | 18px, peso 800 |
| Chamada | `.chamada` | `clamp(16px, 2vw, 19px)`, cor `--ink-2` |
| Texto | `.texto-apoio` | 15px, cor `--ink-2` |
| Rótulo de seção | `.rotulo` | 11px mono, caixa alta, tracking 0.14em |
| Texto longo | `.prosa` | 16px, largura máxima 68ch |

---

## Forma

- **Raio:** 3px em cartão e botão, 2px em etiqueta e campo. Sinalização é reta.
- **Grade:** múltiplos de 4px, via `.pilha-8/12/16/24/32/40`.
- **Elevação:** nenhuma. Separação por linha de 1px e por fundo, nunca por sombra.
- **Largura:** `.faixa-conteudo` em 1080px, gutter de 20px (32px acima de 768px).
- **Seção:** `padding-block: clamp(56px, 8vw, 96px)`.
- **Foco:** `outline: 2px solid var(--sinal)` com `outline-offset: 2px`. Obrigatório.

---

## Marca no site

| Onde | Arquivo |
|---|---|
| Nav e rodapé | `lockup-horizontal.svg` + `lockup-horizontal-escuro.svg` (alternados por `.so-claro` / `.so-escuro`) |
| Hero da home | `pin-na-vaga.svg` |
| Hero da baixa | `cancela.svg` |
| Favicon | `icon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico` |
| App icon | `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` |
| Compartilhamento | `og-image.png` (1200x630) |

Regras: margem livre de meia largura do pin; nunca girar, inclinar ou aplicar sombra; nunca escrever o nome em amarelo; abaixo de 120px de largura, usar só o símbolo.

---

## Faixa de pista

A assinatura do site. `.borda-asfalto` é a barra grafite com a faixa amarela saindo pela borda, e `.faixa` é a versão fina.

**Uma faixa por página.** Repetida em todo bloco vira papel de parede e a marca some.

```css
.faixa {
  height: 4px;
  background: repeating-linear-gradient(90deg, var(--sinal) 0 24px, transparent 24px 48px);
}
```

---

## Estado

Sempre pílula com bolinha **e** rótulo escrito - cor sozinha não comunica.

```html
<span class="etiqueta etiqueta--ok"><i></i>Declarações em dia</span>
<span class="etiqueta etiqueta--erro"><i></i>Irregular</span>
```

O amarelo é cor de marca e cor de atenção ao mesmo tempo. Em tela com muito estado, deixe o amarelo para o estado e a marca para o símbolo e as faixas.

---

## Herança Setbox

O site nasceu do padrão editorial da Setbox (Swiss, Inter, accent vermelho) e usava a paleta rosa + navy até 2026-09. A tipografia, o espaçamento generoso e a ausência de ornamento continuam; a cor, a fonte e os elementos gráficos agora são da PJ Park. O rodapé continua assinando Setbox Serviços Digitais.
