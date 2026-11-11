import type { GrammarTopic } from '../../types'
import personalpronomen from './personalpronomen'
import verbSein from './verb-sein'
import verbHaben from './verb-haben'
import artikel from './artikel'
import pluralNomen from './plural-nomen'
import prasensRegelmaessig from './prasens-regelmaessig'
import prasensUnregelmaessig from './prasens-unregelmaessig'
import verneinung from './verneinung'
import wFragen from './w-fragen'
import possessivpronomen from './possessivpronomen'
import akkusativ from './akkusativ'
import praepositonenOrt from './praepositionen-ort'
import adjektivePradikativ from './adjektive-pradikativ'
import modalverben from './modalverben'
import trennbareVerben from './trennbare-verben'
import praepositionenZeit from './praepositionen-zeit'
import imperativ from './imperativ'
import zukunftPrasens from './zukunft-prasens'
import dativPraepositionen from './dativ-praepositionen'
import personalpronomenAkkusativ from './personalpronomen-akkusativ'
import { closeGermanFoundationTopic } from '../quality-closeout'

const topics: GrammarTopic[] = [
  personalpronomen,
  verbSein,
  verbHaben,
  artikel,
  prasensRegelmaessig,
  pluralNomen,
  prasensUnregelmaessig,
  verneinung,
  wFragen,
  possessivpronomen,
  adjektivePradikativ,
  akkusativ,
  praepositonenOrt,
  modalverben,
  trennbareVerben,
  praepositionenZeit,
  imperativ,
  zukunftPrasens,
  dativPraepositionen,
  personalpronomenAkkusativ,
].map((topic) => closeGermanFoundationTopic(topic, 'a1'))

export default topics
