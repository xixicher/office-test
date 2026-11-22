export const letters = ['A', 'B', 'C', 'D'] as const
export type Answer = (typeof letters)[number]

export const profiles = {
  clear: {
    name: '人间清醒型',
    character: '边界感猫猫',
    quote: '工作是工作，人生是人生。',
    traits: ['边界感', '优先级', '有条理'],
    summary: '你的工位上仿佛常年摆着一张优先级表。群里一喊「急」，你先问几点要、谁来用。只要目标说得清，你做事比谁都利落。到了下班点，你也能安心把电脑合上。',
    strength: '能迅速厘清轻重缓急，守住交付质量，也守住自己的下班时间。',
    blindSpot: '回复太简短时，同事可能猜不出你在忙什么，也不知道下一步等谁。',
    tip: '忙不过来时回一句「我今天先交 A，B 明早给你初稿」，给对方一个明确的时间点。',
    partner: 'calm',
    chemistry: '你帮忙定优先级，TA让急着插话的人也能把话讲完。最适合搭档开一场十五分钟就散会的会。',
    paper: '#e8f4e7',
    ink: '#284e3d',
    bar: '#4c8064',
  },
  checkedOut: {
    name: '精神离职型',
    character: '放空垂耳兔',
    quote: '工牌还在，灵魂已经办完交接。',
    traits: ['下班雷达', '幽默自救', '省电模式'],
    summary: '你能熟练地点头说「收到」，内心已经在研究晚饭。你的吐槽往往一针见血，大家都还在加第四轮需求时，你记得问一句「咱们最开始要解决什么？」',
    strength: '一眼看出无效忙碌。再离谱的需求，也经常被你讲成一段好笑的办公室轶事。',
    blindSpot: '省电模式开久了，连有机会改善现状的事也容易随手划过去。',
    tip: '选一件最消耗你的例行工作，写下具体卡点，找同事试一次调整。今天先改这一件。',
    partner: 'efficient',
    chemistry: '你知道哪段流程最磨人，TA刚好有把三次复制粘贴变成一次的办法。',
    paper: '#fce5e3',
    ink: '#653a45',
    bar: '#ae6177',
  },
  efficient: {
    name: '摸鱼大师型',
    character: '快捷键仓鼠',
    quote: '不是不努力，是效率需要留给生活。',
    traits: ['流程优化', '工具控', '会偷闲'],
    summary: '同一套表做第二次，你就开始琢磨公式。部门还在手动改文件名，你已经存好了批处理。省下的十分钟，刚好够泡杯茶。',
    strength: '很快发现重复劳动，能把零碎步骤整理成同事也能上手的模板。',
    blindSpot: '为了少做一次复制粘贴，偶尔会不小心先花两小时打磨工具。',
    tip: '建一个「省事清单」。先做每周都能省时间的项目，顺手给同事留一句使用说明。',
    partner: 'driven',
    chemistry: 'TA揽下的活总有几件能自动化。你从真实任务里试出好工具，TA也少加一点班。',
    paper: '#eee5fa',
    ink: '#504069',
    bar: '#8369a8',
  },
  driven: {
    name: '职场卷王型',
    character: '冲刺水豚',
    quote: '别人已经下班，我的第二轮刚刚开始。',
    traits: ['目标明确', '说做就做', '交付靠谱'],
    summary: '刚听到一句「要不试试看」，你就能拉出排期表。项目没人接球时，队友习惯看向你，而你通常已经做出第一版。',
    strength: '擅长把模糊的目标拆成任务。项目卡住时，你也能找到一个能先做起来的切口。',
    blindSpot: '一忙就把「我可以」说成默认回复，自己的任务和别人的任务会一起占满日历。',
    tip: '开工前给任务写一条完成标准。达到它就先发出去，额外优化留给下一轮。',
    partner: 'clear',
    chemistry: '你负责把事往前推，TA帮你挑出最值得推的那一件。搭档久了，你可能还会多出几个准点下班的晚上。',
    paper: '#ffe8d8',
    ink: '#733e2c',
    bar: '#b85b40',
  },
  calm: {
    name: '情绪稳定器型',
    character: '递水柴犬',
    quote: '工作可以发疯，但我先喝口水。',
    traits: ['会听人话', '沟通缓冲', '照顾气氛'],
    summary: '会议里两边快要吵起来，你往往能听出他们担心的是同一件事。你会给那个说到一半被打断的人留个接话的机会，也记得先给自己倒杯水。',
    strength: '能帮人把情绪背后的诉求讲清楚，让争论重新回到大家能一起解决的事情上。',
    blindSpot: '习惯帮别人接住情绪，自己的不舒服有时要到下班路上才反应过来。',
    tip: '协调前先确认谁负责拍板。可以帮忙理清分歧，也记得把决定还给负责人。',
    partner: 'zen',
    chemistry: '你让大家说得开，TA让大家慢一点做判断。有你们在，棘手的问题也可以聊得心平气和。',
    paper: '#fff1ce',
    ink: '#614c2d',
    bar: '#946b32',
  },
  zen: {
    name: '带薪修仙人型',
    character: '喝茶绵羊',
    quote: '人在工位坐，心在云端飘。',
    traits: ['节奏稳定', '耐心充足', '从容拆解'],
    summary: '群里刷过四十条未读，两拨人正在改方案，你会先泡好茶，弄清今天要交哪一版。就算重复开三次会，你也总能从最后五分钟里捞出一个待办。',
    strength: '在变动里维持自己的节奏，愿意耐心拆解复杂任务，很适合接需要长跑的项目。',
    blindSpot: '你心里已经排好节奏，着急的同事可能还在等一句「这事有人接吗？」',
    tip: '接到变更先回一条「已看到，下午四点更新」。然后安心处理手上这一步。',
    partner: 'driven',
    chemistry: 'TA帮你把该抢的时间抢到手，你帮TA在工作排满的时候留下喘气的空档。',
    paper: '#e4f2fc',
    ink: '#304d63',
    bar: '#537d9d',
  },
} as const

export type ProfileId = keyof typeof profiles
export const profileIds = Object.keys(profiles) as ProfileId[]

type Question = {
  prompt: string
  options: Record<Answer, { text: string; profile: ProfileId }>
}

export const questions: readonly Question[] = [
  {
    prompt: '周五17:58，老板突然在群里@你。',
    options: {
      A: { text: '先确认紧急程度，不急就周一处理。', profile: 'clear' },
      B: { text: '手机突然失去信号，灵魂已经下班。', profile: 'checkedOut' },
      C: { text: '三分钟研究出一个周一再处理的高效方案。', profile: 'efficient' },
      D: { text: '立即打开电脑，顺手把下周任务也完成。', profile: 'driven' },
    },
  },
  {
    prompt: '周一晨会轮到你发言，你会？',
    options: {
      A: { text: '只讲重点、问题和解决方案。', profile: 'clear' },
      B: { text: '嘴在汇报，脑子还在周末。', profile: 'checkedOut' },
      C: { text: '先讲个轻松的小插曲，缓和气氛。', profile: 'calm' },
      D: { text: '当作一次整理思路的机会，平静表达。', profile: 'zen' },
    },
  },
  {
    prompt: '一份方案被要求反复修改，你的第一反应？',
    options: {
      A: { text: '想办法做成模板，下次少改八百遍。', profile: 'efficient' },
      B: { text: '不服输，直到做到自己满意。', profile: 'driven' },
      C: { text: '先沟通清楚双方的真实需求。', profile: 'calm' },
      D: { text: '不慌，拆分任务，一项项调整。', profile: 'zen' },
    },
  },
  {
    prompt: '周一早上坐到工位，你通常会？',
    options: {
      A: { text: '先排优先级，把最重要的事解决。', profile: 'clear' },
      B: { text: '打开自动化工具，能省一步是一步。', profile: 'efficient' },
      C: { text: '和同事聊两句，让大家情绪缓一缓。', profile: 'calm' },
      D: { text: '倒杯茶，慢慢进入工作节奏。', profile: 'zen' },
    },
  },
  {
    prompt: '工作群突然有几十条未读消息，你会？',
    options: {
      A: { text: '看到红点，感觉灵魂又离职了一次。', profile: 'checkedOut' },
      B: { text: '迅速查看任务，及时推进。', profile: 'driven' },
      C: { text: '先看看有没有人在沟通中闹情绪。', profile: 'calm' },
      D: { text: '按自己的节奏处理，不让消息打乱状态。', profile: 'zen' },
    },
  },
  {
    prompt: '同事突然请你帮忙，你会？',
    options: {
      A: { text: '先判断自己有没有时间，明确边界。', profile: 'clear' },
      B: { text: '人在说没问题，心里已经想请假。', profile: 'checkedOut' },
      C: { text: '教他一个效率工具，让双方都轻松。', profile: 'efficient' },
      D: { text: '不仅帮忙解决，还顺便优化流程。', profile: 'driven' },
    },
  },
]
