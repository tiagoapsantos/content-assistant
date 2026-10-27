import { mkdir,readdir,copyFile,writeFile,readFile } from 'node:fs/promises';
import { resolve,dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeBasePath,contentSecurityPolicy } from './static-config.mjs';
export const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export async function build({basePath=process.env.BASE_PATH||'/',outDir=resolve(root,'dist')}={}) {
  basePath=normalizeBasePath(basePath);
  await mkdir(outDir,{recursive:true});
  for(const file of await readdir(resolve(root,'src'))) {
    if(file==='index.html') {
      const html=(await readFile(resolve(root,'src',file),'utf8'))
        .replace(/((?:href|src|action)=")\/(?!\/)/g,'$1'+basePath)
        .replace('<head>','<head><meta http-equiv="Content-Security-Policy" content="'+contentSecurityPolicy+'">');
      await writeFile(resolve(outDir,file),html,'utf8');
    } else await copyFile(resolve(root,'src',file),resolve(outDir,file));
  }
  await writeFile(resolve(outDir,'404.html'),'<!doctype html><html lang="pt-PT"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="'+contentSecurityPolicy+'"><title>Página não encontrada — Pauta</title><link rel="stylesheet" href="'+basePath+'styles.css"></head><body><main class="wrap page-heading"><h1>Página não encontrada</h1><a href="'+basePath+'">Regressar ao Pauta</a></main></body></html>','utf8');
  await writeFile(resolve(outDir,'.nojekyll'),'');
  console.log('Build concluído: aplicação estática, módulos, CSS, 404 e .nojekyll (prefixo '+basePath+').');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await build();
