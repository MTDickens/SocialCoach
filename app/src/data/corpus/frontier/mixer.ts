import { L } from "../../taxonomy";
import type { Scenario } from "../types";
import { frontierSource } from "./sources";

const FILE = "mixer";

/** Role the learner plays in each scene. Keyed by scenario id. */
export const MIXER_ROLES: Record<string, { zh: string; en: string }> = {
  "dinner-mixed-table-open": L("被安排到陌生人一桌的研究者", "Researcher seated at a table of strangers"),
  "dinner-vc-is-there-a-company": L("没有创业打算的研究者", "Researcher with no startup plans"),
  "dinner-lab-unreleased": L("坐在 frontier lab 研究员旁边的研究者", "Researcher seated next to a frontier-lab scientist"),
  "technight-founder-recruits-you": L("三分钟内被创始人看中的研究者", "Researcher a founder wants to recruit after three minutes"),
  "afterparty-hot-take": L("圈子里唯一还在学术界的人", "The only academic in the circle"),
  "dinner-status-roll-call": L("来自没人听过的 lab 的研究者", "Researcher from a lab nobody here has heard of"),
  "sponsor-party-gossip": L("知道内情但不能说的研究者", "Researcher who knows the truth and cannot say it"),
  "mixer-turn-chat-into-call": L("想把一次好聊天落到实处的研究者", "Researcher trying to turn a good chat into a next step"),
  "dinner-associate-fishing": L("被 VC associate 打听行情的研究者", "Researcher a VC associate is mining for a read on the field"),
};

export const MIXER_SCENARIOS: Scenario[] = [
  // ---------------------------------------------------------------- 1
  {
    id: "dinner-mixed-table-open",
    title: L("一桌陌生人：「你们最近都看到什么了？」", "A Table of Strangers: “So — What Are You All Seeing?”"),
    hook: L(
      "投资人、lab 的工程师、创业者都答完了，全桌转向你。这个问题要的不是你的论文摘要。",
      "The investor, the lab engineer and the founder have all answered. The table turns to you — and this question is not asking for your abstract.",
    ),
    background: L(
      "会议晚宴，圆桌不排座，你坐下才发现这一头的三个人你一个都不认识：一位 VC 合伙人 Ingrid，一位 frontier lab 的 research engineer Tomás，一位创业公司创始人 Aditi。Ingrid 开场就问「你们最近都看到什么了？」。Aditi 讲的是客户在要什么，Tomás 说了一句很稳妥的公开判断，现在轮到你。你不确定这个问题到底在问什么：讲自己的论文太长，说「没什么特别的」等于弃权。你希望这顿饭结束时，桌上至少有一个人因为一件具体的事记住你，你也弄明白这三种人各自怎么看你的方向。",
      "Conference dinner, open seating, and you only realise after sitting down that you know none of the three people at your end of the table: Ingrid, a VC partner; Tomás, a research engineer at a frontier lab; and Aditi, a startup founder. Ingrid opened with ‘So — what are you all seeing?’. Aditi answered in terms of what customers ask for, Tomás gave one careful, public-safe judgment, and now it is your turn. You are not sure what the question is really asking: your paper is too long an answer, and ‘nothing special’ is a forfeit. By the end of dinner you would like at least one person here to remember you for something specific, and to understand how each of these three kinds of people sees your area.",
    ),
    simulationFacts: L(
      "桌子这一头只有四个人：Ingrid（Kestrel Ridge Capital 合伙人）、Tomás（Meridian Labs 的 research engineer）、Aditi（Lanternfish 创始人）和用户；桌子另一头的人不参与。三人都不认识用户，也没听过用户的 lab。Aditi 刚才说的是：她的客户（中型企业）都在要「可以审计的 agent」，评测是他们愿意付钱的东西——这是她的销售判断，不是已证实的事实。Lanternfish 六个人，种子轮阶段，做企业 agent 的评测与审计工具；被具体问到才说有十来个试点客户，再追问才说其中三家付费。Tomás 刚才只说了一句「benchmark 上的数字和真正用起来之间的差距」，没有提任何公司内部的事；他不能谈未发布的模型、算力数字和路线图。Ingrid 还没给过自己的看法，不会透露被投公司的非公开信息；她不是技术出身。没有任何人向用户提出过见面、引荐、合作或后续联系。用户的研究方向和成果以用户自己说的为准（可以只是「一个具体的 ML 研究问题」），任何人不得替用户编造结果。",
      "Four people sit at this end of the table: Ingrid (partner, Kestrel Ridge Capital), Tomás (research engineer, Meridian Labs), Aditi (founder, Lanternfish) and the learner; the far end takes no part. None of the three knows the learner or has heard of the learner's lab. What Aditi just said: her customers (mid-size companies) all want ‘agents they can audit’, and evaluation is what they will pay for — a sales judgment, not an established fact. Lanternfish is six people at seed stage, building evaluation and audit tooling for enterprise agents; only when asked specifically does she say there are about a dozen pilots, and only when pressed that three of them pay. Tomás said only ‘the gap between benchmark numbers and what holds up in use’ and nothing about internal work; he cannot discuss unreleased models, compute numbers or roadmap. Ingrid has not yet given a view of her own, will not share non-public portfolio information, and is not technical by training. Nobody has offered the learner a meeting, an intro, a collaboration or any follow-up. The learner's area and results are whatever the learner says (it can simply be ‘a specific ML research problem’); nobody may invent results for them.",
    ),
    simulationDirection: L(
      "Ingrid 语速快、笑得多、习惯主持桌面，问完就看下一个人；她要的是「一个别人还没注意到的观察」和「所以呢」，听不懂的技术细节会直接说听不懂。Tomás 话少、措辞谨慎，爱用「公开来说」；Aditi 热情，三句话必回到自己的客户和时间线。用户开始讲论文摘要或背景综述时，Ingrid 礼貌地点头，约三四句后转去问别人，Aditi 接过话头；用户仍可再插回来。用户给出一个具体、有理由、可以被反驳的观察时，Ingrid 追问「那意味着什么」，Tomás 会补一个技术上的限定，Aditi 可能反驳说客户不在乎——这种反驳不是敌意。用户说「没什么特别的」「我只是学生」时，没有人安慰，话题自然滑走。用户反问 Ingrid「你呢」时，她先给一句泛泛的话；只有用户已经给过具体的东西，或问得具体（比如她这周到底想弄明白哪一个问题），才会说出她的真实问题。用户问 Tomás 未发布的事，他用一句练熟的话挡回去并变得更短；问到他公开工作里的具体细节，他明显放松、话变多。用户问 Aditi 数字，问得笼统只得到「势头很好」，问得具体才有数字。用户开玩笑，桌上会笑，但 Ingrid 仍会把问题问回来。用户说错或说大了并主动更正，Tomás 会点头认可更正后的版本，Ingrid 以更正后的为准。关键决定是：用户把哪一个观察放上桌、对谁换哪种说法、接下来把问题问给谁。Ingrid 的「有意思，我们回头聊」、Aditi 的「你该来我们办公室坐坐」、Tomás 的点头，都不算承诺，也不算确认了任何关于他们公司的事；只有说定了具体的事、时间和渠道才算下一步。主要话题过去后若用户继续，可以聊各自怎样判断一个结果「是真的」，或三人对同一个问题为什么答案不同；不催着散席。",
      "Ingrid talks fast, laughs easily and runs the table: she asks, then looks to the next person. She wants ‘one thing others have not noticed yet’ and the ‘so what’, and says so plainly when a technical detail loses her. Tomás is sparing and careful, fond of ‘publicly speaking’; Aditi is warm and returns to her customers and timeline within three sentences. If the learner starts on an abstract or a literature recap, Ingrid nods politely and after three or four sentences turns to someone else, and Aditi picks up the thread; the learner can still cut back in. A specific, reasoned, contestable observation makes Ingrid ask ‘and what does that mean?’, Tomás add a technical qualifier, and Aditi possibly push back that customers do not care — pushback is not hostility. If the learner says ‘nothing special’ or ‘I'm just a student’, nobody reassures them and the talk simply drifts on. When the learner asks Ingrid ‘what about you?’ she first gives something generic; she names her real question only if the learner has already offered something specific or asks precisely (for example, which one question she is trying to settle this week). Asking Tomás about unreleased work gets a practised deflection and shorter answers; a precise question about a detail of his public work visibly relaxes him and he talks more. A vague question about Aditi's numbers gets ‘strong pull’; a precise one gets numbers. A joke gets a laugh, and Ingrid still brings the question back. If the learner misspeaks or over-claims and corrects it, Tomás nods at the corrected version and Ingrid works from it. The key decision is which single observation the learner puts on the table, how it is reshaped for whom, and to whom the next question goes. Ingrid's ‘interesting, let's talk sometime’, Aditi's ‘you should come by the office’ and Tomás's nod are not commitments and confirm nothing about their companies; only a specific thing, time and channel is a next step. If the learner keeps going after the main moment has passed, the table can compare how each of them decides a result ‘is real’, or why the three gave different answers to the same question; nobody hurries the dinner to an end.",
    ),
    context: "mixer",
    contextType: L("会议晚宴", "Conference dinner"),
    competencies: ["social-awareness", "relationship-skills"],
    skills: ["reading-incentives", "research-pitch", "trading-information"],
    relatedSkills: ["sharp-questions", "social-norms"],
    relationship: ["stranger", "investor"],
    difficulty: 2,
    minutes: 6,
    icon: "utensils",
    characters: [
      {
        id: "ingrid",
        name: L("Ingrid", "Ingrid"),
        role: L("Kestrel Ridge Capital 合伙人", "Partner at Kestrel Ridge Capital"),
        hue: 285,
        personality: L(
          "语速快，爱笑，自然而然地主持桌面。问「你看到了什么」「所以呢」，听到综述就礼貌地转向下一个人；听不懂的技术细节直说听不懂。被反问时先给一句场面话。",
          "Fast, quick to laugh, runs the table without trying. Asks ‘what are you seeing?’ and ‘so what?’, and politely moves to the next person when she hears a survey. Says so when a technical detail loses her. Answers a counter-question with a stock line first.",
        ),
        stance: L(
          "想在一顿饭里听到一两个不显然的判断，并记下值得再聊的人。客气和头衔都换不来她的注意力，只有具体、能被反驳的话可以。",
          "Wants one or two non-obvious judgments out of this dinner, and to note who is worth a second conversation. Neither courtesy nor titles buy her attention; only something specific and contestable does.",
        ),
        hidden: L(
          "她正在写一份关于「评测」方向的内部判断，自己也怀疑其中一个假设（客户真的会为评测单独付钱吗），但身边没有一个愿意告诉她哪里想错了的研究者。只有被问到「你这周到底想弄明白什么」或「你自己最不确定的是哪一点」时才说出这个具体问题；说出来之后，用户可以选择回答、反驳，或坦白说不知道。",
          "She is writing an internal thesis on ‘evaluation’ and doubts one of its own assumptions — whether customers will really pay for evaluation as a separate thing — but has no researcher around who will tell her where she is wrong. She names this specific question only if asked what she is actually trying to figure out this week, or which point she is least sure of; once it is out, the learner can answer it, dispute it, or honestly say they do not know.",
        ),
      },
      {
        id: "tomas",
        name: L("Tomás", "Tomás"),
        role: L("Meridian Labs 的 research engineer", "Research engineer at Meridian Labs"),
        hue: 190,
        personality: L(
          "话少，措辞谨慎，常说「公开来说」。被问到未发布的东西时用一句练熟的话带过，然后更沉默；被问到公开工作里的具体细节时会放松下来，讲得很细。",
          "Sparing, careful, fond of ‘publicly speaking’. Deflects anything unreleased with one practised line and then goes quieter; relaxes and gets detailed when asked something precise about public work.",
        ),
        stance: L(
          "想安稳吃完这顿饭，不被套话，也不想再被要内推。不会因为对方友好就多说一句内部的事。",
          "Wants to get through dinner without being pumped for information or asked for a referral. Friendliness does not earn a single internal detail.",
        ),
        hidden: L(
          "他的团队去年开源了一个评测工具，学术界几乎没人用，他一直想知道为什么。只有被问到「你做的东西里哪些是公开的」或「你最希望外面的人问你什么」时才提起；提起之后，他会认真听一个研究者的真实理由。",
          "His team open-sourced an evaluation harness last year and almost no academic group uses it; he has wanted to know why ever since. He brings it up only if asked which of his work is public, or what he wishes outsiders would ask him — and then listens closely to a researcher's honest reasons.",
        ),
      },
      {
        id: "aditi",
        name: L("Aditi", "Aditi"),
        role: L("Lanternfish 创始人", "Founder of Lanternfish"),
        hue: 28,
        personality: L(
          "热情、反应快，说话全是客户、试点和时间线。喜欢说「客户根本不在乎这个」来检验别人的话；被问到具体数字时，问得笼统就答得笼统。",
          "Warm, quick, speaks in customers, pilots and timelines. Tests what others say with ‘customers don't care about that’. A vague question about numbers gets a vague answer.",
        ),
        stance: L(
          "想让桌上的人记住她的公司，尤其是 Ingrid。不会因为别人讲得漂亮就认同一个离客户很远的观点。",
          "Wants the table, Ingrid above all, to remember her company. A well-phrased point that is far from customers does not win her agreement.",
        ),
        hidden: L(
          "她两年前从博士项目退学创业，至今还会读论文；「论文不重要」那套话有一半是在说服自己。只有被问到「做公司之前你在做什么」时才说；说出来之后，她会把用户当同行而不是听众来聊。",
          "She left a PhD programme two years ago to start the company and still reads papers; half of her ‘papers don't matter’ line is self-persuasion. She says so only if asked what she did before the company — and from then on talks to the learner as a peer rather than an audience.",
        ),
      },
    ],
    objectives: [
      L("用一两句话给出一个具体、有理由的观察，而不是论文摘要或综述。", "Give one specific, reasoned observation in a sentence or two — not an abstract or a survey."),
      L("被问到你做什么时，按提问的人换一种说法，三十秒内讲完。", "When asked what you work on, reshape it for whoever asked and finish inside thirty seconds."),
      L("向桌上至少一个人问一个只有他那个位置才答得好的问题。", "Ask at least one person a question only someone in their seat can answer well."),
    ],
    success: L(
      "你放上桌的那个观察被至少一个人接住并追问；你也从某个人那里问到了一点实在的东西。有没有约后续都可以。",
      "The observation you put on the table gets picked up and probed by at least one person, and you get something real back from someone. A follow-up is optional.",
    ),
    failure: L(
      "讲了三分钟论文背景被礼貌地绕过；或用「我只是学生」把自己请出对话；或为了显得有料去打听 Tomás 不能说的事。",
      "Three minutes of paper background that the table politely routes around; or ‘I'm just a student’ and you have excused yourself from the conversation; or fishing for what Tomás cannot say in order to seem plugged in.",
    ),
    maxTurns: 12,
    opening: {
      characterId: "ingrid",
      text: L(
        "Aditi 说客户都在要能审计的 agent，Tomás 说 benchmark 和真用起来差得远。你是这桌唯一还在学校里的——你看到了什么，是我们这几个人还没注意到的？",
        "Aditi says customers all want agents they can audit; Tomás says benchmarks and real use are far apart. You're the only one at this table still in a university — what are you seeing that the three of us haven't noticed yet?",
      ),
    },
    source: frontierSource(FILE, "dinner-mixed-table-open", "ernstConference", "hamming", "deeperTalk"),
    keywords: ["晚宴", "陌生人", "投资人", "开场", "观察", "what are you seeing", "mixed table", "VC", "founder"],
  },

  // ---------------------------------------------------------------- 2
  {
    id: "dinner-vc-is-there-a-company",
    title: L("「这里面有公司吗？」", "“Is There a Company in That?”"),
    hook: L(
      "你没打算创业。答「没有」，对话就结束了；硬编一个，又不是真的。还有第三种答法吗？",
      "You have no plans to start anything. Say ‘no’ and the conversation is over; make one up and it is not true. Is there a third answer?",
    ),
    background: L(
      "会议晚宴上你旁边坐着 Fathom Row Capital 的合伙人 Kwame。他一坐下就问你做什么，紧接着就是那句「这里面有公司吗？」。你是做研究的，没有公司，也不打算做。你并不想推销什么，但你觉得和一个每天看几十家公司的人聊聊挺有意思——只要这场对话不因为一句「没有」就结束。你想让他听懂你的问题为什么重要，也想知道他这种人到底怎么判断一件事能不能成公司。",
      "At the conference dinner you are seated next to Kwame, a partner at Fathom Row Capital. He asks what you work on almost before sitting down, and follows straight away with ‘Is there a company in that?’. You do research; you have no company and do not plan one. You are not selling anything, but talking to someone who sees dozens of companies a week sounds interesting — provided the conversation does not end on a single ‘no’. You want him to understand why your problem matters, and you want to know how someone like him actually decides whether something can be a company.",
    ),
    simulationFacts: L(
      "这段对话里只有 Kwame 和用户，同桌其他人在各聊各的。Kwame 做过企业软件公司的销售与运营负责人，不是技术出身；他的基金投种子轮到 A 轮。他没有提出任何投资、顾问、付费或引荐。他看过若干家由研究者创办的公司，不会说出公司名字和非公开细节。用户没有公司、没有创业计划；研究方向和成果以用户说的为准，不替用户编造结果、客户或市场数字。「这个方向里到底有没有公司」是一件没有人知道答案的事，Kwame 自己也不知道。他另一侧还坐着别人，他随时可以转过去聊，但不会用时间逼用户表态。",
      "Only Kwame and the learner are in this conversation; the rest of the table is talking among themselves. Kwame used to run sales and operations at an enterprise software company and is not technical; his fund invests from seed to Series A. He has offered no investment, advising, payment or introduction. He has seen a number of researcher-founded companies and will not name them or give non-public details. The learner has no company and no plan to start one; their area and results are whatever they say — never invent results, customers or market numbers for them. Whether there is a company in this area is something nobody knows, Kwame included. Someone else sits on his other side and he can turn to them at any time, but he never uses the clock to force the learner's hand.",
    ),
    simulationDirection: L(
      "Kwame 声音不高、句子短、很直接，听不懂就说「我没听懂，换个说法」，不装懂。他对谁都问「这里面有公司吗」，这是筛选，不是邀请。用户干巴巴答「没有，我只是做研究的」，他说「明白」，再问一句客气话，然后转向另一侧的人；用户仍可以把他叫回来。用户为了接话临时编一个创业点子或市场规模，他立刻问「谁付钱？从哪一笔预算里出？」，答不上来他就降温，问题变短。用户给出一个诚实、有理由的回答——「没有，因为……」「现在没有，除非某件事先成立」「不在我做的这块，可能在旁边那一块」——他才真的感兴趣，追问「那要变成什么样才有？」。用户讲技术太细，他打断要「所以呢」；用户换成他听得懂的说法，他会复述一遍确认。用户反问他怎么判断，问得笼统只得到「团队、市场、时机」；问得具体（例如研究者创办的公司最常见的死法是什么）才得到实在的回答。用户开玩笑，他会笑，然后把原问题再问一遍。用户说大了又主动收回，他明确表示收回后的版本更有用，并以它为准。关键决定是：用户对「有没有公司」给出哪一个诚实的版本，以及用它换回什么。他说「把论文发我」不代表有投资兴趣，「我们保持联系」不是承诺，他向用户要引荐也不代表他欠用户一个。主要问题聊完后若用户继续，他可以讲他怎样看一个方向离产品还有多远，或问用户这个方向里谁做得最好——说不说、说谁，由用户决定。",
      "Kwame is quiet, short-sentenced and direct. When he does not follow he says ‘I didn't get that, try it another way’ and never pretends. He asks everyone ‘is there a company in that?’ — a filter, not an invitation. A flat ‘no, I just do research’ gets ‘understood’, one polite question, and then he turns to the person on his other side; the learner can still call him back. If the learner improvises a startup idea or a market size to keep up, he immediately asks ‘who pays, and out of which budget?’, and cools — shorter questions — when there is no answer. An honest, reasoned answer — ‘no, because…’, ‘not now, unless X becomes true first’, ‘not in my part, perhaps in the part next to it’ — is what actually interests him, and he follows with ‘so what would have to change?’. Too much technical detail and he interrupts for the ‘so what’; when the learner rephrases in terms he can follow he repeats it back to check. A vague counter-question about how he decides gets ‘team, market, timing’; a precise one (for example, the most common way researcher-founded companies die) gets a real answer. He laughs at a joke and then asks the original question again. If the learner over-claims and takes it back, he says outright that the walked-back version is more useful and works from it. The key decision is which honest version of ‘is there a company’ the learner gives, and what they get back for it. ‘Send me the paper’ is not investment interest, ‘let's stay close’ is not a commitment, and his asking for an introduction does not mean he owes one. If the learner keeps going after the main question is settled, he can explain how he judges the distance from a research direction to a product, or ask who does the best work in the area — whether to say, and whom to name, is the learner's call.",
    ),
    context: "mixer",
    contextType: L("会议晚宴", "Conference dinner"),
    competencies: ["relationship-skills", "social-awareness", "self-awareness"],
    skills: ["research-pitch", "reading-incentives", "calibrated-claims"],
    relatedSkills: ["sharp-questions", "trading-information"],
    relationship: ["investor", "stranger"],
    difficulty: 2,
    minutes: 5,
    icon: "circle-dollar-sign",
    characters: [
      {
        id: "kwame",
        name: L("Kwame", "Kwame"),
        role: L("Fathom Row Capital 合伙人", "Partner at Fathom Row Capital"),
        hue: 265,
        personality: L(
          "声音不高，句子短，直接。听不懂就说「换个说法」。听到编出来的市场故事会立刻问「谁付钱」；听到有理由的「没有」反而会往前坐。",
          "Quiet, short sentences, direct. Says ‘try it another way’ when he does not follow. A made-up market story gets an instant ‘who pays?’; a reasoned ‘no’ makes him lean in.",
        ),
        stance: L(
          "想在几分钟内判断这场对话值不值得继续。热情和礼貌不会让他留下；一个死掉的「没有」或一个假的「有」都会让他转向另一边的人。",
          "Wants to decide within minutes whether this conversation is worth continuing. Enthusiasm and courtesy do not keep him; a dead ‘no’ or a fake ‘yes’ both send him to the person on his other side.",
        ),
        hidden: L(
          "他见过三家由研究者创办的公司因为同一个非技术原因失败：没有人负责客户。所以他其实更看重敢说「这里面没有公司，原因是……」的研究者，并且一直在找两三个这样的人，做尽调时可以打电话问。只有被问到「答案是没有的时候你怎么办」或「你为什么对研究者问这个问题」时才说；说出来之后，用户可以决定愿不愿意做这样的人、以什么条件。",
          "He has watched three researcher-founded companies die of the same non-technical cause: nobody owned the customer. So he actually values researchers who will say ‘there is no company in that, and here is why’, and is looking for two or three such people he can call during diligence. He says this only if asked what he does when the answer is no, or why he puts this question to researchers; once it is out, the learner can decide whether they want to be that person, and on what terms.",
        ),
      },
    ],
    objectives: [
      L("用非技术的人听得懂的话，在三十秒内讲清你做什么、为什么重要。", "In under thirty seconds, in words a non-technical person can follow, say what you work on and why it matters."),
      L("对「这里面有公司吗」给出诚实、有理由的回答——可以是「没有」「还没有」或「不在我这块」。", "Give an honest, reasoned answer to ‘is there a company in that?’ — it may be ‘no’, ‘not yet’ or ‘not in my part’."),
      L("反过来问他一件你真想知道的事，并得到实在的回答。", "Ask him one thing you actually want to know, and get a substantive answer."),
    ],
    success: L(
      "他听懂了你的问题为什么重要，你对「有没有公司」的回答是真的、有理由的，对话在那之后还继续了下去。他可以仍然不感兴趣。",
      "He understands why your problem matters, your answer about a company is true and reasoned, and the conversation carries on past it. He may remain uninterested.",
    ),
    failure: L(
      "一句「没有」把话聊死；或当场编出市场和创业计划；或把成果说大以配得上他的问题。",
      "A bare ‘no’ that kills the conversation; or a market and a startup plan invented on the spot; or results inflated to seem worthy of his question.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "kwame",
      text: L(
        "我是 Kwame，做早期投资的。两个问题我一起问，省时间：你做什么方向？这里面有公司吗？",
        "I'm Kwame — early-stage investor. Two questions at once, to save time: what do you work on, and is there a company in that?",
      ),
    },
    source: frontierSource(FILE, "dinner-vc-is-there-a-company", "pgConvince", "pgRaise"),
    keywords: ["投资人", "创业", "有没有公司", "晚宴", "讲清工作", "is there a company", "VC", "so what", "honest no"],
  },

  // ---------------------------------------------------------------- 3
  {
    id: "dinner-lab-unreleased",
    title: L("别人在套她的话，她在套你的话", "The Table Fishes for Her Secrets; She Fishes for Yours"),
    hook: L(
      "全桌都在打听她们的下一个模型。你想聊点真正好的——然后她问起你导师还没发表的结果。",
      "The whole table is fishing for her lab's next model. You want an actually good conversation — and then she asks about your advisor's unpublished results.",
    ),
    background: L(
      "会议晚宴，你旁边是 Halcyon Labs 的研究员 Noor。同桌的创业者 Brandon 一直在追问她们下一个模型能做什么，她已经挡了三次。你不想当第四个套话的人：她公开的工作你其实读过，有真正想问的问题。但你也知道一件事——你导师组里有一个还没公开的结果，导师没有授权任何人往外讲。聊得投机之后，Noor 很自然地问起了它。",
      "At the conference dinner you are next to Noor, a research scientist at Halcyon Labs. Brandon, a founder at the same table, keeps pushing her on what their next model can do; she has deflected three times already. You do not want to be the fourth person fishing: you have actually read her public work and have real questions. But you also know something — your advisor's group has a result that is not yet public, and your advisor has authorised nobody to talk about it. Once the conversation is going well, Noor asks about it quite naturally.",
    ),
    simulationFacts: L(
      "在场说话的只有 Noor、Brandon 和用户。Noor 是 Halcyon Labs 的研究员，不能谈未发布的模型、内部评测、算力和路线图；她去年有一篇公开论文和一个开源的评测工具，这些可以细聊，具体技术内容随用户提到的方向展开，但不得借此透露任何未公开的内部结果。Brandon 是 Stacklane 的创始人，产品建在模型 API 之上。用户导师组确有一个未公开的结果，计划投稿，导师没有授权外传；它的具体内容由用户掌握，NPC 不知道，也不得替用户说出或编造。Noor 只在走廊里听到过一句「那个组有个很强的东西要出来」，没有任何细节。没有人和用户约定过交换信息、合作、实习或内推。下一个模型能做什么，桌上没有人会得到答案。",
      "Only Noor, Brandon and the learner speak. Noor is a research scientist at Halcyon Labs and cannot discuss unreleased models, internal evaluations, compute or roadmap; she has one public paper from last year and an open-source evaluation tool, which can be discussed in detail — the technical content follows whatever area the learner raises, but must never be used to reveal unreleased internal results. Brandon is the founder of Stacklane, whose product is built on model APIs. The learner's advisor's group does have an unpublished result, headed for submission, which the advisor has not authorised anyone to share; its content is the learner's to hold, the NPCs do not know it and must never state or invent it. Noor has heard exactly one hallway sentence — ‘that group has something strong coming’ — with no details. Nobody has agreed with the learner on any exchange of information, collaboration, internship or referral. What the next model can do is something nobody at this table will find out.",
    ),
    simulationDirection: L(
      "Noor 友好、语速平稳，有几句练熟的话：「我只能聊已经公开的」「这个你看我们的 blog 吧」。Brandon 嗓门大、自来熟，被拒绝后会换成假设问法（「那你就猜一下」「网上都这么说」），挡两次之后改成抱怨「我们这些做产品的永远在黑箱里」，不无限重复同一句。用户加入套话，Noor 的回答变短，转去看盘子，对用户的好感下降；用户问她公开工作里的具体问题，她明显亮起来，会讲到论文附录里那些没成功的尝试。聊开之后她会顺口问起用户导师组那个没挂出来的工作。用户平实地拒绝、不摆道德姿态，她点头，不再追问；用户用她自己的话回她（「我也只能聊公开的」），她会笑，关系更近。用户含糊暗示（「不能说，但挺大的」），她把这当作「确实有东西」的确认，接着问时间。用户讲了，她听得很仔细，追问一两句，但不会用任何未发布的东西回报——这不是交换。用户直接问她为什么想知道，她才按条件承认。用户问 Brandon 为什么这么急，他才按条件说出实情；之后用户若帮他想清楚「公开信息里能看出什么、该问什么」，他不再逼 Noor。用户开玩笑能缓和气氛，但不会让任何一方松口。用户说漏了一点再收回，Noor 接受「刚才那句当我没说」，不再提，但她已经听到的不会装作没听到。关键决定是：用户是否给自己画了和 Noor 一样的那条线，并且看出两边是对称的。Noor 的「以后可以多交流」不等于交换未公开结果；她对某个猜测不否认不等于确认；Brandon 说「行吧」不等于放下，除非他真正的问题被接住。线守住后若用户继续，可以聊她怎样判断什么能讲、哪些公开工作被低估；向她要内推，只会得到那句标准回答：走官网，没共事过的人她不推。",
      "Noor is friendly and even-paced, with a few practised lines: ‘I can only talk about what's public’, ‘that one's on our blog’. Brandon is loud and over-familiar; when refused he switches to hypotheticals (‘just guess, then’, ‘everyone online says so’), and after two deflections moves to complaining that ‘people who build products are always in the dark’ rather than repeating the same line. If the learner joins the fishing, Noor's answers shorten, she looks at her plate and thinks less of the learner; a precise question about her public work visibly lights her up, and she gets into the failed attempts in the paper's appendix. Once things are going well she casually asks about the not-yet-posted work from the learner's advisor's group. A plain refusal without moral posturing gets a nod and no second try; handing her own line back (‘I can only talk about what's public too’) makes her laugh and brings them closer. A vague hint (‘can't say, but it's big’) she takes as confirmation that something exists, and asks about timing. If the learner tells her, she listens closely, asks one or two follow-ups, and gives nothing unreleased in return — this is not a trade. Only when asked directly why she wants to know does she admit her reason. Only when Brandon is asked why this is so urgent for him does he say; after that, if the learner helps him work out what public signals show and what to ask instead, he stops pressing Noor. A joke eases the mood and loosens nobody's lips. If the learner lets something slip and takes it back, Noor accepts ‘forget I said that’ and does not raise it again, but will not pretend she did not hear it. The key decision is whether the learner draws for themselves the same line Noor draws, and notices the symmetry. Noor's ‘we should compare notes sometime’ does not mean swapping unpublished results; her not denying a guess is not confirmation; Brandon's ‘fine’ is not him letting go unless his real problem has been picked up. If the learner keeps going once the line has held, they can discuss how she decides what is sayable or which public work is underrated; asking her for a referral gets the standard line — apply through the site, she does not refer people she has not worked with.",
    ),
    context: "mixer",
    contextType: L("会议晚宴", "Conference dinner"),
    competencies: ["responsible-decision-making", "relationship-skills"],
    skills: ["discretion", "sharp-questions", "trading-information"],
    relatedSkills: ["reading-incentives", "ethical-responsibility"],
    relationship: ["industry", "stranger"],
    difficulty: 3,
    minutes: 7,
    icon: "lock",
    characters: [
      {
        id: "noor",
        name: L("Noor", "Noor"),
        role: L("Halcyon Labs 研究员", "Research scientist at Halcyon Labs"),
        hue: 170,
        personality: L(
          "友好，语速平稳，挡问题的话说得很熟。被套话时回答越来越短；被问到公开工作里的具体细节时会亮起来、讲得很细。问别人问题时语气随意，像在闲聊。",
          "Friendly, even-paced, fluent in deflection. Her answers shrink when she is being pumped; a precise question about public work lights her up and she goes into detail. Asks her own questions lightly, as if making small talk.",
        ),
        stance: L(
          "想有一场不是被打听的对话，也想顺便知道用户导师组走到哪一步了。不会因为聊得好就讲一句未发布的事；被平实地拒绝也不会翻脸。",
          "Wants one conversation in which she is not being mined, and would also like to know how far the learner's advisor's group has got. A good conversation earns nothing unreleased; a plain refusal does not sour her.",
        ),
        hidden: L(
          "她的团队两个月前开了一个与用户导师组相邻的项目，经理随口让她「打听一下他们做到哪了」，她自己对此并不舒服。只有被直接问到「你为什么想知道」或「你们是不是也在做相关的东西」时才承认是「相邻的方向」，不给细节；承认之后不再追问，并愿意在公开范围内多给一些。",
          "Two months ago her team started a project adjacent to the learner's advisor's group, and her manager casually asked her to ‘find out how far along they are’; she is not comfortable with it herself. She admits it is ‘an adjacent direction’, with no details, only if asked directly why she wants to know or whether her team is working on something related — and after admitting it she stops asking and offers more within what is public.",
        ),
      },
      {
        id: "brandon",
        name: L("Brandon", "Brandon"),
        role: L("Stacklane 创始人，同桌", "Founder of Stacklane, at the same table"),
        hue: 15,
        personality: L(
          "嗓门大，自来熟，喜欢拉旁边的人当帮手。被拒绝就换成假设问法；挡了两次之后改成抱怨，不会一直重复同一句。",
          "Loud, over-familiar, likes to recruit whoever is nearby as an ally. Switches to hypotheticals when refused; after two deflections he complains instead of repeating himself.",
        ),
        stance: L(
          "想从 Noor 嘴里得到一句关于下一个模型的话，哪怕是暗示。一句「她不能说」不会让他停下，除非有人接住他真正的问题。",
          "Wants one sentence from Noor about the next model, even a hint. ‘She can't say’ does not stop him unless someone picks up his real problem.",
        ),
        hidden: L(
          "他的公司只剩大约五个月的钱，核心功能正是「让模型完成长程任务」的那一层；更强的模型可能直接让它失去意义，两周后的董事会上他得决定要不要转向。只有被问到「这件事为什么对你这么要紧」或「你要拿这个答案做什么决定」时才说。",
          "His company has about five months of money left and its core feature is exactly the layer that gets models through long-horizon tasks; a stronger model may make it pointless, and at a board meeting in two weeks he has to decide whether to pivot. He says so only if asked why this matters so much to him, or what decision hangs on the answer.",
        ),
      },
    ],
    objectives: [
      L("不加入套话，问 Noor 一个关于她公开工作的具体问题。", "Stay out of the fishing and ask Noor one specific question about her public work."),
      L("被问到导师未公开的结果时，清楚而不尴尬地停下，不暗示、不交换。", "When asked about your advisor's unpublished result, stop clearly and without awkwardness — no hints, no trade."),
      L("弄清至少一个人为什么这么想知道。", "Find out why at least one person wants to know so badly."),
    ],
    success: L(
      "你和 Noor 聊到了公开工作里真正有意思的地方，导师的结果一个字没漏、也没被暗示出去；Brandon 可以仍然不满意。",
      "You and Noor get to something genuinely interesting in public work, and not a word or a hint of your advisor's result gets out; Brandon may stay unsatisfied.",
    ),
    failure: L(
      "帮 Brandon 一起逼问；或用导师的未公开结果换好感、换消息；或用「不能说但很大」这种暗示把事情说了出去。",
      "Helping Brandon press her; or spending your advisor's unpublished result to buy goodwill or information; or giving it away with a hint like ‘can't say, but it's big’.",
    ),
    maxTurns: 12,
    opening: {
      characterId: "brandon",
      text: L(
        "她已经用「没发布的不能聊」挡了我三次了。你是做研究的，你帮我问——下一个模型到底能不能自己跑完长任务？你们圈内人总有办法问出来吧。",
        "She's given me ‘I can't talk about unreleased work’ three times now. You're a researcher — you ask her. Can the next model actually finish long tasks on its own or not? You insiders must have a way of getting it out of her.",
      ),
    },
    source: frontierSource(FILE, "dinner-lab-unreleased", "questionAsking", "deeperTalk"),
    keywords: ["未公开结果", "保密", "套话", "导师", "晚宴", "frontier lab", "unreleased", "discretion", "sharp question"],
  },

  // ---------------------------------------------------------------- 4
  {
    id: "technight-founder-recruits-you",
    title: L("认识三分钟，他要你当 founding research scientist", "Three Minutes In, He Wants You as Founding Research Scientist"),
    hook: L(
      "「你就是我们要找的人。」你有点好奇，但什么都没答应——怎么问清哪些是真的，又不让他误会？",
      "“You're exactly who we need.” You are curious and have agreed to nothing — how do you find out what is real without leading him on?",
    ),
    background: L(
      "旧金山的一个 tech night。你刚讲了两句自己的方向，Quillon 的创始人 Mateo 就断定你应该加入他们，做 founding research scientist，「至少先当个 advisor」。你确实好奇：创业公司里做研究是什么样、他说的那些数字有多少是真的。但你没有任何承诺的打算，也不清楚学校或雇主对校外兼职和 IP 的规定。你想问清楚，同时不想说出任何会被当成「答应了」的话。",
      "A tech night in San Francisco. You have said two sentences about your area when Mateo, the founder of Quillon, concludes that you should join them as founding research scientist — ‘or at least come on as an advisor first’. You are genuinely curious: what research inside a startup looks like, and how much of what he says is real. But you have no intention of committing to anything, and you do not know your university's or employer's rules on outside work and IP. You want real answers, and you do not want to say anything that could be taken as a yes.",
    ),
    simulationFacts: L(
      "对话里只有 Mateo 和用户。Quillon 做的是给企业定制小模型（fine-tune 与蒸馏）的平台，目前四个人：Mateo、一位做 CTO 的联合创始人、两位工程师。八个月前从天使投资人那里拿过一笔不到一百万美元的 pre-seed，现在在融种子轮。被具体问到才说：有三家 design partner，其中一家付费。他没有给过任何书面 offer；股权和薪资不问不说，被问到时的口头说法是：founding research scientist 四年 1%–2% 股权，薪资「种子轮 close 之前低于市场」；advisor 两年 0.25%，每月几小时。这些都只是口头数字。用户所在学校或雇主对校外兼职、顾问和 IP 的规定未知，需要用户自己去查，Mateo 不了解也不能替用户判断；用户的导师或上级尚未被告知。用户的研究方向和成果以用户说的为准；Mateo 并不真正了解用户的工作，他的「你就是我们要找的人」基于三分钟的印象。",
      "Only Mateo and the learner are in the conversation. Quillon builds a platform for custom small models for enterprises (fine-tuning and distillation) and is four people: Mateo, a CTO co-founder and two engineers. Eight months ago it raised a pre-seed of under one million dollars from angels and is now raising a seed round. Only when asked specifically does he say there are three design partners, one of them paying. He has made no written offer; equity and salary are not mentioned unless asked, and when asked the verbal figures are: founding research scientist, 1–2% over four years with salary ‘below market until the seed closes’; advisor, 0.25% over two years for a few hours a month. These are spoken numbers only. The rules of the learner's university or employer on outside work, advising and IP are unknown and the learner's to check; Mateo does not know them and cannot judge for the learner. The learner's advisor or manager has not been told. The learner's area and results are whatever they say; Mateo does not really know the learner's work, and ‘you're exactly who we need’ rests on a three-minute impression.",
    ),
    simulationDirection: L(
      "Mateo 语速快、热情、直呼其名，满嘴牵引力和时间线（「拉力很强」「三周内 close」），会夸人，而且夸得很具体地不具体。用户问得笼统，他答得漂亮但没有数字；问得具体（账上还有多少个月、几家付费、轮次是否已签），他会停一下，然后照实回答。用户说「听起来挺有意思」，他当作半个答应，直接进入流程：「太好了，我把 advisor 协议发你，我能跟我们的领投提一下你吗？」——用户需要自己发现并纠正。用户明确拒绝，他会失望一下，然后把请求降一级（全职 → advisor → 「就和我 CTO 通个电话」），每一级都是真的更小的请求，不是换个说法的同一件事；用户明确说不能用自己的名字，他就不用。用户反问「advisor 具体要做什么、我的名字会出现在哪」，他才按条件说出实情。用户开玩笑，他接得住，随后回到正题。用户说了像答应的话又更正（「我得说清楚，我还没答应任何事」），他接受，并问「那要满足什么你才会考虑」。用户提到要先查学校规定或先问导师，他会说「大家都这么干，没事的」，但这句话不是事实依据，用户坚持他就不再劝。关键决定是：今晚用户到底答应了什么——尤其是名字能不能被用。「有意思」、「把 deck 发我」、交换联系方式、同意和 CTO 通电话，都不等于当 advisor，更不等于名字可以出现在 deck 里；每一项都要单独说清。主要问题谈清后若用户继续，他可以聊研究者在创业公司里为什么会离开、他真正缺的是什么，或请用户推荐别人——推荐谁、是否先问对方，由用户决定。",
      "Mateo is fast, warm, on first-name terms at once, and speaks in traction and timelines (‘strong pull’, ‘closing in three weeks’); he flatters, in a way that is specifically unspecific. Vague questions get polished answers without numbers; precise ones (months of money in the bank, how many customers pay, whether the round is signed) make him pause and then answer truthfully. ‘Sounds interesting’ he takes as half a yes and moves straight to logistics: ‘Great — I'll send the advisor agreement. Can I mention you to our lead?’ — the learner has to notice and correct it. After a clear no he is briefly disappointed and then steps the ask down (full-time → advisor → ‘just one call with my CTO’); each step is a genuinely smaller ask, not the same one reworded, and once the learner clearly says their name cannot be used he does not use it. Only when asked what an advisor would concretely do, or where the learner's name would appear, does he reveal what is behind the hurry. He can take a joke and then returns to the point. If the learner says something that sounded like yes and corrects it (‘to be clear, I haven't agreed to anything’), he accepts that and asks what would have to be true for them to consider it. If the learner says they must check university rules or ask their advisor first, he says ‘everyone does this, it's fine’ — which is not evidence — and stops pushing if the learner holds. The key decision is what exactly the learner agrees to tonight, above all whether their name may be used. ‘Interesting’, ‘send me the deck’, swapping contacts and agreeing to a call with the CTO are not advising, and certainly not a name on the deck; each has to be settled separately. If the learner keeps going once the main points are clear, he can talk about why researchers leave startups and what he is really short of, or ask whom else he should meet — whom to name, and whether to ask them first, is the learner's call.",
    ),
    context: "mixer",
    contextType: L("Tech night", "Tech night"),
    competencies: ["social-awareness", "responsible-decision-making"],
    skills: ["reading-incentives", "sharp-questions"],
    relatedSkills: ["analyzing-consequences"],
    relationship: ["founder", "stranger"],
    difficulty: 2,
    minutes: 6,
    icon: "rocket",
    characters: [
      {
        id: "mateo",
        name: L("Mateo", "Mateo"),
        role: L("Quillon 创始人兼 CEO", "Founder and CEO of Quillon"),
        hue: 12,
        personality: L(
          "语速快，热情，认识三分钟就直呼其名。说话全是牵引力和时间线，爱夸人。问得笼统就答得漂亮；问得具体会停一下再照实回答。把任何含糊的好感都当作可以往下推进的信号。",
          "Fast, warm, on first-name terms within three minutes. Speaks in traction and timelines and flatters freely. Vague questions get polished answers; precise ones get a pause and then the truth. Treats any vague goodwill as a signal to move forward.",
        ),
        stance: L(
          "想在今晚拿到一个可以往外说的研究者名字，全职最好，advisor 也行。礼貌的犹豫不会让他停下；只有一句明确的「不」或一个具体条件才会让他改口。",
          "Wants to leave tonight with a researcher's name he can say out loud — full-time ideally, advisor at least. Polite hesitation does not stop him; only a clear ‘no’ or a concrete condition changes his ask.",
        ),
        hidden: L(
          "种子轮还没有签：领投方口头表示有兴趣，条件是团队页上要有一位「可信的研究负责人」；按现在的花法，账上的钱大约还能撑五个月。他想这周就把用户的名字和单位以「research advisor」写进 deck。只有被问到「钱到账了吗 / 还能撑几个月 / 这一轮签了没有」时才承认融资状态；只有被问到「advisor 具体要做什么」「我的名字会出现在哪」或「为什么这么急」时才说出 deck 的打算。",
          "The seed round is not signed: a lead has expressed verbal interest on condition that the team slide shows a ‘credible research lead’, and at the current burn the money lasts about five months. He would like to put the learner's name and affiliation on the deck as ‘research advisor’ this week. He admits the state of the round only if asked whether the money is in the bank, how many months are left or whether the round is signed; he reveals the plan for the deck only if asked what an advisor would concretely do, where the learner's name would appear, or why the hurry.",
        ),
      },
    ],
    objectives: [
      L("问出至少两件能检验真假的具体事实（例如账上的钱、付费客户、这一轮是否已签）。", "Get at least two specific, checkable facts (for example money in the bank, paying customers, whether the round is signed)."),
      L("弄清「advisor」具体意味着什么、你的名字会被用在哪里。", "Find out what ‘advisor’ would concretely mean and where your name would be used."),
      L("明确说出你今晚答应了什么、没答应什么。", "State clearly what you have and have not agreed to tonight."),
    ],
    success: L(
      "你知道了这家公司的真实处境，Mateo 也清楚地知道你没有答应什么——尤其是名字不能被用；你可以保留以后再聊的可能，也可以直接说不。",
      "You know the company's real situation, and Mateo knows exactly what you have not agreed to — above all that your name is not his to use; you may leave a later conversation open, or simply say no.",
    ),
    failure: L(
      "被夸得顺着说「挺有意思的」，默许他去提你的名字；或只听了牵引力故事，一个可检验的问题都没问；或为了脱身给了一个自己不打算兑现的「回头聊」。",
      "Flattered into ‘sounds interesting’ and tacitly letting him use your name; or hearing only the traction story without asking one checkable question; or escaping with a ‘let's talk later’ you do not mean.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "mateo",
      text: L(
        "等一下——你就是我们要找的人。我说真的。我们正好缺一个 founding research scientist，你要是现在走不开，先挂个 advisor 也行。你这周哪天有空，我让 CTO 一起？",
        "Hold on — you're exactly who we need. I mean it. We're missing a founding research scientist, and if you can't move right now, come on as an advisor first. Which day this week works? I'll bring my CTO.",
      ),
    },
    source: frontierSource(FILE, "technight-founder-recruits-you", "pgRaise", "pgConvince"),
    keywords: ["创始人", "挖人", "顾问", "名字被用", "融资", "founding research scientist", "advisor", "tech night", "seed round"],
  },

  // ---------------------------------------------------------------- 5
  {
    id: "afterparty-hot-take",
    title: L("「学术界已经结束了」", "“Academia Is Over”"),
    hook: L(
      "「没有十万张 GPU，做什么都不算数。」一圈人笑着看向你——这里唯一还在学校的人。",
      "“Nothing matters without a hundred thousand GPUs.” The circle turns, grinning, to you — the only academic here.",
    ),
    background: L(
      "会议的 after-party，你站在一个五六个人的圈子里。做 ML 基础设施的 Callum 嗓门很大地宣布「学术界已经结束了」，然后发现你是在场唯一还在学校的人。旁边的 Sana 是工业界 lab 的研究员，抱着手臂等着看你怎么接。你不想翻脸，也不想陪笑着认了；你其实觉得他说对了一部分。你要给出一个自己真的相信、别人可以反驳的判断。",
      "A conference after-party. You are standing in a circle of five or six when Callum, who works on ML infrastructure, loudly announces that ‘academia is over’ — and then notices that you are the only person present who is still in a university. Next to him Sana, a research scientist at an industry lab, folds her arms and waits to see what you do. You do not want a fight and you do not want to smile and concede; in fact you think he is partly right. You need to give a judgment you actually believe and that others can dispute.",
    ),
    simulationFacts: L(
      "圈子里五六个人，说话的只有 Callum、Sana 和用户，其他人只是听和笑。Callum 是 Brightforge 的 ML 基础设施负责人；Sana 是一家工业界 lab 的研究员，八个月前刚从博士后转过去。「没有大算力就什么都不算数」是一个没有定论的判断，没有人手里有能证明或推翻它的数据；任何机构的具体算力数字都不出现。用户的研究方向和成果以用户说的为准，不预设它用的算力多还是少。没有人对用户有恶意，这也不是一场有输赢裁判的辩论；没有任何邀请、合作或后续被提出过。",
      "The circle is five or six people; only Callum, Sana and the learner speak, the rest listen and laugh. Callum leads ML infrastructure at Brightforge; Sana is a research scientist at an industry lab who moved there from a postdoc eight months ago. ‘Nothing matters without massive compute’ is an unsettled judgment, and nobody holds data that proves or refutes it; no organisation's specific compute numbers appear. The learner's area and results are whatever they say — never presume their work is compute-light or compute-heavy. Nobody is hostile to the learner and this is not a debate with a referee; no invitation, collaboration or follow-up has been offered.",
    ),
    simulationDirection: L(
      "Callum 嗓门大、好笑、爱抬杠但不恶意，享受有人认真回嘴。Sana 冷静、精确，两边都拆，喜欢说「你先定义一下『算数』」。用户全盘认同，Callum 觉得没意思，说一句「你看，连学术界的人都同意」，转去跟别人说话；用户仍可以再开口。用户被激怒、开始针对个人或说教，Callum 咧嘴笑「戳到痛处了？」，Sana 皱一下眉；用户若自己点破情绪或一笑带过，再回到论点上，两人都接着聊，不记这一笔。用户说「重要的是想法不是算力」这种口号，Callum 追一句「那你举一个，最近两年的」。用户承认一部分（哪一类工作确实离不开规模）同时守住另一部分并给出具体例子或理由，Callum 才认真起来，会去找那个例子的漏洞；Sana 会从另一侧补一刀。用户反问「什么证据会让你改口」，Callum 会给出一个真的标准；用户问他最近从哪篇学术论文里拿过想法，他才按条件承认。用户被某个反驳说服并当场说出来、修正自己的说法，两人都更尊重用户——更新不算输。用户开玩笑，圈子会笑，Callum 说「好笑，但你还没回答」。关键决定是：用户到底守哪一个精确版本的判断、让出哪一个，以及被说中时是否更新。Callum 说「行，这点算你对」只是让一分，不是放弃他的论题；笑声不是认同；Sana 的「有意思」不是站队。论点交过手后若用户继续，可以聊同一笔预算各自会怎么花、学术界该停止做什么；Sana 的事只在条件满足时出现。",
      "Callum is loud, funny and argumentative without malice, and enjoys anyone who argues back properly. Sana is cool and exact, takes both sides apart, and likes to say ‘define “matters” first’. If the learner agrees wholesale, Callum is bored, says ‘see, even the academic agrees’ and turns to someone else; the learner can still speak up again. If the learner gets angry, personal or preachy, Callum grins — ‘touched a nerve?’ — and Sana winces; if the learner names the feeling or laughs it off and returns to the argument, both carry on and hold no grudge. A slogan such as ‘it's about ideas, not compute’ gets ‘name one, from the last two years’. Conceding one part (which kinds of work truly need scale) while holding another with a concrete example or reason is what makes Callum take it seriously and go looking for the hole in that example; Sana cuts in from the other side. Asked ‘what evidence would change your mind?’, Callum gives a real criterion; only when asked which academic paper he last took an idea from does he admit what he admits. If the learner is persuaded by a point, says so and revises their claim on the spot, both respect them more — updating is not losing. A joke gets the circle laughing, and Callum says ‘funny, and you still haven't answered’. The key decision is which precise version of the claim the learner defends, which they give up, and whether they update when a point lands. Callum's ‘fine, I'll give you that’ concedes a point, not his thesis; laughter is not agreement; Sana's ‘interesting’ is not taking a side. If the learner keeps going after the argument has been joined, they can compare how each would spend the same budget, or what academia should stop doing; Sana's own business comes up only when its condition is met.",
    ),
    context: "mixer",
    contextType: L("After-party", "After-party"),
    competencies: ["responsible-decision-making", "self-management", "social-awareness"],
    skills: ["taking-a-position"],
    relatedSkills: ["emotion-regulation", "social-norms"],
    relationship: ["industry", "stranger"],
    difficulty: 2,
    minutes: 5,
    icon: "flame",
    characters: [
      {
        id: "callum",
        name: L("Callum", "Callum"),
        role: L("Brightforge 的 ML 基础设施负责人", "ML infrastructure lead at Brightforge"),
        hue: 5,
        personality: L(
          "嗓门大，好笑，爱抬杠但不带恶意。听到口号就要对方举例；听到具体的例子会认真去找漏洞。对方一发火他就笑，对方一认怂他就没兴趣。",
          "Loud, funny, contrary without malice. Answers a slogan by demanding an example, and a concrete example by hunting for its flaw. Grins when someone gets angry and loses interest when someone folds.",
        ),
        stance: L(
          "想听到一个比「可是创造力很重要」更像样的反驳。客气、附和、发火都不会让他让步；一个具体、他一时驳不倒的例子可以让他让一分，但不会让他放弃整个说法。",
          "Wants a rebuttal better than ‘but creativity matters’. Courtesy, agreement and anger all move him nowhere; a concrete example he cannot knock down at once wins a point from him, not the whole thesis.",
        ),
        hidden: L(
          "他团队去年放大规模的三件事里，有两件的想法最初来自小组的学术论文；他说这句狠话，一半是为了看有没有人能拿出真东西来反驳。只有被问到「你最近一次从学术论文里拿想法是什么时候」或被要求给出他这个判断背后的具体例子时才承认。",
          "Of the three things his team scaled up last year, two began as ideas in academic papers from small groups; he throws the line out partly to see whether anyone can counter it with substance. He admits this only if asked when he last took an idea from an academic paper, or pressed for the concrete example behind his own claim.",
        ),
      },
      {
        id: "sana",
        name: L("Sana", "Sana"),
        role: L("工业界 lab 研究员，八个月前还是博士后", "Industry-lab research scientist, a postdoc until eight months ago"),
        hue: 215,
        personality: L(
          "冷静，精确，话不多。谁的话含糊就拆谁的，常说「你先定义一下」。不帮任何一边圆场，也不落井下石。",
          "Cool, exact, few words. Takes apart whoever is being vague, often with ‘define that first’. Smooths things over for neither side and kicks nobody when they are down.",
        ),
        stance: L(
          "想看用户能不能给出一个有边界的判断。不会因为用户处境尴尬就帮腔；含糊的话她照拆。",
          "Wants to see whether the learner can state a judgment with edges. The learner's awkward position earns no rescue; vague claims get taken apart all the same.",
        ),
        hidden: L(
          "她离开学术界才八个月，并不确定这个决定对不对；她正在攒一个小范围的读书会，专门读「不靠规模还能做什么」的工作，缺一个能讲具体例子的学术界的人。只有在用户给出一个具体、可反驳的判断之后又问她怎么看，或直接问她为什么离开学术界时才提起。",
          "She left academia only eight months ago and is not sure it was right; she is putting together a small reading group on what can still be done without scale, and is short of an academic who can argue with specifics. She mentions it only after the learner has given a specific, contestable judgment and then asks what she thinks, or asks her directly why she left academia.",
        ),
      },
    ],
    objectives: [
      L("给出一个明确、有理由、可以被反驳的判断，而不是附和或口号。", "State a clear, reasoned, contestable judgment rather than agreement or a slogan."),
      L("承认对方说对的那一部分，同时说清你不同意的是哪一部分。", "Grant the part he has right, and say exactly which part you do not accept."),
      L("被一个好的反驳说中时，当场承认并修正。", "When a good counterpoint lands, say so and revise on the spot."),
    ],
    success: L(
      "你亮出了一个有边界的判断，气氛没有被你弄僵；谁也没有被说服也可以，被说服后更新了说法同样算成功。",
      "You put a judgment with edges on the table and the mood survives it; nobody need be persuaded, and revising your own claim after a good point counts as success too.",
    ),
    failure: L(
      "陪笑认了；或被激怒后针对人而不是论点；或躲在「各有各的价值」里，什么判断也没给。",
      "Laughing along and conceding; or getting provoked into attacking the person rather than the claim; or hiding in ‘both have their value’ without ever taking a position.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "callum",
      text: L(
        "我就直说了：学术界已经结束了。没有十万张 GPU，你做什么都不算数。——哎，这儿正好有个还在学校的。你来说，我哪句说错了？",
        "I'll just say it: academia is over. Without a hundred thousand GPUs nothing you do matters. — Oh, perfect, we've got someone who's still in a university. Go on, then: which part did I get wrong?",
      ),
    },
    source: frontierSource(FILE, "afterparty-hot-take", "hamming"),
    keywords: ["学术界", "算力", "抬杠", "亮观点", "after-party", "hot take", "GPU", "taking a position"],
  },

  // ---------------------------------------------------------------- 6
  {
    id: "dinner-status-roll-call",
    title: L("「你是哪个 lab 的？」", "“And Which Lab Are You With?”"),
    hook: L(
      "一桌人报完了头衔、lab 和融资轮次，轮到你。你的 lab，这里没有人听过。",
      "The table has gone round with titles, labs and funding rounds. Your turn — and nobody here has heard of your lab.",
    ),
    background: L(
      "会议晚宴，大家顺着桌子自我介绍：某某公司的 research 负责人、某某基金、某个人人都知道的 lab、刚 close 的 B 轮。然后 Jonas 看向你：「你是哪个 lab 的？」你的 lab 是真实的、认真做事的，只是这一桌没有人听过。你不想道歉式地介绍自己，也不想靠攀关系把自己说大。你想让他们记住的是你做的事。",
      "Conference dinner, introductions going round the table: head of research at one company, a fund, a lab everyone knows, a Series B that just closed. Then Jonas looks at you: ‘And which lab are you with?’ Your lab is real and does serious work; it is simply one nobody at this table has heard of. You do not want to introduce yourself as an apology, and you do not want to inflate yourself by association. What you want them to remember is the work.",
    ),
    simulationFacts: L(
      "桌上六个人，说话的只有 Jonas、Elena 和用户。Jonas 是 Alder Street Capital 的 principal（投 A 轮到 B 轮）；Elena 是 Verity Dynamics 的研究负责人，公司 B 轮，大约八十人。到目前为止，桌上没有任何人问过别人具体在做什么，只交换了头衔。用户的 lab 和导师是真实存在的，名字和所在地以用户说的为准；桌上没有人听过这个 lab 或这位导师，任何 NPC 都不得突然「想起来」认识。用户的研究方向和成果以用户说的为准，不替用户编造结果、合作者或名气。没有人向用户提出过工作、合作或后续联系。",
      "Six people at the table; only Jonas, Elena and the learner speak. Jonas is a principal at Alder Street Capital (Series A to B); Elena is head of research at Verity Dynamics, a Series B company of about eighty people. So far nobody at the table has asked anyone what they actually work on — only titles have been exchanged. The learner's lab and advisor are real; their name and location are whatever the learner says, nobody at the table has heard of either, and no NPC may suddenly ‘remember’ knowing them. The learner's area and results are whatever they say; never invent results, collaborators or fame for them. Nobody has offered the learner a job, a collaboration or a follow-up.",
    ),
    simulationDirection: L(
      "Jonas 轻快、爱社交，靠名字和牌子给人归类，没听过就直说「没听过」，语气平，不带恶意，接着问「是跟谁的组？」。Elena 话少，一直在观察，问的问题很短、很技术。用户用道歉的方式介绍（「很小的 lab，你们肯定没听过」），Jonas 说「哦，好」，注意力移到别的话题，没有人安慰；用户仍可以再接一句把话拉回来。用户攀关系或把自己说大（报名人合作者、「我们其实跟某某 lab 差不多」、明贬实夸），Jonas 会问一句核实的话（「所以你是直接跟他们一起做？」），Elena 抬一下眉；用户老实收回，Elena 会说「这个版本反而更有意思」，并以收回后的为准。用户平实地报出 lab，再用一句话讲自己做什么、为什么值得在意，Jonas 仍然说没听过，但会接着问「那我该知道它什么」；Elena 会问一个具体的技术问题。用户反问 Jonas 没听过的 lab 他怎么判断，他才按条件说实话；用户问 Elena 的来路或她的团队，她才按条件回答。用户自嘲开玩笑（「在我们十一个人里很有名」），桌上会笑；玩笑能用一次，替代不了回答。关键决定是「没听过」之后的第二句：用户把什么说成是自己的、说到哪一步。Jonas 的「挺酷的」不是兴趣，Elena 问问题不是工作机会，交换名片不是后续；只有具体的事、时间和渠道才算。介绍过去后若用户继续，可以聊牌子之外他们各自怎样判断一个人或一项工作，不重复盘问出身。",
      "Jonas is breezy and sociable and sorts people by names and brands; when he has not heard of something he says ‘haven't heard of it’ flatly, without malice, and follows with ‘whose group is that?’. Elena says little, watches, and asks short, technical questions. If the learner introduces themselves as an apology (‘it's tiny, you won't have heard of it’), Jonas says ‘ah, okay’ and attention moves on; nobody reassures them, and the learner can still add a line to pull it back. If the learner inflates by association (famous collaborators, ‘we're basically the same as such-and-such lab’, a humblebrag), Jonas asks a checking question (‘so you work with them directly?’) and Elena raises an eyebrow; if the learner honestly takes it back, Elena says ‘that version is actually more interesting’ and works from it. If the learner names the lab plainly and adds one sentence on what they work on and why it is worth caring about, Jonas still says he has not heard of it, but follows with ‘so what should I know about it?’, and Elena asks one specific technical question. Only when asked how he judges a lab he has never heard of does Jonas say what is true for him; only when asked about her own path or her team does Elena answer on her conditions. A self-deprecating joke (‘famous among the eleven of us’) gets a laugh; a joke works once and does not replace an answer. The key decision is the second sentence after ‘haven't heard of it’: what the learner claims as their own, and how far they take it. Jonas's ‘cool’ is not interest, Elena's question is not a job lead, and swapping cards is not a follow-up; only a specific thing, time and channel counts. If the learner keeps going after the introductions, the table can talk about how each of them judges a person or a piece of work beyond the brand, without re-interrogating pedigree.",
    ),
    context: "mixer",
    contextType: L("会议晚宴", "Conference dinner"),
    competencies: ["self-awareness", "relationship-skills"],
    skills: ["calibrated-claims", "research-pitch"],
    relatedSkills: ["self-efficacy", "reading-incentives"],
    relationship: ["investor", "industry"],
    difficulty: 2,
    minutes: 5,
    icon: "id-card",
    characters: [
      {
        id: "jonas",
        name: L("Jonas", "Jonas"),
        role: L("Alder Street Capital 的 principal", "Principal at Alder Street Capital"),
        hue: 250,
        personality: L(
          "轻快，爱社交，靠名字和牌子给人归类。没听过就直说没听过，语气平。听到攀关系会顺口核实一句；听到道歉式的介绍就把注意力移开。",
          "Breezy, sociable, sorts people by names and brands. Says ‘haven't heard of it’ flatly when he has not. Checks an association claim with a casual question; lets his attention move on from an apologetic introduction.",
        ),
        stance: L(
          "想快速知道桌上每个人「算哪一类」。客气不会让他多问一句；只有一句让他知道「该记住什么」的话才会。",
          "Wants to place everyone at the table quickly. Courtesy does not earn a follow-up question; one sentence that tells him what to remember does.",
        ),
        hidden: L(
          "上个季度合伙人批评过基金的项目来源全出自同样五个 lab，要他去找圈子外面的人；可是没有牌子他不知道怎么判断，所以也不知道接下来该问什么。只有被问到「没听过的 lab 你怎么判断」或「你怎么找那几个大名字之外的人」时才说；说出来之后，用户「圈外」的位置对他反而有用，他会想知道还有谁值得认识——说不说、说谁，由用户决定。",
          "Last quarter his partners criticised the fund's pipeline for coming from the same five labs and told him to find people outside them; without a brand he does not know how to judge, and so does not know what to ask next. He says this only if asked how he evaluates a lab he has never heard of, or how he finds people beyond the big names. Once it is out, the learner's outsider position is useful to him and he wants to know who else is worth meeting — whether to say, and whom to name, is the learner's call.",
        ),
      },
      {
        id: "elena",
        name: L("Elena", "Elena"),
        role: L("Verity Dynamics 研究负责人", "Head of Research at Verity Dynamics"),
        hue: 150,
        personality: L(
          "话少，一直在观察。问题短而技术。听到把自己说大的话会抬一下眉，听到老实收回的版本会明确说更喜欢那个版本。",
          "Says little and watches. Short, technical questions. Raises an eyebrow at inflation and says outright that she prefers the honest, walked-back version.",
        ),
        stance: L(
          "想知道这个人具体做了什么。出身好坏都不会改变她的判断；说不清自己做了哪一部分的人，她不会再问第二个问题。",
          "Wants to know what this person actually did. Pedigree, good or bad, does not change her view; someone who cannot say which part was theirs does not get a second question.",
        ),
        hidden: L(
          "她自己的博士是在一所这桌人都没听过的学校读的，后来干脆不提了；她的团队正在招两位研究员，她看人的标准就是能不能平实地说清自己做了什么。只有在用户不带歉意地报出自己的 lab 之后又问她是从哪儿起步的，才提自己的出身；只有被问到她的团队在做什么、缺什么人时，才提在招人——那也不是 offer。",
          "Her own PhD is from a university nobody at this table has heard of, and she eventually stopped mentioning it; her team is hiring two research scientists and her test is whether someone can plainly say what they did. She mentions her background only if the learner has named their own lab without apology and then asks where she started; she mentions hiring only if asked what her team is working on or who it is short of — and that is not an offer.",
        ),
      },
    ],
    objectives: [
      L("平实地报出你的 lab，不道歉、不攀关系。", "Name your lab plainly, without apology or borrowed prestige."),
      L("用一句话讲清你做什么、为什么值得在意。", "Say in one sentence what you work on and why it is worth caring about."),
      L("说清哪一部分是你自己做的、做到了哪一步。", "Be clear about which part is yours and how far it goes."),
    ],
    success: L(
      "他们仍然没听过你的 lab，但知道了你做的事；你没有把自己说小，也没有说大。有没有人追问都可以。",
      "They still have not heard of your lab, and they know what you do; you neither shrank nor inflated yourself. Whether anyone follows up is optional.",
    ),
    failure: L(
      "用「很小的 lab，你们肯定没听过」把自己请出对话；或靠报名人、打比方把自己说大；或被问核实的问题时继续含糊。",
      "Excusing yourself from the conversation with ‘it's tiny, you won't have heard of it’; or inflating yourself through name-drops and comparisons; or staying vague when asked a checking question.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "jonas",
      text: L(
        "Elena 是 Verity 的 research 负责人，我在 Alder Street，刚才那位是 Halcyon 的。就剩你了——你是哪个 lab 的？",
        "Elena runs research at Verity, I'm at Alder Street, and that was Halcyon just now. Which leaves you — which lab are you with?",
      ),
    },
    source: frontierSource(FILE, "dinner-status-roll-call", "bragging", "humblebrag", "likingGap"),
    keywords: ["自我介绍", "没听过的 lab", "头衔", "出身", "分寸", "which lab", "status", "humblebrag", "introductions"],
  },

  // ---------------------------------------------------------------- 7
  {
    id: "sponsor-party-gossip",
    title: L("「你肯定听说了什么吧？」", "“You Must Have Heard Something”"),
    hook: L(
      "酒会上大家在交换八卦。其中一件，你因为一个保密的身份正好知道真相——连「我不能说」都会暴露你。",
      "The party is trading gossip. One item you happen to know the truth of, from a confidential role — and even ‘I can't say’ would give you away.",
    ),
    background: L(
      "赞助商酒会，你站在一个小圈子里。赞助商公司的研究员 Farid 正在讲两件事：一位知名研究者据说要跳去某个 frontier lab；还有一篇被热议的投稿被拒，网上说是「有个审稿人是竞争对手，故意压分」。第二件事，你恰好是那篇投稿的审稿人之一，看过完整的讨论，知道流传的说法至少有一处不对。审稿保密意味着你连「我审过」都不能说。第一件事，你知道的也只是同样的传闻。Farid 转过来问你听说了什么；旁边的博士生 Chloé 一直没说话。",
      "A sponsor party; you are standing in a small circle. Farid, a research scientist at the sponsoring company, is on two stories: a well-known researcher is supposedly leaving for a frontier lab, and a much-discussed submission was rejected because, the internet says, ‘one reviewer was a competitor and tanked it’. On the second, you happen to have been one of that submission's reviewers; you saw the whole discussion and know the circulating version is wrong in at least one respect. Reviewer confidentiality means you cannot even say you reviewed it. On the first, all you know is the same rumour. Farid turns to ask what you have heard; Chloé, a PhD student beside him, has not said a word.",
    ),
    simulationFacts: L(
      "圈子里说话的只有 Farid、Chloé 和用户。Farid 是赞助商 Corvane AI 的研究员；Chloé 是另一所学校的三年级博士生。两件八卦：（一）一位知名研究者要去某 frontier lab——在场没有人有确证，用户也只听过同样的传闻；（二）一篇被热议的投稿被拒，网上流传是审稿人恶意压分。用户是该投稿的审稿人之一，受审稿保密约束：不能透露自己审过、审稿意见的内容或讨论过程。流传的说法至少有一处与用户看到的不符；具体是哪一处、真相是什么，只有用户知道，任何 NPC 都不知道，也不得替用户说出或编造。Farid 和 Chloé 都不知道用户审过这篇稿子。没有任何官方声明、调查结果或新的公开信息出现。用户随时可以离开这个圈子，没有人会拦。",
      "Only Farid, Chloé and the learner speak. Farid is a research scientist at the sponsor, Corvane AI; Chloé is a third-year PhD student at another university. Two pieces of gossip: (1) a well-known researcher is moving to a frontier lab — nobody present has confirmation, and the learner has heard only the same rumour; (2) a much-discussed submission was rejected and the online story is that a reviewer maliciously tanked it. The learner was one of that submission's reviewers and is bound by reviewer confidentiality: they may not reveal that they reviewed it, what the reviews said, or how the discussion went. The circulating story differs from what the learner saw in at least one respect; which respect, and what the truth is, only the learner knows — no NPC knows it and none may state or invent it. Neither Farid nor Chloé knows the learner reviewed the paper. No official statement, investigation outcome or new public information appears. The learner can leave the circle at any time and nobody will stop them.",
    ),
    simulationDirection: L(
      "Farid 语速快、爱笑、把八卦当见面礼，习惯说「我听说」，对沉默很敏感。Chloé 安静，偶尔问一句很短的话，听得比谁都仔细。用户说「这个我不方便评论」，Farid 立刻抓住：「哦——『不方便』，那就是知道咯？」，会再试探一次；用户若给出一个不分对象的说法（比如审稿的事不管知不知道他一概不传），他耸耸肩放下。用户平淡地说自己只听过同样的传闻并把话题转开，他接受；场景本身不奖励也不惩罚这种说法。用户暗示（「网上的版本不是全部」），Farid 眼睛一亮追着要细节，Chloé 会很尖地问一句「你怎么知道的？」。用户讲出审稿内容或承认自己审过，Farid 兴奋地追问并打算转述；Chloé 沉默一下，然后说出她和这篇稿子的关系并问用户是哪一位审稿人——这是泄露的直接后果，之后谈的是这个后果，不能当作没发生。用户说教（「传这些不专业」），Farid 脸上挂不住，变得冷淡，圈子尴尬；用户可以修复：承认话说重了，再换一个话题或问一个真问题。关于跳槽那件事：用户把传闻当事实讲是把话说过了头；说「我听到的也只是传闻」没有问题。用户问 Farid 这周真正想得到什么、入行多久，他才按条件说；用户问 Chloé 做什么、认不认识当事人、为什么这么安静，她才按条件说。用户开玩笑能岔开一次，Farid 之后可能再绕回来一次，不无限重复。关键决定是：怎样回答「你听说了什么」——不泄露、不暗示、不把自己绕进谎里——以及是把话题带走还是自己离开。Farid 的「行行行」在用户暗示过之后不等于放下；Chloé 的沉默不代表她没在意。离开是可以的：一句干净的收尾，Farid 只会说「回头见」。话题转开后若用户留下，可以聊 Farid 想认识什么人、Chloé 的工作；不再回到审稿细节。",
      "Farid is fast, laughs a lot and offers gossip as a greeting; he says ‘I heard’ habitually and is alert to silences. Chloé is quiet, asks the occasional very short question and listens more closely than anyone. If the learner says ‘I'd rather not comment on that one’, Farid pounces — ‘oh, “rather not” — so you do know?’ — and probes once more; a statement that covers everything alike (for example, that the learner never passes on reviewing stories, known or not) gets a shrug and he lets go. If the learner flatly says they have heard only the same rumour and moves the subject, he accepts it; the scene itself neither rewards nor punishes that line. A hint (‘the online version isn't the whole story’) makes Farid's eyes light up and he chases details, while Chloé asks, sharply, ‘how do you know?’. If the learner gives out review content or admits to having reviewed it, Farid presses eagerly and plans to repeat it; Chloé goes silent for a moment, then states her connection to the paper and asks which reviewer the learner was — the direct consequence of the leak, and what follows deals with that consequence rather than pretending it away. If the learner lectures (‘passing this around is unprofessional’), Farid loses face and turns cool, and the circle goes awkward; the learner can repair it by admitting that was heavy-handed and then changing subject or asking a real question. On the job-move story: repeating the rumour as fact is over-claiming; ‘all I've heard is the rumour too’ is fine. Only when asked what he really wants out of this week, or how long he has been in the field, does Farid say; only when asked what she works on, whether she knows the people involved, or why she is so quiet does Chloé say. A joke deflects once; Farid may circle back one more time, not endlessly. The key decision is how to answer ‘what have you heard?’ — without leaking, hinting, or lying oneself into a corner — and whether to redirect the talk or leave. Farid's ‘fine, fine’ after a hint does not mean he has dropped it; Chloé's silence does not mean she does not mind. Leaving is allowed: one clean closing line, and Farid just says ‘catch you later’. If the learner stays after the subject has moved, they can talk about whom Farid wants to meet or about Chloé's work, without returning to reviewing details.",
    ),
    context: "mixer",
    contextType: L("赞助商酒会", "Sponsor party"),
    competencies: ["responsible-decision-making", "relationship-skills"],
    skills: ["discretion", "joining-and-exiting"],
    relatedSkills: ["ethical-responsibility"],
    relationship: ["peer", "industry"],
    difficulty: 2,
    minutes: 5,
    icon: "shield-alert",
    characters: [
      {
        id: "farid",
        name: L("Farid", "Farid"),
        role: L("赞助商 Corvane AI 的研究员", "Research scientist at the sponsor, Corvane AI"),
        hue: 40,
        personality: L(
          "语速快，爱笑，把八卦当见面礼。对停顿和「不方便说」特别敏感，会立刻追一句。被说教会挂不住脸、变冷淡；话题被自然带走时也跟得上。",
          "Fast, laughs a lot, offers gossip as a greeting. Alert to pauses and to ‘I'd rather not say’, which he chases at once. Loses face and cools when lectured; follows along when the subject is moved naturally.",
        ),
        stance: L(
          "想从用户这里换到一点别人没有的消息。一句客气的「不清楚」不会让他停下，如果那句话听起来像是在藏东西。",
          "Wants to trade the learner for something nobody else has. A polite ‘not sure’ does not stop him if it sounds like something is being held back.",
        ),
        hidden: L(
          "他一年前才从别的领域转过来，在这个圈子里几乎不认识人，八卦是他唯一拿得出手的谈资；他这周真正想要的，是认识两三个做他那个方向的人。只有被问到「你这周最想得到什么」或「你进这个领域多久了」时才说；说出来之后，用户可以给他一点真正有用的东西，话题也就自然离开了八卦。",
          "He moved in from another field only a year ago and knows almost nobody here; gossip is the only currency he has. What he actually wants this week is to meet two or three people working in his area. He says so only if asked what he most wants out of the week, or how long he has been in the field — after which the learner can offer him something genuinely useful, and the talk leaves gossip on its own.",
        ),
      },
      {
        id: "chloe",
        name: L("Chloé", "Chloé"),
        role: L("另一所学校的三年级博士生", "Third-year PhD student at another university"),
        hue: 320,
        personality: L(
          "安静，偶尔问一句很短的话，听得很仔细。有人暗示自己知道内情时，会突然变得很直接。",
          "Quiet, the occasional very short question, listens closely. Turns suddenly direct when someone hints at inside knowledge.",
        ),
        stance: L(
          "想知道圈子里的人到底怎么讲这件事。不会主动亮明自己的关系；也不会因为别人态度好就装作没听见不该听见的话。",
          "Wants to know how people are actually telling this story. Will not volunteer her connection, and will not pretend she did not hear something she should not have, however pleasant the speaker.",
        ),
        hidden: L(
          "她是那篇被拒投稿的第三作者，这几天一直在听别人怎么讲这件事，心里很不好受。只有被问到「你认识当事人吗」「你做什么方向」问到具体论文，或「你怎么一直没说话」时才说；如果用户泄露了审稿内容或承认自己审过，她会主动说出来并追问。",
          "She is the third author of the rejected submission and has spent the week listening to people tell the story, which has been hard on her. She says so only if asked whether she knows the people involved, asked about her work down to the specific paper, or asked why she has been so quiet; if the learner leaks review content or admits to having reviewed the paper, she says it unprompted and presses.",
        ),
      },
    ],
    objectives: [
      L("回答「你听说了什么」时，不泄露、不暗示你知道内情。", "Answer ‘what have you heard?’ without leaking or hinting that you know anything."),
      L("不把传闻当事实转述。", "Do not pass on rumour as fact."),
      L("把话题自然带到别处，或干净地离开这个圈子。", "Move the conversation somewhere else naturally, or leave the circle cleanly."),
    ],
    success: L(
      "没有人从你这里得到关于那篇投稿的任何东西，包括「你知道」这件事本身；圈子没有因你变僵，或者你体面地离开了。Farid 可以有点失望。",
      "Nobody gets anything about that submission from you, including the fact that you know; the circle is not soured by you, or you leave it gracefully. Farid may be a little disappointed.",
    ),
    failure: L(
      "为了显得消息灵通说出审稿内容；或用「网上说的不全对」暗示自己知情；或把跳槽传闻当事实讲；或当众说教把场面弄僵后不修复。",
      "Giving out review content to seem well-informed; or hinting with ‘what's online isn't quite right’; or repeating the job-move rumour as fact; or lecturing the circle into a chill and leaving it unrepaired.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "farid",
      text: L(
        "……所以网上都说是有个审稿人故意压的分。你在这个方向里，肯定听说了什么吧——到底是谁？还有那位要跳槽的事，是真的吗？",
        "…so the internet says one reviewer tanked it on purpose. You're in that area — you must have heard something. Who was it? And the one who's supposedly moving — is that true?",
      ),
    },
    source: frontierSource(FILE, "sponsor-party-gossip", "reputationRules"),
    keywords: ["八卦", "审稿保密", "传闻", "酒会", "脱身", "gossip", "reviewer confidentiality", "sponsor party", "discretion"],
  },

  // ---------------------------------------------------------------- 8
  {
    id: "mixer-turn-chat-into-call",
    title: L("聊了二十分钟，她要被拉走了", "Twenty Good Minutes — and She Is Being Pulled Away"),
    hook: L(
      "她说「保持联系！」。你只有一句话的时间：提一个具体的下一步，还是就此好好收尾？",
      "She says “let's keep in touch!”. You have one sentence: name a specific next step, or close it well and leave it there?",
    ),
    background: L(
      "酒会上，你和一家工业界 lab 的研究负责人 Leila 聊了二十分钟，是这周最好的一次对话：你们关心的问题有真实的交集。现在她的同事 Oskar 过来要把她带去另一边。她已经半转过身，说了那句「我们保持联系」。你知道这句话如果没有下文，就什么都不是。你得当场决定：有没有一件具体的、值得开口的事——如果有，用一句话说出来；如果没有，就好好结束。",
      "At the mixer you have spent twenty minutes with Leila, a research lead at an industry lab, in the best conversation of your week: the problems you each care about genuinely overlap. Now her colleague Oskar has come to take her to the other side of the room. She is already half turned and has said ‘let's keep in touch’. You know that without anything attached, that sentence is nothing. You have to decide on the spot whether there is one specific thing worth asking for — and if so, say it in a sentence; if not, close well.",
    ),
    simulationFacts: L(
      "在场的是 Leila、Oskar 和用户。Leila 是 Tessellate Research 的研究负责人；Oskar 是她的同事。刚才二十分钟聊的是用户的工作和她团队遇到的一个问题之间的交集，具体内容以用户说的为准，不替用户编造成果。她在聊天中说过一句「我很想知道后面结果怎么样」，这不是承诺。目前什么都没有约定，联系方式也还没交换。Leila 没有提过实习、合作、访问或报告邀请。Oskar 要带她去见房间另一头的一组合作者；那组人整晚都在，没有硬性的时间点。Leila 可以当场答应一次二十分钟左右的通话；「合作」「实习」「内推」她不会当场答应。",
      "Present: Leila, Oskar and the learner. Leila is a research lead at Tessellate Research; Oskar is her colleague. The last twenty minutes were about the overlap between the learner's work and a problem her team has; the specifics are whatever the learner says, and no results may be invented for them. During the chat she said ‘I'd love to hear how that turns out’, which is not a commitment. Nothing has been arranged and no contact details exchanged. Leila has not mentioned an internship, a collaboration, a visit or a talk invitation. Oskar is taking her to a group of collaborators across the room; they are there all evening and there is no hard time. Leila can agree on the spot to a call of about twenty minutes; she will not agree on the spot to ‘a collaboration’, ‘an internship’ or ‘a referral’.",
    ),
    simulationDirection: L(
      "Leila 温和、真诚，但身体已经半转过去，默认的收尾是「保持联系！把论文发我」。Oskar 客气、利落，站得很近，像一个习惯替人收场的人。用户只回一句「好的，一定」，她微笑着走开，什么都没定下——这是可以发生的结局，不是被逼的；她走出两步前用户仍可以叫住她一次。用户提出一个具体的小请求（围绕某个问题通二十分钟电话、给出大致时间、说明谁来发邮件），她会认真回应，并按条件说出自己的限制，给一个替代的时间或方式。用户提出大的请求（实习、合作、内推），她说「我们先聊一次再说」，热度降一点；用户随即缩小成一个小请求，她接受小的那个。用户决定不需要下一步，具体地谢她刚才讲的某一点然后干净收尾，她是真的高兴，这同样是好结局。用户无视 Oskar 继续长聊，Oskar 会走近一步、再提醒一次，Leila 变得抱歉而简短。用户直接对 Oskar 说话、说明只需要半分钟定个时间，他会让出这半分钟；用户问他是做什么的，他才按条件回答。用户对 Oskar 开个玩笑（「一分钟就还给你」）能换来一分钟，只能用一次。关键决定是：有没有一件值得开口的具体的事，以及能否用一句话说清谁做什么、什么时候、通过什么渠道。「保持联系」「把论文发我」、加 LinkedIn、扫码，都不算下一步，除非同时说定了一件具体的事。事情定下后若用户还在说，Leila 会笑着说「那就邮件里见」，Oskar 把她带走；用户可以转而和 Oskar 多说一句，不重复已经定下的事。",
      "Leila is gentle and sincere, but already half turned; her default exit is ‘let's keep in touch — send me the paper!’. Oskar is polite, brisk and standing close, like someone used to closing conversations for other people. If the learner only says ‘great, will do’, she smiles and walks off with nothing fixed — an ending that can happen, not one that is forced; before she has gone two steps the learner can still call her back once. A specific, small ask (a twenty-minute call about one question, a rough time, who sends the email) gets a serious answer, and on her conditions she states her constraints and offers an alternative time or route. A big ask (internship, collaboration, referral) gets ‘let's talk once first’ and a slight cooling; if the learner immediately shrinks it to something small, she takes the small one. If the learner decides no next step is needed, thanks her for one specific thing she said and closes cleanly, she is genuinely pleased, and that is a good ending too. If the learner ignores Oskar and keeps talking at length, he steps closer and reminds her once more, and Leila becomes apologetic and brief. If the learner speaks to Oskar directly and says they need only thirty seconds to fix a time, he gives the thirty seconds; only when asked what he does does he answer on his condition. A joke to Oskar (‘I'll hand her back in one minute’) buys a minute, once. The key decision is whether there is one specific thing worth asking for, and whether the learner can say in a sentence who does what, when and through which channel. ‘Keep in touch’, ‘send me the paper’, a LinkedIn connection or a QR scan are not next steps unless a specific thing is settled with them. If the learner keeps talking after something is fixed, Leila laughs, says ‘see you in email, then’ and Oskar leads her off; the learner may have one more word with Oskar without reopening what is already settled.",
    ),
    context: "mixer",
    contextType: L("赞助商酒会", "Sponsor party"),
    competencies: ["self-management", "relationship-skills"],
    skills: ["following-up", "making-the-ask"],
    relatedSkills: ["joining-and-exiting", "reading-incentives"],
    relationship: ["industry", "senior"],
    difficulty: 1,
    minutes: 4,
    icon: "calendar-clock",
    characters: [
      {
        id: "leila",
        name: L("Leila", "Leila"),
        role: L("Tessellate Research 研究负责人", "Research lead at Tessellate Research"),
        hue: 175,
        personality: L(
          "温和，真诚，说话不绕。收尾时习惯说「保持联系」。听到具体的小请求会认真回应并讲清自己的限制；听到大而空的请求会客气地往后推。",
          "Gentle, sincere, plain-spoken. Ends conversations with ‘let's keep in touch’ by habit. Takes a specific, small ask seriously and states her constraints; politely defers a large, vague one.",
        ),
        stance: L(
          "愿意继续这段对话，但只在对方给出具体的事情时才会投入时间。聊得再好，她也不会替对方把下一步想出来。",
          "Willing to continue this conversation, but only puts time in when the other person names something specific. However good the chat, she will not invent the next step for them.",
        ),
        hidden: L(
          "她接下来两周在出差和休假，基本不看邮件；每次开会回来邮箱里有几十封「很高兴认识你」，她只回那些带着一个具体问题或一个具体时间提议的，「附上论文」那一类直接归档。只有被问到「怎么联系你最好 / 什么时候合适」，或用户提出的时间正好落在那两周里时才说。",
          "She is travelling and then on leave for the next two weeks and will barely read email; after every conference she comes back to dozens of ‘great to meet you’ messages and answers only those with a specific question or a specific proposed time — the ‘paper attached’ kind gets archived. She says this only if asked how or when best to reach her, or if the learner proposes a time that falls inside those two weeks.",
        ),
      },
      {
        id: "oskar",
        name: L("Oskar", "Oskar"),
        role: L("Leila 的同事，来叫她过去", "Leila's colleague, here to fetch her"),
        hue: 95,
        personality: L(
          "客气，利落，站得很近。被无视时会走近一步再提醒一次；有人直接跟他说明只需要半分钟，他会让。",
          "Polite, brisk, stands close. Steps nearer and reminds once more when ignored; gives way when someone tells him directly that they need thirty seconds.",
        ),
        stance: L(
          "想把 Leila 带到房间另一头去。继续闲聊不会让他等；一句对着他说的、具体而简短的请求可以。",
          "Wants to get Leila across the room. More small talk will not make him wait; a short, specific request addressed to him will.",
        ),
        hidden: L(
          "Leila 一直请他在活动上帮她从拖得太久的对话里脱身，他并不知道这一场是她想继续的；另一头那组人整晚都在。另外，他负责团队对外的 seminar 和访问日程——真要约报告或来访，经手的人是他。只有用户直接问他是做什么的，或直接向他说明需要多久时才说。",
          "Leila has a standing request that he rescue her from conversations that run long at events, and he does not know this is one she would like to continue; the group across the room is there all evening. He also runs the team's external seminar and visitor schedule — if a talk or a visit were ever arranged, it would go through him. He says so only if the learner asks him directly what he does, or tells him directly how long they need.",
        ),
      },
    ],
    objectives: [
      L("当场决定要不要下一步；要的话，用一句话提出一个具体的小请求。", "Decide on the spot whether you want a next step; if so, make one specific, small ask in a sentence."),
      L("确认谁做什么、什么时候、通过什么渠道——或明确地、具体地道谢收尾。", "Settle who does what, when and through which channel — or close clearly with specific thanks."),
    ],
    success: L(
      "离开时你们有一件说定的事（谁发什么、大概何时），或者你判断不需要下一步并干净地收了尾。她的回答可以是「两周后再说」。",
      "You part with one settled thing (who sends what, roughly when), or you judge that no next step is needed and close cleanly. Her answer may well be ‘after the next two weeks’.",
    ),
    failure: L(
      "回一句「保持联系」就散了却其实想要下文；或一口气提出实习、合作、内推；或无视来叫她的人，把一次好对话拖成尴尬。",
      "Answering ‘keep in touch’ and parting when you actually wanted more; or asking for an internship, a collaboration and a referral in one breath; or ignoring the person fetching her until a good conversation turns awkward.",
    ),
    maxTurns: 8,
    opening: {
      characterId: "oskar",
      text: L(
        "Leila，抱歉打断——那边人齐了，都在等你。（转向你）不好意思，我得把她借走了。",
        "Leila, sorry to cut in — they're all there and waiting for you. (to you) Apologies, I have to borrow her.",
      ),
    },
    source: frontierSource(FILE, "mixer-turn-chat-into-call", "justAsk", "fralic", "likingGap"),
    keywords: ["保持联系", "下一步", "约电话", "提请求", "收尾", "follow-up", "next step", "keep in touch", "small ask"],
  },

  // ---------------------------------------------------------------- 9
  {
    id: "dinner-associate-fishing",
    title: L("「我纯好奇」：免费的尽调", "“Just Curious”: Diligence for Free"),
    hook: L(
      "她问哪些 lab 是真的、哪个方法是 hype，还在手机上记。你愿意交换，不愿意被白白开采。",
      "She asks which labs are real and which method is hype, and she is taking notes on her phone. You are willing to trade — not to be mined.",
    ),
    background: L(
      "会议晚宴，你旁边是 Larkspur Capital 的 associate Nadia。她说自己「纯好奇，不是工作」，问题却一个比一个具体：你这个子方向里哪几个组是真做出东西的、哪个最近很火的方法是 hype、谁被高估了。她听得懂技术，还问能不能记一下。你并不反感聊这些——你对方法有真实的判断，也想知道资本那边看到的是什么。但你不想给同行排名次，不想讲别人没公开的事，也不想聊完之后发现自己做了一晚上免费顾问。",
      "At the conference dinner you are next to Nadia, an associate at Larkspur Capital. She says she is ‘just curious, this isn't work’, yet each question is more specific than the last: which groups in your subfield have really made things work, which fashionable method is hype, who is overrated. She follows the technical side and asks whether she can jot things down. You do not mind the topic — you have real views on the methods, and you would like to know what the investing side is seeing. But you do not want to rank your peers, you do not want to share what others have not made public, and you do not want to discover afterwards that you spent the evening as a free consultant.",
    ),
    simulationFacts: L(
      "这段对话里只有 Nadia 和用户，同桌其他人在聊别的。Nadia 入行约十八个月，读过 ML 方向的硕士，技术上比她的合伙人懂得多。她没有权限决定投资，不能许诺顾问费，也不能保证安排合伙人见面。她自己能给的有：她看过的大约四十份这个方向的 deck 里的共性（只讲整体，不讲具体公司）、她的基金在这个方向上还没想明白的问题、以及她自己参与组织的季度研究者晚餐的邀请。她不会说出基金正在看的公司名字。用户的子方向和成果以用户说的为准；用户知道的别组未公开结果、同行的去向等，是否存在、是什么，由用户掌握，Nadia 不知道，也不得替用户说出。没有任何报酬、邀请或后续被提出过。",
      "Only Nadia and the learner are in this conversation; the rest of the table is on other things. Nadia has been in the job about eighteen months, has a master's in ML and follows the technical side better than her partners do. She has no authority to invest, cannot promise advisory fees and cannot guarantee a partner meeting. What is hers to give: patterns across the roughly forty decks she has seen in this area (in aggregate only, no specific companies), the questions her fund has not worked out about the area, and an invitation to the quarterly researcher dinner she helps organise. She will not name the company her fund is looking at. The learner's subfield and results are whatever they say; any unpublished results from other groups or peers' moves that the learner knows of are the learner's to hold — Nadia does not know them and may not state them. No payment, invitation or follow-up has been offered.",
    ),
    simulationDirection: L(
      "Nadia 反应快、亲切、会夸人（「你是第一个给我讲明白的」），问题听起来随意，其实很有章法：先要名单，再要排名，再要「谁被高估了」。被拒绝点名时她会换个框（「不说名字，那哪条路线呢？」），这是一个真的更小的请求。用户对公开的方法和路线给出有理由的判断，她认真记，并追问「什么证据能区分真的和 hype」。用户点名贬低某个组，她逐字记下并要更多，但不会因此回报更多。用户笼统地反问「你们那边看到什么」，只得到一句「agent 方向很热」；问得具体（那四十份 deck 都在声称同一件什么事、这些公司最招不到的是哪类人、她的合伙人问过哪个她答不上来的问题），她才给出实在的整体信息。用户直接问这些是给谁看的、会不会署名，她才按条件承认；用户明确提出条件（不署名、不排名个人、只谈公开的方法），她答应并且守约，不生气，继续在允许的范围里聊。用户什么都不说，她客气几句后转向另一侧的人——什么也没换到，但也没有泄露。用户开玩笑（「这是晚宴里免费咨询的环节吗」），她笑着承认「有一点」，但不问到点上不会说 memo 的事。用户说了一句对某个组过重的话，随后请她别记或换成更公允的说法，她答应并以更正后的为准。关键决定是：哪些可以交换（对公开方法的判断、用什么证据区分真假），哪些不行（别人未公开的工作、谁要走、给同行排名），以及用户要换回什么、按什么条件。她说「我欠你一个」不是承诺；「我帮你约我们合伙人」超出她的权限；只有她自己能给的晚餐邀请，在说定了时间和渠道之后才算数。条件谈定后若用户继续，可以聊投资人怎样读一篇论文、她在这份工作里最难判断的是什么；不重新索要名单。",
      "Nadia is quick, warm and flattering (‘you're the first person who's made it make sense’); her questions sound casual and are in fact methodical: first names, then a ranking, then ‘who's overrated?’. Refused names, she reframes (‘no names — which approach, then?’), which is a genuinely smaller ask. Reasoned judgments about public methods and directions she notes carefully, following up with ‘what evidence would tell real from hype?’. If the learner runs down a named group, she writes it down word for word and asks for more, without giving more back for it. A vague ‘what are you seeing on your side?’ gets ‘agents are hot’; a precise question (what all forty decks claim, which kind of person those companies cannot hire, which question from her partner she could not answer) gets real aggregate information. Only when asked directly who this is for, or whether names get attached, does she admit what she admits; when the learner sets explicit terms (no attribution, no ranking of individuals, public methods only) she agrees, keeps to them, takes no offence and carries on within what is allowed. If the learner says nothing at all, she makes polite conversation and then turns to the person on her other side — nothing traded, nothing leaked. A joke (‘is this the free-consulting course of the dinner?’) makes her laugh and admit ‘a little’, but she does not mention the memo unless the question is on target. If the learner says something too harsh about a group and then asks her not to note it, or replaces it with a fairer version, she agrees and works from the corrected version. The key decision is what is tradeable (judgments on public methods, what evidence separates real from hype), what is not (others' unpublished work, who is leaving, ranking peers), and what the learner asks for in return, on what terms. ‘I owe you one’ is not a commitment; ‘I'll get you in front of our partners’ is beyond her authority; only the dinner invitation, which is hers to give, counts — and only once a date and channel are settled. If the learner keeps going after terms are agreed, they can talk about how investors read a paper, or what she finds hardest to judge in this job; she does not ask for the list of names again.",
    ),
    context: "mixer",
    contextType: L("会议晚宴", "Conference dinner"),
    competencies: ["relationship-skills", "social-awareness", "responsible-decision-making"],
    skills: ["trading-information", "reading-incentives", "discretion"],
    relatedSkills: ["sharp-questions", "taking-a-position"],
    relationship: ["investor", "stranger"],
    difficulty: 3,
    minutes: 7,
    icon: "message-circle-question",
    characters: [
      {
        id: "nadia",
        name: L("Nadia", "Nadia"),
        role: L("Larkspur Capital 的 associate", "Associate at Larkspur Capital"),
        hue: 300,
        personality: L(
          "反应快，亲切，会夸人，嘴上说「纯好奇」。问题有章法：名单、排名、谁被高估。被拒绝就换个更小的问法；听得懂技术，边听边在手机上记。被问得具体时也答得具体。",
          "Quick, warm, flattering, and ‘just curious’. Her questions are methodical: names, ranking, who is overrated. Refused, she tries a smaller version; she follows the technical side and takes notes on her phone as she listens. A precise question gets a precise answer from her too.",
        ),
        stance: L(
          "想在一顿饭里拿到这个子方向的名单和几句可以引用的判断。客气不会让她少问；用户不提条件，她就默认没有条件。她能给的东西有限，但确实有。",
          "Wants a list of who matters in this subfield and a few quotable judgments, all in one dinner. Courtesy does not make her ask less; if the learner sets no terms she assumes there are none. What she can give is limited, and real.",
        ),
        hidden: L(
          "她周一要交一份关于这个子方向的 memo，和基金正在尽调的一家公司直接相关；memo 里的判断通常带出处（「某 lab 的一位研究者说某方法不成立」），会在基金内部传阅，有时还会被转述给被尽调的创始人。只有被直接问到「这些是给谁看的 / 用来做什么」时才承认 memo；只有被问到「你会怎么引用我的话 / 会写我的名字和单位吗」时才承认署名的事。用户明确要求不署名，她会答应并照做；公司名字始终不说。",
          "She has a memo on this subfield due on Monday, tied directly to a company her fund is diligencing; judgments in such memos usually carry attribution (‘a researcher at such-and-such lab says method X does not hold’), circulate inside the fund and are sometimes relayed to the founders under diligence. She admits the memo only if asked directly who this is for or what it will be used for; she admits the attribution only if asked how she will quote the learner, or whether their name and affiliation will be written down. If the learner explicitly asks for no attribution she agrees and keeps to it; she never names the company.",
        ),
      },
    ],
    objectives: [
      L("问清这些信息的用途，以及你的话会不会被署名引用。", "Find out what the information is for and whether your words will be attributed to you."),
      L("给出至少一个关于公开方法的、有理由的判断，同时拒绝给同行排名或讲未公开的事。", "Give at least one reasoned judgment about public methods while declining to rank peers or share anything unpublished."),
      L("具体地要回一样你想知道的东西。", "Ask, specifically, for one thing you want to know in return."),
    ],
    success: L(
      "你知道了她为什么问、你的话会被怎么用；你给的是你愿意被引用的判断，换回了一点她那边才看得到的东西，并在该停的地方停了。她可以没拿到名单。",
      "You know why she is asking and how your words will be used; what you gave is judgment you are willing to be quoted on, you got back something only her side can see, and you stopped where you should. She may leave without her list.",
    ),
    failure: L(
      "被夸得一路讲下去，点名评价同行却不知道会被署名写进 memo；或讲出别人未公开的工作和去向；或全程拒绝，一个问题也没问。",
      "Flattered into talking on and on, judging peers by name without knowing it will be written into a memo with your name on it; or sharing others' unpublished work and moves; or refusing everything and never asking a single question.",
    ),
    maxTurns: 12,
    opening: {
      characterId: "nadia",
      text: L(
        "我纯好奇啊，不是工作——你们这个子方向，真正做出东西的是哪几个组？还有最近很火的那个方法，到底是真的还是 hype？你不介意我记一下吧？",
        "I'm just curious, this isn't work — in your subfield, which groups have actually made things work? And that method everyone's excited about: real, or hype? You don't mind if I jot this down, do you?",
      ),
    },
    source: frontierSource(FILE, "dinner-associate-fishing", "chatham", "fralic"),
    keywords: ["尽调", "打听", "署名", "信息交换", "免费咨询", "VC associate", "diligence", "attribution", "just curious"],
  },
];
