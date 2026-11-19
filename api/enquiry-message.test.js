import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prepareEnquiry } from './enquiry-message.js';
import { sendEnquiry } from '../src/lib/enquiries.js';

test('contact mail has fixed recipient and visitor reply address', () => {
 const result=prepareEnquiry({type:'contact',fullName:'Visitor',email:'visitor@example.com',message:'Hello',enquiryType:'general',to:'attacker@example.com'});
 assert.equal(result.to,'hello@monkeytribe.in'); assert.equal(result.replyTo,'visitor@example.com');assert.match(result.text,/Hello/);
});
test('course mail includes the selected course and details',()=>{
 const result=prepareEnquiry({type:'course',name:'Visitor',email:'visitor@example.com',course:'PromptX',goals:'Learn AI'});
 assert.match(result.subject,/PromptX/);assert.match(result.text,/Learn AI/);
});
test('invalid enquiries and header injection are rejected',()=>{
 for(const data of [{},{type:'course',name:'Visitor',email:'visitor@example.com'},{type:'contact',name:'Visitor',email:'visitor@example.com'},{type:'course',name:'Bad\r\nBcc: other@example.com',email:'visitor@example.com',course:'PromptX'}])assert.throws(()=>prepareEnquiry(data));
});
test('client only succeeds for acknowledged email requests',async()=>{
 const original=globalThis.fetch;
 try {
  globalThis.fetch=async()=>({ok:true,json:async()=>({success:true})});assert.equal(await sendEnquiry({}),true);
  globalThis.fetch=async()=>({ok:false,json:async()=>({error:'failed'})});await assert.rejects(sendEnquiry({}));
  globalThis.fetch=async()=>({ok:true,json:async()=>{throw new Error('HTML');}});await assert.rejects(sendEnquiry({}));
 }finally {globalThis.fetch=original;}
});

test('programme email includes programme, phone and message', () => {
 const result=prepareEnquiry({type:'programme',fullName:'Visitor',email:'visitor@example.com',programme:'ai-immersion',phone:'9876543210',message:'Interested in retreat'});
 assert.equal(result.to,'hello@monkeytribe.in');assert.match(result.subject,/ai-immersion/);assert.match(result.text,/9876543210/);assert.match(result.text,/Interested in retreat/);
 assert.throws(()=>prepareEnquiry({type:'programme',name:'Visitor',email:'visitor@example.com'}));
 assert.throws(()=>prepareEnquiry({type:'programme',name:'Visitor',email:'visitor@example.com',programme:'bad\r\nBcc: other@example.com'}));
});
test('webinar email includes profession and selected topics', () => {
 const result=prepareEnquiry({type:'webinar',name:'Visitor',email:'visitor@example.com',profession:'Designer',topics:'AI Marketing, Brand Strategy'});
 assert.equal(result.subject,'Webinar notification request');assert.match(result.text,/Designer/);assert.match(result.text,/AI Marketing, Brand Strategy/);
});
test('webinar submission converts selected topics to readable email details', async()=>{
 const {saveWebinarInterest}=await import('../src/lib/enquiries.js');
 const original=globalThis.fetch;
 try{
  let sent;
  globalThis.fetch=async(_url,options)=>{sent=JSON.parse(options.body);return {ok:true,json:async()=>({success:true})};};
  await saveWebinarInterest({name:'Visitor',email:'visitor@example.com',topics:{aiMarketing:true,aiTools:false,brandStrategy:true}});
  assert.equal(sent.type,'webinar');assert.equal(sent.topics,'AI Marketing, Brand Strategy');
 }finally{globalThis.fetch=original;}
});
