# LP Lipedema — Dr. Benício de Oliveira Júnior

Landing page de conversão (tráfego pago → WhatsApp) para tratamento de lipedema em Goiânia/GO.
Stack: **Astro 5 + CSS puro** (tokens do design system), estático, sem backend.

**Resultado do QA (Lighthouse mobile):** Performance 100 · Acessibilidade 100 · Best Practices 100 · SEO 100 · LCP 1,7s · CLS 0,006 · First load ~124KB.

## Comandos

```bash
npm install        # 1x
npm run assets     # regenera fontes + imagens (só se trocar fotos/logo)
npm run dev        # desenvolvimento (localhost:4321)
npm run build      # build de produção → dist/
npm run preview    # servir o build localmente
```

## Onde editar conteúdo

**Tudo editável está em [`src/config/content.ts`](src/config/content.ts)** — copy das seções, WhatsApp, endereço, CRM, flags. Não é preciso mexer em componentes para trocar texto.

Flags disponíveis (`FLAGS`):

| Flag | Efeito |
|---|---|
| `testimonials` | Liga/desliga a seção de depoimentos (**manter `false` até ter depoimentos reais com autorização por escrito — exigência CFM**) |
| `floatingWhatsapp` | Botão flutuante verde no desktop |
| `appendUtmToWhatsApp` | Anexa `[ref: utm_source/utm_campaign]` à mensagem do WhatsApp |

## ⚠️ Checklist pré-lançamento (placeholders a substituir)

1. ~~**`SITE.domain`**~~ ✅ configurado (`https://www.drbeniciolipedema.com.br`, com `robots.txt` atualizado).
2. ~~**`SITE.gtmId`**~~ ✅ configurado (`GTM-W349GXQ2`). O snippet só é injetado com ID em formato válido; o placeholder `GTM-XXXXXXX` desliga o GTM.
3. **`DOCTOR.crm`** → CRM-GO e RQE reais (obrigatório CFM).
4. **`CONTACT.hours`** → confirmar horário (registro anterior: ter/qui 14h–17h).
5. **Depoimentos** → substituir os placeholders em `DEPOIMENTOS.items` por relatos reais autorizados e ativar `FLAGS.testimonials`.

> Confirmado com o cliente (2026-07-08): "+30 anos de atuação" é o número correto e as "vagas limitadas por semana" são reais. A contagem "milhares de pacientes" foi removida por não ser comprovável (exigência CFM).

## Rastreamento (GTM)

O código já: injeta o GTM on-idle (não bloqueia a dobra), define **Consent Mode v2 default: denied**, e empurra estes eventos no `dataLayer`:

| Evento | Quando | Dados |
|---|---|---|
| `whatsapp_click` | Clique em qualquer CTA `wa.me` | `whatsapp_source` (hero, checklist, cta-final, sticky, float, footer-social, footer-phone) + UTMs |
| `utm_captured` | Chegada com `utm_*`/`gclid`/`fbclid` | os parâmetros capturados |
| `consent_granted` | Aceite no banner LGPD | — |

A configuração do painel (tags, gatilhos, variáveis e consentimento) está **pronta para importar**
em [`gtm/container-import.json`](gtm/container-import.json) — passo a passo completo (GTM → GA4 →
conversão do Google Ads → estrutura de campanha → políticas) em [`GOOGLE-ADS.md`](GOOGLE-ADS.md).

> ⚠️ Usar **apenas** o gatilho de evento customizado `whatsapp_click` nas tags de conversão.
> Adicionar também um gatilho de "clique em link `wa.me`" duplicaria a contagem (o mesmo clique
> gera os dois eventos). Meta Pixel (se/quando usar): tag Custom HTML com evento `Lead` no
> gatilho `whatsapp_click`, exigindo consentimento `ad_storage`.

## Deploy (Vercel)

1. Criar repositório no GitHub e dar push.
2. Importar na Vercel — preset **Astro** é detectado (build `astro build`, output `dist`).
3. Apontar o domínio (DNS na Hostinger, como nas outras LPs) e atualizar `SITE.domain` + `robots.txt`.
4. Pós-deploy: testar CTAs no celular real, rodar PageSpeed Insights, GTM Preview.

Netlify/Cloudflare Pages também funcionam (site 100% estático).

## Assets

- Originais do cliente (fora do repo): `C:\Users\User\Desktop\Dr. Benício -LP\` (design system + fotos). **Não importar desses caminhos no código** — têm espaço/acento e quebram tooling Node.
- `assets-src/` guarda cópias normalizadas (hero.jpg, autoridade.jpg, extra.jpg, logo).
- `scripts/optimize-images.mjs` gera AVIF/WebP responsivos (480/800/1200), `og.jpg` e favicons.
- `scripts/copy-fonts.mjs` copia os woff2 (subset latin) do Fontsource com os nomes que o `tokens.css` espera.
- Fontes/design: tokens oficiais em [`src/styles/tokens.css`](src/styles/tokens.css) — **nenhuma cor fora dele**.

## Estrutura

```
src/
├─ config/content.ts      ← TODA a copy/contatos/flags
├─ layouts/Base.astro     ← <head>: SEO, OG, JSON-LD, preloads, consent + GTM
├─ pages/index.astro      ← ordem das seções
├─ pages/privacidade.astro
├─ components/            ← 1 arquivo por seção + StickyCta/Float/Consent
├─ scripts/               ← typewriter (LCP-safe), reveal, tracking
└─ styles/                ← tokens.css (design system) + global.css
```

## Conformidade (CFM/LGPD)

- Sem promessa de cura/resultado; tom educativo (copy aprovada no PRD).
- CRM/RQE visível no hero, na autoridade e no rodapé (substituir placeholder!).
- Aviso educativo no rodapé; política de privacidade em `/privacidade`.
- Banner de consentimento + Consent Mode v2 (tags só disparam após aceite).
- Depoimentos bloqueados por flag até haver autorização por escrito.
