import { portraits } from '../assets'
import { profiles } from '../model/quiz'
import type { Result } from '../model/scoring'

const fonts = '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif'

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number,
  width: number, height: number, radius: number) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

export async function makeShareCard(result: Result): Promise<Blob> {
  const profile = profiles[result.profileId]
  const image = new Image()
  image.src = portraits[result.profileId]
  await image.decode()

  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1440
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable')

  ctx.fillStyle = '#fff8ed'
  ctx.fillRect(0, 0, 1080, 1440)
  ctx.fillStyle = profile.paper
  roundedRect(ctx, 46, 46, 988, 1348, 48)
  ctx.fill()
  ctx.strokeStyle = profile.ink
  ctx.lineWidth = 2
  ctx.globalAlpha = 0.28
  roundedRect(ctx, 69, 69, 942, 1302, 32)
  ctx.stroke()
  ctx.globalAlpha = 1

  function center(text: string, y: number, size: number, weight: number, maxWidth = 872) {
    if (!ctx) return
    ctx.fillStyle = profile.ink
    ctx.font = `${weight} ${size}px ${fonts}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 540, y, maxWidth)
  }

  center('打工人精神状态鉴定所', 133, 31, 700)
  ctx.save()
  roundedRect(ctx, 225, 192, 630, 630, 38)
  ctx.clip()
  ctx.drawImage(image, 225, 192, 630, 630)
  ctx.restore()

  center(profile.character, 887, 34, 700)
  center(profile.name, 972, 77, 800)
  center(`「${profile.quote}」`, 1061, 37, 600)
  ctx.beginPath()
  ctx.setLineDash([6, 8])
  ctx.moveTo(134, 1109)
  ctx.lineTo(946, 1109)
  ctx.stroke()
  ctx.setLineDash([])

  center('我的答案组合', 1162, 27, 700)
  for (const [index, letter] of [...result.code].entries()) {
    const x = 270 + index * 92
    ctx.fillStyle = '#fffcf6'
    roundedRect(ctx, x, 1200, 80, 76, 16)
    ctx.fill()
    ctx.fillStyle = profile.ink
    ctx.font = '700 42px monospace'
    ctx.fillText(letter, x + 40, 1240)
  }
  center('有没有和我同款的打工人？', 1323, 26, 600)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('PNG export failed'))
    }, 'image/png')
  })
}
