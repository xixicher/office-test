import { letters, profileIds, questions, type Answer, type ProfileId } from './quiz.ts'

export type Result = {
  profileId: ProfileId
  scores: Record<ProfileId, number>
  code: string
}

export function isAnswer(value: unknown): value is Answer {
  return letters.some((letter) => letter === value)
}

export function scoreAnswers(code: string): Result | null {
  const answers = [...code]
  if (answers.length !== questions.length || !answers.every(isAnswer)) return null

  const picks = answers.map((answer, index) => questions[index].options[answer].profile)
  const scores = Object.fromEntries(profileIds.map((id) => [id, 0])) as Result['scores']
  for (const id of picks) scores[id] += 1

  const highest = Math.max(...Object.values(scores))
  for (const id of picks.reverse()) {
    if (scores[id] === highest) return { profileId: id, scores, code }
  }
  return null
}
