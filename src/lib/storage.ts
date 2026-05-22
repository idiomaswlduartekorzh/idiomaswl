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

// ─── STEP 004 — Universidad / Campus ─────────────────────────────────────────
const BASE004 = '/assets/korean/step004';

export const KR_IMG_004 = {
  campus_arrival:       `${BASE004}/campus_arrival_v1.png`,
  campus_people:        `${BASE004}/campus_people_v1.png`,
  classroom_meeting:    `${BASE004}/classroom_meeting_v1.png`,
  david_minsu_cafe:     `${BASE004}/david_minsu_cafe_v1.png`,
  eottaeyo:             `${BASE004}/eottaeyo_v1.png`,
  hallway_introduction: `${BASE004}/hallway_introduction_v1.png`,
  masilraeyo:           `${BASE004}/masilraeyo_v1.png`,
  saero_wasseoyo:       `${BASE004}/saero_wasseoyo_v1.png`,
  saram:                `${BASE004}/saram_v1.png`,
  university_sign:      `${BASE004}/university_sign_v1.png`,
};

export const KR_VIDEO_004 = {
  scene1: `${BASE004}/video/STEP004-1.mp4`,
  scene2: `${BASE004}/video/STEP004-2.MOV`,
  scene3: `${BASE004}/video/STEP004-3.mp4`,
  full:   `${BASE004}/video/step004.mov`,
};

export const KR_PODCAST_004 = `${BASE004}/audio/step004-podcast.mp3`;

export const KR_AUDIO_004: Record<string, string> = {
  '새로':                   `${BASE004}/audio/audio_saero.mp3`,
  '새로 왔어요?':            `${BASE004}/audio/audio_saero_wasseoyo.mp3`,
  '네, 새로 왔어요':         `${BASE004}/audio/audio_ne_saero_wasseoyo.mp3`,
  '사람':                   `${BASE004}/audio/audio_saram.mp3`,
  '콜롬비아 사람이에요':      `${BASE004}/audio/audio_colombia_saram_ieyo.mp3`,
  '어때요?':                `${BASE004}/audio/audio_eottaeyo.mp3`,
  '어때요':                 `${BASE004}/audio/audio_eottaeyo.mp3`,
  '대학교 어때요?':          `${BASE004}/audio/audio_daehakgyo_eottaeyo.mp3`,
  '대학교 어때요':           `${BASE004}/audio/audio_daehakgyo_eottaeyo.mp3`,
  '마시다':                 `${BASE004}/audio/audio_masida.mp3`,
  '마실래요?':              `${BASE004}/audio/audio_masilraeyo.mp3`,
  '마실래요':               `${BASE004}/audio/audio_masilraeyo.mp3`,
  '커피 마실래요?':          `${BASE004}/audio/audio_keopi_masilraeyo.mp3`,
  '커피 마실래요':           `${BASE004}/audio/audio_keopi_masilraeyo.mp3`,
  '같이 마실래요?':          `${BASE004}/audio/audio_gachi_masilraeyo.mp3`,
  '같이 마실래요':           `${BASE004}/audio/audio_gachi_masilraeyo.mp3`,
  '친절해요':               `${BASE004}/audio/audio_chinjeolhaeyo.mp3`,
  '친절한 사람들':           `${BASE004}/audio/audio_chinjeolhan_saramdeul.mp3`,
  '많아요':                 `${BASE004}/audio/audio_maneunyo.mp3`,
  '좋아요':                 `${BASE004}/audio/audio_joayo.mp3`,
  '반갑습니다':             `${BASE004}/audio/audio_bangapseumnida.mp3`,
  '저는 민수예요':           `${BASE004}/audio/audio_jeoneun_minsu_yeyo.mp3`,
  '저는 데이비드예요':        `${BASE004}/audio/audio_jeoneun_david_ieyo.mp3`,
  '어느 나라 사람이에요?':    `${BASE004}/audio/audio_eoneu_nara_saram_ieyo.mp3`,
  '어느 나라 사람이에요':     `${BASE004}/audio/audio_eoneu_nara_saram_ieyo.mp3`,
  '네, 좋아요':             `${BASE004}/audio/audio_ne_joayo.mp3`,
  '같이 가요':              `${BASE004}/audio/audio_gachi_gayo.mp3`,
  '대학교 좋아요':           `${BASE004}/audio/audio_daehakgyo_joayo.mp3`,
  // '이 카페 어때요?' y '커피 어때요?' no tienen archivo propio → TTS fallback intencional
  '친절한 사람들도 많아요':   `${BASE004}/audio/audio_chinjeolhan_saramdeul.mp3`,
};

// ─── STEP 005 — Rutina universitaria ─────────────────────────────────────────
const BASE005 = '/assets/korean/step005';

export const KR_IMG_005 = {
  david_studying:    `${BASE005}/david_studying_v1.png`,
  david_cafe:        `${BASE005}/david_cafe_working_v1.png`,
  campus_routine:    `${BASE005}/campus_routine_v1.png`,
  minsu_david_chat:  `${BASE005}/minsu_david_chat_v1.png`,
  eseo_vs_e:         `${BASE005}/eseo_vs_e_diagram_v1.png`,
  hada_verbs:        `${BASE005}/hada_verbs_v1.png`,
};

export const KR_VIDEO_005 = `${BASE005}/video/step005.mov`;

export const KR_PODCAST_005 = `${BASE005}/audio/step005-podcast.mp3`;

export const KR_AUDIO_005: Record<string, string> = {
  '한국 생활 어때요?':            `${BASE005}/audio/audio_hanguk_saenghwal_eottaeyo.mp3`,
  '한국 생활 어때요':             `${BASE005}/audio/audio_hanguk_saenghwal_eottaeyo.mp3`,
  '이 대학교에서 공부해요':        `${BASE005}/audio/audio_daehakgyo_eseo_gongbuhaeyo.mp3`,
  '카페에서 일해요':              `${BASE005}/audio/audio_cafe_eseo_ilhaeyo.mp3`,
  '한국 좋아해요':               `${BASE005}/audio/audio_hanguk_joahaeyo.mp3`,
  '민수 씨는 뭐해요?':            `${BASE005}/audio/audio_minsu_ssi_mwohaeyo.mp3`,
  '민수 씨는 뭐해요':             `${BASE005}/audio/audio_minsu_ssi_mwohaeyo.mp3`,
  '저도 이 대학교에서 공부해요':   `${BASE005}/audio/audio_jeodo_daehakgyo_gongbuhaeyo.mp3`,
  '친구들이 많아요':              `${BASE005}/audio/audio_chingudeul_maneayo.mp3`,
  '매일 카페에 가요':             `${BASE005}/audio/audio_maeil_cafe_gayo.mp3`,
  '생활':                       `${BASE005}/audio/audio_saenghwal.mp3`,
  '공부해요':                    `${BASE005}/audio/audio_gongbuhaeyo.mp3`,
  '일해요':                     `${BASE005}/audio/audio_ilhaeyo.mp3`,
  '좋아해요':                   `${BASE005}/audio/audio_joahaeyo.mp3`,
  '뭐해요?':                    `${BASE005}/audio/audio_mwohaeyo.mp3`,
  '뭐해요':                     `${BASE005}/audio/audio_mwohaeyo.mp3`,
  '매일':                       `${BASE005}/audio/audio_maeil.mp3`,
  '에서':                       `${BASE005}/audio/audio_eseo.mp3`,
  '에':                         `${BASE005}/audio/audio_e_particle.mp3`,
  '친구':                       `${BASE005}/audio/audio_chingu.mp3`,
  '친구들':                     `${BASE005}/audio/audio_chingudeul.mp3`,
  '씨':                         `${BASE005}/audio/audio_ssi.mp3`,
  '공부':                       `${BASE005}/audio/audio_gongbu.mp3`,
  '일':                         `${BASE005}/audio/audio_il.mp3`,
};

export function playAudio(text: string, rate = 1) {
  if (typeof window === 'undefined') return;
  const src =
    KR_AUDIO_005[text] ??
    KR_AUDIO_004[text] ??
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
