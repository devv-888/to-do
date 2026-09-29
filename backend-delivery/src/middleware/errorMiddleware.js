import { fail } from '../utils/response.js';
export const notFound = (req,res) => fail(res,404,'Resource not found','NOT_FOUND');
export const errorHandler = (err,req,res,next) => { console.error(`[${new Date().toISOString()}] ${err.message}`); fail(res, err.status || 500, err.expose ? err.message : 'Something went wrong','INTERNAL_ERROR'); };
