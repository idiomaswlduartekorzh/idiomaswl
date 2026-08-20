---
name: auditar-roleplay-habla
description: Audita juegos de rol de habla ya escritos y decide si pueden publicarse — las seis auditorías, las doce puertas del blueprint y el veredicto APTO/NO APTO. Úsala cuando el usuario diga «revisa los role plays», «audita el speaking acompañado», «¿está listo esto?», «¿esto se puede publicar?», antes de integrar un set en main, o cuando llegue contenido de habla de fuera. También sirve para reauditar lo ya publicado.
---

# Auditar juegos de rol

Se usa sobre contenido que ya existe: un set recién escrito, uno que llega de otra sesión, o
uno publicado que hay que revisar. Si el contenido aún no existe, la skill es
`crear-roleplay-habla`.

Fuente de verdad: `docs/habla-acompanado-blueprint.md`.

## Antes de lanzar nada

Localiza el set completo —los escenarios y **las dos fichas de cada uno**— y comprueba que
traiga los campos que hacen medible el conjunto: `speechActs`, `power`, `initiator`,
`outcome`. Si faltan, la auditoría de conjunto no se puede hacer y eso ya es un hallazgo:
dilo antes de seguir.

## Las seis, y todas hacen falta

Cinco por escenario, a la vez:

- `habla-calibrador-nivel` — ¿se puede hacer de verdad en ese nivel?
- `habla-auditor-naturalidad` — ¿suena a gente o a libro?
- `habla-auditor-tension` — ¿hay motivo para seguir hablando en el turno seis?
- `habla-auditor-equidad` — ¿pide cultura que no da, duele, humilla?
- `habla-simulador-parejas` — las cinco parejas, escritas turno a turno

Y una sobre el set entero, después: `habla-auditor-conjunto`, con porcentajes calculados por
script. «Me parece variado» no es un resultado.

## Después

`habla-guardian` consolida y dicta APTO o NO APTO contra las doce puertas. Si es NO APTO, las
correcciones vuelven a `habla-escenarios` o a `habla-fichas-de-rol` —nunca al auditor que
las encontró— y al terminar se repiten el simulador y el auditor de conjunto.

## Lo que la experiencia dice que va a salir

Míralo primero, ahorra vueltas:

1. **Una frase en español calcable** metida «para ayudar» en una ficha.
2. **El rol con poder hablando la mitad que el otro**, porque solo concede o niega.
3. **Ocho escenarios con el mismo molde**: alguien pide, alguien decide.
4. **La complicación que no complica nada**: quítala y la conversación termina igual.
5. **Exponentes de un nivel por encima** colados en el andamiaje porque sonaban educados.

## Reglas de operación

Ningún agente compila, levanta servidores ni abre el navegador de previsualización —8 GB de
memoria—. Nunca `git add -A`. Quien audita no arregla.
