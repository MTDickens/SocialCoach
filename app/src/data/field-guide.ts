import { L, type ContextId, type L as Localized } from "./taxonomy";
import type { FrontierSourceKey } from "./corpus/frontier/sources";

/**
 * The field guide: who is in these rooms, what each room expects, and what the
 * words mean.
 *
 * Provenance, stated to the learner on the page as well: entries marked with a
 * `basis` draw on the checked sources in `corpus/frontier/sources.ts`. The rest
 * is editorial synthesis — a starting map written for practice, not research
 * findings and not a description of any real person. It is meant to be
 * corrected by the learner's own field notes.
 */

export interface Phrase {
  /** What they say. Kept in English: this is how it is said in the room. */
  says: string;
  /** What it usually means, and what it does not. */
  means: Localized;
}

export interface Archetype {
  id: string;
  name: Localized;
  oneLine: Localized;
  /** What their job rewards. Most behaviour follows from this. */
  judgedOn: Localized;
  /** What they are hoping to get from a conversation with a researcher. */
  wants: Localized;
  /** What they cannot or will not say, however nicely asked. */
  cannot: Localized;
  phrases: Phrase[];
  /** Questions that only someone in their seat can answer well. */
  ask: Localized[];
  /** Moves that reliably lose them. */
  avoid: Localized[];
  basis: FrontierSourceKey[];
  /** Scenario ids where this person shows up. */
  practice: string[];
}

export interface Room {
  id: string;
  context: ContextId;
  name: Localized;
  oneLine: Localized;
  rules: Localized[];
  basis: FrontierSourceKey[];
  practice: string[];
}

export interface Term {
  term: string;
  group: "investing" | "startup" | "conference" | "etiquette";
  meaning: Localized;
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "vc-partner",
    name: L("投资人（合伙人）", "Investor (partner)"),
    oneLine: L("时间按分钟算，判断在第一分钟形成。要的是你的判断，不是综述。", "Time is counted in minutes and the read forms in the first one. They want your judgment, not a survey."),
    judgedOn: L(
      "投中少数几个大赢家。所以他们既怕投错，更怕错过；一个人的兴趣很受其他投资人怎么看的影响。",
      "Backing the few big winners. So they fear a flop and fear missing a winner more; one investor's interest depends heavily on what other investors think.",
    ),
    wants: L(
      "一个圈内人对「谁是真的、为什么是现在」的直接判断，以及两三个值得去聊的人。多数人听不懂技术细节，也不装懂。",
      "An insider's direct read on who is real and why now, plus two or three people worth calling. Most do not follow technical detail and do not pretend to.",
    ),
    cannot: L("被投公司的非公开信息、具体估值、还没宣布的交易。", "Non-public portfolio information, specific valuations, deals not yet announced."),
    phrases: [
      { says: "What are you seeing?", means: L("给我一个别人还没注意到的具体观察。不是在问你的论文。", "Give me one specific thing others have not noticed yet. It is not asking about your paper.") },
      { says: "Is there a company in that?", means: L("这件事谁会付钱、为什么是现在。「没有，因为……」是一个完全合格的回答。", "Who pays for this and why now. ‘No, because…’ is a perfectly good answer.") },
      { says: "Let's stay close. / Send me something.", means: L("友好，但不是承诺。没有说定具体的事、时间和渠道，就什么都还没发生。", "Friendly, and not a commitment. Until a specific thing, time and channel are named, nothing has happened.") },
      { says: "Who else should I talk to?", means: L("在收集名字。推荐谁、要不要先问过对方，由你决定。", "They are collecting names. Whom you name, and whether you ask that person first, is your call.") },
      { says: "We'd love to just chat, no agenda.", means: L("没有议程的聊天通常也是在看项目或做尽调。可以聊，心里要有数。", "A chat with no agenda is usually still deal-sourcing or diligence. Fine to take — know what it is.") },
    ],
    ask: [
      L("你看一个团队时，最先因为什么把它排除？", "What rules a team out for you first?"),
      L("你自己对这个方向最不确定的是哪一点？", "Which part of this area are you least sure about yourself?"),
      L("一个研究结果离「可以做成公司」，在你看来差的通常是什么？", "What usually stands between a research result and a company, as you see it?"),
    ],
    avoid: [
      L("把论文摘要念一遍。", "Reciting your abstract."),
      L("为了显得有料，讲别人还没公开的事。", "Passing on others' unpublished news to seem plugged in."),
      L("把一句「保持联系」当成对方答应了什么。", "Treating ‘let's stay in touch’ as an agreement to anything."),
    ],
    basis: ["pgRaise", "pgConvince"],
    practice: ["vc-call-info-exchange", "dinner-vc-is-there-a-company", "dinner-mixed-table-open", "vc-call-you-initiate"],
  },
  {
    id: "vc-associate",
    name: L("投资人（associate / scout）", "Investor (associate / scout)"),
    oneLine: L("在做尽调，收集名字和判断；比合伙人更勤快，也更没有决定权。", "Doing diligence, collecting names and opinions; hungrier than a partner and with less authority."),
    judgedOn: L("带回来的项目线索和信息质量。一份写给合伙人的 memo 往往周一就要交。", "The deals and the quality of information they bring back. A memo for the partners is often due Monday."),
    wants: L("哪些组是真的、哪条技术路线是炒作、谁可能出来创业——最好能引用你的话。", "Which groups are real, which technique is hype, who might spin out — ideally in your words, attributed."),
    cannot: L("替基金做任何承诺；基金内部对某家公司的真实看法。", "Commit the fund to anything; the fund's real internal view of a company."),
    phrases: [
      { says: "I'm just curious…", means: L("这是工作。问清楚你的话会被怎么用、会不会署名，再决定说多少。", "This is work. Ask how what you say will be used and whether it is attributed, then decide how much to say.") },
      { says: "Off the record, what do you think of X's group?", means: L("「不署名」需要你说出口并得到对方确认；默认情况下，你说的话会带着你的名字进 memo。", "‘Unattributed’ has to be said aloud and confirmed; by default your words go into the memo with your name.") },
    ],
    ask: [
      L("你们现在在看这个方向里的哪一类问题？", "Which kind of problem in this area are you looking at right now?"),
      L("你聊过的人里，大家分歧最大的是哪一点？", "Across the people you have talked to, where do they disagree most?"),
    ],
    avoid: [
      L("点名评价同行的组，却没有先约定不署名。", "Rating named peers' groups without first agreeing it is unattributed."),
      L("只被问、不反问——你也可以换回东西。", "Only answering and never asking — you can get something back too."),
    ],
    basis: ["pgRaise", "chatham"],
    practice: ["dinner-associate-fishing", "dinner-status-roll-call"],
  },
  {
    id: "founder",
    name: L("创业者", "Founder"),
    oneLine: L("永远在卖或者在招人。说话的单位是客户、进展和时间线。", "Always selling or recruiting. Speaks in customers, traction and timelines."),
    judgedOn: L("公司活下去并且增长。缺时间，更缺研究人才。", "The company surviving and growing. Short of time, shorter of research talent."),
    wants: L("你来加入、当顾问，或者至少让你的名字出现在融资材料里；也想听到一个懂行的人说他们的方向是对的。", "You joining, advising, or at least your name on the deck; and an expert saying their direction is right."),
    cannot: L("不好看的数字。问得笼统只会得到「势头很好」。", "Unflattering numbers. A vague question gets ‘strong pull’."),
    phrases: [
      { says: "You should come by the office.", means: L("客气话，也是招人的第一步。不是邀约，除非说了时间。", "A courtesy and the first step of recruiting. Not an invitation until a time is named.") },
      { says: "We're basically closed on the round.", means: L("可能还没签。和你有关的决定，按签了之后的事实来做。", "It may not be signed. Make any decision that involves you on what is true after signing.") },
      { says: "Customers don't care about that.", means: L("在用客户检验你的话。这是反驳，不是敌意；可以追问是哪一类客户。", "Testing your point against customers. It is pushback, not hostility; ask which customers.") },
    ],
    ask: [
      L("有多少客户在付钱？他们为哪一件事付钱？", "How many customers pay, and for which one thing?"),
      L("如果我加入，前三个月具体要解决的研究问题是什么？", "If I joined, what research problem would I be solving in the first three months?"),
      L("做公司之前你在做什么？", "What were you doing before the company?"),
    ],
    avoid: [
      L("出于礼貌说「听起来很有意思」——会被当作同意。", "Saying ‘sounds interesting’ out of politeness — it gets treated as a yes."),
      L("没看到书面条件就让对方用你的名字。", "Letting your name be used before any terms are in writing."),
    ],
    basis: ["pgConvince"],
    practice: ["technight-founder-recruits-you", "exit-monologuer", "dinner-lab-unreleased", "host-side-dinner"],
  },
  {
    id: "lab-researcher",
    name: L("Frontier lab 的研究员 / 工程师", "Frontier-lab researcher / engineer"),
    oneLine: L("友好，但有一整块东西不能谈。被打听得很累，被问到具体的公开工作会明显放松。", "Friendly, with a whole area they cannot discuss. Worn out by fishing; visibly relaxes at a precise question about public work."),
    judgedOn: L("内部的研究和工程产出，以及不出信息事故。", "Internal research and engineering output — and not causing a leak."),
    wants: L("一场不用设防的技术对话；知道外面的人怎么用、为什么不用他们公开的东西。", "A technical conversation they do not have to guard; to learn how outsiders use, or why they ignore, what the lab has released."),
    cannot: L("未发布的模型、算力数字、路线图、招聘计划。再友好也不行。", "Unreleased models, compute numbers, roadmap, hiring plans. However friendly you are."),
    phrases: [
      { says: "Publicly speaking…", means: L("后面这句是可以引用的版本。别追问不公开的版本。", "What follows is the quotable version. Do not push for the other one.") },
      { says: "I can't really get into that.", means: L("到此为止。换一个关于公开工作的具体问题，对话会重新打开。", "That is the boundary. Switch to a precise question about public work and the conversation reopens.") },
    ],
    ask: [
      L("你做的东西里，哪些是公开的？", "Which parts of what you work on are public?"),
      L("你最希望外面的人问你什么？", "What do you wish outsiders would ask you?"),
      L("公开的那篇里，那个设计选择当时是怎么定的？", "In the public paper, how did that design choice get made?"),
    ],
    avoid: [
      L("打听下一代模型。", "Fishing for the next model."),
      L("第一次见面就要内推。", "Asking for a referral in the first conversation."),
      L("用你导师组里没发表的结果去换。", "Offering your group's unpublished results in exchange."),
    ],
    basis: ["chatham"],
    practice: ["dinner-lab-unreleased", "mixer-turn-chat-into-call", "follow-up-gone-cold", "industry-booth-recruiter"],
  },
  {
    id: "senior-academic",
    name: L("资深学者", "Senior academic"),
    oneLine: L("一整天都在被打断。对一个具体的技术点和一个小而明确的请求有反应，对泛泛的赞美没有。", "Interrupted all day. Responds to one specific technical point and one small, concrete ask — not to generic praise."),
    judgedOn: L("学生、论文和领域里的影响。时间被预订得很满。", "Students, papers and standing in the field. Their time is heavily over-booked."),
    wants: L("一个真正读过他们工作的人提出的好问题；有时是一个他们自己不确定的点上的外部数据。", "A good question from someone who has actually read the work; sometimes an outside data point on something they are unsure of."),
    cannot: L("在走廊里答应大的事情。「发邮件给我」经常没有下文。", "Agree to anything large in a corridor. ‘Email me’ often leads nowhere."),
    phrases: [
      { says: "Email me.", means: L("不一定是拒绝，但也不是答应。问一句「哪个时间段更容易看到」或者当场约一个具体时间更可靠。", "Not necessarily a no, and not a yes. Asking when it is likeliest to be seen, or fixing a time on the spot, is more reliable.") },
      { says: "So — what can I do for you?", means: L("请直接说请求。准备好一句话的版本。", "State the ask. Have the one-sentence version ready.") },
    ],
    ask: [
      L("关于他们某篇工作里一个具体设定的问题。", "A question about one specific setting in one of their papers."),
      L("这个方向里，你觉得现在最该有人去做、但没人做的是什么？", "What in this area most needs doing right now and nobody is doing?"),
    ],
    avoid: [
      L("「我很喜欢您的工作」之后没有下文。", "‘I love your work’ with nothing after it."),
      L("因为对方有名才去找他，却说不出具体想聊什么。", "Approaching because they are famous, with no specific thing to discuss."),
      L("第一次通话就请对方当导师、写推荐信。", "Asking for mentorship or a letter on the first call."),
    ],
    basis: ["ernstConference", "justAsk", "adviceSeeking"],
    practice: ["hallway-senior-approach", "first-zoom-senior-researcher", "zoom-ask-in-person", "invite-keynote-speaker", "poster-thirty-seconds"],
  },
  {
    id: "peer",
    name: L("同辈研究者", "Peer researcher"),
    oneLine: L("同时是潜在的合作者和竞争者。守着没发表的想法，在意署名，一份换一份。", "A possible collaborator and competitor at once. Guards unpublished ideas, cares about authorship, trades piece for piece."),
    judgedOn: L("一作论文。毕业和找工作都靠它。", "First-author papers. Graduating and getting hired both depend on them."),
    wants: L("知道你做到哪一步了；确认自己不会被抢发，也不会在合作里被排到后面。", "To know how far along you are; to be sure they will not be scooped, or pushed down the author list in a collaboration."),
    cannot: L("先亮出没发表的结果。", "Show unpublished results first."),
    phrases: [
      { says: "Who would be first author?", means: L("不是冒犯，是在把最容易出事的地方提前讲清楚。认真回答。", "Not rude — it is getting the likeliest source of trouble on the table early. Answer it properly.") },
      { says: "We have something similar in the pipeline.", means: L("可能撞车。可以谈各自公开到哪一步、能不能区分开或合作，不必谈细节。", "A possible collision. You can discuss what each side has public and whether to differentiate or collaborate, without details.") },
    ],
    ask: [
      L("公开的版本里，你们下一步打算往哪个方向走？", "From what is public, where are you heading next?"),
      L("如果合作，你最在意哪一件事先说定？", "If we worked together, what would you most want settled first?"),
    ],
    avoid: [
      L("合作聊得很好，却没有说谁做什么、怎么署名。", "A warm collaboration chat that never says who does what and how authorship works."),
      L("套对方的未发表细节。", "Fishing for their unpublished details."),
    ],
    basis: ["collaborationRules", "ernstConference"],
    practice: ["scooped-author-meeting", "collab-proposal-call", "intro-with-coauthor-present", "coorganizer-speaker-lineup"],
  },
  {
    id: "recruiter",
    name: L("Recruiter / DevRel", "Recruiter / developer relations"),
    oneLine: L("考核的是线索数量和扫了多少个胸牌，所以会把你往表单上引——但日程和入口也在他们手里。", "Measured on pipeline and badge scans, so they steer you to the form — but they also hold the calendars and the access."),
    judgedOn: L("带回多少合格的候选人和联系人。", "How many qualified candidates and contacts they bring back."),
    wants: L("你的简历、你的方向、你什么时候毕业。", "Your CV, your area, your graduation date."),
    cannot: L("回答技术问题；替研究团队承诺时间——但常常能帮你约到。", "Answer technical questions; commit a research team's time — though they can often book it for you."),
    phrases: [
      { says: "Can I scan your badge?", means: L("之后你会收到邮件。如果你想要的是和研究负责人聊，现在就把这个请求说出来。", "You will get emails afterwards. If what you want is time with the research lead, say so now.") },
    ],
    ask: [
      L("如果我想和做某个方向的人聊十五分钟，最可行的方式是什么？", "If I want fifteen minutes with someone working on a given topic, what is the workable route?"),
    ],
    avoid: [
      L("把他们当成挡路的人绕过去——他们往往就是那条路。", "Treating them as an obstacle to get round — they are often the route."),
    ],
    basis: ["justAsk"],
    practice: ["industry-booth-recruiter", "sponsor-ask-workshop"],
  },
  {
    id: "chair",
    name: L("主持人 / 组织者", "Chair / organizer"),
    oneLine: L("对时间负责。会打断伪装成提问的发言，也会保护还没开过口的人。", "Owns the clock. Cuts a speech dressed as a question, and protects whoever has not spoken yet."),
    judgedOn: L("这一场准时、有内容、没出事。", "A session that ran to time, had substance and went without incident."),
    wants: L("短而具体的问题；一个能写进总结的真分歧。", "Short, specific questions; a real disagreement worth putting in the summary."),
    cannot: L("为了你一个人超时。", "Overrun for your sake."),
    phrases: [
      { says: "Let's keep it brief — one question.", means: L("先说问题，再说一句背景。反过来会被打断。", "Question first, then one line of context. The other way round gets cut off.") },
      { says: "Let's take that offline.", means: L("现在结束，结束后可以继续。演讲者通常会在台边再留几分钟。", "Stop now; continue afterwards. The speaker usually stays by the stage for a few minutes.") },
    ],
    ask: [
      L("结束后在哪里可以继续这个问题？", "Where can this question continue after the session?"),
    ],
    avoid: [
      L("「这更像一个 comment 而不是问题」。", "‘This is more of a comment than a question.’"),
      L("被要求收尾之后继续讲。", "Carrying on after being asked to wrap up."),
    ],
    basis: ["chairRules", "neuripsWorkshops"],
    practice: ["qa-mic-question", "workshop-contrarian-take", "panel-moderation-dominator"],
  },
];

export const ROOMS: Room[] = [
  {
    id: "poster",
    context: "conference",
    name: L("Poster 展位", "Poster session"),
    oneLine: L("十秒钟决定对方留不留。", "Ten seconds decide whether they stay."),
    rules: [
      L("先讲你在回答的那个问题，再讲做法。对方问「所以结论是什么」，用一句话答。", "Lead with the question you answer, then the method. When asked for the takeaway, answer in one sentence."),
      L("让对方看，不要拦人；有人质疑，先确认你听懂了质疑的是哪一点。", "Let people look without pressing them; when challenged, first check which point is being challenged."),
      L("结束前让后续变得容易：一个链接或联系方式，以及你们各自接下来做什么。", "Before they leave, make follow-up easy: a link or contact, and what each of you does next."),
    ],
    basis: ["posterRules", "ernstConference"],
    practice: ["poster-thirty-seconds", "poster-skeptic-baseline", "intro-with-coauthor-present", "zoom-ask-in-person"],
  },
  {
    id: "hallway",
    context: "conference",
    name: L("走廊与茶歇", "Hallway and coffee breaks"),
    oneLine: L("Ernst 的说法：在会议上，促成走廊对话是你最主要的工作。", "Ernst's line: at a conference, cultivating hallway conversations is your chief job."),
    rules: [
      L("找每个人都要有一个具体的理由和话题，「他很有名」不算。", "Have a concrete reason and topic for each person; ‘they are famous’ is not one."),
      L("想加入一圈人：走近、先听；用一个问题加入最顺。对话像是私事就别进。", "To join a circle: move up and listen first; a question is the best way in. Stay out if it looks personal."),
      L("别成群结队。和认识的人待在一起只用来充电。", "Do not move in a pack. Time with people you already know is for recharging."),
      L("离开也是技能：说一句具体的收尾，像以后还会再见一样结束。", "Leaving is a skill too: close with something specific, as if you will meet again."),
    ],
    basis: ["ernstConference", "fralic"],
    practice: ["hallway-senior-approach", "coffee-break-circle", "exit-monologuer", "scooped-author-meeting"],
  },
  {
    id: "qa",
    context: "conference",
    name: L("报告问答与 workshop 讨论", "Talk Q&A and workshop discussion"),
    oneLine: L("全场在听，主持人在看表。", "The room is listening and the chair is watching the clock."),
    rules: [
      L("一个问题，先说问题本身。具体到演讲者不能用现成的话回答。", "One question, question first. Specific enough that the speaker cannot answer with a stock line."),
      L("有不同看法就说成一个可以被反驳的判断，带上理由和它不成立的条件。", "If you disagree, state it as a contestable judgment with its reasons and the conditions under which it fails."),
      L("被说服了就当场说；没被说服，说清楚还差哪一步，然后把话筒交回去。", "If persuaded, say so on the spot; if not, say what is still missing, then hand the microphone back."),
    ],
    basis: ["chairRules", "hamming", "reputationRules"],
    practice: ["qa-mic-question", "workshop-contrarian-take"],
  },
  {
    id: "dinner",
    context: "mixer",
    name: L("会议晚宴（混合桌）", "Conference dinner (mixed table)"),
    oneLine: L("注意力是稀缺品。没有人会来救你，话题只会自己滑走——但你随时可以再插回来。", "Attention is the scarce thing. Nobody rescues you; the talk just moves on — and you can always cut back in."),
    rules: [
      L("「What are you seeing?」要的是一个具体观察，一两句话。不是论文摘要。", "‘What are you seeing?’ wants one specific observation in a sentence or two. Not your abstract."),
      L("「我只是学生」不会换来安慰。把你做的事平实、具体地说出来，会被当作同行。", "‘I'm just a student’ earns no reassurance. A plain, specific statement of what you do gets treated as a peer's."),
      L("信息靠交换流动：先给一个对方用得上的东西，再问。只问不给，得到的是场面话。", "Information moves by exchange: offer something they can use, then ask. Asking without offering gets a stock line."),
      L("桌上说过的话通常可以转述，谁说的不行。别人没发表的结果、审稿内容、私下的去向，不是谈资。", "What was said at the table is usually repeatable; who said it is not. Others' unpublished results, reviews and private moves are not small talk."),
      L("问每个人一个只有他那个位置才答得好的问题。", "Ask each person a question only someone in their seat can answer well."),
    ],
    basis: ["chatham", "hamming", "deeperTalk", "ernstConference"],
    practice: ["dinner-mixed-table-open", "dinner-vc-is-there-a-company", "dinner-lab-unreleased", "dinner-status-roll-call", "dinner-associate-fishing"],
  },
  {
    id: "party",
    context: "mixer",
    name: L("赞助酒会、tech night、after-party", "Sponsor parties, tech nights, after-parties"),
    oneLine: L("站着、吵、每段对话只有几分钟。兴趣不等于同意。", "Standing, loud, a few minutes per conversation. Interest is not agreement."),
    rules: [
      L("一句「听起来很有意思」、一张名片、「你该来我们办公室」，什么都没有确立。", "‘Sounds interesting’, a business card, ‘you should come by the office’ establish nothing."),
      L("想要下一步，就在对方被拉走之前说出具体的事、时间和渠道。", "If you want a next step, name the specific thing, time and channel before they are pulled away."),
      L("有人抛出尖锐的观点时，接一个具体的点，不必接下整场争论。", "When someone throws out a hot take, engage one specific point; you need not take on the whole argument."),
      L("八卦里问到你知道内情的事：「不方便评论」常被当作默认。可以直接说这不是你该讲的，然后换话题或离开。", "When gossip reaches something you know from the inside, ‘no comment’ is often read as confirmation. You can say plainly that it is not yours to tell, then change the subject or leave."),
    ],
    basis: ["pgRaise", "fralic", "reputationRules"],
    practice: ["technight-founder-recruits-you", "afterparty-hot-take", "sponsor-party-gossip", "mixer-turn-chat-into-call"],
  },
  {
    id: "investor-call",
    context: "outreach",
    name: L("和投资人通话", "A call with an investor"),
    oneLine: L("你不融资也可以聊。想清楚你放什么上桌、想换回什么、在哪里停。", "You can talk without raising. Decide what you put on the table, what you want back, and where you stop."),
    rules: [
      L("对方开口就会问请求是什么。准备一句话的版本——「我不融资，我想弄明白……」完全可以。", "They will ask for the ask straight away. Have the one-sentence version — ‘I'm not raising; I want to understand…’ is fine."),
      L("给一个具体、有理由、可以被反驳的判断。说不知道的时候，说你会怎么去弄清楚。", "Give one specific, reasoned, contestable judgment. When you do not know, say how you would find out."),
      L("被问到别的组、别人是否要出来创业：那不是你该讲的。说明原因地拒绝，通常会让对方更信任你。", "Asked about other groups or whether someone is spinning out: not yours to tell. A refusal with its reason usually raises their trust."),
      L("挂电话之前，热情的话不算数；说定了具体的事才算。", "Before hanging up, warm words do not count; a named specific thing does."),
    ],
    basis: ["pgRaise", "pgConvince", "chatham", "fralic"],
    practice: ["vc-call-info-exchange", "vc-call-you-initiate"],
  },
  {
    id: "researcher-call",
    context: "outreach",
    name: L("约研究者聊：当面约、首次 Zoom、请人引荐", "Reaching a researcher: asking in person, the first Zoom, asking for an intro"),
    oneLine: L("研究发现：人们会低估别人答应直接请求的可能性。但请求要小、要具体。", "The research finding: people underestimate how likely others are to agree to a direct request. Keep the request small and specific."),
    rules: [
      L("请求说成一件事：多长时间、谈哪一个问题、为什么找他。给对方留出说不的余地。", "Make the ask one thing: how long, about which question, why them. Leave room for a no."),
      L("就对方专长里的难题请教，不会显得你不行——研究发现恰恰相反。", "Asking advice on a hard problem in their expertise does not make you look weak — the research finds the opposite."),
      L("请人引荐，是在花对方的信用。先问他愿不愿意、再让他去问对方（双向同意），并给一段可以直接转发的话。", "An introduction spends the introducer's credit. Ask if they are willing, let them ask the other person first (double opt-in), and hand them a forwardable blurb."),
      L("通话结束前确认下一步由谁做、什么时候做。跟进邮件：短，请求放在最上面。", "Before the call ends, confirm who does what next and when. Follow-up email: short, with the ask at the top."),
    ],
    basis: ["justAsk", "adviceSeeking", "fralic", "email"],
    practice: ["zoom-ask-in-person", "first-zoom-senior-researcher", "intro-request-mutual", "follow-up-gone-cold", "collab-proposal-call"],
  },
  {
    id: "workshop",
    context: "organizing",
    name: L("办 workshop、主持 panel、做东", "Running a workshop, moderating a panel, hosting"),
    oneLine: L("NeurIPS 对 workshop 的定位：一个非正式、面对面讨论进行中工作和未来方向的场合。", "How NeurIPS frames a workshop: an informal venue for in-person discussion of work in progress and future directions."),
    rules: [
      L("邀请讲者：说清楚 workshop 想回答哪个问题、为什么需要他、你具体要他做什么。小的、不寻常的形式比「来做个 keynote」更容易被答应。", "Inviting a speaker: say which question the workshop is after, why it needs them, and exactly what you are asking. A small or unusual format is easier to accept than ‘give a keynote’."),
      L("阵容要平衡：资深和年轻的讲者都有，留出交流时间。和合办者的分歧尽早摆上桌，利益关系要说明。", "Balance the line-up: senior and junior speakers, with time for exchange. Put disagreements with co-organizers on the table early, and declare conflicts of interest."),
      L("主持：事先把规则告诉讲者，自己掌握时间，自己点下一个提问的人；讨论拖长或变得太技术时介入。", "Moderating: tell speakers the rules beforehand, own the clock, choose each questioner yourself; step in when a discussion runs long or too technical."),
      L("找赞助：早开口，带一份清楚的方案；对方想要的曝光和奖项评审的独立性是两件事。", "Asking a sponsor: ask early with a clear proposal; the exposure they want and the independence of an award are two separate things."),
      L("做东：你的工作是让该认识的人认识，让被盖过去的人有机会开口。", "Hosting: your job is to connect the people who should meet and make room for whoever is being talked over."),
    ],
    basis: ["neuripsWorkshops", "meetingRules", "chairRules", "reputationRules"],
    practice: ["invite-keynote-speaker", "coorganizer-speaker-lineup", "panel-moderation-dominator", "sponsor-ask-workshop", "senior-coorganizer-recruit", "speaker-cancels-last-minute", "host-side-dinner"],
  },
];

/** Common usage. What a particular person means by a term is always theirs to confirm. */
export const TERMS: Term[] = [
  { term: "thesis", group: "investing", meaning: L("一家基金或一位投资人对某个方向的成文判断：为什么是这个方向、为什么是现在。", "A fund's or investor's written view of an area: why this, why now.") },
  { term: "deal flow", group: "investing", meaning: L("投资人能看到的项目来源和数量。", "The supply of companies an investor gets to see.") },
  { term: "diligence", group: "investing", meaning: L("尽职调查。投资前找各种人核实团队、技术和市场——包括约你「聊聊」。", "Checking a team, its technology and market before investing — including by asking you for ‘a quick chat’.") },
  { term: "pre-seed / seed / Series A", group: "investing", meaning: L("融资轮次，从最早到较成熟。数额和标准随年份变化很大，听到数字时别默认它的含义。", "Funding rounds from earliest to more mature. Sizes and bars change a lot by year; do not assume what a number implies.") },
  { term: "lead (investor)", group: "investing", meaning: L("领投方：定条款、出最大一笔的那家。说「我们不领投」通常意味着在等别人先出手。", "The investor who sets terms and writes the largest cheque. ‘We don't lead’ usually means waiting for someone else to commit first.") },
  { term: "term sheet", group: "investing", meaning: L("投资条款清单。拿到它之前，口头的兴趣都不算数。", "The document of proposed investment terms. Before one exists, verbal interest does not count.") },
  { term: "check size", group: "investing", meaning: L("一家基金通常单笔投多少。", "How much a fund typically invests at a time.") },
  { term: "pass", group: "investing", meaning: L("决定不投。常常以沉默而不是明说的方式发生。", "Deciding not to invest. Often happens by silence rather than being said.") },
  { term: "portfolio", group: "investing", meaning: L("一家基金已经投的公司。", "The companies a fund has already backed.") },
  { term: "partner / principal / associate", group: "investing", meaning: L("基金里的层级，决定权依次递减。合伙人能拍板，associate 多在收集信息。", "Ranks in a fund, in falling order of authority. Partners decide; associates mostly gather information.") },
  { term: "GP / LP", group: "investing", meaning: L("GP 是管理基金、做投资决定的人；LP 是把钱交给基金的出资方。", "GPs run the fund and make the investments; LPs are the investors who put money into the fund.") },
  { term: "warm intro", group: "investing", meaning: L("由双方都认识的人做的引荐。和陌生邮件相比，被看到的可能性高得多。", "An introduction through someone both sides know. Far likelier to be read than a cold email.") },
  { term: "double opt-in intro", group: "etiquette", meaning: L("引荐人先分别征得双方同意，再把两人连起来。", "The introducer asks both people first, and only then connects them.") },
  { term: "runway", group: "startup", meaning: L("按现在的花钱速度，公司的钱还能撑多久。", "How long a company's money lasts at its current spending.") },
  { term: "traction", group: "startup", meaning: L("产品被真实使用或付费的证据。", "Evidence that a product is actually being used or paid for.") },
  { term: "pilot / design partner", group: "startup", meaning: L("试点客户 / 愿意一起打磨早期产品的客户。两者都不一定付钱，值得问清楚。", "A trial customer / a customer who helps shape an early product. Neither necessarily pays — worth asking.") },
  { term: "founding (research) scientist", group: "startup", meaning: L("公司最早期加入的研究负责人之一。头衔背后的股权、职责和话语权差别很大，要看书面条件。", "One of the earliest research hires. Equity, duties and say behind the title vary widely; look at the written terms.") },
  { term: "advisor", group: "startup", meaning: L("顾问。通常以少量股权换一定的时间投入；你的名字也可能被用于融资材料。", "Usually a small equity grant for a set amount of time; your name may also be used in fundraising material.") },
  { term: "equity / vesting / cliff", group: "startup", meaning: L("股权 / 分期兑现 / 兑现前必须待满的最短期限。口头说的比例不算数。", "Ownership / earning it over time / the minimum stay before any of it is earned. A percentage said aloud does not count.") },
  { term: "cap table", group: "startup", meaning: L("谁持有公司多少股份的表。", "The table of who owns how much of the company.") },
  { term: "spin out", group: "startup", meaning: L("从实验室或大公司里出来成立公司。", "Leaving a lab or large company to form a new company around the work.") },
  { term: "stealth", group: "startup", meaning: L("公司存在但不公开自己在做什么。", "A company that exists but does not say publicly what it is building.") },
  { term: "moat / wedge", group: "startup", meaning: L("别人难以复制的优势 / 切入市场的第一个小口子。", "An advantage others cannot easily copy / the first narrow way into a market.") },
  { term: "why now", group: "investing", meaning: L("这件事为什么在今天变得可行或必要，而不是三年前或三年后。", "What makes this feasible or necessary today rather than three years ago or three years on.") },
  { term: "hallway track", group: "conference", meaning: L("会场走廊、茶歇和饭桌上的那部分会议——很多人认为是最有价值的部分。", "The part of a conference that happens in corridors, breaks and meals — for many, the most valuable part.") },
  { term: "oral / spotlight / poster", group: "conference", meaning: L("论文在会议上的展示形式，从较长的口头报告到海报。", "How a paper is presented, from a longer talk down to a poster.") },
  { term: "invited talk / keynote", group: "conference", meaning: L("组织者邀请的报告，不经过投稿评审。", "A talk the organizers invite, outside the submission review.") },
  { term: "workshop vs. main track", group: "conference", meaning: L("workshop 是会议期间的专题活动，更小、更非正式，适合进行中的工作；主会论文经过正式评审。", "A workshop is a smaller, less formal themed event for work in progress; main-track papers go through the formal review.") },
  { term: "AC / SAC / PC", group: "conference", meaning: L("领域主席 / 高级领域主席 / 程序委员会：评审流程中的角色。评审内容是保密的。", "Area chair / senior area chair / program committee: roles in the review process. What happens in review is confidential.") },
  { term: "camera-ready", group: "conference", meaning: L("论文被接收后提交的最终版本。", "The final version of a paper submitted after acceptance.") },
  { term: "Chatham House Rule", group: "etiquette", meaning: L("可以使用听到的信息，但不得透露发言者或其他参与者的身份和所属机构。", "You may use the information received, but may not reveal the identity or affiliation of the speaker or of any other participant.") },
  { term: "off the record", group: "etiquette", meaning: L("不引用、不署名——但只有双方事先说定才成立，事后补一句不算。", "Not to be quoted or attributed — but only if agreed beforehand; saying it afterwards does not make it so.") },
  { term: "NDA", group: "etiquette", meaning: L("保密协议。对方说「签了 NDA」时，这个话题就到此为止。", "A confidentiality agreement. When someone says they are under NDA, that topic ends there.") },
  { term: "embargo", group: "etiquette", meaning: L("约定在某个时间之前不公开。", "An agreement not to make something public before a set time.") },
];

export const TERM_GROUPS: Record<Term["group"], Localized> = {
  investing: L("投资", "Investing"),
  startup: L("创业公司", "Startups"),
  conference: L("会议", "Conferences"),
  etiquette: L("规矩", "Ground rules"),
};
