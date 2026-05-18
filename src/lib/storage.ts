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
  '어제':            `${BASE002}/audio/audio_어제.mp3`,
  '글자':            `${BASE002}/audio/audio_글자.mp3`,
  '이제':            `${BASE002}/audio/audio_이제.mp3`,
  '보여요':          `${BASE002}/audio/audio_보여요.mp3`,
  '오늘':            `${BASE002}/audio/audio_오늘.mp3`,
  '조금':            `${BASE002}/audio/audio_조금.mp3`,
  '뭐':              `${BASE002}/audio/audio_뭐.mp3`,
  '나':              `${BASE002}/audio/audio_나는.mp3`,
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
};

export const KR_PODCAST_002 = `${BASE002}/audio/step002-podcast.mp3`;
export const KR_VIDEO_002   = `${BASE002}/video/step002.mp4`;

export function playAudio(text: string, rate = 1) {
  if (typeof window === 'undefined') return;
  const src = KR_AUDIO[text as keyof typeof KR_AUDIO];
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
