'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {formatCOP,objectiveLabel,LANGUAGES,PLANS,type Selection} from '@/lib/course-pricing/catalog';
import styles from '../precios/course-pricing.module.css';
type Order={id:string;reference:string;selection:Selection;amountInCents:number;classes:number;sessions:number;expiresAt:string;acceptedAt:string;signedBy:string|null;termsVersion:string;legalSnapshot:string|null};
type Result={order?:Order;status?:string;message?:string};
export default function CourseOrderClient({orderId,transactionId}:{orderId:string|null;transactionId:string|null}) {
  const [result,setResult]=useState<Result>({}),[message,setMessage]=useState('Consultando…'),[busy,setBusy]=useState(true),[login,setLogin]=useState(false);
  const [orders,setOrders]=useState<{id:string;created_at:string;amount_in_cents:number}[]>([]);
  const verified=useRef(false);
  const load=useCallback(async()=>{
    try {
      if(orderId&&transactionId&&!verified.current){
        const check=await fetch(`/api/course-orders/${encodeURIComponent(orderId)}/verify`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({transactionId})});
        if(check.ok)verified.current=true;
        else if(check.status!==401){const data=await check.json();setMessage(data.message);return;}
      }
      const response=await fetch(orderId?'/api/course-orders/'+encodeURIComponent(orderId):'/api/course-orders',{cache:'no-store'});
      const data=await response.json();setLogin(response.status===401);
      if(!response.ok)throw new Error(data.message||'No podemos consultar ahora.');
      if(orderId)setResult(data);else setOrders(data.orders);
      setMessage('');
    }catch(error){setMessage(error instanceof Error?error.message:'No podemos consultar el pago. No pagues de nuevo.');}
    finally{setBusy(false);}
  },[orderId,transactionId]);
  // load updates state after network requests; useState supplies the initial loading state.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{void load();},[load]);
  async function pay(){
    setBusy(true);setMessage('Preparando Wompi…');
    try{
      const response=await fetch(`/api/course-orders/${encodeURIComponent(orderId!)}/checkout`,{method:'POST'});
      const data=await response.json();
      if(!response.ok)throw new Error(data.message);
      if(data.checkoutUrl){window.location.assign(data.checkoutUrl);return;}
      setResult(r=>({...r,status:data.status}));setMessage(data.status==='expired'?'La ventana de pago venció. Contacta a WeLearn para revisar la inscripción antes de crear otra.':'Consulta el estado de tu inscripción antes de continuar.');
    }catch(error){setMessage(error instanceof Error?error.message:'No pudimos preparar Wompi.');}
    finally{setBusy(false);}
  }
  const labels:Record<string,string>={created:'Inscripción guardada',paid:'Tu pago está confirmado',pending:'Wompi está procesando tu pago',not_completed:'El pago no se completó',review:'Tu pago necesita revisión',expired:'Ventana de pago vencida'};
  const order=result.order;
  let acceptedSections:{title:string;text:string}[]=[];
  if(order?.legalSnapshot){try{const snapshot=JSON.parse(order.legalSnapshot);if(Array.isArray(snapshot.sections))acceptedSections=snapshot.sections;}catch{}}
  return <div className={styles.page}><div className={styles.wrap}><section className={styles.review}>
    <p className={styles.eyebrow}>WELEARN · INSCRIPCIONES</p><h1>{order?labels[result.status??'created']:'Mis inscripciones'}</h1>
    {order&&<><p>{LANGUAGES.find(l=>l.id===order.selection.language)?.name} · {objectiveLabel(order.selection.objective)} · {PLANS.find(p=>p.id===order.selection.plan)?.name??order.selection.plan}</p>
      <p className={styles.total}>{formatCOP(order.amountInCents/100)} <small>COP</small></p><p>{order.classes} clases de 100 minutos · {order.sessions} sesiones · cuatro semanas.</p>
      <p className={styles.small}>Referencia: {order.reference}</p>
      {!!acceptedSections.length&&<details><summary>Condiciones que aceptaste</summary><p>Versión {order.termsVersion} · {new Date(order.acceptedAt).toLocaleString('es-CO')}{order.signedBy?` · Firmado electrónicamente por ${order.signedBy}`:''}</p>{acceptedSections.map(s=><section key={s.title}><h3>{s.title}</h3><p>{s.text}</p></section>)}</details>}
      {result.status==='paid'?<p>Ahora coordinamos contigo el horario de tus clases. El pago está registrado; no necesitas volver a pagar.</p>:null}
      {result.status==='pending'||result.status==='review'?<p>Conservamos tu inscripción. No hagas otro pago mientras revisamos el actual.</p>:null}
      {['created','not_completed'].includes(result.status??'')&&<button className={styles.primary} disabled={busy} onClick={pay}>Pagar con Wompi</button>}
      <a href={'https://wa.me/573005004253?text='+encodeURIComponent('Hola, quiero consultar mi inscripción '+order.reference)} target="_blank" rel="noopener noreferrer">Consultar con WeLearn</a>
    </>}
    {!orderId&&orders.map(o=><p key={o.id}><a href={'/inscripcion?orden='+o.id}>{new Date(o.created_at).toLocaleDateString('es-CO')} · {formatCOP(o.amount_in_cents/100)} COP</a></p>)}
    {!orderId&&!orders.length&&!message&&!login&&<p>Aún no tienes inscripciones guardadas.</p>}
    <p role="status">{message}</p>
    {login?<a className={styles.primary} href={'/login?next='+encodeURIComponent(orderId?'/inscripcion?orden='+orderId+(transactionId?'&id='+encodeURIComponent(transactionId):''):'/inscripcion')}>Iniciar sesión</a>:<button type="button" disabled={busy} onClick={()=>{setBusy(true);setMessage('Consultando…');void load();}}>Actualizar estado</button>}
    <p><a href="/precios">Ver planes</a></p>
  </section></div></div>;
}
