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
