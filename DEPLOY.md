# Como publicar o site (fluxo de deploy)

O site é pré-renderizado **localmente** (usa um Chromium via Puppeteer para
"assar" o HTML de cada página, o que deixa o SEO correto) e depois enviado
**pronto** para a Vercel. Assim a Vercel não precisa rodar o Puppeteer na nuvem.

> ⚠️ O deploy automático por `git push` está **desligado** no painel da Vercel.
> Publicar é sempre manual, pelos comandos abaixo.

## Pré-requisitos (só na primeira vez)

```bash
npm install            # instala dependências (inclui o Puppeteer/Chromium)
npx vercel login       # entra na sua conta Vercel
npx vercel link        # vincula esta pasta ao projeto na Vercel (siga as perguntas)
```

## Toda vez que quiser atualizar o site

### 1. Gerar um PREVIEW (endereço de teste, não afeta produção)

```bash
npx vercel build                 # roda o "npm run build:prod" (build + prerender) localmente
npx vercel deploy --prebuilt     # envia o resultado e devolve uma URL de preview
```

Abra a URL de preview que o comando imprime e confira se está tudo certo
(títulos, páginas de compositores/partituras, etc.).

### 2. Publicar em PRODUÇÃO (memoriadocavaquinho.com.br)

Só depois de validar o preview:

```bash
npx vercel build --prod                 # build de produção (build + prerender)
npx vercel deploy --prebuilt --prod     # publica no domínio de produção
```

## O que cada comando faz

| Comando | O que faz |
|---|---|
| `npm run build` | Gera `sitemap.xml` + build do Vite (leve, **sem** prerender) |
| `npm run prerender` | Pré-renderiza as 67 rotas em `dist/` (precisa do `dist` já buildado) |
| `npm run build:prod` | `build` + `prerender` — o build completo que vai para produção |
| `npx vercel build[--prod]` | Roda o `build:prod` (via `vercel.json`) e monta a saída em `.vercel/` |
| `npx vercel deploy --prebuilt [--prod]` | Envia o que já foi buildado, **sem** rebuildar na nuvem |

## Onde o conteúdo mora

- Compositores e partituras vêm do **Sanity** (projeto `h8odpb0f`). Publicou algo
  novo no Sanity? É só refazer o deploy (passos acima) — o `sitemap.xml` e as
  páginas pré-renderizadas são regenerados a partir do Sanity a cada build.
- SEO por página: componente `src/components/Seo.jsx`.
- Geração do sitemap: `scripts/generate-sitemap.mjs`. Pré-renderização: `scripts/prerender.mjs`.
