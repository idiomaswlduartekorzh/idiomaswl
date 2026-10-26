import type { Metadata } from 'next'
import ItalianAdvancedLevelHub from '@/components/practica/ItalianAdvancedLevelHub'
export const metadata:Metadata={title:'Italiano C1 — Grammatica avanzata',description:'Corso completo di grammatica italiana C1 con 30 lezioni, mappe visive, esercizi progressivi e PDF.',alternates:{canonical:'https://www.idiomaswl.com/practica/italiano/c1'}}
export default function Page(){return <ItalianAdvancedLevelHub level="c1"/>}
