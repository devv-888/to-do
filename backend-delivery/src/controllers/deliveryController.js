import * as s from '../services/deliveryService.js';import { ok } from '../utils/response.js';
export const list=async(req,res,next)=>{try{ok(res,{deliveries:await s.listDeliveries(req.user)})}catch(e){next(e)}};
export const update=async(req,res,next)=>{try{ok(res,{delivery:await s.updateDelivery(req.params.deliveryId,req.validated.body.status,req.user)},'Delivery updated')}catch(e){next(e)}};
export const assign=async(req,res,next)=>{try{ok(res,{delivery:await s.assign(req.validated.body.order_id,req.validated.body.delivery_agent_id)},'Delivery assigned',201)}catch(e){next(e)}};
