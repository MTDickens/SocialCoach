import assert from 'node:assert/strict';
import {test,after} from 'node:test';
import {createServer,type IncomingMessage} from 'node:http';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {open,seal,sign,usableSecret,verify} from '../../src/lib/account/crypto';
import {EndpointError,publicEndpoint} from '../../src/lib/account/endpoint';
import {accountStore} from '../../src/lib/account/store';
import {parseAllowed,setAccountEnvForTests,type AccountEnv} from '../../src/lib/account/env';
import {currentSession,sessionCookie,SESSION_COOKIE,STATE_COOKIE} from '../../src/lib/account/session';
import {chatModels} from '../../src/lib/account/llm';
import {requestModel} from '../../src/lib/account/request-model';
import {exchangeCode} from '../../src/lib/account/github';
import type {D1Like,ModelForm} from '../../src/lib/account/types';
import {GET as accountGet,DELETE as accountDelete} from '../../src/app/api/account/route';
import {PUT as modelPut,DELETE as modelDelete} from '../../src/app/api/account/model/route';
import {POST as modelsPost} from '../../src/app/api/account/models/route';
import {GET as login} from '../../src/app/api/auth/login/route';
import {GET as callback} from '../../src/app/api/auth/callback/route';
import {POST as logout} from '../../src/app/api/auth/logout/route';
import {GET as health} from '../../src/app/api/health/route';
import {POST as hint} from '../../src/app/api/hint/route';
import {SCENARIOS} from '../../src/data/corpus';
import {buildSession} from '../../src/lib/session-utils';

const SECRET='test-secret-that-is-long-enough-000000',KEY='sk-test-PRIVATE-KEY-abcd',ORIGIN='https://hallway.test';
/** The real migration, on a real SQLite engine, behind the three D1 methods the app uses. */
function d1():D1Like&{raw:DatabaseSync}{
 const raw=new DatabaseSync(':memory:');raw.exec('PRAGMA foreign_keys=ON;'+readFileSync(new URL('../../migrations/0001_accounts.sql',import.meta.url),'utf8'));
 const statement=(sql:string,values:unknown[]=[]):ReturnType<D1Like['prepare']>=>({bind:(...v)=>statement(sql,v),first:async<T,>()=>(raw.prepare(sql).get(...values as never[])??null) as T|null,run:async()=>raw.prepare(sql).run(...values as never[])});
 return {raw,prepare:sql=>statement(sql)};
}
const db=d1();
const env=(patch:Partial<AccountEnv>={}):AccountEnv=>({store:accountStore(db,SECRET),secret:SECRET,github:{clientId:'cid',clientSecret:'csecret'},allowed:new Set(['ada','grace']),origin:ORIGIN,allowInsecureEndpoints:false,...patch});
const ada={id:1,login:'Ada',name:'Ada L',avatarUrl:'https://avatars.example/1'},grace={id:2,login:'grace',name:'',avatarUrl:''};
const form=(patch:Partial<ModelForm>={}):ModelForm=>({provider:'openai',baseUrl:'https://relay.example.com/v1',apiKey:KEY,fastModel:'fast-1',smartModel:'smart-1',tokenParam:'max_tokens',effort:'default',disableThinking:false,...patch});
const cookieValue=(setCookie:string)=>setCookie.split(';')[0];
async function request(path:string,init:{method?:string;user?:typeof ada;body?:unknown;origin?:string|null;cookie?:string}={},active=env()){
 const headers:Record<string,string>={};
 if(init.user)headers.cookie=cookieValue(await sessionCookie(new Request(ORIGIN),active,init.user));
 if(init.cookie)headers.cookie=init.cookie;
 if(init.origin!==null)headers.origin=init.origin??ORIGIN;
 if(init.body!==undefined)headers['content-type']='application/json';
 return new Request(ORIGIN+path,{method:init.method??'GET',headers,body:init.body===undefined?undefined:JSON.stringify(init.body)});
}
after(()=>setAccountEnvForTests(undefined));

test('one secret yields a session key and a storage key that do not open each other',async()=>{
 assert.equal(usableSecret('short'),false);assert.equal(usableSecret(SECRET),true);
 const token=await sign(SECRET,{uid:1});
 assert.deepEqual(await verify(SECRET,token),{uid:1});
 assert.equal(await verify(SECRET,token.slice(0,-2)+'xx'),null);assert.equal(await verify(SECRET+'x',token),null);assert.equal(await verify(SECRET,'garbage'),null);assert.equal(await verify(SECRET,undefined),null);
 const forged=`${btoa(JSON.stringify({uid:2})).replace(/=+$/,'')}.${token.split('.')[1]}`;assert.equal(await verify(SECRET,forged),null);
 const sealed=await seal(SECRET,KEY,'1');
 assert.ok(!sealed.includes(KEY)&&sealed!==await seal(SECRET,KEY,'1'),'ciphertext must not contain or repeat the key');
 assert.equal(await open(SECRET,sealed,'1'),KEY);assert.equal(await open(SECRET,sealed,'2'),null,'a row copied to another user must not decrypt');assert.equal(await open(SECRET+'x',sealed,'1'),null);assert.equal(await open(SECRET,'v1.bad.bad','1'),null);
});

test('only public https endpoints are accepted as a place to send a key',()=>{
 assert.equal(publicEndpoint('https://relay.example.com/v1/chat/completions','openai'),'https://relay.example.com/v1');
 assert.equal(publicEndpoint('https://relay.example.com/v1/?x=1#y','openai'),'https://relay.example.com/v1');
 for(const bad of ['http://relay.example.com/v1','https://localhost/v1','https://127.0.0.1/v1','https://10.0.0.5/v1','https://192.168.1.2/v1','https://169.254.169.254/latest','https://172.20.0.1/v1','https://[::1]/v1','https://intranet/v1','https://user:pw@relay.example.com/v1','ftp://relay.example.com','not a url','https://db.internal/v1'])
  assert.throws(()=>publicEndpoint(bad,'openai'),EndpointError,bad);
 assert.equal(publicEndpoint('http://127.0.0.1:9/v1','openai',true),'http://127.0.0.1:9/v1');
});

test('the database never holds a usable key, and a saved key is kept when the form leaves it empty',async()=>{
 const store=accountStore(db,SECRET);await store.upsertUser(ada);await store.upsertUser(grace);
 assert.equal(await store.saveModel(grace.id,form({apiKey:''}),'https://relay.example.com/v1'),false,'nothing to keep yet');
 assert.equal(await store.saveModel(ada.id,form(),'https://relay.example.com/v1'),true);
 const dump=JSON.stringify(db.raw.prepare('SELECT * FROM model_configs').all());
 assert.ok(!dump.includes(KEY)&&dump.includes('"key_hint":"abcd"'));
 const shown=await store.modelView(ada.id);assert.ok(shown&&!('apiKey' in shown)&&shown.keyHint==='abcd');
 assert.equal((await store.model(ada.id))?.apiKey,KEY);
 assert.equal(await store.saveModel(ada.id,form({apiKey:'',fastModel:'fast-2',effort:'high'}),'https://relay.example.com/v1'),true);
 const kept=await store.model(ada.id);assert.equal(kept?.apiKey,KEY);assert.equal(kept?.fastModel,'fast-2');assert.equal(kept?.effort,'high');
 assert.equal(await accountStore(db,SECRET+'-rotated').model(ada.id),null,'a different deployment secret cannot read the key');
 db.raw.prepare('INSERT INTO model_configs SELECT 2,provider,base_url,api_key_enc,key_hint,fast_model,smart_model,token_param,effort,disable_thinking,updated_at FROM model_configs WHERE user_id=1').run();
 assert.equal(await store.model(grace.id),null,'a ciphertext moved to another user stays closed');
 await store.deleteModel(grace.id);
 assert.throws(()=>db.raw.prepare("UPDATE model_configs SET effort='max' WHERE user_id=1").run());
});

test('a session is checked against the allow-list on every request',async()=>{
 const active=env();const set=await sessionCookie(new Request(ORIGIN),active,ada);
 assert.ok(/HttpOnly/.test(set)&&/SameSite=Lax/.test(set)&&/Secure/.test(set)&&set.startsWith(SESSION_COOKIE+'='));
 const req=new Request(ORIGIN,{headers:{cookie:cookieValue(set)}});
 assert.equal((await currentSession(req,active))?.session.uid,1);
 assert.equal(await currentSession(req,active,Date.now()+31*86_400_000),null,'expired');
 assert.equal(await currentSession(req,env({allowed:new Set(['grace'])})),null,'removed from the list');
 assert.equal(await currentSession(req,env({secret:SECRET+'x'})),null);assert.equal(await currentSession(new Request(ORIGIN),active),null);assert.equal(await currentSession(req,null),null);
 assert.equal(parseAllowed(undefined),null);assert.equal(parseAllowed(' , '),null);assert.equal(parseAllowed('a, *'),'*');assert.deepEqual([...parseAllowed('@Ada, grace\nlin') as Set<string>],['ada','grace','lin']);
});

test('without accounts configured every account route says so and the app is otherwise unchanged',async()=>{
 setAccountEnvForTests(null);
 assert.deepEqual(await (await accountGet(await request('/api/account'))).json(),{available:false,user:null,model:null});
 assert.equal((await modelPut(await request('/api/account/model',{method:'PUT',body:form()}))).status,503);
 assert.ok((await login(await request('/api/auth/login'))).headers.get('location')!.endsWith('/settings?account=unavailable'));
 assert.equal((await requestModel(await request('/api/hint',{method:'POST'}))).source,'server');
 assert.deepEqual(await (await health(await request('/api/health'))).json(),{serverKey:false,requireByok:false,state:'unavailable',issue:'setup'});
});

test('account routes require a session and the same origin, and never return the key',async()=>{
 setAccountEnvForTests(env());
 assert.equal((await modelPut(await request('/api/account/model',{method:'PUT',body:form()}))).status,401);
 assert.equal((await modelPut(await request('/api/account/model',{method:'PUT',body:form(),user:ada,origin:'https://evil.example'}))).status,403);
 assert.equal((await modelPut(await request('/api/account/model',{method:'PUT',body:form(),user:ada,origin:null}))).status,403);
 assert.equal((await accountDelete(await request('/api/account',{method:'DELETE',user:ada,origin:'https://evil.example'}))).status,403);
 assert.deepEqual(await (await modelPut(await request('/api/account/model',{method:'PUT',user:ada,body:form({baseUrl:'http://10.0.0.1/v1'})}))).json(),{error:'endpoint'});
 assert.deepEqual(await (await modelPut(await request('/api/account/model',{method:'PUT',user:ada,body:{...form(),fastModel:''}}))).json(),{error:'invalid'});
 assert.deepEqual(await (await modelPut(await request('/api/account/model',{method:'PUT',user:grace,body:form({apiKey:''})}))).json(),{error:'key-required'});
 const saved=await modelPut(await request('/api/account/model',{method:'PUT',user:ada,body:form({baseUrl:'https://relay.example.com/v1/chat/completions',effort:'low'})}));
 const text=await saved.text();assert.equal(saved.status,200);assert.ok(!text.includes(KEY)&&text.includes('"keyHint":"abcd"')&&text.includes('"baseUrl":"https://relay.example.com/v1"'));
 const me=await accountGet(await request('/api/account',{user:ada}));const body=await me.text();
 assert.ok(body.includes('"login":"Ada"')&&body.includes('"effort":"low"')&&!body.includes(KEY)&&!body.includes('api_key'));assert.equal(me.headers.get('cache-control'),'no-store');
 assert.deepEqual(await (await accountGet(await request('/api/account',{user:grace}))).json(),{available:true,user:{login:'grace',name:'',avatarUrl:''},model:null});
 assert.deepEqual(await (await accountGet(await request('/api/account'))).json(),{available:true,user:null,model:null});
 // A saved key can be reused to list models only against the endpoint it was saved for.
 assert.deepEqual(await (await modelsPost(await request('/api/account/models',{method:'POST',user:ada,body:{provider:'openai',baseUrl:'https://other.example.com/v1',apiKey:''}}))).json(),{error:'key-required'});
 assert.equal((await modelsPost(await request('/api/account/models',{method:'POST',body:{provider:'openai',baseUrl:'https://relay.example.com/v1',apiKey:KEY}}))).status,401);
 assert.ok((await logout(await request('/api/auth/logout',{method:'POST',user:ada}))).headers.get('set-cookie')!.includes('Max-Age=0'));
 assert.deepEqual(chatModels(['gpt-x','text-embedding-3','whisper-1','gpt-x','claude-y','tts-1','dall-e-3']),['claude-y','gpt-x']);
});

test('sign-in checks the returned state and the allow-list before anything is stored',async()=>{
 setAccountEnvForTests(env());
 const start=await login(await request('/api/auth/login'));const to=new URL(start.headers.get('location')!);
 assert.equal(to.origin+to.pathname,'https://github.com/login/oauth/authorize');assert.equal(to.searchParams.get('redirect_uri'),ORIGIN+'/api/auth/callback');assert.equal(to.searchParams.get('scope'),null);
 const state=to.searchParams.get('state')!,stateCookie=cookieValue(start.headers.get('set-cookie')!);assert.ok(state.length>=24&&stateCookie===`${STATE_COOKIE}=${state}`);
 const outcome=async(query:string,cookie?:string)=>{const r=await callback(await request('/api/auth/callback?'+query,{cookie}));return {to:r.headers.get('location')!.split('account=')[1],cookies:r.headers.getSetCookie().join('\n')};};
 const real=globalThis.fetch;let calls=0;let profile:object={id:7,login:'Mallory',name:'M',avatar_url:'https://avatars.example/7'};
 globalThis.fetch=(async(input:RequestInfo|URL,init?:RequestInit)=>{calls++;const url=String(input);
  if(url==='https://github.com/login/oauth/access_token'){assert.ok(String(init?.body).includes('"code":"good"')&&String(init?.body).includes('csecret'));return Response.json({access_token:'gho_once'});}
  if(url==='https://api.github.com/user'){assert.equal(new Headers(init?.headers).get('authorization'),'Bearer gho_once');return Response.json(profile);}
  throw new Error('unexpected fetch '+url);}) as typeof fetch;
 try{
  assert.equal((await outcome('code=good&state=wrong',stateCookie)).to,'failed');assert.equal((await outcome('code=good&state='+state)).to,'failed');assert.equal((await outcome('error=access_denied',stateCookie)).to,'cancelled');assert.equal(calls,0,'GitHub is not contacted until the state matches');
  const refused=await outcome(`code=good&state=${state}`,stateCookie);assert.equal(refused.to,'not-invited');assert.ok(!refused.cookies.includes(SESSION_COOKIE+'=ey')&&!refused.cookies.includes(SESSION_COOKIE+'=e'));
  assert.equal(await accountStore(db,SECRET).user(7),null,'an uninvited account leaves no row');
  profile={id:3,login:'GRACE',name:null,avatar_url:'javascript:alert(1)'};
  const ok=await outcome(`code=good&state=${state}`,stateCookie);assert.equal(ok.to,'signed-in');assert.ok(ok.cookies.includes(SESSION_COOKIE+'=')&&ok.cookies.includes(`${STATE_COOKIE}=;`));
  assert.deepEqual(await accountStore(db,SECRET).user(3),{id:3,login:'GRACE',name:'',avatarUrl:''});
  const user=await exchangeCode({clientId:'a',clientSecret:'b'},'good','x',(async()=>Response.json({error:'bad_verification_code'})) as unknown as typeof fetch).catch(e=>e);assert.ok(user instanceof Error);
 }finally{globalThis.fetch=real;}
});

test('a signed-in person is served by their own endpoint, key, models and effort; errors never echo the key',async()=>{
 const seen:{path:string;auth?:string;body:Record<string,unknown>}[]=[];let fail=false;
 const read=(req:IncomingMessage)=>new Promise<string>(resolve=>{let text='';req.on('data',c=>text+=c);req.on('end',()=>resolve(text));});
 const server=createServer(async(req,res)=>{
  if(req.url==='/v1/models'){res.setHeader('content-type','application/json');res.end(JSON.stringify({data:[{id:'fast-1'},{id:'smart-1'},{id:'text-embedding-3'}]}));return;}
  seen.push({path:req.url!,auth:req.headers.authorization,body:JSON.parse(await read(req))});res.setHeader('content-type','application/json');
  if(fail){res.statusCode=401;res.end(JSON.stringify({error:{message:`Incorrect API key provided: ${KEY}`,type:'invalid_request_error',code:'invalid_api_key'}}));return;}
  res.end(JSON.stringify({choices:[{message:{content:'Restate her concern first.'}}]}));
 });
 await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${(server.address() as {port:number}).port}/v1`;
 try{
  const active=env({allowInsecureEndpoints:true});setAccountEnvForTests(active);
  assert.equal((await modelPut(await request('/api/account/model',{method:'PUT',user:ada,body:form({baseUrl:base,effort:'high'})},active))).status,200);
  assert.deepEqual(await (await modelsPost(await request('/api/account/models',{method:'POST',user:ada,body:{provider:'openai',baseUrl:base,apiKey:''}},active))).json(),{models:['fast-1','smart-1']});
  assert.deepEqual(await (await health(await request('/api/health?retry=1',{user:ada},active))).json(),{serverKey:true,requireByok:false,account:true,state:'available'});
  const scenario=SCENARIOS.find(s=>s.id==='dinner-vc-is-there-a-company')!,session=buildSession(scenario,'arena','en');
  const turn={scenario:session.scenario,learnerCharacterId:'you',messages:[...session.messages,{id:'l1',role:'learner',text:'I work on evaluation for video models.',ts:1}],lang:'en'};
  const mine=await hint(await request('/api/hint',{method:'POST',user:ada,body:turn},active));
  assert.deepEqual(await mine.json(),{hint:'Restate her concern first.'});
  assert.equal(seen.length,1);assert.equal(seen[0].path,'/v1/chat/completions');assert.equal(seen[0].auth,`Bearer ${KEY}`);assert.equal(seen[0].body.model,'fast-1');assert.equal(seen[0].body.reasoning_effort,'high');assert.equal(seen[0].body.max_tokens,800);
  // Someone else on the allow-list with nothing saved does not ride on Ada's key.
  const other=await hint(await request('/api/hint',{method:'POST',user:grace,body:turn},active));assert.equal(other.status,503);assert.equal(seen.length,1);
  const anonymous=await hint(await request('/api/hint',{method:'POST',body:turn},active));assert.equal(anonymous.status,503);assert.equal(seen.length,1);
  fail=true;const refused=await hint(await request('/api/hint',{method:'POST',user:ada,body:turn},active));const text=await refused.text();
  assert.equal(refused.status,401);assert.ok(!text.includes(KEY)&&text.includes('"modelIssue":"credentials"'),text);
  assert.equal((await modelDelete(await request('/api/account/model',{method:'DELETE',user:ada},active))).status,200);
  assert.equal((await requestModel(await request('/api/hint',{method:'POST',user:ada},active))).source,'server');
  const gone=await accountDelete(await request('/api/account',{method:'DELETE',user:ada},active));assert.ok(gone.headers.get('set-cookie')!.includes('Max-Age=0'));
  assert.equal(await active.store.user(ada.id),null);assert.equal(db.raw.prepare('SELECT COUNT(*) AS n FROM model_configs WHERE user_id=1').get()!.n,0);
  const stale=await accountGet(await request('/api/account',{user:ada},active));assert.deepEqual(await stale.json(),{available:true,user:null,model:null});assert.ok(stale.headers.get('set-cookie')!.includes('Max-Age=0'));
 }finally{server.close();}
});
