const MIXED_LEVEL_MINIMUM = 12

export const MIXED_LEVEL_MAXIMUM = 20

function stableHash(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/**
 * Builds a short, balanced and stable route through several selected forms.
 * A single-form practice keeps its complete editorial bank. Mixed practice
 * includes every selected form when possible and never grows beyond 20 items.
 */
export function selectMixedChallenges<T extends { id: string }>(
  items: readonly T[],
  selectedTenses: readonly string[],
  belongsToTense: (item: T, tense: string) => boolean,
  seed: string,
) {
  const filtered = items.filter((item) => selectedTenses.some((tense) => belongsToTense(item, tense)))
  if (selectedTenses.length <= 1) return filtered

  const targetCount = Math.min(
    filtered.length,
    MIXED_LEVEL_MAXIMUM,
    Math.max(MIXED_LEVEL_MINIMUM, selectedTenses.length),
  )
  const buckets = new Map(selectedTenses.map((tense) => [tense, [] as T[]]))

  for (const item of filtered) {
    const matchingTenses = selectedTenses.filter((tense) => belongsToTense(item, tense))
    const assignedTense = matchingTenses[stableHash(`${seed}:${item.id}`) % matchingTenses.length]
    buckets.get(assignedTense)?.push(item)
  }

  for (const [tense, bucket] of buckets) {
    bucket.sort((left, right) => (
      stableHash(`${seed}:${tense}:${left.id}`) - stableHash(`${seed}:${tense}:${right.id}`)
    ))
  }

  const result: T[] = []
  let round = 0
  while (result.length < targetCount) {
    const activeTenses = selectedTenses
      .filter((tense) => (buckets.get(tense)?.length ?? 0) > 0)
      .sort((left, right) => (
        stableHash(`${seed}:round-${round}:${left}`) - stableHash(`${seed}:round-${round}:${right}`)
      ))
    if (!activeTenses.length) break

    for (const tense of activeTenses) {
      const next = buckets.get(tense)?.shift()
      if (next) result.push(next)
      if (result.length === targetCount) break
    }
    round += 1
  }

  return result
}
