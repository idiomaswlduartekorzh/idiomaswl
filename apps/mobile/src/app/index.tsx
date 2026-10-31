import { useCallback, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  ActivityIndicator, Alert, Image, KeyboardAvoidingView, Linking, Platform,
  Pressable, RefreshControl, ScrollView, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QuickPractice } from '@/components/QuickPractice';
import { QUICK_PRACTICE, type LanguageSlug } from '@/data/quick-practice';
import { loadPracticeHistory, recordPracticeDay, savePracticeAttempt, type PracticeAttempt } from '@/lib/practice-history';
import { loadStudentSnapshot, type StudentAssignment, type StudentSnapshot } from '@/lib/student';
import { isConfigured, supabase } from '@/lib/supabase';
import { s, palette } from '@/styles';

const SITE = 'https://www.idiomaswl.com';
type Tab = 'inicio' | 'practicar' | 'perfil';

const practice = [
  { title: 'Inglés', detail: 'Gramática, vocabulario y escucha', path: '/practica/ingles', mark: 'EN' },
  { title: 'Coreano', detail: 'Lectura, escritura y pronunciación', path: '/practica/coreano', mark: 'KO' },
  { title: 'Francés', detail: 'Ejercicios por nivel', path: '/practica/frances', mark: 'FR' },
  { title: 'Alemán', detail: 'Practica a tu ritmo', path: '/practica/aleman', mark: 'DE' },
  { title: 'Italiano', detail: 'Aprende con práctica guiada', path: '/practica/italiano', mark: 'IT' },
  { title: 'Portugués', detail: 'Actividades y retos', path: '/practica/portugues', mark: 'PT' },
  { title: 'Japonés', detail: 'Fundamentos y práctica', path: '/practica/japones', mark: 'JA' },
  { title: 'Ruso', detail: 'Práctica por destreza', path: '/practica/ruso', mark: 'RU' },
] as const;

const exams = [
  { title: 'IELTS', detail: 'Reading, Writing, Listening y Speaking', path: '/practica/ielts' },
  { title: 'TOEFL', detail: 'Preparación para cada sección', path: '/practica/toefl' },
  { title: 'ICFES', detail: 'Inglés Saber 11', path: '/practica/icfes' },
] as const;

async function openUrl(url: string) {
  if (!url.startsWith('https://')) {
    Alert.alert('Enlace no disponible', 'Este recurso no tiene una dirección segura.');
    return;
  }
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('No se pudo abrir la página', 'Revisa tu conexión e inténtalo de nuevo.');
  }
}

function openWebsite(path: string) { return openUrl(`${SITE}${path}`); }
function openResource(resource: string) {
  return openUrl(resource.startsWith('/') ? `${SITE}${resource}` : resource);
}

function Action({ label, onPress, secondary = false, disabled = false }: {
  label: string; onPress: () => void; secondary?: boolean; disabled?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress}
      style={({ pressed }) => [s.action, secondary && s.actionSecondary, disabled && s.disabled, pressed && s.pressed]}>
      <Text style={[s.actionText, secondary && s.actionTextSecondary]}>{label}</Text>
    </Pressable>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return <View style={s.sectionHeading}>
    <Text style={s.sectionTitle}>{title}</Text>
    {subtitle ? <Text style={s.sectionSubtitle}>{subtitle}</Text> : null}
  </View>;
}

function Assignment({ item, onSubmitted }: { item: StudentAssignment; onSubmitted: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [submission, setSubmission] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const due = item.due_at ? new Date(item.due_at).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'short', year: 'numeric',
  }) : null;
  async function submit() {
    if (!supabase || !submission.trim()) { setError('Escribe tu respuesta antes de enviar.'); return; }
    setBusy(true); setError('');
    try {
      const { data, error: submitError } = await supabase.rpc('submit_student_assignment', {
        p_assignment_id: item.id, p_submission_text: submission.trim(), p_submission_url: null,
      });
      if (submitError || !data) throw submitError ?? new Error('Tarea no disponible');
      setExpanded(false); setSubmission(''); onSubmitted();
    } catch {
      setError('No pudimos enviar la tarea. Revisa tu conexión e inténtalo de nuevo.');
    } finally { setBusy(false); }
  }
  return <View style={s.listCard}>
    <View style={s.rowBetween}>
      <Text style={s.listTitle}>{item.title}</Text>
      <Text style={[s.badge, item.status === 'completed' && s.badgeDone]}>
        {item.status === 'completed' ? 'Completada' : 'Pendiente'}
      </Text>
    </View>
    {item.instructions ? <Text style={s.listDetail} numberOfLines={3}>{item.instructions}</Text> : null}
    {due ? <Text style={s.meta}>Entrega: {due}</Text> : null}
    {item.resource_url ? <Pressable accessibilityRole="link" onPress={() => void openResource(item.resource_url!)}>
      <Text style={s.inlineLink}>Abrir recurso  ↗</Text>
    </Pressable> : null}
    {item.status === 'completed' ? <>
      {item.submission_text ? <Text style={s.listDetail}>Tu entrega: {item.submission_text}</Text> : null}
      {item.teacher_feedback ? <View style={s.quizFeedback}><Text style={s.listTitle}>Comentarios del profesor</Text>
        <Text style={s.listDetail}>{item.teacher_feedback}</Text></View> : null}
    </> : <>
      <Pressable accessibilityRole="button" onPress={() => setExpanded(!expanded)}>
        <Text style={s.inlineLink}>{expanded ? 'Cerrar respuesta' : 'Responder tarea'}</Text>
      </Pressable>
      {expanded ? <>
        <Text style={s.inputLabel}>Tu respuesta</Text>
        <TextInput style={[s.input, s.multilineInput]} multiline maxLength={12000} value={submission}
          onChangeText={setSubmission} placeholder="Escribe tu entrega" placeholderTextColor="#8b98ae" />
        {error ? <Text accessibilityRole="alert" style={s.error}>{error}</Text> : null}
        <Action label={busy ? 'Enviando…' : 'Enviar tarea'} onPress={() => void submit()} disabled={busy} />
      </> : null}
    </>}
  </View>;
}

function Login({ onSignedIn }: { onSignedIn: (user: User) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!supabase) return;
    if (!email.trim() || !password) { setError('Escribe tu correo y contraseña.'); return; }
    setBusy(true);
    setError('');
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(), password,
      });
      if (signInError || !data.user) {
        setError('No pudimos iniciar sesión. Comprueba tus datos e inténtalo de nuevo.');
        return;
      }
      onSignedIn(data.user);
    } catch {
      setError('No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setBusy(false);
    }
  };

  return <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={s.loginScroll} keyboardShouldPersistTaps="handled">
      <Image source={require('../../assets/images/icon.png')} style={s.logo} resizeMode="contain" />
      <Text style={s.eyebrow}>IDIOMAS WELEARN</Text>
      <Text style={s.loginTitle}>Aprende en serio.{"\n"}Desde donde estés.</Text>
      <Text style={s.loginDescription}>Entra con la misma cuenta que usas en idiomaswl.com.</Text>
      <View style={s.loginCard}>
        <Text style={s.inputLabel}>Correo electrónico</Text>
        <TextInput style={s.input} value={email} onChangeText={setEmail}
          placeholder="tucorreo@ejemplo.com" placeholderTextColor="#8b98ae"
          keyboardType="email-address" autoCapitalize="none" autoComplete="email"
          textContentType="emailAddress" returnKeyType="next" />
        <Text style={s.inputLabel}>Contraseña</Text>
        <TextInput style={s.input} value={password} onChangeText={setPassword}
          placeholder="Tu contraseña" placeholderTextColor="#8b98ae"
          secureTextEntry autoComplete="current-password" textContentType="password"
          onSubmitEditing={() => void submit()} />
        {error ? <Text accessibilityRole="alert" style={s.error}>{error}</Text> : null}
        <Action label={busy ? 'Entrando…' : 'Entrar a mi espacio'} onPress={() => void submit()} disabled={busy} />
      </View>
      <Pressable accessibilityRole="link" onPress={() => void openWebsite('/login')}>
        <Text style={s.loginLink}>Crear cuenta o recuperar contraseña ↗</Text>
      </Pressable>
    </ScrollView>
  </KeyboardAvoidingView>;
}

function Home({ name, snapshot, busy, error, onRetry, onPractice }: {
  name: string; snapshot: StudentSnapshot | null; busy: boolean; error: boolean;
  onRetry: () => void; onPractice: () => void;
}) {
  const pending = snapshot?.assignments.filter((item) => item.status !== 'completed') ?? [];
  return <>
    <View style={s.hero}>
      <Text style={s.heroEyebrow}>TU CAMINO CONTINÚA</Text>
      <Text style={s.heroTitle}>Hola, {name}.</Text>
      <Text style={s.heroBody}>Cada paso te acerca al idioma que quieres hablar.</Text>
      <Pressable accessibilityRole="button" onPress={onPractice} style={s.heroButton}>
        <Text style={s.heroButtonText}>Empezar a practicar  →</Text>
      </Pressable>
    </View>
    {busy && !snapshot ? <ActivityIndicator style={s.spinner} color={palette.navy} /> : null}
    {error ? <View style={s.notice}>
      <Text style={s.noticeTitle}>No pudimos cargar tus avances</Text>
      <Text style={s.listDetail}>Revisa tu conexión y vuelve a intentarlo.</Text>
      <Action label="Reintentar" onPress={onRetry} secondary />
    </View> : null}
    {snapshot ? <>
      <View style={s.statsRow}>
        <View style={s.statCard}><Text style={s.statNumber}>{snapshot.completedSteps}</Text>
          <Text style={s.statLabel}>pasos completados</Text></View>
        <View style={s.statCard}><Text style={s.statNumber}>{snapshot.activeDays}</Text>
          <Text style={s.statLabel}>días registrados</Text></View>
      </View>
      <SectionTitle title="Tus tareas" subtitle={pending.length ? `${pending.length} por hacer` : 'Vas al día'} />
      {pending.length ? pending.slice(0, 3).map((item) => <Assignment key={item.id} item={item} onSubmitted={onRetry} />)
        : <View style={s.emptyCard}><Text style={s.emptyText}>No tienes tareas pendientes.</Text></View>}
      {snapshot.assignments.some((item) => item.status === 'completed') ? <>
        <SectionTitle title="Tareas entregadas" />
        {snapshot.assignments.filter((item) => item.status === 'completed').slice(0, 3)
          .map((item) => <Assignment key={item.id} item={item} onSubmitted={onRetry} />)}
      </> : null}
      <SectionTitle title="Resultados recientes" />
      {snapshot.results.length ? snapshot.results.map((item) => <View key={item.id} style={s.resultCard}>
        <View style={s.resultDot} />
        <View style={s.flex}>
          <Text style={s.listTitle}>{item.mock_title || item.exam_slug.toUpperCase()}</Text>
          <Text style={s.meta}>{new Date(item.created_at).toLocaleDateString('es-CO')}</Text>
        </View>
        <Text style={s.resultScore}>{item.total_label || 'Ver en web'}</Text>
      </View>) : <View style={s.emptyCard}><Text style={s.emptyText}>Tus simulacros aparecerán aquí.</Text></View>}
    </> : null}
  </>;
}

function Practice({ history, onStart }: { history: PracticeAttempt[]; onStart: (language: LanguageSlug) => void }) {
  return <>
    <Text style={s.pageEyebrow}>APRENDE A TU RITMO</Text>
    <Text style={s.pageTitle}>¿Qué practicarás hoy?</Text>
    <Text style={s.pageIntro}>Responde cinco preguntas A1 dentro de la app.</Text>
    <SectionTitle title="Práctica rápida" subtitle="Disponible en ocho idiomas" />
    {QUICK_PRACTICE.map((item) => <Pressable key={item.slug} accessibilityRole="button"
      onPress={() => onStart(item.slug)} style={({ pressed }) => [s.practiceCard, pressed && s.pressed]}>
      <View style={s.languageMark}><Text style={s.languageMarkText}>{item.code}</Text></View>
      <View style={s.flex}><Text style={s.listTitle}>{item.title}</Text><Text style={s.listDetail}>5 preguntas · Nivel A1</Text></View>
      <Text style={s.chevron}>›</Text>
    </Pressable>)}
    <SectionTitle title="Mis prácticas recientes" />
    {history.length ? history.slice(0, 5).map((item) => <View key={item.id} style={s.resultCard}>
      <View style={s.resultDot} /><View style={s.flex}>
        <Text style={s.listTitle}>{QUICK_PRACTICE.find((set) => set.slug === item.language)?.title || item.language}</Text>
        <Text style={s.meta}>{new Date(item.completedAt).toLocaleDateString('es-CO')}</Text>
      </View><Text style={s.resultScore}>{item.correct}/{item.total}</Text>
    </View>) : <View style={s.emptyCard}><Text style={s.emptyText}>Aquí verás tus resultados de práctica.</Text></View>}
    <SectionTitle title="Catálogo completo" subtitle="Actividades disponibles en la web" />
    {practice.map((item) => <Pressable key={item.path} accessibilityRole="link"
      onPress={() => void openWebsite(item.path)} style={({ pressed }) => [s.practiceCard, pressed && s.pressed]}>
      <View style={s.languageMark}><Text style={s.languageMarkText}>{item.mark}</Text></View>
      <View style={s.flex}><Text style={s.listTitle}>{item.title}</Text><Text style={s.listDetail}>{item.detail}</Text></View>
      <Text style={s.chevron}>↗</Text>
    </Pressable>)}
    <SectionTitle title="Exámenes" />
    {exams.map((item) => <Pressable key={item.path} accessibilityRole="link"
      onPress={() => void openWebsite(item.path)} style={({ pressed }) => [s.practiceCard, pressed && s.pressed]}>
      <View style={s.examMark}><Text style={s.examMarkText}>✓</Text></View>
      <View style={s.flex}><Text style={s.listTitle}>{item.title}</Text><Text style={s.listDetail}>{item.detail}</Text></View>
      <Text style={s.chevron}>›</Text>
    </Pressable>)}
    <Text style={s.webNote}>El catálogo completo y los exámenes se abren en idiomaswl.com. Puede que debas iniciar sesión en el navegador. Los resultados A1 se guardan solo en este dispositivo.</Text>
  </>;
}

function Profile({ user, snapshot }: { user: User; snapshot: StudentSnapshot | null }) {
  const name = snapshot?.profile?.full_name || 'Estudiante WeLearn';
  return <>
    <Text style={s.pageEyebrow}>MI CUENTA</Text>
    <Text style={s.pageTitle}>Tu perfil</Text>
    <View style={s.profileCard}>
      <View style={s.avatar}><Text style={s.avatarText}>{name[0]?.toUpperCase()}</Text></View>
      <Text style={s.profileName}>{name}</Text>
      <Text style={s.profileEmail}>{user.email}</Text>
    </View>
    <View style={s.detailCard}>
      <Text style={s.detailLabel}>PLAN</Text><Text style={s.detailValue}>{snapshot?.profile?.plan || 'Sin plan asignado'}</Text>
      <View style={s.divider} />
      <Text style={s.detailLabel}>IDIOMA</Text><Text style={s.detailValue}>{snapshot?.profile?.language || 'Aún no definido'}</Text>
      <View style={s.divider} />
      <Text style={s.detailLabel}>NIVEL</Text><Text style={s.detailValue}>{snapshot?.profile?.level || 'Aún no definido'}</Text>
    </View>
    <Action label="Gestionar perfil en la web ↗" onPress={() => void openWebsite('/dashboard/student/perfil')} secondary />
    <Pressable accessibilityRole="button" onPress={() => void supabase?.auth.signOut()} style={s.signOut}>
      <Text style={s.signOutText}>Cerrar sesión</Text>
    </Pressable>
  </>;
}

function Main({ user }: { user: User }) {
  const [tab, setTab] = useState<Tab>('inicio');
  const [quiz, setQuiz] = useState<LanguageSlug | null>(null);
  const [history, setHistory] = useState<PracticeAttempt[]>([]);
  const [snapshot, setSnapshot] = useState<StudentSnapshot | null>(null);
  const [busy, setBusy] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const refresh = useCallback(async (pull = false) => {
    if (!supabase) return;
    if (pull) setRefreshing(true); else setBusy(true);
    try { setSnapshot(await loadStudentSnapshot(supabase, user.id)); setError(false); }
    catch { setError(true); }
    finally { setBusy(false); setRefreshing(false); }
  }, [user.id]);

  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => { void loadPracticeHistory(user.id).then(setHistory).catch(() => setHistory([])); }, [user.id]);
  const name = snapshot?.profile?.full_name?.trim().split(/\s+/)[0] || 'estudiante';

  async function completePractice(correct: number, total: number) {
    if (!quiz) return;
    const attempt: PracticeAttempt = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      language: quiz, correct, total, completedAt: new Date().toISOString(),
    };
    try { setHistory(await savePracticeAttempt(user.id, attempt)); }
    catch { Alert.alert('No se guardó el resultado', 'No pudimos guardar esta práctica en el dispositivo.'); }
    if (supabase) {
      try { await recordPracticeDay(supabase, user.id); await refresh(); }
      catch { /* The local attempt remains available while offline. */ }
    }
  }

  return <View style={s.flex}>
    <View style={s.appHeader}>
      <Image source={require('../../assets/images/icon.png')} style={s.brandIcon} resizeMode="contain" />
      <View style={s.flex}><Text style={s.brandName}>WeLearn</Text><Text style={s.brandSub}>Tu espacio de aprendizaje</Text></View>
      <Pressable accessibilityRole="button" accessibilityLabel="Actualizar datos"
        onPress={() => void refresh()} style={s.refreshButton}><Text style={s.refreshGlyph}>↻</Text></Pressable>
    </View>
    <ScrollView style={s.flex} contentContainerStyle={s.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void refresh(true)} />}>
      {tab === 'inicio' ? <Home name={name} snapshot={snapshot} busy={busy} error={error}
        onRetry={() => void refresh()} onPractice={() => setTab('practicar')} /> : null}
      {tab === 'practicar' ? quiz
        ? <QuickPractice key={quiz} language={quiz} onBack={() => setQuiz(null)} onComplete={(score, total) => void completePractice(score, total)} />
        : <Practice history={history} onStart={setQuiz} /> : null}
      {tab === 'perfil' ? <Profile user={user} snapshot={snapshot} /> : null}
    </ScrollView>
    <View style={s.tabBar}>
      {([['inicio', '⌂', 'Inicio'], ['practicar', '◫', 'Practicar'], ['perfil', '○', 'Perfil']] as const)
        .map(([key, glyph, label]) => <Pressable key={key} accessibilityRole="tab"
          accessibilityState={{ selected: tab === key }} onPress={() => { setTab(key); setQuiz(null); }} style={s.tabItem}>
          <Text style={[s.tabGlyph, tab === key && s.tabSelected]}>{glyph}</Text>
          <Text style={[s.tabLabel, tab === key && s.tabSelected]}>{label}</Text>
        </Pressable>)}
    </View>
  </View>;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    const client = supabase;
    let mounted = true;
    client.auth.getUser().then(({ data }) => {
      if (mounted) { setUser(data.user); setChecking(false); }
    }).catch(() => { if (mounted) setChecking(false); });
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user ?? null);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  return <SafeAreaView edges={['top', 'bottom']} style={s.safe}>
    {!isConfigured ? <View style={s.centered}>
      <Text style={s.pageTitle}>Configura WeLearn</Text>
      <Text style={s.pageIntro}>Añade las variables públicas de Supabase en apps/mobile/.env para conectar esta app con tu cuenta.</Text>
    </View> : checking ? <ActivityIndicator style={s.centered} color={palette.navy} size="large" />
      : user ? <Main key={user.id} user={user} /> : <Login onSignedIn={setUser} />}
  </SafeAreaView>;
}
