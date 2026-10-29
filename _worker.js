const H={'content-type':'application/json; charset=utf-8','cache-control':'no-store'};
const EMPTY='{"Z":[],"bz":{},"wz":{},"nz":{},"A":[]}';
async function same(a,b){const e=new TextEncoder(),[x,y]=await Promise.all([crypto.subtle.digest('SHA-256',e.encode(a)),crypto.subtle.digest('SHA-256',e.encode(b))]),u=new Uint8Array(x),v=new Uint8Array(y);let d=0;for(let i=0;i<32;i++)d|=u[i]^v[i];return d===0}
const J=(o,s)=>new Response(JSON.stringify(o),{status:s,headers:H});
async function api(req,env){
 if(req.method==='GET')return new Response((env.ZONAS&&await env.ZONAS.get('zonas'))||EMPTY,{headers:H});
 if(req.method!=='PUT')return J({error:'metodo no permitido'},405);
 const pw=(req.headers.get('authorization')||'').replace(/^Bearer /,'');
 if(!env.ADMIN_PASSWORD||!(await same(pw,env.ADMIN_PASSWORD))){await new Promise(r=>setTimeout(r,1000));return J({error:'no autorizado'},401)}
 if(new URL(req.url).searchParams.has('check'))return new Response(null,{status:204,headers:H});
 if(!env.ZONAS)return J({error:'falta el KV ZONAS'},500);
 const t=await req.text();if(t.length>2e6)return J({error:'muy grande'},413);
 let d;try{d=JSON.parse(t)}catch(e){return J({error:'json invalido'},400)}
 const o=x=>x&&typeof x==='object'&&!Array.isArray(x);
 if(!Array.isArray(d.Z)||!Array.isArray(d.A)||!o(d.bz)||!o(d.wz)||!o(d.nz))return J({error:'formato invalido'},400);
 await env.ZONAS.put('zonas',JSON.stringify({Z:d.Z,bz:d.bz,wz:d.wz,nz:d.nz,A:d.A}));
 return J({ok:true},200)}
export default{async fetch(req,env){return new URL(req.url).pathname==='/api/zonas'?api(req,env):env.ASSETS.fetch(req)}};
