import test from 'node:test';import assert from 'node:assert/strict';import { login } from '../src/services/authService.js';import { db } from '../src/models/store.js';import { updateDelivery } from '../src/services/deliveryService.js';
test('login rejects wrong password',async()=>await assert.rejects(()=>login('customer@demo.local','wrong-password')));
test('agent can complete an active delivery through valid transition',()=>{const d=db.deliveries[0];const agent=db.users.find(u=>u.id===d.delivery_agent_id);assert.equal(updateDelivery(d.id,'DELIVERED',agent).status,'DELIVERED')});
