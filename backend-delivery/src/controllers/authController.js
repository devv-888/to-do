import * as service from '../services/authService.js';import { signToken } from '../utils/jwt.js';import { ok } from '../utils/response.js';
export const register=async(req,res,next)=>{try{const user=await service.register(req.validated.body);ok(res,{user,token:signToken(user)},'Account created',201)}catch(e){next(e)}};
export const login=async(req,res,next)=>{try{const user=await service.login(req.validated.body.email,req.validated.body.password);ok(res,{user,token:signToken(user)},'Welcome back')}catch(e){next(e)}};
export const me=async(req,res,next)=>{try{ok(res,{user:await service.getUser(req.user.id)})}catch(e){next(e)}};
