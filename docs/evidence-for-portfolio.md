# Evidências preparatórias / Preparatory evidence

27/10/2026. Não é estudo de caso definitivo. Ver `verification.md` para resultados efectivamente executados.

## PT — Problema e implementação

Converter um conceito sem código numa ferramenta editorial local. O Pauta separa briefing, regras/modelos, gestão de conteúdos, persistência, interface e exportação. O motor é determinístico, utiliza os campos do briefing e produz estruturas a completar; não é IA generativa. O conteúdo permanece editável e organizado numa biblioteca e lista por data.

## EN — Problem and implementation

Turn an unimplemented concept into a local editorial tool. Pauta separates briefs, rules/templates, content management, persistence, UI and exports. The deterministic engine uses briefing fields to produce structures for human completion; it is not generative AI. Drafts remain editable and can be organised in a library and dated list.

## Decisões / Decisions

Zero dependências, módulos testáveis, texto simples em vez de rich text, schema de backup versionado, datas de planeamento sem conversão de fuso horário e confirmações para operações destrutivas. A assistência de IA foi usada para desenvolver este projecto; a aplicação executável não chama serviços de IA. / Zero dependencies, testable modules, plain text editing, versioned backup schema, date-only planning and destructive-action confirmations. AI assistance was used during development; the running app does not call AI services.

## Capturas a reunir / Capture plan

Briefing preenchido com dados fictícios; estrutura e editor; biblioteca filtrada; planeamento com/sem data; confirmação de remoção; exportação e recuperação local. / A fictional brief, model/editor, filtered library, dated/undated planning, deletion confirmation and local backup/recovery.

## Limites / Limits

Sem plataformas ligadas, dados reais, publicação automática ou provas de resultados comerciais. localStorage não é armazenamento seguro e não sincroniza dispositivos. Testes técnicos não equivalem a validação com utilizadores. / No linked platforms, real data, automatic publishing or commercial outcome claims. localStorage is not secure storage and does not sync devices. Technical checks are not user research.

## Resultados técnicos confirmados / Verified technical outcomes

PT: build e sintaxe aprovados; 24 testes automatizados aprovados. Fluxo de briefing a modelo, edição, gravação, reabertura, duplicação, variante, estados, datas, pesquisa/filtros, exportação e confirmação de remoção executado no browser. Downloads TXT/CSV/JSON reais verificados; importação validada, conflitos rejeitados e backup restaurado após eliminação de dados fictícios. Cinco áreas medidas entre 320 e 1280 píxeis sem deslocamento horizontal. Sem erros de consola observados. Ver limites precisos em verification.md.

EN: production build and syntax checks passed, with 24 automated tests passing. The brief-to-template, editing, save/reopen, duplication, manual variant, status/date, search/filter, export and confirmed deletion workflows were exercised in the browser. Actual TXT/CSV/JSON downloads were inspected; imports were validated, conflicts rejected and a backup restored after deleting fictional test data. Five views were measured from 320 to 1280 pixels without page-level horizontal overflow. No console errors were observed. See verification.md for precise limitations.

Estes são resultados técnicos de uma ferramenta local, não métricas de marketing, prova de qualidade universal de escrita ou integração de IA. / These are technical outcomes for a local tool, not marketing performance, universal writing-quality evidence or AI integration.
