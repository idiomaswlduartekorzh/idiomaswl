import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { quickPracticeFor, type LanguageSlug } from '@/data/quick-practice';
import { s } from '@/styles';

export function QuickPractice({ language, onBack, onComplete }: {
  language: LanguageSlug;
  onBack: () => void;
  onComplete: (correct: number, total: number) => void;
}) {
  const set = quickPracticeFor(language);
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = set.questions[index];

  function next() {
    if (selection === null || finished) return;
    const score = correct + (selection === question.answer ? 1 : 0);
    if (index === set.questions.length - 1) {
      setCorrect(score);
      setFinished(true);
      onComplete(score, set.questions.length);
    } else {
      setCorrect(score);
      setIndex(index + 1);
      setSelection(null);
    }
  }

  return <View>
    <Pressable accessibilityRole="button" onPress={onBack}><Text style={s.inlineLink}>← Volver a idiomas</Text></Pressable>
    <Text style={s.pageEyebrow}>PRÁCTICA RÁPIDA · A1</Text>
    <Text style={s.pageTitle}>{set.title}</Text>
    {finished ? <View style={s.quizCard}>
      <Text style={s.quizScore}>{correct}/{set.questions.length}</Text>
      <Text style={s.sectionTitle}>¡Terminaste!</Text>
      <Text style={s.listDetail}>Tu resultado se guardó en este dispositivo.</Text>
      <Pressable accessibilityRole="button" onPress={onBack} style={s.action}><Text style={s.actionText}>Ver mis prácticas</Text></Pressable>
    </View> : <View style={s.quizCard}>
      <Text style={s.meta}>Pregunta {index + 1} de {set.questions.length}</Text>
      <Text style={s.quizPrompt}>{question.prompt}</Text>
      {question.options.map((option, optionIndex) => {
        const selected = selection === optionIndex;
        const correctAnswer = selection !== null && optionIndex === question.answer;
        return <Pressable key={optionIndex} accessibilityRole="button"
          accessibilityState={{ selected, disabled: selection !== null }} disabled={selection !== null}
          onPress={() => setSelection(optionIndex)}
          style={[s.quizOption, correctAnswer && s.quizOptionCorrect, selected && !correctAnswer && s.quizOptionWrong]}>
          <Text style={s.quizOptionText}>{option}</Text>
        </Pressable>;
      })}
      {selection !== null ? <View accessibilityRole="alert" style={s.quizFeedback}>
        <Text style={s.listTitle}>{selection === question.answer ? '¡Correcto!' : 'Sigue aprendiendo'}</Text>
        <Text style={s.listDetail}>{question.explanation}</Text>
      </View> : null}
      <Pressable accessibilityRole="button" accessibilityState={{ disabled: selection === null }}
        disabled={selection === null} onPress={next} style={[s.action, selection === null && s.disabled]}>
        <Text style={s.actionText}>{index === set.questions.length - 1 ? 'Ver resultado' : 'Siguiente'}</Text>
      </Pressable>
    </View>}
  </View>;
}
