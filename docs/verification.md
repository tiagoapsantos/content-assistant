# Verificação do Pauta — Content Assistant

Data: 27/10/2026. Ambiente: Windows, Node.js 24.22.1. Aplicação independente em C:\Users\Tiago\content-assistant. Dados de teste inteiramente fictícios: Atelier Exemplo, cadernos e ideias editoriais. Não foram usadas contas, APIs ou dados pessoais reais.

## Comandos e resultados

- `npm.cmd run check`: aprovado; sintaxe dos módulos verificada.
- `npm.cmd run build`: aprovado; aplicação estática, módulos, CSS, favicon e 404 em `dist`. Repetido após a correcção do contraste dos placeholders.
- `npm.cmd test`: **24 testes aprovados, zero falhas**, incluindo a validação adicional de referências de editor no backup. Não requerem acesso à Internet; os testes HTTP usam apenas loopback local.
- `npm.cmd run preview`: executado em http://127.0.0.1:4175/ para QA. O servidor de QA foi terminado no final. Executar `npm.cmd run dev` para nova revisão; usar a mesma porta/perfil para reencontrar os dados locais. Não é publicação.

## Cobertura automatizada

Briefings obrigatórios, enumerações, limites e normalização; determinismo e identidade do fornecedor local; influência de todos os campos; adaptação de canal/abordagem; ausência das promessas comerciais verificadas nos fixtures; criação/actualização e datas de criação; estados conhecidos e rejeição de estados inválidos; duplicação/variante com ID novo, origem e reinício de estado/data; pesquisa sem acentos, filtros e ordenação; datas locais incluindo dias de mudança de hora; TXT e CSV protegido contra fórmulas; roundtrip JSON do editor incompleto; versão, limites, duplicados, campos inesperados, referências e metadados inválidos; merge sem sobrescrita e remoção dirigida.

O repositório de armazenamento é testado com um adaptador em memória: gravação/reabertura, cópia anterior, corrupção sem sobrescrita automática, indisponibilidade, quota, conflitos entre janelas e eliminação apenas das chaves da aplicação. Testes HTTP verificam módulos/MIME, 404, recusa de POST, isolamento de caminhos e CSP. Testes estruturais verificam labels, erros, mensagens acessíveis, confirmação cancelável e escape de texto importado.

Existência destes testes não é prova de qualidade linguística universal, segurança integral ou resultados comerciais. A verificação de ausência de alegações usa os exemplos definidos; os modelos organizam texto fornecido pelo utilizador e instruções explícitas, não verificam factualmente o próprio briefing.

## Fluxos efectivamente executados no browser

| Verificação | Resultado observado |
| --- | --- |
| Arranque e briefing vazio | Mensagens por campo, aria-invalid e foco no resumo de erros |
| Briefing completo | Marca, produto, público, canal Blog, objectivo, tom, tema, CTA, informação adicional e abordagem Educativa usados no modelo |
| Modelo | Três títulos e estrutura de artigo; aviso explícito de modelos locais, sem IA generativa |
| Edição e gravação | Título, corpo, CTA, estado, data e notas editados e guardados na biblioteca |
| Actualização da página | Conteúdo guardado reaberto com texto, estado e data preservados |
| Editor ainda não guardado na biblioteca | Título em curso preservado numa actualização imediata, mantendo o título anterior do item da biblioteca; gravado depois para regressar ao exemplo original |
| Duplicação | Segundo item com título de cópia, estado Rascunho e data vazia |
| Variante manual | Terceiro item, editado manualmente e alterado para LinkedIn; nenhuma reescrita por IA |
| Publicado manualmente | Estado escolhido pelo utilizador e aviso de que a aplicação não publicou |
| Pesquisa e filtros | Pesquisa de variante + canal LinkedIn + estado manual reduziu para um item; pesquisa inexistente mostrou estado vazio e exportação desactivada |
| Ordenação e selecção | Título A–Z verificado na lista; selecção de um conteúdo alterou o botão CSV para selecção de um item |
| Planeamento | Conteúdos com/sem data; filtro Planeado mostrou só o item correspondente; data alterada de 05/11/2026 para 25/10/2026, preservando o dia local |
| Cópia | Texto escrito na área de transferência e lido para confirmar título, corpo e CTA |
| TXT, CSV e JSON | Eventos de download observados; ficheiros reais lidos e validados. TXT sem notas editoriais; CSV UTF-8/BOM com dados correctos; JSON com três itens, briefing e editor, aceite pelo validador |
| Apagar um item | Cancelar manteve três itens; confirmar removeu a cópia e deixou dois |
| Importação em merge com IDs existentes | Rejeitada sem alterar os dois itens existentes |
| Substituição por JSON | Cancelar manteve dois itens; confirmar restaurou os três itens e o workspace |
| JSON de estrutura inválida | Ficheiro package.json do próprio projecto rejeitado, sem diálogo de substituição ou alteração dos três itens |
| Eliminação total | Cancelar manteve três itens; confirmar limpou biblioteca e workspace; backup JSON restaurou os três e os dados persistiram após actualizar |
| Responsividade | Cinco áreas medidas a 320, 390, 768 e 1280 píxeis: vinte combinações sem deslocamento horizontal da página; um h1 visível por área |
| Visual | Briefing/editor/biblioteca em desktop e editor/biblioteca em mobile inspeccionados; confirmações e estados vazios observados |
| Teclado | Skip link por Tab, foco visível e activação por Enter; confirmações abrem com foco em Cancelar |
| Consola | Não foram observados avisos ou erros nos registos consultados durante os fluxos |

A importação através de file input lê apenas o ficheiro local; não o envia a um servidor. No perfil de browser de QA podem permanecer os três exemplos fictícios restaurados. Uma origem/perfil novo começa vazio.

## Contraste e acessibilidade

Combinações principais calculadas após corrigir os placeholders: texto/fundo 13,39:1; texto secundário/branco 5,62:1; botão azul 6,84:1; placeholder/branco 5,03:1; aviso 6,74:1; erro/branco 6,82:1; estado Em revisão 6,16:1; Aprovado 6,61:1; Planeado 6,14:1; Publicado manualmente 7,22:1. Todas estas combinações excedem 4,5:1. Não é auditoria completa de todas as combinações/estados.

Não foram executados testes com leitores de ecrã, utilizadores reais, todos os browsers ou dispositivos, JavaScript desactivado, falha da Clipboard API ou falha do download. Não existe suite automatizada de browser instalada; as interacções foram executadas através das ferramentas de browser disponíveis. Quota, corrupção e concorrência foram ensaiadas nos testes do adaptador, não provocadas no armazenamento real do browser. Recuperação pelo botão de cópia anterior foi inspeccionada no código; a recuperação efectivamente testada na interface foi a importação JSON. Não se reivindica sincronização, segurança para dados sensíveis ou conformidade integral de acessibilidade.

## Privacidade, preservação e Git

Código revisto: sem tokens, credenciais, chamadas de dados a APIs ou serviços externos. CSP bloqueia ligações de dados e submissões. Só existem armazenamento local, Clipboard API e ficheiros descarregados; localStorage não é encriptado nem armazenamento seguro. Não é auditoria de segurança integral.

Portfolio: 39 ficheiros de trabalho comparados por SHA-256, excluindo dependências, controlo Git e saídas geradas; estado Git comparado com o início. Business Website: 27 ficheiros comparados, incluindo dist. Marketing Dashboard: 32 ficheiros comparados, incluindo dist. Os três projectos permaneceram inalterados. Não foram instaladas dependências, inicializado Git, criados repositórios GitHub ou executados commit, push ou deploy.

## Preparação estática para /content-assistant/ — 27/10/2026

Alterações limitadas a scripts de build/preview, configuração estática partilhada, testes HTTP existentes e documentação. Nenhum módulo funcional, HTML/CSS fonte, modelo, chave de armazenamento ou formato de exportação foi alterado.

- Sintaxe e 24 testes aprovados. Testes HTTP constroem saídas isoladas para a raiz e /content-assistant/; verificam módulos, caminhos, MIME, CSP, 404 e .nojekyll.
- Build de produção com BASE_PATH=/content-assistant/ aprovado. Verificação adicional numa subpasta física: todos os recursos e imports JS respondem; 404 e caminhos de regresso correctos; .nojekyll vazio.
- Browser em http://127.0.0.1:4177/content-assistant/: briefing fictício, modelo local, edição, gravação, reload, biblioteca e planeamento com data 05/11/2026 preservados. TXT real validado; CSV UTF-8/BOM com o item fictício e metadados; backup JSON real com biblioteca e workspace validado. Importação Adicionar rejeitou IDs existentes; Substituir pediu confirmação, importou e preservou o item/editor/data após reload. Sem avisos ou erros de consola nos registos consultados. Um exemplo fictício pode permanecer apenas neste perfil/origem de QA.
- Verificação dirigida de privacidade: sem credenciais, dados pessoais reais, endpoints remotos ou chamadas fetch/XHR/WebSocket/sendBeacon nos módulos. Imports e recursos são locais; texto introduzido/importado não é executado. Avisos de ausência de IA generativa, armazenamento local, falta de sincronização e inadequação para dados sensíveis continuam visíveis.

A CSP agora acompanha o HTML estático e mantém connect-src 'none' e form-action 'none'. Os cabeçalhos adicionais do preview, incluindo frame-ancestors, não são configuráveis por estes ficheiros em Pages. localStorage é partilhado por origem, não isolado por subpasta; as chaves do Pauta continuam exclusivas. Limites e restantes ressalvas da auditoria anterior mantêm-se. Não se verificou um endereço público: sem Git, repositório, commit, push ou deploy. Preparação compatível com Pages; publicação e validação online permanecem futuras.

## Publicação autorizada — 27/10/2026

Reutilizada a preparação estática, sem nova auditoria geral. Confirmada ausência inicial de `.git` e do repositório GitHub pretendido. Revisão dirigida dos ficheiros a publicar sem credenciais ou dados pessoais reais identificados; os dados dos testes são fictícios. Adicionados `.gitignore` de publicação e um único workflow Pages, com permissões de escrita limitadas ao job de deploy, Node 24 e sem instalação de dependências. Resultados do commit, deploy e dos fluxos online constam do relatório de entrega. As secções anteriores que indicam ausência de publicação descrevem as fases históricas de preparação.
