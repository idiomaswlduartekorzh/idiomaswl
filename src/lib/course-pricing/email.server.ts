import 'server-only';

function emailConfig() {
  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.COURSE_FROM_EMAIL;
  if(!apiKey || !from)throw new Error('course_email_not_configured');
  return {apiKey,from};
}

export function escapeEmailHtml(value:unknown) {
  return String(value??'').replace(/[&<>"']/g,character=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[character]!);
}

export async function sendCourseEmail(input:{to:string;subject:string;html:string;idempotencyKey:string}) {
  const {apiKey,from}=emailConfig();
  const response=await fetch('https://api.resend.com/emails',{
    method:'POST',
    headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','Idempotency-Key':input.idempotencyKey},
    body:JSON.stringify({from,to:[input.to],subject:input.subject,html:input.html}),
    signal:AbortSignal.timeout(10000),
  });
  if(!response.ok)throw new Error(`course_email_failed_${response.status}`);
}
