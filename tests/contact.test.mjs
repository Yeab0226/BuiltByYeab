import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';
const valid = { name: 'Portfolio visitor', email: 'visitor@example.org', message: 'I would like to discuss a website.', website: '' };
async function invoke(body = valid, options = {}) {
  const req = { method: 'POST', headers: { 'content-type': 'application/json', host: 'portfolio.example.org', origin: 'https://portfolio.example.org' }, body, ...options };
  const res = { code: 200, headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(c) { this.code=c; return this; }, json(v) { this.body=v; return this; } };
  await handler(req,res); return res;
}
test('contact delivery contract and failures', async (t) => {
  const originalFetch=global.fetch;
  const key=process.env.RESEND_API_KEY;
  const to=process.env.CONTACT_TO_EMAIL;
  const from=process.env.CONTACT_FROM_EMAIL;
  let calls=0, payload;
  process.env.RESEND_API_KEY='test-key';
  delete process.env.CONTACT_TO_EMAIL; delete process.env.CONTACT_FROM_EMAIL;
  global.fetch=async (url, init)=> { calls++; assert.equal(url,'https://api.resend.com/emails'); payload=JSON.parse(init.body); return {ok:true,json:async()=>({id:'mock-id'})}; };
  try {
    await t.test('sends only to owner and sets visitor reply address',async()=>{
      const result=await invoke({...valid,to:'attacker@example.org'});
      assert.equal(result.code,200); assert.equal(result.body.success,true);
      assert.deepEqual(payload.to,['Yabsiraalemayehu@gmail.com']); assert.equal(payload.reply_to,valid.email);
    });
    await t.test('rejects invalid values and header injection without sending',async()=>{
      const before=calls;
      for(const body of [{...valid,email:'bad'},{...valid,message:' '},{...valid,name:'a\nb'},{...valid,message:'a'.repeat(5001)},null,'{']) assert.equal((await invoke(body)).code,400);
      assert.equal(calls,before);
    });
    await t.test('honeypot skips delivery',async()=>{const before=calls; assert.equal((await invoke({...valid,website:'spam'})).code,200);assert.equal(calls,before);});
    await t.test('rejects unsupported methods and cross-origin calls',async()=>{
      assert.equal((await invoke(valid,{method:'GET'})).code,405);
      assert.equal((await invoke(valid,{headers:{'content-type':'application/json',host:'portfolio.example.org',origin:'https://other.example.org'}})).code,403);
      assert.equal((await invoke(valid,{headers:{'content-type':'text/plain'}})).code,415);
    });
    await t.test('missing key never reports success',async()=>{delete process.env.RESEND_API_KEY;assert.equal((await invoke()).code,503);process.env.RESEND_API_KEY='test-key';});
    await t.test('provider rejection and network failure never report success',async()=>{
      global.fetch=async()=>({ok:false,status:403,json:async()=>({message:'Denied'})}); assert.equal((await invoke()).code,502);
      global.fetch=async()=>{throw Error('offline');}; assert.equal((await invoke()).code,502);
    });
  } finally {
    global.fetch=originalFetch;
    for(const [k,v] of [['RESEND_API_KEY',key],['CONTACT_TO_EMAIL',to],['CONTACT_FROM_EMAIL',from]]) if(v===undefined) delete process.env[k]; else process.env[k]=v;
  }
});
