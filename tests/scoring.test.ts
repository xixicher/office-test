import assert from 'node:assert/strict'
import { test } from 'node:test'
import { scoreAnswers } from '../src/model/scoring.ts'
import type { ProfileId } from '../src/model/quiz.ts'

test('six distinct combinations produce all six profiles', () => {
  const codes = {
    AAAABA: 'clear',
    BBADAB: 'checkedOut',
    CAABBC: 'efficient',
    DABABD: 'driven',
    ACCCCA: 'calm',
    ADDDDA: 'zen',
  }
  for (const [code, expected] of Object.entries(codes)) {
    const result = scoreAnswers(code)
    assert.equal(result?.profileId, expected)
    assert.equal(result?.code, code)
    assert.equal(Object.values(result!.scores).reduce((sum, value) => sum + value, 0), 6)
  }
})

test('the last choice breaks a tie if it belongs to a highest-scoring profile', () => {
  assert.deepEqual(scoreAnswers('ACDBCA'), {
    code: 'ACDBCA',
    profileId: 'clear',
    scores: { clear: 2, checkedOut: 0, efficient: 1, driven: 0, calm: 2, zen: 1 },
  })
})

test('tie-breaking skips later choices outside the set of tied leaders', () => {
  assert.deepEqual(scoreAnswers('ACCAAD'), {
    code: 'ACCAAD',
    profileId: 'clear',
    scores: { clear: 2, checkedOut: 1, efficient: 0, driven: 1, calm: 2, zen: 0 },
  })
  assert.equal(scoreAnswers('ACCADC')?.profileId, 'clear')
  assert.equal(scoreAnswers('AAACAD')?.profileId, 'clear')
})

test('a six-way tie selects the sixth answer', () => {
  const result = scoreAnswers('BADCBC')
  assert.equal(result?.profileId, 'efficient')
  assert.deepEqual(Object.values(result!.scores), [1, 1, 1, 1, 1, 1])
})

test('incomplete or malformed combinations do not produce a report', () => {
  for (const code of ['', 'ABCD', 'AAAAAAA', 'AAAAAE', 'aaaaaa', 'AAAAA ', 'AAAAA\n', 'ＡAAAAA']) {
    assert.equal(scoreAnswers(code), null)
  }
})

test('all 4,096 answer combinations match the approved mapping and are deterministic', () => {
  const mapping: readonly (readonly ProfileId[])[] = [
    ['clear', 'checkedOut', 'efficient', 'driven'],
    ['clear', 'checkedOut', 'calm', 'zen'],
    ['efficient', 'driven', 'calm', 'zen'],
    ['clear', 'efficient', 'calm', 'zen'],
    ['checkedOut', 'driven', 'calm', 'zen'],
    ['clear', 'checkedOut', 'efficient', 'driven'],
  ]
  for (let number = 0; number < 4 ** mapping.length; number += 1) {
    const digits = [...number.toString(4).padStart(mapping.length, '0')].map(Number)
    const code = digits.map((digit) => 'ABCD'[digit]).join('')
    const picks = digits.map((digit, index) => mapping[index][digit])
    const counts = { clear: 0, checkedOut: 0, efficient: 0, driven: 0, calm: 0, zen: 0 }
    for (const id of picks) counts[id] += 1
    const ranked = [...new Set(picks)].sort((a, b) =>
      counts[b] - counts[a] || picks.lastIndexOf(b) - picks.lastIndexOf(a),
    )
    const expected = { code, scores: counts, profileId: ranked[0] }
    assert.deepEqual(scoreAnswers(code), expected)
    assert.deepEqual(scoreAnswers(code), expected)
  }
})
