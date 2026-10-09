import { L } from "../../taxonomy";
import type { Case } from "../types";
import { FRONTIER_SOURCES as S } from "./sources";

/** Original teaching illustrations, not case reports or quotes from the sources. */
export const FRONTIER_CASES: Case[] = [
  {
    id: "fc-poster-question-first",
    title: L("示例：Poster 前先抛问题，再递联系方式", "Illustration: Question First at the Poster, Then the Contact Card"),
    source: S.posterRules,
    situation: L(
      "教学示例：博士生周岚在 poster session 讲一篇检测 benchmark 数据泄漏的论文，路过的人大多扫一眼就走。",
      "Teaching illustration: PhD student Zhou Lan presents a poster on detecting benchmark data leakage, and most passers-by glance and keep walking.",
    ),
    whatHappened: L(
      "她不再从模型结构讲起，而是先问一句：你报的分数里，有多少来自训练集泄漏？一位工业界研究员停下来，质疑她只验证了两个数据集，没听完就被同事叫走。周岚没有拦，只递上印着论文链接和邮箱的卡片；三天后对方来信要代码。",
      "She stops opening with the architecture and asks instead how much of a reported score comes from training-set leakage. An industry researcher stops, objects that she validated on only two datasets, and is pulled away mid-answer. Zhou does not hold him back; she hands over a card with the paper link and her email, and he writes three days later asking for the code.",
    ),
    takeaway: L(
      "这则示例练的是用一个清楚的问题开场、不给访客压力，并把会后联系做得很容易。",
      "This illustration practises opening with one clear question, not pressuring the visitor, and making follow-up easy.",
    ),
    competencies: ["relationship-skills", "self-management"],
    skills: ["research-pitch", "following-up"],
    context: "conference",
    keywords: ["poster", "海报", "开场", "数据泄漏", "联系方式", "poster session", "benchmark", "follow-up", "ten seconds"],
  },
  {
    id: "fc-join-circle-with-question",
    title: L("示例：先站近听，再用一个问题加入", "Illustration: Move Up, Listen, Then Join With a Question"),
    source: S.ernstConference,
    situation: L(
      "教学示例：一年级博士生何叙想认识刚做完报告的讲者，讲者在走廊里被五六个人围着。",
      "Teaching illustration: First-year PhD student He Xu wants to meet a speaker who has just finished a talk and is surrounded by five or six people in the hallway.",
    ),
    whatHappened: L(
      "何叙走近站定，听出大家在聊消融实验而不是私事。等到停顿，他问为什么去掉检索模块后长文档任务反而没掉点。讲者一句话答完，就转回去和熟人说话；旁边一位博士后却接过这个问题，和他聊了十分钟，并答应第二天午饭时帮他引见讲者。",
      "He moves up, stands and listens long enough to tell the group is discussing an ablation, not anything personal. At a pause he asks why removing the retrieval module did not hurt the long-document task. The speaker answers in one sentence and turns back to an acquaintance; a postdoc beside him picks the question up, talks with him for ten minutes, and offers to introduce him to the speaker at lunch the next day.",
    ),
    takeaway: L(
      "这则示例练的是靠近、倾听、带问题加入；讲者没多理会时，共同认识的人是另一条路。",
      "This illustration practises moving up, listening and joining with a question; when the speaker gives little, a mutual acquaintance is another way in.",
    ),
    competencies: ["relationship-skills", "responsible-decision-making"],
    skills: ["joining-and-exiting", "sharp-questions"],
    context: "conference",
    keywords: ["加入对话", "走廊", "讲者", "围着", "不敢上前", "hallway", "join", "circle", "speaker", "introduce"],
  },
  {
    id: "fc-answer-the-criticism",
    title: L("示例：问答环节被当众质疑 baseline", "Illustration: Challenged on the Baseline During Q&A"),
    source: S.reputationRules,
    situation: L(
      "教学示例：workshop 报告的问答环节，一位资深研究员当众说梁音的 baseline 没调参、对比不公平，语气很冲。",
      "Teaching illustration: In the Q&A after a workshop talk, a senior researcher says sharply, in front of the room, that Liang Yin's baseline was untuned and the comparison unfair.",
    ),
    whatHappened: L(
      "梁音停了两秒，直接对他回答：baseline 确实用的是原论文的默认超参，这一点批评成立；但在差距最大的两个任务上，她认为结论仍然站得住，并说了理由。对方要求她补三个调过参的 baseline，她只答应终稿前补一个，因为另外两个来不及。对方不太满意，说了句到时再看。",
      "Liang pauses, then answers him directly: the baseline did use the original paper's default hyperparameters, so that part of the criticism holds; on the two tasks with the largest gap she still thinks the conclusion stands, and she gives her reason. He asks for three tuned baselines; she commits to one before the final version because she cannot finish the other two in time. He is not satisfied and says they will see.",
    ),
    takeaway: L(
      "这则示例练的是先停一下再回应批评、直接对提出的人说，并且只承诺做得到的事。",
      "This illustration practises pausing before responding to criticism, replying directly to the person, and committing only to what you can complete.",
    ),
    competencies: ["responsible-decision-making", "self-management", "self-awareness"],
    skills: ["taking-a-position", "emotion-regulation", "calibrated-claims"],
    context: "conference",
    keywords: ["批评", "质疑", "问答", "baseline", "当众", "criticism", "Q&A", "workshop", "unfair comparison", "respond"],
  },
  {
    id: "fc-dinner-under-the-rule",
    title: L("示例：晚宴上听到的事，第二天被追问是谁说的", "Illustration: Asked the Next Day Who Said It at Dinner"),
    source: S.chatham,
    situation: L(
      "教学示例：一场会议期间的闭门晚宴事先约定适用 Chatham House Rule，席间有人解释了自己团队为什么推迟发布一个模型。第二天酒会上，朋友向安可追问细节。",
      "Teaching illustration: A closed-door dinner during a conference is held under the Chatham House Rule, and someone explains why their team delayed a model release. At a mixer the next day a friend presses An Ke for details.",
    ),
    whatHappened: L(
      "安可讲了那套理由本身：评测覆盖不到的场景太多，所以选择推迟。朋友接着猜了两个实验室的名字，问是不是其中之一。安可说那场晚宴适用 Chatham House Rule，内容可以聊，人和机构她不提，对猜测也不点头不摇头。朋友有点扫兴，说这样的消息用处不大，话题就换了。",
      "An Ke shares the reasoning itself: too many scenarios the evaluations did not cover, so they chose to delay. The friend guesses two labs and asks whether it was one of them. An Ke says the dinner was under the Chatham House Rule, so she can discuss the content but not people or organisations, and she neither confirms nor denies the guesses. The friend is a little put out, says the news is not much use that way, and the subject changes.",
    ),
    takeaway: L(
      "这则示例练的是只转述内容、不透露身份和机构，并接受对方因此有些失望。",
      "This illustration practises passing on content without identity or affiliation, and accepting the other person's mild disappointment.",
    ),
    competencies: ["responsible-decision-making", "relationship-skills"],
    skills: ["discretion", "trading-information"],
    context: "mixer",
    keywords: ["保密", "闭门晚宴", "谁说的", "八卦", "追问", "Chatham House Rule", "confidential", "dinner", "gossip", "off the record"],
  },
  {
    id: "fc-warm-is-not-yes",
    title: L("示例：投资人说「很感兴趣，回头聊」", "Illustration: The Investor Who Says 'Love It, Let's Talk'"),
    source: S.pgRaise,
    situation: L(
      "教学示例：sponsor party 上，创业者沈略向一位投资人讲了自己做的 agent 评测工具，对方说很感兴趣，回头一定细聊。",
      "Teaching illustration: At a sponsor party, founder Shen Lue describes his agent-evaluation tool to an investor, who says she is very interested and they must talk properly soon.",
    ),
    whatHappened: L(
      "沈略没有把这句话当成进展，当场问下周能否约二十分钟。投资人说会让同事联系他，又问这一轮还有谁在看。沈略如实说目前还没有人确定要投，对方的热情明显降了一些。他回去把这次接触记为「还不是 yes」，继续约别的投资人；那位同事后来没有来信。",
      "Shen does not count the remark as progress and asks on the spot whether they can fix twenty minutes next week. The investor says a colleague will be in touch, then asks who else is looking at the round. Shen says truthfully that nobody has committed yet, and her warmth visibly cools. He logs the contact as not yet a yes and keeps booking other investors; the colleague never writes.",
    ),
    takeaway: L(
      "这则示例练的是把没有明确 offer 的热情当作「不」，并读懂对方为什么关心别的投资人。",
      "This illustration practises treating warmth without a definite offer as a no, and reading why the investor cares what other investors think.",
    ),
    competencies: ["social-awareness", "self-management"],
    skills: ["reading-incentives", "following-up"],
    context: "mixer",
    keywords: ["投资人", "感兴趣", "回头聊", "融资", "酒会", "investor", "sponsor party", "fundraising", "non-committal", "next step"],
  },
  {
    id: "fc-important-problems-at-dinner",
    title: L("示例：晚宴上坐进一桌外行领域的人", "Illustration: Seated at a Dinner Table From Another Field"),
    source: S.hamming,
    situation: L(
      "教学示例：会议晚宴上，做语言模型的研究员秦朗坐进一桌做蛋白质设计的人中间，一个也不认识。",
      "Teaching illustration: At a conference dinner, language-model researcher Qin Lang ends up at a table of protein-design people and knows none of them.",
    ),
    whatHappened: L(
      "秦朗没有先讲自己的工作，而是问：你们领域现在最重要的问题是什么？第一个人只回了两个字：数据。他追问卡在哪一类数据上，一位博士后才讲起湿实验验证太慢的事，秦朗也说了自己这边评测遇到的类似瓶颈。半桌人这时已经转去聊别的，但他带走了一个之前不知道的问题和一个联系人。",
      "Qin does not start with his own work; he asks what the important problems in their field are right now. The first reply is one word: data. He asks which kind of data is the bottleneck, and a postdoc then opens up about slow wet-lab validation, to which Qin adds a similar bottleneck from his own evaluation work. Half the table has drifted to another conversation by then, but he leaves with a problem he had not known about and one contact.",
    ),
    takeaway: L(
      "这则示例练的是向别的领域的人问他们的重要问题，并在敷衍的回答后再追问一层。",
      "This illustration practises asking people from another field about their important problems, and following up after a thin first answer.",
    ),
    competencies: ["responsible-decision-making", "relationship-skills"],
    skills: ["sharp-questions", "trading-information", "curiosity"],
    context: "mixer",
    keywords: ["晚宴", "跨领域", "重要问题", "不认识", "追问", "conference dinner", "important problems", "other fields", "strangers", "table"],
  },
  {
    id: "fc-ask-on-top-email",
    title: L("示例：把请求放到邮件最上面", "Illustration: Moving the Ask to the Top of the Email"),
    source: S.email,
    situation: L(
      "教学示例：硕士生温迟在 poster 前和一位研究员聊过五分钟，想请对方看一眼自己的复现结果。第一稿邮件写了四段，请求在最后一句。",
      "Teaching illustration: Master's student Wen Chi spoke with a researcher for five minutes at a poster and wants her to look at his reproduction result. His first draft runs to four paragraphs with the request in the last sentence.",
    ),
    whatHappened: L(
      "他重写：标题写明是 poster 后的跟进和关于 Table 3 的一个问题；正文前两行就是请求——复现结果比论文低两个点，想确认评测脚本的一个设置。顺带想问的实习机会被他删掉，留到另一封邮件。一周后对方回了两行，回答了那个设置，没有回应他提出的通话。",
      "He rewrites it: the subject says it is a follow-up from the poster with one question about Table 3, and the first two lines carry the request, that his reproduction is two points below the paper and he wants to confirm one setting in the evaluation script. He cuts the internship question and saves it for a separate email. A week later she replies in two lines, answers the setting question, and does not take up his offer of a call.",
    ),
    takeaway: L(
      "这则示例练的是邮件写短、标题有信息量、请求置顶、一封只谈一件事。",
      "This illustration practises a short email with an informative subject, the action item on top, and one topic per message.",
    ),
    competencies: ["self-management"],
    skills: ["following-up", "making-the-ask"],
    context: "outreach",
    keywords: ["邮件", "跟进", "标题", "请求置顶", "复现", "cold email", "follow-up", "subject line", "action item", "reproduction"],
  },
  {
    id: "fc-just-ask-for-the-intro",
    title: L("示例：拖了两周才开口请人引荐", "Illustration: Two Weeks of Putting Off an Intro Request"),
    source: S.justAsk,
    situation: L(
      "教学示例：博士后陆遥想请一位只在 workshop 上见过一面的教授，把她介绍给另一个实验室的负责人。她觉得对方一定会拒绝，拖了两周没开口。",
      "Teaching illustration: Postdoc Lu Yao wants a professor she met once at a workshop to introduce her to the head of another lab. Sure he will refuse, she has put it off for two weeks.",
    ),
    whatHappened: L(
      "她终于发了一条短消息，直接说想请他帮忙引荐、想聊的是哪个合作方向，并写明如果不方便，直说就好。教授当天回复：他和那位负责人不熟，不方便直接介绍，但可以把她介绍给那个组的一位高年级博士生。陆遥没拿到原本想要的 intro，但拿到了一个入口。",
      "She finally sends a short message that asks directly for the introduction, names the collaboration topic, and says plainly that it is fine to decline. The professor replies the same day: he does not know the lab head well enough to introduce her, but he can connect her with a senior PhD student in that group. Lu does not get the intro she wanted, but she gets a way in.",
    ),
    takeaway: L(
      "这则示例练的是把请求直接说出来，同时给对方留出说不的余地；被答应的可能性比她预想的高。",
      "This illustration practises making the request directly while leaving room for a no; agreement was more likely than she had assumed.",
    ),
    competencies: ["self-management", "self-awareness"],
    skills: ["making-the-ask", "self-efficacy"],
    context: "outreach",
    keywords: ["引荐", "开口", "怕被拒绝", "教授", "求助", "intro", "ask", "request", "professor", "rejection"],
  },
  {
    id: "fc-how-i-would-find-out",
    title: L("示例：投资人通话里答不上来的成本问题", "Illustration: The Cost Question He Could Not Answer on the Investor Call"),
    source: S.pgConvince,
    situation: L(
      "教学示例：pre-seed 阶段的创始人贺川第一次和一位投资人通话，介绍一款给实验室用的训练数据审计工具。对方问：客户规模扩大十倍，单次审计成本会怎么变？",
      "Teaching illustration: Pre-seed founder He Chuan is on a first call with an investor about a training-data audit tool for labs. The investor asks how the cost of one audit changes when a customer is ten times larger.",
    ),
    whatHappened: L(
      "贺川先用两句话讲了为什么实验室现在需要这个工具，然后承认十倍规模下的成本他还没有测过。他给出目前规模下的实际数字，并说会用两家试用客户里最大的数据集跑一遍，两周内给出结果。投资人说等有数字再聊，没有推进下一步。",
      "He Chuan first explains in two sentences why labs need the tool now, then admits he has not measured cost at ten times the scale. He gives the real figure at current scale and says he will run the largest datasets from his two pilot customers and report within two weeks. The investor says to come back with the numbers and does not move to a next step.",
    ),
    takeaway: L(
      "这则示例练的是只说真话：不知道就承认，并说清怎样找到答案——即使这次没有换来推进。",
      "This illustration practises sticking to the truth: admit what you do not know and say how you would find out, even when it wins no progress this time.",
    ),
    competencies: ["self-awareness", "relationship-skills"],
    skills: ["calibrated-claims", "research-pitch"],
    context: "outreach",
    keywords: ["投资人通话", "答不上来", "不知道", "成本", "如实", "investor call", "pre-seed", "founder", "don't know", "pitch"],
  },
  {
    id: "fc-workshop-room-for-discussion",
    title: L("示例：九个 invited talk，还是留出讨论时间", "Illustration: Nine Invited Talks, or Room for Discussion"),
    source: S.neuripsWorkshops,
    situation: L(
      "教学示例：三位合办者在排一个 agent 评测 workshop 的日程。一位合办者想把九个 invited talk 排满全天，主办人唐澈不同意。",
      "Teaching illustration: Three co-organizers are drafting the schedule for a workshop on agent evaluation. One wants nine invited talks filling the day, and lead organizer Tang Che disagrees.",
    ),
    whatHappened: L(
      "唐澈的理由是：workshop 是用来当面讨论进行中的工作和未来方向的，需要在 session 之间留出自由交流的时间；她还想加一场辩论，让两套互相竞争的评测框架正面对比。合办者担心大牌讲者少了，proposal 显得单薄。最后砍到六个 talk，保留两段长茶歇和一场辩论，一位已口头邀请的讲者被缩短了时间，这封解释邮件由唐澈自己来写。",
      "Tang argues that a workshop is a venue for in-person discussion of work in progress and future directions, which needs free time between sessions for individual exchange; she also wants a debate that contrasts two competing evaluation frameworks. Her co-organizer worries the proposal will look thin with fewer big names. They settle on six talks, two long breaks and one debate; a speaker already invited informally gets a shorter slot, and Tang takes on writing that awkward email herself.",
    ),
    takeaway: L(
      "这则示例练的是用 workshop 的定位来裁决日程分歧，并承担让步带来的代价。",
      "This illustration practises settling a schedule dispute by what a workshop is for, and owning the cost of the compromise.",
    ),
    competencies: ["relationship-skills"],
    skills: ["convening", "teamwork", "resolving-conflicts"],
    context: "organizing",
    keywords: ["workshop", "日程", "合办者", "分歧", "讨论时间", "invited talk", "schedule", "co-organizer", "discussion", "debate"],
  },
  {
    id: "fc-chair-holds-the-clock",
    title: L("示例：第一次主持，资深讲者超时", "Illustration: First Time Chairing, and a Senior Speaker Runs Over"),
    source: S.chairRules,
    situation: L(
      "教学示例：博士生姜宁第一次主持 workshop 的一个 session，第二位讲者是领域里的资深教授。",
      "Teaching illustration: PhD student Jiang Ning chairs a workshop session for the first time, and the second speaker is a senior professor in the field.",
    ),
    whatHappened: L(
      "开场前她给每位讲者发过消息：二十分钟报告加五分钟问答，剩五分钟和一分钟时她会举牌。教授没理会最后一张牌。姜宁站起来说时间到了，只接一个问题，并自己点了提问者；两人争起一个证明细节时，她打断，请他们茶歇继续。教授明显不太高兴，下一场还是晚了三分钟开始。",
      "Before the session she messaged every speaker: twenty minutes plus five for questions, with cards at five minutes and one minute left. The professor ignores the last card. Jiang stands, says time is up and there is room for one question, and picks the questioner herself; when the two start arguing over a proof detail, she cuts in and asks them to continue at the break. The professor is visibly displeased, and the next talk still starts three minutes late.",
    ),
    takeaway: L(
      "这则示例练的是事先讲明规则、按约定提示时间，并在问答跑远时介入，哪怕对方资历更深。",
      "This illustration practises telling speakers the rules beforehand, signalling time as agreed, and stepping in on Q&A even with a more senior speaker.",
    ),
    competencies: ["relationship-skills"],
    skills: ["convening", "leadership"],
    context: "organizing",
    keywords: ["主持", "超时", "资深讲者", "问答", "控场", "session chair", "moderating", "overrun", "Q&A", "time limit"],
  },
  {
    id: "fc-sponsor-proposal-science-first",
    title: L("示例：赞助商想换一个演讲时段", "Illustration: The Sponsor Who Wants a Speaking Slot"),
    source: S.meetingRules,
    situation: L(
      "教学示例：workshop 主办人顾溪在会前九个月联系一家做算力平台的创业公司谈赞助，发去一页清楚的方案：钱用于学生差旅补助，赞助方得到 logo 和一段冠名的交流时间。",
      "Teaching illustration: Nine months ahead, workshop organizer Gu Xi approaches a compute-platform startup about sponsorship with a clear one-page proposal: the money funds student travel grants, and the sponsor gets its logo and a named networking break.",
    ),
    whatHappened: L(
      "对方联系人提出要一个二十分钟的演讲时段。顾溪听出他需要向老板交代曝光，但没有答应：日程按科学内容来排，资深和年轻讲者的搭配已经定了。她改为提供 poster 区的一张展台，并保留冠名的交流时间。对方把赞助金额减了一半，顾溪接受了，差旅补助的名额也随之减少。",
      "The sponsor's contact asks for a twenty-minute speaking slot. Gu can tell he has to show his boss some visibility, but she declines: the agenda is built around the science, and its mix of senior and junior speakers is already set. She offers a table in the poster area and keeps the named networking break. The sponsor halves its contribution; Gu accepts, and the number of travel grants shrinks with it.",
    ),
    takeaway: L(
      "这则示例练的是尽早带着清楚的方案找赞助方、读懂对方要什么，同时把科学内容放在第一位。",
      "This illustration practises approaching a sponsor early with a clear proposal, reading what they need, and still keeping the science first.",
    ),
    competencies: ["relationship-skills", "social-awareness", "self-management"],
    skills: ["convening", "reading-incentives", "making-the-ask"],
    context: "organizing",
    keywords: ["赞助", "赞助商", "方案", "演讲时段", "差旅补助", "sponsor", "sponsorship", "proposal", "speaking slot", "workshop"],
  },
];
