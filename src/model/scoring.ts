import { letters, mixedProfileIds, profileIds, profiles, questions, type Answer, type ProfileId, type ResultProfileId } from './quiz.ts'

export type Result = {
  profileId: ResultProfileId
  scores: Record<ProfileId, number>
  code: string
}

export function isAnswer(value: unknown): value is Answer {
  return letters.some((letter) => letter === value)
}

export function scoreAnswers(code: string, version: 'original' | 'expanded' = 'expanded'): Result | null {
  const answers = [...code]
  if (answers.length !== questions.length || !answers.every(isAnswer)) return null

  const picks = answers.map((answer, index) => questions[index].options[answer].profile)
  const scores = Object.fromEntries(profileIds.map((id) => [id, 0])) as Result['scores']
  for (const id of picks) scores[id] += 1

  // Stable sorting keeps the most recent answer first when scores tie.
  const ranked = [...new Set(picks.reverse())].sort((a, b) => scores[b] - scores[a])
  const [primary, secondary] = ranked
  const mixed = version === 'expanded' ? mixedProfileIds.find((id) =>
    profiles[id].primary === primary && profiles[id].secondary === secondary,
  ) : undefined
  return { profileId: mixed ?? primary, scores, code }
}
