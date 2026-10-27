import { channels,statuses,formats } from './config.js';
import { validateSnapshot,assertItem,parseBackup } from './validation.js';
export function contentTxt(item){assertItem(item);return [item.title,'',item.body,...(item.cta?['',item.cta]:[])].join('\n');}
export function csvCell(value){let s=String(value??'');if(/^[\s\uFEFF]*[=+@-]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function libraryCsv(items){const header=['ID','Título','Canal','Formato','Estado','Data prevista','Criado em UTC','Alterado em UTC','Texto','Chamada à acção','Notas'];return '\uFEFF'+[header,...items.map(i=>[i.id,i.title,channels[i.channel],formats[i.format],statuses[i.status],i.scheduledDate,i.createdAt,i.updatedAt,i.body,i.cta,i.notes])].map(r=>r.map(csvCell).join(';')).join('\r\n')+'\r\n';}
export function backupJson(snapshot){validateSnapshot(snapshot);const output=JSON.stringify(snapshot);parseBackup(output);return output;}
