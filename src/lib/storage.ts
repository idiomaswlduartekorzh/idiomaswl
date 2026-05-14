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
