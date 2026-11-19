import type {Metadata} from 'next';
import CourseOrderClient from './CourseOrderClient';
import { epaycoCourseAvailable } from '@/lib/course-pricing/epayco.server';
export const metadata:Metadata={title:'Mi inscripción | WeLearn',robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const params=await searchParams;
  return <CourseOrderClient orderId={typeof params.orden==='string'?params.orden:null} transactionId={typeof params.id==='string'?params.id:null}
    epaycoReference={typeof params.ref_payco==='string'?params.ref_payco:null} epaycoReturned={params.epayco_retorno==='1'}
    epaycoAvailable={epaycoCourseAvailable()}/>;
}
