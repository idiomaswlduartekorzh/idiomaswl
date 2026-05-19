const BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets`;

export const KR_AUDIO = {
  '학교':               `${BASE}/korean/step001/audio/audio_hakgyo.mp3`,
  '대학교':              `${BASE}/korean/step001/audio/audio_daehakgyo.mp3`,
  '집':                `${BASE}/korean/step001/audio/audio_jip.mp3`,
  '가요':               `${BASE}/korean/step001/audio/audio_gayo.mp3`,
  '저는':               `${BASE}/korean/step001/audio/audio_jeoneun.mp3`,
  '나는':               `${BASE}/korean/step001/audio/audio_naneun.mp3`,
  '어디':               `${BASE}/korean/step001/audio/audio_eodi.mp3`,
  '어디 가요?':          `${BASE}/korean/step001/audio/audio_eodi_gayo.mp3`,
  '어디 가요':           `${BASE}/korean/step001/audio/audio_eodi_gayo.mp3`,
  '학교에 가요':          `${BASE}/korean/step001/audio/audio_hakgyoe_gayo.mp3`,
  '집에 가요':           `${BASE}/korean/step001/audio/audio_jipe_gayo.mp3`,
  '대학교에 가요':        `${BASE}/korean/step001/audio/audio_daehakgyoe_gayo.mp3`,
  '저는 대학교에 가요':   `${BASE}/korean/step001/audio/audio_jeoneun_daehakgyoe_gayo.mp3`,
  '학교에':              `${BASE}/korean/step001/audio/audio_hakgyoe_gayo.mp3`,
  '집에':               `${BASE}/korean/step001/audio/audio_jipe_gayo.mp3`,
  '대학교에':            `${BASE}/korean/step001/audio/audio_daehakgyoe_gayo.mp3`,
  '저는 학교에 가요.':    `${BASE}/korean/step001/audio/audio_hakgyoe_gayo.mp3`,
  '저는 대학교에 가요.':  `${BASE}/korean/step001/audio/audio_jeoneun_daehakgyoe_gayo.mp3`,
  '나는 집에 가요.':      `${BASE}/korean/step001/audio/audio_jipe_gayo.mp3`,
  '학교에 가요.':         `${BASE}/korean/step001/audio/audio_hakgyoe_gayo.mp3`,
  '집에 가요.':          `${BASE}/korean/step001/audio/audio_jipe_gayo.mp3`,
  '저는 학교에 가요':     `${BASE}/korean/step001/audio/audio_hakgyoe_gayo.mp3`,
} as const;

export const KR_IMG = {
  school:    `${BASE}/korean/step001/kr_step001_school_scene_v1.png`,
  university:`${BASE}/korean/step001/kr_step001_university_scene_v1.png`,
  home:      `${BASE}/korean/step001/kr_step001_home_scene_v1.png`,
  going:     `${BASE}/korean/step001/kr_step001_going_scene_v1.png`,
  iFormal:   `${BASE}/korean/step001/kr_step001_i_formal_scene_v1.png`,
  whereGoing:`${BASE}/korean/step001/kr_step001_where_are_you_going_scene_v1.png`,
};

export const KR_VIDEO = {
  sovPattern: `${BASE}/korean/step001/video/step001-patron-sov.mp4`,
};

export const KR_PODCAST = `${BASE}/korean/step001/audio/step001-activation-main.mp3`;

// ─── STEP 002 — Hangul ────────────────────────────────────────────────────────
const BASE002 = '/assets/korean/step002';

export const KR_IMG_002 = {
  yesterday:  `${BASE002}/kr_step002_eoje_yesterday_sign_v1.png`,
  letters:    `${BASE002}/kr_step002_geulja_signs_v1.png`,
  now:        `${BASE002}/kr_step002_ije_now_haeun_down_gesture_v1.png`,
  see:        `${BASE002}/kr_step002_boyeoyo_see_david_eye_v1.png`,
  today:      `${BASE002}/kr_step002_oneul_today_sign_v1.png`,
  little:     `${BASE002}/kr_step002_jogeum_little_haeun_gesture_v1.png`,
  what:       `${BASE002}/kr_step002_mwo_what_david_v1.png`,
  me:         `${BASE002}/kr_step002_na_me_v1.png`,
  you:        `${BASE002}/kr_step002_neo_you_pointing_v1.png`,
  where:      `${BASE002}/kr_step002_eodi_conversation_v1.png`,
  school:     `${BASE002}/kr_step002_hakgyo_school_exit_v1.png`,
  home:       `${BASE002}/kr_step002_jip_home_v1.png`,
  jeoFormal:  `${BASE002}/kr_step002_jeo_me_formal_v1.png`,
  going:      `${BASE002}/kr_step002_gayo_crosswalk_v1.png`,
};

export const KR_AUDIO_002: Record<string, string> = {
  // ── Vocabulary from AcquisitionGuided002 ─────────────────────────────────────
  '어제':            `${BASE002}/audio/audio_어제.mp3`,
  '글자':            `${BASE002}/audio/audio_글자.mp3`,
  '이제':            `${BASE002}/audio/audio_이제.mp3`,
  '보여요':          `${BASE002}/audio/audio_보여요.mp3`,
  '오늘':            `${BASE002}/audio/audio_오늘.mp3`,
  '조금':            `${BASE002}/audio/audio_조금.mp3`,
  '뭐':              `${BASE002}/audio/audio_뭐.mp3`,
  '나는':            `${BASE002}/audio/audio_나는.mp3`,
  '너':              `${BASE002}/audio/audio_너.mp3`,
  '가요':            `${BASE002}/audio/audio_가요.mp3`,
  '저는':            `${BASE002}/audio/audio_저는.mp3`,
  '어디':            `${BASE002}/audio/audio_어디.mp3`,
  '어제 집 가요':    `${BASE002}/audio/audio_어제_집_가요.mp3`,
  '너 이제 가요':    `${BASE002}/audio/audio_너_이제_가요.mp3`,
  '뭐 보여요':       `${BASE002}/audio/audio_뭐_보여요.mp3`,
  '오늘 학교 가요':  `${BASE002}/audio/audio_오늘_학교_가요.mp3`,
  '나는 집 가요':    `${BASE002}/audio/audio_나는_집_가요.mp3`,
  '글자 보여요':     `${BASE002}/audio/audio_글자_보여요..mp3`,
  '어디 가요':       `${BASE002}/audio/audio_어디_가요.mp3`,
  '이제 글자가 조금 보여요': `${BASE002}/audio/audio_글자_보여요..mp3`,
  // ── Hangul character examples (ContextualInput002) ────────────────────────────
  '아':   `${BASE002}/audio/audio_아.mp3`,
  '어':   `${BASE002}/audio/audio_어.mp3`,
  '우':   `${BASE002}/audio/audio_우.mp3`,
  '이':   `${BASE002}/audio/audio_이.mp3`,
  '나':   `${BASE002}/audio/audio_나.mp3`,
  '아이': `${BASE002}/audio/audio_아이.mp3`,
  '시간': `${BASE002}/audio/audio_시간.mp3`,
  '꽃':   `${BASE002}/audio/audio_꽃.mp3`,
  '땅':   `${BASE002}/audio/audio_땅.mp3`,
  '빨리': `${BASE002}/audio/audio_빨리.mp3`,
  '있어요': `${BASE002}/audio/audio_있어요.mp3`,
  '차':   `${BASE002}/audio/audio_차.mp3`,
  '커피': `${BASE002}/audio/audio_커피.mp3`,
  '타다': `${BASE002}/audio/audio_타다.mp3`,
  '파':   `${BASE002}/audio/audio_파.mp3`,
};

export const KR_PODCAST_002 = `${BASE002}/audio/step002-podcast.mp3`;
export const KR_VIDEO_002   = `${BASE002}/video/step002.mp4`;

// ─── STEP 003 — Cafetería / Cortesía ─────────────────────────────────────────
const BASE003 = '/assets/korean/step003';

export const KR_IMG_003 = {
  cafe:          `${BASE003}/cafe_v1.png`,
  welcome:       `${BASE003}/welcome_v1.png`,
  hola:          `${BASE003}/hola_v1.png`,
  pedir:         `${BASE003}/pedir_v1.png`,
  preparar:      `${BASE003}/preparar_v1.png`,
  tamano:        `${BASE003}/tamano_v1.png`,
  sml:           `${BASE003}/sml_v1.png`,
  entregar:      `${BASE003}/entregar_v1.png`,
  gracias:       `${BASE003}/gracias_v1.png`,
  nombre:        `${BASE003}/nombre_v1.png`,
  haeun:         `${BASE003}/haeun_v1.png`,
  menu:          `${BASE003}/menu_v1.png`,
  vaso:          `${BASE003}/vaso_v1.png`,
  nombreenvaso:  `${BASE003}/nombreenvaso_v1.png`,
  // survival extras
  yeogivo:       `${BASE003}/yeogivo_v1.png`,
  olmayo:        `${BASE003}/olmayo_v1.png`,
  hwajangshil:   `${BASE003}/hwajangshil_v1.png`,
  wegukini:      `${BASE003}/wegukini_v1.png`,
};

export const KR_AUDIO_003: Record<string, string> = {
  // ── Frases completas ──────────────────────────────────────────────────────
  '어서 오세요':                  `${BASE003}/audio/audio_어서오세요.mp3`,
  '안녕하세요':                   `${BASE003}/audio/audio_안녕하세요.mp3`,
  '아메리카노 한 잔 주세요':      `${BASE003}/audio/audio_아메리카노한잔주세요.mp3`,
  '네, 금방 준비해 드릴게요':     `${BASE003}/audio/audio_네금방준비해드릴게요.mp3`,
  '사이즈 뭐로 드릴까요':        `${BASE003}/audio/audio_사이즈뭐로드릴까요.mp3`,
  '글자가 조금 작아요':          `${BASE003}/audio/audio_글자가조금작아요.mp3`,
  '스몰, 미디엄, 라지 있어요':   `${BASE003}/audio/audio_스몰미디엄라지있어요.mp3`,
  '여기 있습니다':               `${BASE003}/audio/audio_여기있습니다.mp3`,
  '감사합니다':                  `${BASE003}/audio/audio_감사합니다.mp3`,
  '이름이 뭐예요':               `${BASE003}/audio/audio_이름이뭐예요.mp3`,
  '저는 하은이에요':             `${BASE003}/audio/audio_저는하은이에요.mp3`,
  // ── Palabras sueltas ─────────────────────────────────────────────────────
  '카페':      `${BASE003}/audio/audio_카페.mp3`,
  '아메리카노': `${BASE003}/audio/audio_아메리카노.mp3`,
  '사이즈':    `${BASE003}/audio/audio_사이즈.mp3`,
  '스몰':      `${BASE003}/audio/audio_스몰.mp3`,
  '미디엄':    `${BASE003}/audio/audio_미디엄.mp3`,
  '라지':      `${BASE003}/audio/audio_라지.mp3`,
  '이름':      `${BASE003}/audio/audio_이름.mp3`,
  '한 잔':     `${BASE003}/audio/audio_한잔.mp3`,
  '금방':      `${BASE003}/audio/audio_금방.mp3`,
  '여기':      `${BASE003}/audio/audio_여기.mp3`,
  '주세요':    `${BASE003}/audio/audio_주세요.mp3`,
  '작아요':    `${BASE003}/audio/audio_작아요.mp3`,
};

export const KR_PODCAST_003 = `${BASE003}/audio/step003-podcast.mp3`;
export const KR_VIDEO_003   = `${BASE003}/video/STEP003.mp4`;

export function playAudio(text: string, rate = 1) {
  if (typeof window === 'undefined') return;
  const src =
    KR_AUDIO_003[text] ??
    KR_AUDIO_002[text] ??
    (KR_AUDIO as Record<string, string>)[text];
  if (src) {
    const audio = new Audio(src);
    audio.playbackRate = rate;
    audio.play().catch(() => {
      speakKorean(text, rate);
    });
    return;
  }
  speakKorean(text, rate);
}

function speakKorean(text: string, rate = 1) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'ko-KR';
  utt.rate = rate;
  window.speechSynthesis.speak(utt);
}
