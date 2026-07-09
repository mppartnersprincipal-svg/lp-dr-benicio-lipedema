# Google Ads — Configuração completa (GTM · GA4 · Conversões · Políticas)

Guia para colocar a campanha no ar medindo cliques nos CTAs de WhatsApp como conversão.
O site **já emite tudo o que é preciso** (eventos no `dataLayer`, Consent Mode v2, UTMs);
este guia cobre a parte que vive nos painéis do Google.

**Fluxo de conversão:** anúncio → LP → clique em qualquer CTA → evento `whatsapp_click`
no dataLayer → tag de conversão do Google Ads + evento GA4 → WhatsApp do consultório.

---

## Passo 1 — Container GTM ativo no site ✅

O container é o **`GTM-W349GXQ2`**, já configurado em [`src/config/content.ts`](src/config/content.ts)
(`SITE.gtmId`). O snippet está implementado em [`src/layouts/Base.astro`](src/layouts/Base.astro)
(carregamento on-idle + `<noscript>` + Consent Mode v2 default *denied*) e só é injetado com um
ID em formato válido — se `gtmId` voltar ao placeholder `GTM-XXXXXXX`, ele é desligado.

## Passo 2 — Importar a configuração pronta do container

O arquivo [`gtm/container-import.json`](gtm/container-import.json) já contém todas as tags,
gatilhos, variáveis e configurações de consentimento.

1. No GTM: **Administrador → Importar contêiner**.
2. Selecione o arquivo, escolha o workspace **Default**, opção **Mesclar** (ou Substituir, se o container for novo).
3. Confirme. Serão criados:

| Item | O quê |
|---|---|
| Tag `Google Ads - Conversion Linker` | All Pages + `consent_granted`, com URL passthrough |
| Tag `Google Tag - GA4 Config` | Configuração GA4 (exige consentimento `analytics_storage`) |
| Tag `GA4 - Evento whatsapp_click` | Evento com `whatsapp_source` + UTMs |
| Tag `Google Ads - Conversao Lead WhatsApp` | Conversão no clique do CTA (exige `ad_storage`) |
| Gatilhos `CE - whatsapp_click` / `CE - consent_granted` | Eventos customizados que o site já dispara |
| Variáveis `DLV - *` | Leitura de `whatsapp_source` e UTMs do dataLayer |
| Constantes `GA4 Measurement ID` / `Google Ads Conversion ID` / `Google Ads Conversion Label` | **← preencher no Passo 3 e 4** |

> ⚠️ **Não** adicione um segundo gatilho de "Clique em link wa.me" nas tags de conversão.
> O clique já gera o evento `whatsapp_click`; com dois gatilhos a mesma conversão contaria **duas vezes**.

## Passo 3 — GA4

1. Em [analytics.google.com](https://analytics.google.com): criar propriedade GA4 (fuso `América/São Paulo`, moeda BRL).
2. Criar um fluxo de dados **Web** com o domínio final → copiar o **Measurement ID** (`G-…`).
3. No GTM, editar a variável constante **`GA4 Measurement ID`** e colar o valor.
4. Depois do primeiro tráfego, em **Administrador → Eventos**, marcar `whatsapp_click` como **evento-chave** (key event).
5. **Administrador → Vinculações do Google Ads** → vincular à conta do Google Ads (habilita importar público/dados e ver conversões GA4, se desejar usar como fonte secundária).

## Passo 4 — Ação de conversão no Google Ads

1. No Google Ads: **Metas → Conversões → Nova ação de conversão → Site**.
2. Informe o domínio → escolha **criar manualmente** (não usar as sugestões automáticas).
   - Categoria: **Contato**
   - Nome: `Lead - WhatsApp LP Lipedema`
   - Valor: não atribuir (ou defina um valor estimado de lead, opcional)
   - Contagem: **Uma** (um lead por clique)
   - Janela de conversão: 30 dias · Modelo: baseado em dados
   - Marcar como **ação principal** (usada para lances)
3. Ao finalizar, escolha **usar o Google Tag Manager** como método: o painel mostra
   **Conversion ID** (só números) e **Conversion Label**.
4. No GTM, preencha as constantes **`Google Ads Conversion ID`** e **`Google Ads Conversion Label`**.
5. **Publicar o container** (Enviar → Publicar).

## Passo 5 — Testar antes de subir a campanha

1. GTM **Visualizar** (Preview/Tag Assistant) apontando para o site publicado.
2. Cenários a validar:
   - Chegar com `?gclid=teste&utm_source=google&utm_campaign=teste` → evento `utm_captured` no dataLayer.
   - **Sem aceitar o banner**: nenhuma tag do Google dispara (consentimento negado por padrão — comportamento correto).
   - **Aceitar o banner** → `consent_granted` → disparam `Google Tag - GA4 Config` e `Conversion Linker`.
   - Clicar em qualquer CTA → `whatsapp_click` com `whatsapp_source` correto (hero, checklist, cta-final, sticky, float) → disparam a tag GA4 e a de conversão do Google Ads.
   - Recarregar a página (consentimento lembrado) → tags de página disparam direto no carregamento.
3. Em até 24h a ação de conversão no Google Ads deve sair de "Inativa" para "Registrando conversões".

### Sobre o consentimento e a contagem de conversões

**Decisão de 2026-07-09:** o container em produção (montado pelo assistente do Google Ads)
opera em **advanced consent mode** — as tags do Google disparam sempre, mas respeitam o
Consent Mode: quem recusa o banner não recebe cookies nem é identificado; o Google recebe
apenas pings agregados/sem cookies, que alimentam a **modelagem de conversões** do Smart
Bidding. A política de privacidade (`/privacidade`) foi atualizada para descrever exatamente
esse comportamento.

> Nota: as tags do arquivo `gtm/container-import.json` trazem *additional consent checks*
> (modo básico — tag só dispara com consentimento). Se algum item dele for importado no
> container em produção, **remova essa exigência na tag importada** para manter o
> comportamento uniforme de advanced consent mode.

---

## Estrutura de campanha recomendada

**Tipo:** Pesquisa (Search) pura — desmarcar **Rede de Display** e avaliar desmarcar parceiros de pesquisa.

| Configuração | Recomendação |
|---|---|
| Campanha 1 | `Lipedema - Goiânia` — Goiânia + região metropolitana (presencial) |
| Campanha 2 (opcional) | `Lipedema - Brasil Telemedicina` — Brasil, copy voltada à teleconsulta |
| Localização | "Presença: pessoas em ou regularmente nos locais segmentados" (não "interesse") |
| Idioma | Português |
| Lances | Início: **Maximizar cliques** com CPC máx.; migrar p/ **Maximizar conversões/tCPA** com ≥15–30 conversões/mês |
| URL final | `https://www.drbeniciolipedema.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=lipedema-goiania&utm_content={creative}&utm_term={keyword}` |

**Palavras-chave iniciais** (frase/exata; evitar ampla no começo):
`tratamento lipedema`, `lipedema goiânia`, `médico lipedema`, `cirurgia lipedema`,
`lipoaspiração lipedema`, `lipedema tem tratamento`, `especialista lipedema`,
`como tratar lipedema`, `diagnóstico lipedema`.

**Negativas iniciais:** `gratuito`, `grátis`, `sus`, `curso`, `o que é` (informacional puro, opcional),
`linfedema` (se não quiser esse tráfego), `antes e depois`, `fotos`, `preço` (avaliar — pode ser lead quente).

**Anúncios (RSA) — regras de copy** (Google Ads + CFM):
- ✅ Permitido: "Tratamento de lipedema em Goiânia", "Avaliação especializada", "Agende pelo WhatsApp", "Telemedicina para todo o Brasil", "+30 anos de experiência" (confirmado pelo cliente).
- ❌ Proibido: promessa de **cura** ou resultado garantido, "o melhor especialista", superlativos não comprováveis, preços enganosos, fotos de antes/depois, menção a "vagas limitadas" **no anúncio** apenas se for verificável (na LP já foi confirmado como real).
- Recursos: extensão de **chamada** (+55 62 99613-4706), **local** (vincular Perfil da Empresa no Google), **sitelinks** (FAQ, Política de Privacidade, Sobre o Dr. Benício → âncoras), **frases de destaque** ("Telemedicina disponível", "Atendimento humanizado").

---

## Conformidade com as políticas do Google Ads

### O que a LP já cumpre ✅

| Política | Situação |
|---|---|
| **Saúde e medicamentos** | Serviço médico legítimo (consulta/cirurgia) — permitido no Brasil sem certificação; a LP não menciona medicamentos, procedimentos experimentais nem venda de fármacos. |
| **Declarações enganosas (Misrepresentation)** | Copy revisada: sem promessa de cura ("condição crônica" dito explicitamente no FAQ), sem garantia de resultado, disclaimer educativo no rodapé, "milhares de pacientes" removido por não ser comprovável. |
| **Requisitos de destino** | Página funcional, mobile-first (Lighthouse 100), sem pop-ups intrusivos, política de privacidade em `/privacidade`, contato e endereço completos no rodapé. |
| **Consentimento/privacidade** | Consent Mode v2 (default *denied*), banner LGPD com opção real de recusa, política de privacidade cita cookies, GTM/GA4 e anúncios. |
| **Conteúdo sensível** | Sem fotos de antes/depois, sem depoimentos fictícios (seção desligada por flag até haver autorizações por escrito — exigência CFM). |

### ⚠️ Regras a respeitar na CONTA (não na LP)

1. **Publicidade personalizada — Saúde:** o Google **proíbe remarketing e segmentação
   personalizada com base em condição de saúde**. Não crie listas de remarketing com
   visitantes desta LP nem públicos "semelhantes" a partir dela. Use somente **Pesquisa
   por palavra-chave** (intenção declarada) — a estrutura recomendada acima já respeita isso.
2. **Não usar antes/depois** em nenhum criativo (política de procedimentos cosméticos + CFM).
3. **Nome do anunciante / verificação:** o Google pode exigir a verificação de anunciante;
   use os dados reais do consultório/empresa.

### 🔴 Bloqueadores — resolver ANTES de ativar a campanha

1. ~~`SITE.gtmId`~~ ✅ `GTM-W349GXQ2` configurado.
2. ~~`DOCTOR.crm`~~ ✅ `CRM-GO 4893 · RQE 471` (confirmado pelo cliente em 2026-07-09).
3. ~~Domínio real~~ ✅ `https://www.drbeniciolipedema.com.br` no ar (HTTPS + redirects OK),
   `SITE.domain` e `robots.txt` atualizados.
4. **`CONTACT.hours`** → confirmar horário com o consultório.
5. **Redeploy com estas alterações** — o deploy inicial foi feito sem o GTM/domínio no código;
   conferir depois no HTML publicado se `GTM-W349GXQ2` aparece.

## Checklist final (ordem de execução)

- [ ] Domínio contratado e apontado (Vercel + Hostinger) — atualizar `content.ts` + `robots.txt`
- [ ] CRM-GO/RQE e horário reais em `content.ts`
- [ ] Container GTM criado → ID em `content.ts` → build + deploy
- [ ] `gtm/container-import.json` importado, 3 constantes preenchidas, container publicado
- [ ] GA4 criado e vinculado ao Google Ads; `whatsapp_click` marcado como evento-chave
- [ ] Ação de conversão "Lead - WhatsApp" ativa (status "Registrando conversões")
- [ ] Teste completo no GTM Preview (consentimento negado/aceito + todos os CTAs)
- [ ] Campanha de Pesquisa criada com UTMs nas URLs finais — **sem remarketing**
- [ ] Verificação de anunciante concluída (se solicitada pelo Google)
