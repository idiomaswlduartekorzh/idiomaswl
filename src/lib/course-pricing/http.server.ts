import 'server-only';
import { isCourseRequestOrigin } from './payment';
export const json=(body:unknown,status=200,headers?:HeadersInit)=>Response.json(body,{status,headers:{'Cache-Control':'no-store',...Object.fromEntries(new Headers(headers))}});
export function sameOrigin(request:Request) { return isCourseRequestOrigin(request.headers.get('origin'),request.headers.get('host'),process.env.VERCEL_ENV); }
export function validOrderId(id:string) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id); }
export async function readBody(request:Request) {
  if(!request.headers.get('content-type')?.startsWith('application/json')) throw new Error('invalid_body');
  const text=await request.text();if(new TextEncoder().encode(text).length>4096)throw new Error('invalid_body');
  return JSON.parse(text);
}
