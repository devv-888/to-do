import * as s from '../services/trackingService.js';import { ok } from '../utils/response.js';
export const update=async(req,res,next)=>{try{ok(res,{location:await s.addLocation(req.params.deliveryId,req.validated.body,req.user)},'Location received',201)}catch(e){next(e)}};
export const get=async(req,res,next)=>{try{ok(res,{delivery:await s.getTracking(req.params.deliveryId,req.user)})}catch(e){next(e)}};
