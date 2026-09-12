import { recoverCoursePayments } from '@/lib/course-pricing/payments.server';
import { isAuthorizedCronRequest } from '@/lib/cron-auth';
import { recoverXpressPayments } from '@/lib/xpress-commerce/payments.server';
import { processDueXpressSubscriptions } from '@/lib/xpress-commerce/subscriptions.server';
import { recoverIcfesPayments } from '@/lib/icfes/payment-events.server';

export const runtime='nodejs';
export const maxDuration=120;

export async function GET(request:Request):Promise<Response>{
  if(!isAuthorizedCronRequest(request.headers.get('authorization'),process.env.CRON_SECRET)){
    return Response.json({ok:false,code:'unauthorized'},{status:401,headers:{'Cache-Control':'no-store'}});
  }
  try{
    const [courses,xpress,subscriptions,icfes]=await Promise.all([recoverCoursePayments(),recoverXpressPayments(),processDueXpressSubscriptions(4),recoverIcfesPayments()]);
    return Response.json({ok:true,courses,xpress,subscriptions,icfes},{headers:{'Cache-Control':'no-store'}});
  }catch{
    return Response.json({ok:false,code:'recovery_failed'},{status:503,headers:{'Cache-Control':'no-store'}});
  }
}
