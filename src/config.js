export const channels={instagram:'Instagram',facebook:'Facebook',linkedin:'LinkedIn',blog:'Blog / website'};
export const statuses={draft:'Rascunho',review:'Em revisão',approved:'Aprovado',planned:'Planeado',published_manual:'Publicado manualmente'};
export const formats={post:'Publicação',carousel:'Carrossel',article:'Artigo',note:'Nota editorial'};
export const approaches={informative:'Informativa',promotional:'Promocional',educational:'Educativa'};
export const tones={clear:'Claro e directo',warm:'Próximo e acolhedor',professional:'Profissional',didactic:'Didáctico'};
export const guidance={
 instagram:'Experimente uma abertura curta e uma ideia por bloco. Num carrossel, use cada bloco como ponto de partida de um slide.',
 facebook:'Dê contexto à publicação e termine com uma acção clara. Reveja se cada parágrafo acrescenta informação.',
 linkedin:'Comece pelo contexto profissional e organize a ideia em parágrafos curtos, sem alegações que não possa sustentar.',
 blog:'Use um título descritivo, uma introdução e subtítulos. Desenvolva apenas informação que possa confirmar.',
};
export const emptyBriefing=()=>({brand:'',product:'',audience:'',channel:'instagram',objective:'',tone:'clear',topic:'',cta:'',extra:'',approach:'informative'});
export const emptyEditor=()=>({id:null,title:'',body:'',cta:'',channel:'instagram',format:'post',status:'draft',scheduledDate:'',notes:'',parentId:null});
export const emptySnapshot=()=>({version:1,items:[],workspace:{briefing:emptyBriefing(),editor:null,titles:[]}});
export const ui={saved:'Conteúdo guardado neste navegador.',sessionOnly:'As alterações estão apenas nesta sessão. Exporte um backup antes de fechar.',manualPublished:'Registo manual: a aplicação não publicou em nenhuma plataforma.',modelNotice:'Assistência por modelos locais. Não é geração por IA. Reveja e complete o rascunho antes de o utilizar.'};
