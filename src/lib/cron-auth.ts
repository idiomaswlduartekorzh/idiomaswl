import { timingSafeEqual } from 'node:crypto';

export function isAuthorizedCronRequest(authorization:string|null,secret:string|undefined):boolean {
  if(!secret||secret.length<16||!authorization)return false;
  const expected=`Bearer ${secret}`;
  return authorization.length===expected.length
    && timingSafeEqual(Buffer.from(authorization),Buffer.from(expected));
}
