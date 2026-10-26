import type { Metadata } from 'next'
import ItalianAdvancedLevelHub from '@/components/practica/ItalianAdvancedLevelHub'
export const metadata:Metadata={title:'Italiano C2 — Padronanza grammaticale',description:'Corso completo di grammatica italiana C2 con 30 lezioni, mappe visive, esercizi progressivi e PDF.',alternates:{canonical:'https://www.idiomaswl.com/practica/italiano/c2'}}
export default function Page(){return <ItalianAdvancedLevelHub level="c2"/>}
