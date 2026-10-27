# Pauta — Content Assistant

Aplicação independente para planear, estruturar, editar e organizar conteúdos de marketing. Primeira versão **PT-PT, local e sem IA generativa**. Público demonstrativo: pequenos negócios, profissionais de marketing, criadores de conteúdo e gestores de redes sociais.

## Auditoria e âmbito assumido

Foram lidos os ficheiros efectivos `assistente-de-conteudo.md` e `content-assistant.md` do portfolio e a auditoria de evidências. O conceito só descrevia exploração de ideias e rascunhos assistidos por IA: não tinha código, regras, fornecedor, prompts ou resultados verificáveis. Não foi encontrada implementação independente nas pastas de projectos directamente acessíveis ou numa pesquisa de nomes relacionados até dois níveis em Desktop, Documents e OneDrive. Isto não representa pesquisa de todo o disco.

Os READMEs do Business Website e do PRISMA foram inspeccionados para compreender a filosofia de módulos simples, Node nativo e testes. Os outros três projectos não foram alterados. Esta implementação é nova e foi criada nesta tarefa com assistência de IA; a aplicação entregue não usa IA. Não constitui trabalho comercial anterior ou resultados de clientes.

Decisões novas: nome visual Pauta, cinco áreas de navegação, briefing determinístico, editor de texto simples, biblioteca local, lista cronológica em vez de calendário, estados editoriais manuais, backups JSON v1. Sem backend, APIs, serviços pagos, autenticação, sincronização ou publicação automática. Todos os exemplos usados na verificação são fictícios.

## Funcionalidades

- **Briefing:** marca, produto/serviço, público, canal, objectivo, tom, tema, CTA, notas adicionais e abordagem informativa/promocional/educativa. Validação e erros associados aos campos.
- **Modelos:** Instagram, Facebook, LinkedIn e blog/website; três propostas de título, introdução/blocos e CTA. Usa efectivamente os campos do briefing. O tom é orientação nas notas, não uma transformação linguística generativa. O resultado tem campos explícitos para completar apenas com informação confirmada. Não inventa preços, benefícios ou testemunhos.
- **Editor:** título, texto, CTA, canal, formato, estado, data e notas; contagem de caracteres; sugestões editoriais próprias, nunca apresentadas como limites oficiais. O tecto de 20 000 caracteres no corpo é técnico/local.
- **Gestão:** guardar, reabrir, duplicar, variante manual e remoção confirmada. Cópias têm novo identificador, estado Rascunho, data prevista vazia e referência à origem. Variantes não são reescritas por IA: são cópias para edição humana.
- **Biblioteca:** pesquisa sem distinção de acentos em título/texto/CTA/notas, filtros por canal/estado, ordenação por alteração/título/data, selecção CSV e estado vazio. Mudar os filtros limpa a selecção para não exportar conteúdos escondidos inadvertidamente.
- **Planeamento:** lista cronológica, conteúdos sem data, alteração de data e filtro de estado Planeado. Datas previstas são strings `YYYY-MM-DD`; não se convertem em instantes UTC. Não existem agendamentos externos ou notificações.
- **Estados:** Rascunho, Em revisão, Aprovado, Planeado e Publicado manualmente. Transições são escolhas do utilizador, não validações automáticas. “Publicado manualmente” não indica envio feito pela aplicação.
- **Exportação:** copiar texto, TXT individual, CSV da vista/selecção e JSON completo. TXT/cópia incluem título, corpo e CTA, sem notas privadas. CSV inclui os metadados e notas, em UTF-8/BOM, ponto e vírgula e aspas, com neutralização de fórmulas. Reveja o que exporta.
- **Importação:** JSON v1 até 2 MB e 200 conteúdos, schema e metadados validados, IDs únicos, campos inesperados rejeitados. Modo Adicionar preserva o briefing/editor actuais e rejeita conflitos de IDs. Modo Substituir pede confirmação antes de substituir biblioteca, briefing e editor. Não executa conteúdo importado.

## Persistência e privacidade

O repositório em `src/storage.js` abstrai localStorage. Uma única estrutura versionada guarda biblioteca e trabalho em curso (briefing/editor), com gravação de edição após 300 ms de pausa e tentativa síncrona de concluir uma gravação pendente ao sair/actualizar a página. “Editor em curso preservado” não significa que o rascunho tenha sido adicionado à biblioteca: é necessário Guardar rascunho para isso.

Chaves exclusivas: `pauta.content.v1`, `.previous` e `.corrupt`. Há uma cópia da gravação anterior, não histórico ilimitado. A gravação principal é validada na leitura. Se estiver inválida, não é apagada ou sobrescrita automaticamente; uma cópia anterior válida abre em modo bloqueado até recuperação explícita. Recuperar tenta preservar a versão actual na chave de recuperação. Falhas de acesso/quota avisam que o trabalho está apenas na sessão. Uma alteração concorrente da chave principal bloqueia sobrescrita silenciosa: exporte a sessão e recarregue. Use uma janela de edição de cada vez.

Não há segurança para dados sensíveis: não guardar segredos, credenciais ou dados pessoais reais. O browser pode apagar dados, o modo privado pode não os reter e mudar de origem/porta/perfil cria outro espaço local. Não há sincronização. Faça backup JSON antes de operações importantes. A eliminação confirmada remove só as três chaves da aplicação; não apaga ficheiros descarregados. A cópia anterior também é removida nessa operação.

## Arquitectura e execução

HTML semântico, CSS próprio e JavaScript ES modules. Node.js nativo serve os ficheiros, produz o build e executa testes. **Zero dependências npm, sem instalação.** Não foram adicionados TypeScript ou bibliotecas por não serem necessários ao âmbito; lógica pura e testes isolam os comportamentos críticos.

```powershell
cd C:\Users\Tiago\content-assistant
npm.cmd run dev
```

Abrir http://127.0.0.1:4175/. Node.js 22+ e npm são os únicos requisitos (verificado com Node 24). `dev` faz build e inicia o servidor; não há hot reload. Depois de editar código, fazer build e actualizar o browser. O servidor ouve só em 127.0.0.1; Ctrl+C termina-o. Outra porta: `$env:PORT = '4176'` antes de executar preview (atenção: outra porta usa outro localStorage).

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd test
npm.cmd run preview
```

Build deve anteceder o preview; os testes HTTP produzem o seu próprio build temporário. Não executar `npm install`; não existe configuração de serviços externos. A saída `dist` é estática, sem servidor de aplicação. O servidor de demonstração bloqueia POST, recursos fora de dist, scripts/estilos inline e ligações de dados externas via CSP. A cópia depende da disponibilidade/permissão de Clipboard API em contexto seguro; se falhar, a interface oferece TXT/cópia manual.

### Ficheiros

- `src/config.js`: modelos vazios, enumerações, orientações e textos partilhados PT-PT.
- `src/validation.js`: briefing/editor, datas locais e schema de backup.
- `src/suggestions.js`: motor puro e contrato isolado de fornecedor (`localProvider.suggest`).
- `src/contents.js`: criação, actualização, duplicação, variantes, pesquisa e planeamento.
- `src/storage.js`: repositório local, backup anterior, recuperação e conflitos.
- `src/export.js`: TXT, CSV protegido e backup JSON.
- `src/ui.js`: componentes HTML e escape de texto.
- `src/app.js`: eventos, estado de edição, navegação, confirmação e persistência.
- `src/index.html` e `src/styles.css`: cinco vistas e identidade visual própria.
- `scripts/`: build, sintaxe e servidor; `tests/`: regras, gestão, armazenamento, exportações e HTTP/UI estrutural.
- `docs/verification.md`: testes executados e limites; `docs/evidence-for-portfolio.md`: factos preparatórios PT/EN.

## Limitações e preparação para o futuro

O motor não produz uma redacção final autónoma. Organiza informação e instruções editoriais; reveja e complete o texto. Não há IA generativa, modelo de linguagem, análise automática de qualidade, integração de redes, calendário externo, envio ou publicação. Não são reivindicados resultados de marketing. A interface é só portuguesa. Textos partilhados estão separados em config; os restantes textos estáticos ainda precisam de tradução e testes para uma versão EN.

Limites técnicos: 200 conteúdos, 2 MB de backup, título 160, corpo 20 000, CTA 500 e notas 4000 caracteres. O armazenamento real depende da quota do browser e pode falhar antes desses limites. Há estado vazio/erros e recuperação; não há histórico de versões, colaboração, encriptação ou auditoria de segurança completa. Não se simulam esperas remotas: sugestões e gestão são locais; a gravação diferida é explicitamente local.

Uma integração futura pode substituir o fornecedor isolado de sugestões mantendo o editor e os módulos de gestão. Exigiria backend seguro, credenciais só no servidor, consentimento informado antes de enviar conteúdo a fornecedores, controlo de custos/limites, tratamento de falhas e identificação explícita das respostas realmente geradas por IA. **Nada disso está implementado ou configurado**, incluindo APIs pagas, billing ou Workers. Próximos passos possíveis: tradução EN, leitores de ecrã e testes multi-browser, histórico de revisões e backend apenas com requisitos definidos.

Não foi inicializado Git, criado repositório, feito commit, push ou deploy. Portfolio, Business Website e Marketing Dashboard preservados.

## Preparação para GitHub Pages (sem publicação)

Para gerar o site para a URL de projecto prevista, mantendo Node.js apenas como ferramenta local:

```powershell
$env:BASE_PATH = '/content-assistant/'
npm.cmd run check
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

Abrir http://127.0.0.1:4175/content-assistant/. Manter BASE_PATH com o mesmo valor no build e no preview. Para a raiz local, remover a variável: `Remove-Item Env:BASE_PATH`. Prefixos inválidos são rejeitados. Os testes constroem saídas temporárias próprias na raiz e numa subpasta física; já não dependem de um build anterior.

Publicar futuramente **apenas o conteúdo de dist**, que inclui index.html, 404.html, .nojekyll, CSS, favicon e módulos JS. Não é necessário servidor Node, npm install ou serviços externos em produção. O build prefixa os caminhos HTML; os imports JS relativos e as cinco vistas internas mantêm a arquitectura existente. O 404 regressa à raiz do projecto. A política CSP é incorporada no HTML, incluindo bloqueio de ligações de dados e submissões, porque Pages não replica os cabeçalhos do preview. frame-ancestors, nos cabeçalhos locais, não pode ser imposto por meta HTML em Pages; não há autenticação ou protecção contra enquadramento garantida neste alojamento.

O alojamento estático serve os ficheiros da aplicação; os briefings, conteúdos e backups importados não são enviados a um servidor. TXT, CSV e JSON são descargas locais. Clipboard depende de HTTPS e das permissões do browser. localStorage não é seguro nem sincronizado: uma nova origem/perfil começa vazio; a origem pública será diferente do preview. Subpastas do mesmo domínio partilham a origem e o armazenamento, embora o Pauta use chaves próprias. Fazer backup JSON antes de mudar de origem, limpar dados ou substituir a biblioteca. Não introduzir dados sensíveis.

Publicação futura (não executada): criar um repositório próprio e um único workflow Pages com testes, BASE_PATH=/content-assistant/, build e upload de dist; activar Pages por GitHub Actions; confirmar a URL efectivamente atribuída e repetir os fluxos online. O endereço https://tiagoapsantos.github.io/content-assistant/ é **previsto**, não uma demonstração publicada. Sem inicialização Git, commit, push ou deploy nesta preparação.

## Publicação autorizada — 27/10/2026

A preparação acima é um registo histórico. A publicação foi agora autorizada para o repositório público `tiagoapsantos/content-assistant`, com demonstração prevista em https://tiagoapsantos.github.io/content-assistant/. O único workflow `.github/workflows/deploy.yml` executa sintaxe, os 24 testes, build com `BASE_PATH=/content-assistant/` e publicação exclusiva de `dist` pelas Actions oficiais de Pages. Não há dependências a instalar. O resultado efectivo do deploy e da verificação online é apresentado no relatório de entrega; a URL só deve ser considerada publicada após confirmação.

`.gitignore` exclui build, dependências, credenciais, temporários e exportações locais. O código funcional e os dados de origem foram preservados. A aplicação permanece local, sem IA generativa, sincronização ou transmissão de conteúdos. A criação de um repositório público não torna os dados de localStorage públicos.
