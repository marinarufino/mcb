# Painel de Conteúdo — Memória do Cavaquinho Brasileiro

Este é o **Sanity Studio**: o painel onde o admin publica os posts da seção
"Novidades" da página inicial (imagem + título + texto + data).

Project ID: **h8odpb0f** · Dataset: **production**

---

## 1. Primeira configuração (uma única vez)

No terminal, dentro desta pasta `studio/`:

```bash
cd studio
npm install
```

### Criar o dataset (se ainda não existir)

```bash
npx sanity dataset create production --visibility public
```

> "public" permite que o site leia os posts sem autenticação. As imagens e
> textos continuam só editáveis por quem tem login de admin.

### Liberar o site para ler o conteúdo (CORS)

No painel de gerenciamento do projeto em https://sanity.io/manage
→ projeto **h8odpb0f** → **API** → **CORS origins** → adicione:

- `http://localhost:5173` (desenvolvimento)
- a URL do site publicado (ex.: `https://mcb.vercel.app` e o domínio final)

### Dar acesso de admin a quem vai alimentar

Em https://sanity.io/manage → projeto → **Members** → **Invite member**
(convide por e-mail; a pessoa loga com Google/GitHub/e-mail).

---

## 2. Usar o painel

**Localmente:**

```bash
npm run dev
```

Abre em `http://localhost:3333` — login, clicar em "Post da Newsletter" →
"Create" → subir imagem, escrever título/texto, escolher a data → **Publish**.

**Online (recomendado para o admin não precisar do terminal):**

```bash
npm run deploy
```

Escolha um nome (ex.: `memoria-cavaquinho`). O painel fica disponível em
`https://memoria-cavaquinho.sanity.studio` — o admin só acessa esse link,
faz login e publica. O que for publicado aparece automaticamente na Home.

---

## 3. Variáveis no site (já configuradas em `.env`)

```
VITE_SANITY_PROJECT_ID=h8odpb0f
VITE_SANITY_DATASET=production
```

No deploy do site (Vercel) → Project Settings → Environment Variables →
adicione essas duas com os mesmos valores.
