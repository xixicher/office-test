import cat from './cat.webp'
import rabbit from './rabbit.webp'
import hamster from './hamster.webp'
import capybara from './capybara.webp'
import shiba from './shiba.webp'
import sheep from './sheep.webp'
import squirrel from './squirrel.webp'
import hedgehog from './hedgehog.webp'
import raccoon from './raccoon.webp'
import beaver from './beaver.webp'
import elephant from './elephant.webp'
import turtle from './turtle.webp'
import type { ResultProfileId } from '../model/quiz'

export const portraits: Record<ResultProfileId, string> = {
  clear: cat,
  checkedOut: rabbit,
  efficient: hamster,
  driven: capybara,
  calm: shiba,
  zen: sheep,
  planner: squirrel,
  standby: hedgehog,
  alchemist: raccoon,
  firefighter: beaver,
  translator: elephant,
  endurance: turtle,
}
