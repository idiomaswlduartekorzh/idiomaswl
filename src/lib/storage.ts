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
  '어제':            `${BASE002}/audio/audio_eoje.mp3`,
  '글자':            `${BASE002}/audio/audio_geulja.mp3`,
  '이제':            `${BASE002}/audio/audio_ije.mp3`,
  '보여요':          `${BASE002}/audio/audio_boyeoyo.mp3`,
  '오늘':            `${BASE002}/audio/audio_oneul.mp3`,
  '조금':            `${BASE002}/audio/audio_jogeum.mp3`,
  '뭐':              `${BASE002}/audio/audio_mwo.mp3`,
  '나는':            `${BASE002}/audio/audio_naneun.mp3`,
  '너':              `${BASE002}/audio/audio_neo.mp3`,
  '가요':            `${BASE002}/audio/audio_gayo.mp3`,
  '저는':            `${BASE002}/audio/audio_jeoneun.mp3`,
  '어디':            `${BASE002}/audio/audio_eodi.mp3`,
  '어제 집 가요':    `${BASE002}/audio/audio_eoje_jip_gayo.mp3`,
  '너 이제 가요':    `${BASE002}/audio/audio_neo_ije_gayo.mp3`,
  '뭐 보여요':       `${BASE002}/audio/audio_mwo_boyeoyo.mp3`,
  '오늘 학교 가요':  `${BASE002}/audio/audio_oneul_hakgyo_gayo.mp3`,
  '나는 집 가요':    `${BASE002}/audio/audio_naneun_jip_gayo.mp3`,
  '글자 보여요':     `${BASE002}/audio/audio_geulja_boyeoyo.mp3`,
  '어디 가요':       `${BASE002}/audio/audio_eodi_gayo.mp3`,
  '이제 글자가 조금 보여요': `${BASE002}/audio/audio_geulja_boyeoyo.mp3`,
  // ── Hangul character examples (ContextualInput002) ────────────────────────────
  '아':   `${BASE002}/audio/audio_a.mp3`,
  '어':   `${BASE002}/audio/audio_eo.mp3`,
  '우':   `${BASE002}/audio/audio_u.mp3`,
  '이':   `${BASE002}/audio/audio_i.mp3`,
  '나':   `${BASE002}/audio/audio_na.mp3`,
  '아이': `${BASE002}/audio/audio_ai.mp3`,
  '시간': `${BASE002}/audio/audio_sigan.mp3`,
  '꽃':   `${BASE002}/audio/audio_kkot.mp3`,
  '땅':   `${BASE002}/audio/audio_ttang.mp3`,
  '빨리': `${BASE002}/audio/audio_ppalli.mp3`,
  '있어요': `${BASE002}/audio/audio_isseoyo.mp3`,
  '차':   `${BASE002}/audio/audio_cha.mp3`,
  '커피': `${BASE002}/audio/audio_keopi.mp3`,
  '타다': `${BASE002}/audio/audio_tada.mp3`,
  '파':   `${BASE002}/audio/audio_pa.mp3`,
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
  '어서 오세요':                  `${BASE003}/audio/audio_eoseo_oseyo.mp3`,
  '안녕하세요':                   `${BASE003}/audio/audio_annyeonghaseyo.mp3`,
  '아메리카노 한 잔 주세요':      `${BASE003}/audio/audio_amerikano_hanjan_juseyo.mp3`,
  '네, 금방 준비해 드릴게요':     `${BASE003}/audio/audio_ne_geumbang_junbi.mp3`,
  '사이즈 뭐로 드릴까요':        `${BASE003}/audio/audio_saijeu_mworo.mp3`,
  '글자가 조금 작아요':          `${BASE003}/audio/audio_geulja_jogeum_jagayo.mp3`,
  '스몰, 미디엄, 라지 있어요':   `${BASE003}/audio/audio_sml.mp3`,
  '여기 있습니다':               `${BASE003}/audio/audio_yeogi_itseumnida.mp3`,
  '감사합니다':                  `${BASE003}/audio/audio_gamsahamnida.mp3`,
  '이름이 뭐예요':               `${BASE003}/audio/audio_ireum_mwoyeyo.mp3`,
  '저는 하은이에요':             `${BASE003}/audio/audio_jeoneun_haeun.mp3`,
  // ── Survival phrases ──────────────────────────────────────────────────────
  '이거 얼마예요':               `${BASE003}/audio/audio_igeo_eolma.mp3`,
  '저는 외국인이에요':           `${BASE003}/audio/audio_jeoneun_waegukin.mp3`,
  '화장실이 어디예요':           `${BASE003}/audio/audio_hwajangshil_eodi.mp3`,
  '여기요':                      `${BASE003}/audio/audio_yeogiyo.mp3`,
  // ── Palabras sueltas ─────────────────────────────────────────────────────
  '카페':      `${BASE003}/audio/audio_kape.mp3`,
  '아메리카노': `${BASE003}/audio/audio_amerikano.mp3`,
  '사이즈':    `${BASE003}/audio/audio_saijeu.mp3`,
  '스몰':      `${BASE003}/audio/audio_seumol.mp3`,
  '미디엄':    `${BASE003}/audio/audio_midieom.mp3`,
  '라지':      `${BASE003}/audio/audio_laji.mp3`,
  '이름':      `${BASE003}/audio/audio_ireum.mp3`,
  '한 잔':     `${BASE003}/audio/audio_hanjan.mp3`,
  '금방':      `${BASE003}/audio/audio_geumbang.mp3`,
  '여기':      `${BASE003}/audio/audio_yeogi.mp3`,
  '주세요':    `${BASE003}/audio/audio_juseyo.mp3`,
  '작아요':    `${BASE003}/audio/audio_jagayo.mp3`,
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
