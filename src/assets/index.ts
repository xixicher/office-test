import cat from './cat.webp'
import rabbit from './rabbit.webp'
import hamster from './hamster.webp'
import capybara from './capybara.webp'
import shiba from './shiba.webp'
import sheep from './sheep.webp'
import type { ProfileId } from '../model/quiz'

export const portraits: Record<ProfileId, string> = {
  clear: cat,
  checkedOut: rabbit,
  efficient: hamster,
  driven: capybara,
  calm: shiba,
  zen: sheep,
}
