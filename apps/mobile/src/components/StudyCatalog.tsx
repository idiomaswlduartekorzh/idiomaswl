import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { LanguageSlug } from '@/data/quick-practice';
import { STUDY_EXAMS, STUDY_LANGUAGES, STUDY_LEVELS } from '@/data/study-catalog';
import { s } from '@/styles';

export type CatalogSection = 'idiomas' | 'examenes';

type Props = {
  section: CatalogSection;
  onSectionChange: (section: CatalogSection) => void;
  onOpenPath: (path: string) => void;
  onStartPractice: (language: LanguageSlug) => void;
};

export function StudyCatalog({ section, onSectionChange, onOpenPath, onStartPractice }: Props) {
  const [expandedLanguage, setExpandedLanguage] = useState<LanguageSlug | null>(null);
  const [expandedExam, setExpandedExam] = useState<string | null>(null);

  return <>
    <Text style={s.pageEyebrow}>TU PORTAFOLIO DE ESTUDIO</Text>
    <Text style={s.pageTitle}>Explora WeLearn</Text>
    <Text style={s.pageIntro}>Elige un idioma o examen y encuentra sus rutas de estudio.</Text>
    <View style={s.segmentRow} accessibilityRole="tablist">
      {(['idiomas', 'examenes'] as const).map((key) => <Pressable key={key}
        accessibilityRole="tab" accessibilityState={{ selected: section === key }}
        onPress={() => onSectionChange(key)}
        style={[s.segmentButton, section === key && s.segmentActive]}>
        <Text style={[s.segmentText, section === key && s.segmentTextActive]}>
          {key === 'idiomas' ? `Idiomas (${STUDY_LANGUAGES.length})` : `Exámenes (${STUDY_EXAMS.length})`}
        </Text>
      </Pressable>)}
    </View>

    {section === 'idiomas' ? <>
      <Text style={s.catalogIntro}>Selecciona un idioma para ver sus seis niveles. Cada nivel abre sus materiales de la web.</Text>
      {STUDY_LANGUAGES.map((language) => {
        const expanded = expandedLanguage === language.slug;
        return <View key={language.slug}>
          <Pressable accessibilityRole="button" accessibilityState={{ expanded }}
            accessibilityLabel={`${language.title}, niveles A1 a C2`}
            onPress={() => setExpandedLanguage(expanded ? null : language.slug)}
            style={({ pressed }) => [s.practiceCard, pressed && s.pressed]}>
            <View style={s.languageMark}><Text style={s.languageMarkText}>{language.code}</Text></View>
            <View style={s.flex}><Text style={s.listTitle}>{language.title}</Text>
              <Text style={s.listDetail}>{language.description}</Text></View>
            <Text style={s.chevron}>{expanded ? '⌄' : '›'}</Text>
          </Pressable>
          {expanded ? <View style={s.catalogPanel}>
            <Text style={s.catalogPanelTitle}>Niveles de estudio</Text>
            <View style={s.levelGrid}>
              {STUDY_LEVELS.map((level) => <Pressable key={level} accessibilityRole="link"
                accessibilityLabel={`${language.title} nivel ${level}`}
                onPress={() => onOpenPath(`/practica/${language.slug}/${level.toLowerCase()}`)}
                style={({ pressed }) => [s.levelButton, pressed && s.pressed]}>
                <Text style={s.levelText}>{level} ↗</Text>
              </Pressable>)}
            </View>
            <Pressable accessibilityRole="link" onPress={() => onOpenPath(`/practica/${language.slug}`)}
              style={s.catalogLink}><Text style={s.catalogLinkText}>Ver toda la ruta de {language.title} ↗</Text></Pressable>
            <Pressable accessibilityRole="button" onPress={() => onStartPractice(language.slug)}
              style={s.catalogLink}><Text style={s.catalogLinkText}>Hacer práctica rápida A1 en la app →</Text></Pressable>
          </View> : null}
        </View>;
      })}
      <Text style={s.catalogPanelTitle}>Otras herramientas</Text>
      <Pressable accessibilityRole="link" onPress={() => onOpenPath('/practica/mi-vocabulario')}
        style={s.practiceCard}><View style={s.languageMark}><Text style={s.languageMarkText}>ABC</Text></View>
        <View style={s.flex}><Text style={s.listTitle}>Mi vocabulario</Text>
          <Text style={s.listDetail}>Guarda y repasa palabras.</Text></View><Text style={s.chevron}>↗</Text></Pressable>
      <Pressable accessibilityRole="link" onPress={() => onOpenPath('/practica/ideas-avanzadas')}
        style={s.practiceCard}><View style={s.languageMark}><Text style={s.languageMarkText}>B2+</Text></View>
        <View style={s.flex}><Text style={s.listTitle}>Ideas avanzadas</Text>
          <Text style={s.listDetail}>Inglés B2–C1 con lectura y pensamiento crítico.</Text></View>
        <Text style={s.chevron}>↗</Text></Pressable>
    </> : <>
      <Text style={s.catalogIntro}>Consulta la guía y los simulacros de cada examen.</Text>
      {STUDY_EXAMS.map((exam) => {
        const expanded = expandedExam === exam.slug;
        const practicePath = exam.practicePath;
        return <View key={exam.slug}>
          <Pressable accessibilityRole="button" accessibilityState={{ expanded }}
            accessibilityLabel={`${exam.title}, materiales de examen`}
            onPress={() => setExpandedExam(expanded ? null : exam.slug)}
            style={({ pressed }) => [s.practiceCard, pressed && s.pressed]}>
            <View style={s.examMark}><Text style={s.examMarkText}>✓</Text></View>
            <View style={s.flex}><Text style={s.listTitle}>{exam.title}</Text>
              <Text style={s.listDetail}>{exam.detail}</Text></View>
            <Text style={s.chevron}>{expanded ? '⌄' : '›'}</Text>
          </Pressable>
          {expanded ? <View style={s.catalogPanel}>
            <Pressable accessibilityRole="link" onPress={() => onOpenPath(`/examenes/${exam.slug}`)}
              style={s.catalogLink}><Text style={s.catalogLinkText}>Ver guía y simulacros ↗</Text></Pressable>
            {practicePath ? <Pressable accessibilityRole="link"
              onPress={() => onOpenPath(practicePath)} style={s.catalogLink}>
              <Text style={s.catalogLinkText}>Practicar por habilidad ↗</Text>
            </Pressable> : null}
          </View> : null}
        </View>;
      })}
      <Pressable accessibilityRole="link" onPress={() => onOpenPath('/examenes')} style={s.catalogLink}>
        <Text style={s.catalogLinkText}>Ver el catálogo completo de exámenes ↗</Text>
      </Pressable>
    </>}
    <Text style={s.webNote}>Los niveles, herramientas y simulacros se abren en idiomaswl.com. Es posible que debas iniciar sesión también en el navegador.</Text>
  </>;
}
