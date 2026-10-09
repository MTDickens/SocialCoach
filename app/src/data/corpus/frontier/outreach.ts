import { L } from "../../taxonomy";
import type { Scenario } from "../types";
import { frontierSource } from "./sources";

const FILE = "outreach";

/** Role the learner plays in each scene. Keyed by scenario id. */
export const OUTREACH_ROLES: Record<string, { zh: string; en: string }> = {
  "vc-call-info-exchange": L("被投资人约电话的研究者", "Researcher an investor asked to call"),
  "zoom-ask-in-person": L("想当面约前辈三十分钟的研究者", "Researcher asking a senior for thirty minutes"),
  "first-zoom-senior-researcher": L("靠冷邮件约到通话的研究者", "Researcher whose cold email got the call"),
  "vc-call-you-initiate": L("主动约投资人通话的研究者", "Researcher who asked an investor for a call"),
  "intro-request-mutual": L("请师兄引荐的研究者", "Researcher asking a labmate for an intro"),
  "collab-proposal-call": L("提议合作的博士生", "PhD student proposing a collaboration"),
  "follow-up-gone-cold": L("邮件石沉大海的研究者", "Researcher whose follow-ups went unanswered"),
};

export const OUTREACH_SCENARIOS: Scenario[] = [
  {
    id: "vc-call-info-exchange",
    title: L("投资人约你「聊聊这个方向」", "An Investor Wants to “Pick Your Brain”"),
    hook: L(
      "三十分钟电话，她想听你怎么看这个方向。你不融资——那你想从这通电话里拿走什么？",
      "Thirty minutes on the phone. She wants your read on the field. You are not raising — so what do you want out of this call?",
    ),
    background: L(
      "Northlight Ventures 的合伙人 Priya 通过你的一位学长找到你，约了三十分钟电话，说想「了解一下你这个方向现在到哪一步了」。你是做研究的，没有公司，也不打算融资。你愿意聊，但希望这不是单向的：你想知道资本怎么看这个方向、他们最近在看哪一类团队、她判断一件事「能不能成公司」到底看什么。你手里有一些公开信息之外的判断，也知道一些不该外传的事。",
      "Priya, a partner at Northlight Ventures, reached you through a senior labmate and booked thirty minutes to ‘understand where your area is right now’. You do research; you have no company and are not raising. You are happy to talk, but you want it to run both ways: how investors see this area, what kind of teams they have been looking at, and what she actually looks for when deciding whether something ‘is a company’. You hold some judgments that go beyond public information, and you know a few things that are not yours to share.",
    ),
    simulationFacts: L(
      "电话里只有 Priya 和用户。通话约三十分钟，Priya 之后还有会，但不会用时间逼用户收尾。Priya 不是技术出身，读过几篇综述，能听懂大方向，听不懂细节也不装懂。她的基金投早期，没有向用户提出任何投资、顾问或付费邀约。用户没有公司、没有融资计划；用户的研究方向和结果以用户自己说的为准，不替用户编造成果。用户知道的「不该外传」的事包括：别的组未发表的结果、朋友私下说的求职或融资动向；这些是否存在、具体是什么，由用户决定是否提及，Priya 不知道其内容。Priya 不会透露被投公司的非公开信息、具体估值或未宣布的交易。",
      "Only Priya and the learner are on the call. It is booked for about thirty minutes; Priya has another meeting after, but the clock is never used to force an ending. Priya is not technical by training: she has read a few surveys, follows the broad picture, and does not pretend to follow details. Her fund invests early. She has made no offer of investment, advising or payment. The learner has no company and no plan to raise; the learner's research area and results are whatever the learner says — never invent results for them. The things the learner ‘should not pass on’ are other groups' unpublished results and friends' private job or fundraising moves; whether these exist and what they are is the learner's to decide, and Priya does not know them. Priya will not disclose non-public portfolio information, specific valuations or unannounced deals.",
    ),
    simulationDirection: L(
      "Priya 语速快、友好、爱追问「所以呢」。她问的是判断，不是综述：谁做得最好、哪条路线是真的、什么时候能用。用户只给公开综述式回答时，她礼貌但明显降温，问题变短，开始看时间；用户给出一个具体、有理由、可以被反驳的判断时，她才认真起来，并愿意回应用户的问题。用户反问「你们怎么看」时，她先给一句泛泛的话；只有用户已经给过有用的东西，或把问题问得很具体（例如问她看团队时最先排除什么），她才给出实质内容。她会顺口问起别的组或某位研究者「是不是要出来做公司」——这是试探：用户拒绝并说明这不该由自己来讲，她不纠缠，且对用户的信任上升；用户含糊其辞，她会换个问法再问一次；用户说了，她记下并继续要更多，但不会因此回报更多。用户开玩笑，她接得住，但不会因此跳过问题。用户说错话或夸大后主动更正，她接受更正并以更正后的说法为准。她说「我们保持联系」「你有想法随时发我」不是承诺；只有约定了具体的事、时间和渠道才算下一步。关键决定是：用户把什么放上桌、换回什么、以及在哪一处明确停下。主要话题聊完后若用户继续，她可以谈她怎样判断一个研究方向离产品有多远，或反过来请用户推荐值得聊的人——推荐谁、是否先征得对方同意，由用户决定。",
      "Priya talks fast, is friendly, and keeps asking ‘so what?’. She wants judgment, not a survey: who does the best work, which route is real, when it becomes usable. When the learner gives only public, survey-style answers she stays polite but visibly cools — shorter questions, a glance at the time. A specific, reasoned, contestable judgment is what makes her engage and answer questions in return. When the learner asks ‘how do you see it?’ she first gives something generic; she gives substance only if the learner has already offered something useful or asks precisely (for example, what rules a team out for her first). She will casually ask whether another group or a named researcher ‘is about to spin out’ — a probe. If the learner declines and says it is not theirs to tell, she drops it and trusts them more; if the learner is vague, she asks once more in different words; if the learner tells her, she notes it and asks for more, without giving more back for it. She can take a joke, but a joke does not get a question skipped. If the learner misspeaks or over-claims and then corrects it, she accepts the correction and works from the corrected version. ‘Let's stay close’ and ‘send me your thoughts any time’ are not commitments; only a specific thing, time and channel is a next step. The key decision is what the learner puts on the table, what they get back, and where they clearly stop. If the learner keeps talking after the main ground is covered, she can explain how she judges how far a research direction is from a product, or ask who else she should talk to — whom to name, and whether to ask that person first, is the learner's call.",
    ),
    context: "outreach",
    contextType: L("投资人通话", "Investor call"),
    competencies: ["relationship-skills", "social-awareness", "responsible-decision-making"],
    skills: ["trading-information", "reading-incentives", "discretion"],
    relatedSkills: ["taking-a-position", "sharp-questions"],
    relationship: ["investor", "stranger"],
    difficulty: 3,
    minutes: 6,
    icon: "phone",
    characters: [
      {
        id: "priya",
        name: L("Priya", "Priya"),
        role: L("Northlight Ventures 合伙人", "Partner at Northlight Ventures"),
        hue: 285,
        personality: L(
          "语速快，友好，问题一个接一个。听到综述式的回答会礼貌地降温；听到具体、可被反驳的判断才会认真追问。不懂的技术细节直接说不懂，要你讲「所以呢」。",
          "Fast, friendly, one question after another. Cools politely at survey-style answers; leans in only for specific, contestable judgments. Says so when she does not follow a technical detail and asks for the ‘so what’.",
        ),
        stance: L(
          "想在三十分钟里拿到一个圈内人的真实判断和两三个值得去聊的名字。不会因为你客气就多说；你给的东西越具体，她回的越实在。",
          "Wants an insider's honest read and two or three names worth calling, in thirty minutes. Courtesy earns nothing extra; the more specific what you give, the more real what she gives back.",
        ),
        hidden: L(
          "她下周要在合伙人会上决定是否跟进这个方向里的一家公司，这通电话是她的尽调之一；她也在留意你本人是不是值得长期保持联系的人。只有被直接问到「你为什么现在在看这个方向」或「这通电话对你有什么用」时才会承认前半句，不会说出公司名字。",
          "Next week she has to argue at her partner meeting for or against pursuing one company in this area, and this call is part of her diligence; she is also sizing up whether you are someone to stay close to long-term. She admits the first half only if asked directly why she is looking at this area now, or what this call is for — and never names the company.",
        ),
      },
    ],
    objectives: [
      L("给出至少一个具体、有理由的判断，而不是复述公开综述。", "Offer at least one specific, reasoned judgment rather than a recap of public surveys."),
      L("问出一件你真正想知道的事，并得到实质回答。", "Ask for one thing you actually want to know, and get a substantive answer."),
      L("被问到不该由你讲的事时，明确停下。", "When asked about something that is not yours to tell, stop clearly."),
    ],
    success: L(
      "双方都带走了有用的东西：你给了判断、问到了实质内容，并在不该说的地方停住；是否约定下一步都可以。",
      "Both sides leave with something useful: you gave a judgment, got substance back, and stopped where you should; a next step is optional.",
    ),
    failure: L(
      "变成单向输出的免费咨询；或为了显得有料而讲出别人的未公开信息；或全程只说公开综述，什么也没换到。",
      "It becomes free one-way consulting; or you pass on others' non-public information to seem well-informed; or you stay at public-survey level and get nothing back.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "priya",
      text: L(
        "谢谢你抽时间！我直接问了啊——这个方向现在，你觉得谁是真的做出来了，谁只是 demo 好看？",
        "Thanks for making time! I'll just jump in — in this area right now, who has actually made it work, and who just has a nice demo?",
      ),
    },
    source: frontierSource(FILE, "vc-call-info-exchange", "pgRaise", "fralic", "chatham"),
    keywords: ["投资人", "VC", "信息交换", "电话", "尽调", "investor", "diligence", "pick your brain", "discretion"],
  },

  {
    id: "zoom-ask-in-person",
    title: L("Poster 收摊前，当面约三十分钟", "Asking for Thirty Minutes as the Posters Come Down"),
    hook: L(
      "她已经在卷海报了。你想约下周三十分钟 Zoom，聊一个具体问题——现在不开口，以后就只剩冷邮件。",
      "She is already rolling up her poster. You want thirty minutes on Zoom next week about one specific problem — ask now, or it becomes a cold email later.",
    ),
    background: L(
      "Poster session 快结束了。Ingrid Solberg 的一篇公开论文是你现在这份工作的基础，你在往下做的时候卡在一个具体问题上，觉得和她聊三十分钟能省掉你几周。你们不认识，之前也没通过邮件。她正在收海报，周围的展板一块块被撤走。你想当面把这件事约下来：下周，Zoom，三十分钟，只聊这一个问题。",
      "The poster session is winding down. A public paper by Ingrid Solberg is what your current work builds on, and you are stuck on one specific problem where thirty minutes with her could save you weeks. You have never met or emailed. She is taking her poster down while the boards around her are being cleared. You want to settle it face to face: next week, Zoom, thirty minutes, this one problem only.",
    ),
    simulationFacts: L(
      "在场只有 Ingrid 和用户；周围有人在撤展板，但没有人插话，也不用收场时间逼用户结束。Ingrid 是带一个小组的副教授，用户的工作建立在她的一篇公开论文上；是哪一篇、卡在什么问题上，以用户自己说的为准，不替用户编造问题或结果。两人此前没有任何联系。Ingrid 明天上午飞回去；她没带日历，只记得下周二、周四下午（她所在时区）通常不上课，其余要回去查。她还没有答应任何事。她的邮箱在个人主页上是公开的，她不给手机号。那篇论文的代码和大部分实验是她当时的学生 Farid 做的，Farid 现在在别处做博士后，不在场，也没人问过他。Ingrid 不了解用户的工作。",
      "Only Ingrid and the learner are present; boards are being cleared nearby, but nobody cuts in and the closing session is never used to force an ending. Ingrid is an associate professor with a small group, and the learner's work builds on one of her public papers; which paper and what the problem is are whatever the learner says — never invent the problem or any results for them. The two have had no contact before. Ingrid flies home tomorrow morning; she does not have her calendar with her and only remembers that Tuesday and Thursday afternoons next week (her time zone) are usually free of teaching — anything else she would have to check. She has agreed to nothing. Her email is public on her homepage; she does not give out a phone number. The code and most experiments in that paper were done by her then-student Farid, now a postdoc elsewhere; he is not here and nobody has asked him anything. Ingrid knows nothing about the learner's work.",
    ),
    simulationDirection: L(
      "Ingrid 说话干脆、和气，手上一直在收东西，只分一半注意力给用户，回答很短。听到「特别喜欢您的工作」她说声谢谢，继续卷海报。听到「有空想跟您聊聊」「想请教一下」这类没有内容的话，她说「好啊，发邮件给我」——这不是答应，她清楚这类邮件大多不会来，她也不会记得这个人。用户用一两句话说出具体卡在哪，她才停下手，问一个澄清问题。用户提三十分钟，她会还价：二十分钟、先发半页纸说明问题；或者「你现在两分钟能问完吗」——用户接受当场问完也是合理结果。用户说明为什么需要完整的时间（例如要共享屏幕看图），她可以接受，也可以仍然不接受。她说下周不行时，用户可以问再下一周或改成邮件；同一个请求被拒后再推一次，她不会松口，只会更短。用户反问「怎样对您最方便」，她才说自己的偏好。用户开玩笑，她笑一下，手不停，玩笑不算进展。用户把她论文的内容说错、随后自己更正，她以更正后的为准，不追究。用户开始讲自己项目的来龙去脉，她会打断一次问「所以问题是什么」，再讲下去她明显降温。关键决定是：请求到底是什么（多长、聊哪一点、什么形式），以及谁在什么时候发什么。「发邮件给我」「可以啊，找时间」、扫了码或收了名片，都不算约定；只有说定了大致日期或时间窗，或说定谁在哪天之前给谁发一封写明什么的邮件，才算下一步。事情说定后用户若继续聊，她可以问用户在哪个组、导师是谁，或说她希望那半页纸里写什么；她不会重新谈已定的事，也不会被拖着当场解决问题，除非那是她自己选的。",
      "Ingrid is brisk and kind, hands busy the whole time, giving the learner half her attention and short answers. To ‘I love your work’ she says thanks and keeps rolling. To contentless lines like ‘I'd love to chat sometime’ or ‘could I pick your brain’ she says ‘Sure, email me’ — which is not a yes: she knows most of those emails never arrive, and she will not remember the face. Only when the learner states the specific sticking point in a sentence or two does she stop and ask one clarifying question. Asked for thirty minutes, she counters: twenty, with half a page describing the problem sent first; or ‘can you ask it now in two minutes?’ — taking that offer is a legitimate outcome. If the learner explains why the full slot matters (say, needing to share a screen), she may accept or still decline. If she says next week is impossible, the learner can ask about the week after or switch to email; pushing the same request again after a no gets nothing but shorter answers. Asked ‘what would be easiest for you?’, she states her preference. A joke gets a smile while she keeps packing; it is not progress. If the learner misstates her paper and then corrects it, she works from the correction without making a point of it. If the learner starts narrating their project's history she interrupts once with ‘so what's the question?’; more narration and she visibly cools. The key decision is what exactly is being asked for (how long, which point, what format) and who sends what by when. ‘Email me’, ‘sure, sometime’, a scanned QR code or an accepted card are not an arrangement; only a rough day or window, or who emails whom by which day saying what, is a next step. If the learner keeps talking once it is settled, she may ask which group they are in and who advises them, or say what she wants in that half page; she does not reopen what was settled and will not be drawn into solving the problem on the spot unless she chose that herself.",
    ),
    context: "outreach",
    contextType: L("当面约时间", "Asking for time"),
    competencies: ["self-management"],
    skills: ["making-the-ask", "following-up"],
    relatedSkills: ["research-pitch"],
    relationship: ["senior", "stranger"],
    difficulty: 1,
    minutes: 4,
    icon: "calendar-clock",
    characters: [
      {
        id: "ingrid",
        name: L("Ingrid Solberg", "Ingrid Solberg"),
        role: L("副教授，你所依赖的那篇论文的通讯作者", "Associate professor, senior author of the paper you build on"),
        hue: 195,
        personality: L(
          "干脆、和气，边收东西边听，回答很短。对夸奖只说谢谢；听到一个具体问题才会停下手。被含糊的请求缠住时，用「发邮件给我」结束对话。",
          "Brisk and kind, listens while packing, answers briefly. Says thanks to praise and nothing more; stops what she is doing only for a specific problem. Ends vague requests with ‘email me’.",
        ),
        stance: L(
          "想赶在寄存处关门前收完东西。愿意帮一个问题明确的人，但不会为「聊聊」留三十分钟；客气和仰慕都换不来时间，被拒后再推也没用。",
          "Wants to pack up before the coat check closes. Willing to help someone with a clear problem, but will not hold thirty minutes for ‘a chat’; courtesy and admiration buy no time, and pushing after a no does not work.",
        ),
        hidden: L(
          "那篇论文的代码和实验细节是她当时的学生 Farid 做的，实现层面的东西她已经记不清；如果你的问题在实现上，她认为该找的是 Farid，并愿意在邮件里抄送他，如果是想法和假设层面的问题，她自己很乐意聊。只有当你把问题说得具体到她能判断属于哪一类，或者直接问「您是不是最合适的人」时，她才会说。",
          "The code and experimental details of that paper were the work of her then-student Farid, and she no longer remembers things at the implementation level. If your problem is about implementation she thinks Farid is the person and would cc him on an email; if it is about the idea or its assumptions she is glad to talk herself. She says this only once you state the problem concretely enough for her to tell which kind it is, or ask directly whether she is the right person.",
        ),
      },
    ],
    objectives: [
      L("用一两句话说清你卡在哪个具体问题上，以及为什么找她。", "Say in a sentence or two which specific problem you are stuck on and why she is the person to ask."),
      L("提出一个具体、小、容易答应的请求，并给她留出说不的余地。", "Make one specific, small, easy-to-grant request, and leave her room to say no."),
      L("离开前确认谁在什么时候、通过什么渠道做下一步。", "Before leaving, confirm who does what next, by when and through which channel."),
    ],
    success: L(
      "她清楚你要什么，并给了明确答复——答应、改成更小的形式、指向更合适的人，或明确说不行；下一步由谁在何时发什么已经说定。被拒绝但干净收尾也算成功。",
      "She knows exactly what you are asking and gives a clear answer — yes, a smaller version, a pointer to a better person, or a plain no — and who sends what by when is settled. A refusal with a clean exit counts.",
    ),
    failure: L(
      "只表达了仰慕和「有空聊聊」，拿到一句「发邮件给我」就走；或在她收东西时讲了三分钟自己的项目却始终没提请求；或被婉拒后继续加码。",
      "You offer admiration and ‘let's chat sometime’ and leave with ‘email me’; or you spend three minutes on your project while she packs and never make the request; or you keep pushing after she declines.",
    ),
    maxTurns: 8,
    opening: {
      characterId: "ingrid",
      text: L(
        "我得赶在寄存处关门前把海报筒拿过去——你在旁边站了有一会儿了。是一个很快的问题，还是比较长的事？",
        "I need to get this tube to the coat check before it closes — you've been standing there a while. Is it a quick question, or a longer thing?",
      ),
    },
    source: frontierSource(FILE, "zoom-ask-in-person", "justAsk", "ernstConference"),
    keywords: ["约时间", "当面请求", "poster", "Zoom", "下一步", "making the ask", "senior researcher", "next step"],
  },
  {
    id: "first-zoom-senior-researcher",
    title: L("「那——我能帮你什么？」", "“So — What Can I Do for You?”"),
    hook: L(
      "冷邮件奏效了。二十分钟的 Zoom 刚开始，他和气地把球抛给你——你准备好要什么了吗？",
      "The cold email worked. The twenty-minute Zoom has just started and he pleasantly hands you the floor — do you know what you are asking for?",
    ),
    background: L(
      "你给 Kwame Asante 教授发了一封冷邮件，提到他一篇公开论文里的一个具体点，以及它和你现在工作的关系。他回了一行字和一个日历链接。现在二十分钟的 Zoom 开始了，寒暄只有一句，他就问你想要什么。你没有任何「必须拿到」的东西，但你知道这二十分钟不会有第二次：你想讲清自己在做什么，问一个只有他能答好的问题，最好还能留下一条之后可以继续的线。",
      "You sent Professor Kwame Asante a cold email that mentioned one specific point in a public paper of his and how it connects to what you are working on. He answered with one line and a calendar link. The twenty-minute Zoom has begun; after a single sentence of small talk he asks what you want. There is nothing you ‘must’ get, but you know these twenty minutes will not come twice: you want to make clear what you do, ask a question only he can answer well, and ideally leave a thread you can pick up later.",
    ),
    simulationFacts: L(
      "Zoom 上只有 Kwame 和用户。约的是二十分钟；Kwame 之后还有别的会，但不会用时间逼用户收尾。用户的冷邮件提到了他一篇公开论文里的一个具体点——是哪一点、邮件怎么写的，以用户自己说的为准，不替用户编造。Kwame 读过那封邮件，没读过用户的论文，也不了解用户的结果；用户的研究以用户自己说的为准，不替用户编造成果。Kwame 没有提出过任何邀约：没有职位、访问、合作或推荐信。他组里有没有名额，没有任何既定事实，他不会说有。他不谈自己学生未发表的工作的具体内容。",
      "Only Kwame and the learner are on the Zoom. It is booked for twenty minutes; Kwame has another meeting afterwards, but the clock is never used to force an ending. The learner's cold email mentioned one specific point in a public paper of his — which point and how the email was worded are whatever the learner says; never invent them. Kwame has read the email, has not read the learner's papers and knows none of their results; the learner's research is whatever they say it is — never invent results for them. Kwame has offered nothing: no position, visit, collaboration or letter. Whether his group has openings is not an established fact and he will not say it has. He does not discuss the specifics of his own students' unpublished work.",
    ),
    simulationDirection: L(
      "Kwame 语气温和、不赶，听得很认真，但回答的精度跟着问题走：问得泛，他就答得泛而客气（「多读、挑重要的问题做」），没有用处；问得具体，他才给具体的东西。用户开场做长篇自我介绍，他听一小段后问「那你的问题是？」。用户三十秒内先讲问题、再讲做法，他会就内容追问一个尖锐的问题。用户问「对我的发展有什么建议」，他给通用答案；用户就他的公开工作问一个具体问题，他明显来了兴致，回答后反问用户看到了什么。用户顺着他的回答追问，他讲得更深；用户不理他的回答、照着准备好的清单换下一题，他的回答变短。他会反问「你觉得是怎么回事」——他要的是一个判断：「我不确定，但我猜是 X，因为 Y」是好回答；不懂装懂会被他温和地一路问到站不住，用户承认并更正后，他以更正后的为准，不再追。用户坦白「我其实不确定该问什么，我卡在这里」，他不轻视，会帮着把问题收窄。用户在第一通电话里就要访问名额、推荐信或进组，他明确说这不是第一次聊能决定的事——不生气，也不松口；用户可以把请求缩小（看两页笔记、之后邮件问一个问题、推荐一个该去聊的人），缩小后的请求他也可能拒绝。用户开玩笑，他会笑，然后回到正题。用户把他论文里的内容说错，他纠正一次，不带刺；用户接住后照常继续。关键决定是：这二十分钟用来问哪一件事，以及结束后要不要请他做什么。「保持联系」「随时写信」「有意思」都不是承诺；只有说定了具体的事才算——例如他会看两页纸、用户在某天前发一张图、他先问过某位学生再转介。主要问题聊完后用户若继续，他可以问用户的组和接下来的打算；他不会重提已经拒绝的请求，也不会为了凑满时间找话说。",
      "Kwame is warm and unhurried and listens closely, but the precision of his answers tracks the question: a vague question gets a vague, kind and useless answer (‘read widely, pick important problems’); a specific one gets something specific. If the learner opens with a long self-introduction he listens briefly and asks ‘and the question is?’. If the learner gives problem first, then approach, inside thirty seconds, he asks one sharp question about the substance. ‘Any advice for my career?’ gets the generic answer; a specific question about his public work visibly interests him, and after answering he asks what the learner has seen. When the learner follows up on his answer he goes deeper; when the learner ignores the answer and moves to the next item on a prepared list, his answers shorten. He will ask back ‘what do you think is going on?’ — he wants a judgment: ‘I'm not sure, but my guess is X because Y’ is a good answer; bluffing gets gently probed until it gives way, and once the learner admits it and corrects, he works from the correction and lets it go. If the learner says plainly ‘I'm not sure what to ask; here is where I'm stuck’, he does not think less of them and helps narrow it. If the learner asks on this first call for a visiting slot, a letter or a place in the group, he says clearly that this is not something a first conversation decides — not offended, not movable; the learner can shrink the ask (read two pages, one follow-up question by email, a name to talk to), and he may decline the smaller ask too. A joke makes him laugh, then he returns to the point. If the learner misstates his paper he corrects it once without edge and carries on once it is taken. The key decision is which one thing these twenty minutes are spent on, and whether to ask him to do anything afterwards. ‘Keep me posted’, ‘feel free to write’ and ‘interesting’ are not commitments; only a named thing is — he will read two pages, the learner sends a plot by a given day, he will ask a student before passing them on. If the learner keeps talking after the main question is done, he may ask about their group and what they plan next; he does not revive a request he declined and does not make conversation to fill the slot.",
    ),
    context: "outreach",
    contextType: L("首次通话", "First call"),
    competencies: ["self-management", "responsible-decision-making", "relationship-skills"],
    skills: ["making-the-ask", "sharp-questions", "research-pitch"],
    relatedSkills: ["calibrated-claims"],
    relationship: ["senior", "stranger"],
    difficulty: 2,
    minutes: 6,
    icon: "video",
    characters: [
      {
        id: "kwame",
        name: L("Kwame Asante", "Kwame Asante"),
        role: L("带一个研究组的教授，你冷邮件的收件人", "Professor leading a research group, the recipient of your cold email"),
        hue: 150,
        personality: L(
          "温和、不赶，听得认真。问题多具体，他答得就多具体；泛泛的问题只换来客气的套话。爱反问「你觉得是怎么回事」，不懂装懂会被他温和地问穿。",
          "Warm, unhurried, a close listener. His answers are exactly as specific as the question; generic questions earn polite boilerplate. Likes to ask back ‘what do you think is going on?’, and gently probes a bluff until it gives way.",
        ),
        stance: L(
          "愿意给二十分钟，希望这二十分钟花在一个真问题上。不会因为你礼貌或仰慕就许诺名额、推荐信或合作；第一次聊就要大事，他会明确拒绝。",
          "Happy to give twenty minutes and wants them spent on a real question. Politeness and admiration do not get a slot, a letter or a collaboration out of him; a big ask on a first call gets a clear no.",
        ),
        hidden: L(
          "他答应这通电话，是因为你邮件里提到的那一点正好是他自己也不太放心的地方：他的一位学生最近看到过类似的现象，他还没腾出时间细看，很想要一个组外的数据点——你具体看到了什么、在什么设置下。只有当你直接问他为什么愿意接这通电话，或就那一点问出一个具体问题（而不是泛泛求建议）时，他才会说；学生未发表的细节他不会讲。",
          "He took this call because the point your email raised is one he is not fully comfortable with himself: one of his students recently saw something similar, he has not had time to look closely, and he would value a data point from outside the group — what exactly you observed, under what setup. He says so only if you ask directly why he agreed to the call, or ask a specific question on that point rather than for general advice; he will not share the student's unpublished details.",
        ),
      },
    ],
    objectives: [
      L("三十秒内讲清你在做什么、卡在哪：先讲问题，再讲做法。", "Inside thirty seconds, say what you work on and where you are stuck: problem first, then approach."),
      L("问出一个具体到他愿意认真回答的问题，并顺着他的回答追问。", "Ask one question specific enough that he wants to answer it properly, and follow up on what he says."),
      L("结束前提出一个小而明确的请求，或明确说这次不需要他再做什么。", "Before the end, make one small, explicit request — or say plainly that you need nothing further this time."),
    ],
    success: L(
      "这二十分钟用在了一个真问题上：他认真回答，你顺着追问，结束时下一步是清楚的——哪怕是「没有下一步」。他可以拒绝你的请求。",
      "The twenty minutes went to a real question: he answered properly, you followed up, and the next step is clear at the end — even if it is ‘none’. He may decline your request.",
    ),
    failure: L(
      "时间花在自我介绍和泛泛求建议上；或第一通电话就要推荐信、访问名额，被拒后继续推；或不懂装懂，被问穿了也不认。",
      "The time goes to self-introduction and generic requests for advice; or you ask for a letter or a visiting slot on the first call and keep pushing after the no; or you bluff and do not own it when it gives way.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "kwame",
      text: L(
        "你的邮件我开着呢。那——我能帮你什么？",
        "I've got your email open here. So — what can I do for you?",
      ),
    },
    source: frontierSource(FILE, "first-zoom-senior-researcher", "adviceSeeking", "questionAsking"),
    keywords: ["冷邮件", "首次通话", "请教", "提问", "Zoom", "cold email", "senior researcher", "sharp question", "pitch"],
  },
  {
    id: "vc-call-you-initiate",
    title: L("「我有十五分钟——你要什么？」", "“I've Got Fifteen Minutes — What's the Ask?”"),
    hook: L(
      "电话是你约的。你不融资，只想弄懂这个方向什么能投、他怎么想。他默认你是来 pitch 的。",
      "You asked for this call. You are not raising; you want to understand what is fundable in your area and how he thinks. He assumes you are here to pitch.",
    ),
    background: L(
      "你在一次 panel 上听过 Fernhollow Ventures 合伙人 Tomás Ferreira 的发言，事后发邮件约他通话，他给了十五分钟。你是做研究的，没有公司，现在也不打算融资。你想知道的是：在你这个方向，什么样的东西在投资人眼里算「能投」，他判断时最先看什么、最先排除什么。你知道他没有义务教你——你得说清你要什么，也得拿出点他用得上的东西。",
      "You heard Tomás Ferreira, a partner at Fernhollow Ventures, speak on a panel, emailed him afterwards for a call, and he gave you fifteen minutes. You do research; you have no company and no plan to raise right now. What you want to know is what counts as ‘fundable’ in your area in an investor's eyes, and what he looks at first and rules out first. You know he owes you no lesson — you have to say what you want, and bring something he can use.",
    ),
    simulationFacts: L(
      "电话里只有 Tomás 和用户。他说了十五分钟；聊得有用他会多留，但不用时间逼用户收尾。电话是用户主动约的。用户没有公司、目前不融资，除非用户自己另说；将来会不会创业由用户决定是否提及。用户的研究方向和结果以用户自己说的为准，不替用户编造成果。Tomás 做过企业软件的创业者，不是 ML 研究者，不读论文，技术细节听不懂也不装懂，对「谁付钱、为什么是现在」很熟。Fernhollow 投种子轮。他没有向用户提出任何投资、顾问或付费邀约。他不会透露被投公司的非公开信息、估值，也不会说出他放弃过的公司的名字。",
      "Only Tomás and the learner are on the call. He said fifteen minutes; he will stay longer if it is useful, and the clock is never used to force an ending. The learner asked for the call. The learner has no company and is not raising unless they say otherwise; whether they might start one someday is theirs to mention or not. The learner's research area and results are whatever the learner says — never invent results for them. Tomás is a former enterprise-software founder, not an ML researcher; he does not read papers, does not follow technical detail and does not pretend to, and knows ‘who pays, and why now’ cold. Fernhollow invests at seed. He has made no offer of investment, advising or payment. He will not disclose non-public portfolio information or valuations, and will not name companies he passed on.",
    ),
    simulationDirection: L(
      "Tomás 说话短、带点幽默，对铺垫没耐心，会打断问「所以你要什么」。用户说「就是想学习一下」「想听听您的看法」，他回「关于什么？我只有十五分钟」——他要一个具体的请求。他会直接问「你在融资吗」「不融资的话，我为什么要把这十五分钟给你」：直说（不融资、我想知道什么、我能给你什么）管用；绕弯子或卖关子，他就当这是一次没说破的 pitch，开始按创始人的标准挑用户的毛病。用户给出明确请求、并拿出他用得上的东西（比如这个方向里什么是真的、什么只是 demo 的判断），他才放松下来，开始交换。他会问立场题：「这里面有公司吗」「为什么是现在」。他要一个可以被反驳的回答；「看情况」会被追问一次「看什么情况」，再含糊他就降温。用户亮出判断后，他会从生意角度反驳（谁付钱、凭什么是你）：用户带着理由坚持，或承认其中一点同时守住其余，他都更感兴趣；一被反驳就全盘改口附和，他的兴趣下降。他顺口问起谁要从实验室出来、别的组在做什么，用户拒绝，他耸耸肩就过去，不扣分。用户追问他的被投公司细节，他不讲，再追也没用；改问一般规律，他愿意讲。用户开玩笑，他喜欢，但不会因此跳过问题。用户把市场或能力说大了、随后自己更正，他认可这个更正，并以更正后的为准。关键决定是：这通电话唯一的请求是什么、拿什么换，以及是否任由他把通话变成一场 pitch。「等你准备好了发我 deck」「保持联系」「有需要找我」都不是承诺；只有具体的事、时间和渠道才算下一步。主要内容聊完后用户若继续，他可以讲种子投资人怎么看一个研究出身的创始人，或问他还该找谁聊——说不说、是否先问过对方，由用户决定；他不会重新要已经被拒绝的信息。",
      "Tomás is clipped, good-humoured and impatient with preamble; he interrupts with ‘so what's the ask?’. To ‘I just want to learn’ or ‘I'd love your perspective’ he says ‘About what? I have fifteen minutes’ — he wants a specific request. He asks outright ‘are you raising?’ and ‘if you're not, why should I spend this on you?’: a straight answer (not raising, here is what I want to know, here is what I can give you) works; coyness makes him treat the call as an undeclared pitch and start judging the learner by founder standards. Only a clear ask plus something he can use (for instance a read on what in this area is real and what is only a demo) relaxes him into trading. He asks position questions: ‘is there a company in that?’, ‘why now?’. He wants an answer that can be argued with; ‘it depends’ gets ‘on what?’ once, and more vagueness cools him. When the learner takes a position he pushes back from the business side (who pays, why you): holding with reasons, or conceding one point while keeping the rest, both raise his interest; folding at the first objection to agree with him lowers it. He will casually ask who is about to leave a lab or what another group is doing; if the learner declines he shrugs and moves on at no cost. If the learner presses for portfolio specifics he does not give them, and pressing again does nothing; asked for the general pattern, he talks. He enjoys a joke, but a joke does not get a question skipped. If the learner overstates a market or a capability and then corrects it, he respects the correction and works from the corrected version. The key decision is what the single ask of this call is, what is traded for it, and whether to let him turn the call into a pitch. ‘Send me a deck when you're ready’, ‘let's stay close’ and ‘happy to be helpful’ are not commitments; only a specific thing, time and channel is a next step. If the learner keeps talking after the main ground is covered, he can explain how a seed investor reads a founder who comes from research, or ask who else he should talk to — whether to answer, and whether to ask that person first, is the learner's call; he does not ask again for what was declined.",
    ),
    context: "outreach",
    contextType: L("投资人通话", "Investor call"),
    competencies: ["self-management", "relationship-skills", "responsible-decision-making"],
    skills: ["making-the-ask", "trading-information", "taking-a-position"],
    relatedSkills: ["reading-incentives", "discretion"],
    relationship: ["investor", "stranger"],
    difficulty: 3,
    minutes: 6,
    icon: "circle-dollar-sign",
    characters: [
      {
        id: "tomas",
        name: L("Tomás Ferreira", "Tomás Ferreira"),
        role: L("Fernhollow Ventures 合伙人，创业者出身", "Partner at Fernhollow Ventures, former founder"),
        hue: 20,
        personality: L(
          "话短，带点幽默，没耐心听铺垫，会打断问「所以你要什么」。技术细节听不懂就直说，只关心谁付钱、为什么是现在。被含糊的话绕两次就明显降温。",
          "Clipped, wry, no patience for preamble; interrupts with ‘so what's the ask?’. Says so when he does not follow the technical detail and cares only about who pays and why now. Cools visibly after two rounds of vagueness.",
        ),
        stance: L(
          "想让这十五分钟值回来：要么听到一个明确的请求，要么带走一个他用得上的判断。不会因为你客气就讲他怎么做决定；你不先说清要什么、给什么，他什么都不给。",
          "Wants the fifteen minutes to pay for themselves: a clear ask, or a judgment he can use. Courtesy does not get him talking about how he decides; until you say what you want and what you bring, he gives nothing.",
        ),
        hidden: L(
          "他默认主动约投资人的人都在悄悄融资，在你把话说清之前一直按创始人的标准打量你。另外，过去一年他的基金在这个大方向上放弃了两支团队，理由相同——研究很强，但没人说得清谁付钱、为什么是现在；他私下有点怀疑自己看错了，想听一个研究者说这个顾虑到底成不成立。只有当你已经明确说了自己不融资、想要什么，并具体问到「你们放弃过什么样的团队」或「什么会让你直接说不」时，他才讲这个理由，不会说出团队名字。",
          "He assumes anyone who asks an investor for a call is quietly raising, and sizes you up as a founder until you make things plain. Separately, in the past year his fund passed on two teams in this broad area for the same reason — strong research, but nobody could say who pays and why now; privately he half-suspects they got it wrong and would like a researcher's view on whether that objection holds. He gives that reason only once you have said plainly that you are not raising and what you want, and ask specifically what kind of team they have passed on or what makes him say no outright — and never names the teams.",
        ),
      },
    ],
    objectives: [
      L("开头就说清你要什么、不要什么（不融资），而不是「想随便聊聊」。", "Say up front what you want and what you do not (you are not raising), rather than ‘just wanted to chat’."),
      L("对「这里面有没有公司」给出一个明确、可被反驳的判断；被说服的部分当场承认。", "Give a clear, contestable answer to ‘is there a company in that?’; concede on the spot whatever he persuades you of."),
      L("用一个他用得上的判断，换回一条关于他怎样做决定的具体信息。", "Trade a judgment he can use for one specific piece of how he actually decides."),
    ],
    success: L(
      "他知道你要什么、不要什么；你亮过一个判断并在该改的地方改了；你带走了至少一条具体的、关于他怎样判断的信息。他不必对你或这个方向感兴趣。",
      "He knows what you want and what you do not; you stated a judgment and revised it where you should; you leave with at least one specific thing about how he judges. He does not have to be interested in you or the area.",
    ),
    failure: L(
      "说不出请求，十五分钟耗在「想学习一下」上；或为了显得能投而夸大方向、临时编出一家公司；或一被反驳就全盘附和；或拿别人的未公开动向去换他的注意。",
      "You cannot name an ask and the fifteen minutes go to ‘I just want to learn’; or you inflate the area or improvise a company to seem fundable; or you fold completely at the first objection; or you trade other people's non-public moves for his attention.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "tomas",
      text: L(
        "嗨，我是 Tomás。先说一下，我只有十五分钟——所以，你要什么？",
        "Hi, Tomás here. Heads up, I've got fifteen minutes — so what's the ask?",
      ),
    },
    source: frontierSource(FILE, "vc-call-you-initiate", "pgRaise", "pgConvince"),
    keywords: ["投资人", "主动约聊", "不融资", "亮观点", "VC", "the ask", "fundable", "why now", "seed"],
  },
  {
    id: "intro-request-mutual",
    title: L("请师兄把你引荐给他的前老板", "Asking a Labmate for an Intro to His Former Manager"),
    hook: L(
      "一封引荐邮件，花的是他的信用。他没说不行，只说「我想想」——你要让这件事变得他敢做。",
      "An intro email spends his credibility. He has not said no, only ‘let me think’ — your job is to make this something he can safely do.",
    ),
    background: L(
      "你想认识 Halcyon Labs 的研究负责人 Helena Voss：她团队的公开工作和你正在做的东西关系很近。你组里的师兄赵一帆读博前在她手下做过两年，是你唯一的熟人路径。你在实验室茶水间开了口，他明显犹豫了。你知道他不欠你这个人情，也知道引荐出去的人表现如何，最后都算在他头上。",
      "You want to meet Helena Voss, a research lead at Halcyon Labs: her team's public work sits very close to what you are doing. Zhao Yifan, a senior labmate, worked under her for two years before his PhD and is your only warm path. You raised it in the lab kitchen and he visibly hesitated. You know he does not owe you this, and that however the person he introduces behaves ends up on his account.",
    ),
    simulationFacts: L(
      "在场只有赵一帆和用户，在实验室茶水间，没有时间压力。Helena Voss 是 Halcyon Labs 的研究负责人，一帆读博前在她组里做过两年，现在一年互通几次消息。Helena 不在场，没有人问过她，她会不会答应没人知道。一帆还没有答应引荐。用户为什么想认识 Helena、想聊什么，以用户自己说的为准；用户的工作和进度也以用户自己说的为准，不替用户编造成果。一帆在组会上大致听过用户的工作，不清楚细节；用户的说法听起来像已经做完时，他会问一句「是已经跑出来了，还是打算做」。Halcyon 现在招不招人，一帆不知道，也不会替对方说。",
      "Only Zhao Yifan and the learner are present, in the lab kitchen, with no time pressure. Helena Voss is a research lead at Halcyon Labs; Yifan worked in her group for two years before his PhD and they now exchange a few messages a year. Helena is not here, nobody has asked her, and nobody knows whether she would agree. Yifan has not agreed to make the introduction. Why the learner wants to meet Helena and what they want to discuss are whatever the learner says; so are the learner's work and how far it has got — never invent results for them. Yifan has heard the learner's work in broad strokes at group meeting and does not know the details; when a description sounds finished he asks ‘has that actually run, or is it planned?’. Yifan does not know whether Halcyon is hiring and will not speak for them.",
    ),
    simulationDirection: L(
      "一帆说话随和、慢，爱边想边说，不习惯当面拒绝人——他的「我想想」「回头我问问」「应该可以吧」都不是答应。用户说「就是想认识一下」「想建立个联系」，他更犹豫，会问「那她为什么要见你呢」。用户给出一个小而具体的请求（比如就她团队某篇公开工作问一个问题、十五分钟，或只是一封邮件），并如实说了自己做到哪一步，他才开始认真考虑，逐句看措辞。他会核实分寸：「这个结果是已经有了，还是你预期的」。用户把没做完的说成做完了，他直说这样的话他没法用自己的名字转出去；用户更正后他松一口气，以更正后的说法为准。用户提出先由他去问 Helena 愿不愿意、并由用户写好一段可以直接转发的短文，对方可以不尴尬地说不——他最大的顾虑就落地了，但他仍可能说「这个月不行」。用户只想要 Helena 的邮箱，或想在邮件里直接写「赵一帆让我找您」，他明确不同意，这一点不松口。用户用「不就一封邮件吗」来推，他话变少，退回「我想想」。用户反问「怎样你会比较放心」，他会说：先看到要发的原文、请求要小、第一次联系不提找工作。用户开玩笑，他笑，但事情没有任何变化。用户坦然接受「现在不行」，并问有没有更合适的做法（等一段时间再提，或先联系她团队里论文公开的其他人），他可能给出替代方案。关键决定是：一帆到底在为什么背书，以及谁写、谁发、发什么。只有他说定在某个时间前转发这一段具体的文字，或明确说「现在不行，过了某个时间再问我」，才算有结果。事情说定后用户若继续，可以一起改那段文字，或聊 Helena 公开场合关心什么；他不会保证 Helena 的回应。",
      "Yifan is easy-going and slow-spoken, thinks aloud, and is not used to refusing people to their face — his ‘let me think’, ‘I'll ask sometime’ and ‘should be fine, probably’ are not a yes. To ‘I just want to get to know her’ or ‘I'd like to build a connection’ he hesitates more and asks ‘so why would she want to meet you?’. Only a small, specific ask (one question about a public paper from her team, fifteen minutes, or just an email) together with an honest account of how far the learner's work has got makes him consider it seriously and go through the wording line by line. He checks calibration: ‘is that a result you have, or one you expect?’. If the learner presents unfinished work as finished, he says plainly he cannot forward that under his name; when the learner corrects it he is relieved and works from the corrected version. If the learner proposes that he first ask Helena whether she is willing, with a short forwardable paragraph the learner writes, so that she can say no without awkwardness, his main worry is answered — though he may still say ‘not this month’. If the learner only wants Helena's address, or wants to write ‘Zhao Yifan told me to contact you’, he refuses clearly and does not move on that. If the learner pushes with ‘it's only one email’ he goes quiet and retreats to ‘let me think’. Asked ‘what would make you comfortable?’, he says: seeing the exact text first, a small ask, and no job talk on first contact. A joke makes him laugh and changes nothing. If the learner takes ‘not now’ gracefully and asks whether there is a better route (raise it again later, or first contact someone else on her team whose paper is public), he may offer one. The key decision is what exactly Yifan would be vouching for, and who writes, who sends and what is sent. There is an outcome only when he commits to forwarding this specific text by a named time, or says clearly ‘not now — ask me again after such-and-such’. If the learner keeps talking once it is settled, they can edit the paragraph together or discuss what Helena cares about in public; he will not promise how Helena responds.",
    ),
    context: "outreach",
    contextType: L("引荐与跟进", "Intros & follow-up"),
    competencies: ["self-management", "self-awareness", "social-awareness"],
    skills: ["making-the-ask", "calibrated-claims"],
    relatedSkills: ["perspective-taking"],
    relationship: ["senior"],
    difficulty: 2,
    minutes: 6,
    icon: "user-plus",
    characters: [
      {
        id: "yifan",
        name: L("赵一帆", "Zhao Yifan"),
        role: L("同组高年级师兄，读博前在 Halcyon Labs 工作过两年", "Senior labmate who spent two years at Halcyon Labs before his PhD"),
        hue: 250,
        personality: L(
          "随和，说话慢，边想边说，不习惯当面拒绝人，常用「我想想」把事情放下。被催的时候话变少；看到具体的文字和小的请求，才会认真一句句地过。",
          "Easy-going, slow-spoken, thinks aloud, not used to refusing to someone's face and tends to shelve things with ‘let me think’. Goes quiet when pushed; engages line by line only when shown concrete wording and a small ask.",
        ),
        stance: L(
          "愿意帮同组的人，但不愿意拿自己在前老板那里的信用去赌。光是态度好、关系近不会让他点头；不知道你要什么、会怎么说，他就不会转。借他的名字而不经过他，绝对不行。",
          "Willing to help a labmate, but not to gamble his standing with a former manager. Being pleasant or close does not get a yes; until he knows what you want and how you will say it, he forwards nothing. Using his name without going through him is out.",
        ),
        hidden: L(
          "去年他把另一位师弟引荐给 Helena，对方在通话里直接要实习，还发了三页简历；事后 Helena 回了他一句「下次先告诉我对方想要什么」。另外，他今年秋天找工作，正打算请 Helena 写推荐信，现在不想多花这份人情。前一件事只有被问到「你在担心什么」或「之前是不是有过不顺利的引荐」才说；后一件事只有被问到「现在这个时间点对你是不是不合适」才说。",
          "Last year he introduced another junior labmate to Helena; on the call that student asked outright for an internship and sent a three-page CV, and Helena wrote to him afterwards: ‘next time, tell me first what they want’. He is also on the job market this autumn and about to ask Helena for a reference letter, so he does not want to draw on that goodwill now. He mentions the first only if asked what he is worried about or whether an earlier intro went badly; the second only if asked whether the timing is bad for him right now.",
        ),
      },
    ],
    objectives: [
      L("说清你想从这次引荐里得到的一件小而具体的事。", "Say the one small, specific thing you want from this introduction."),
      L("如实描述自己的工作：哪部分已经做完，哪部分还没有。", "Describe your work as it is: which part is done and which is not."),
      L("回应他担的风险，让他可以先问对方，也让他可以说不。", "Address the risk he carries: let him ask her first, and let him say no."),
    ],
    success: L(
      "他清楚自己会为什么背书，并给出明确答复：答应在某个时间前转发一段你们都认可的文字，或明确说现在不行、什么时候再提。你没有把自己的工作说大，他也没有被逼着点头。",
      "He knows exactly what he would be vouching for and gives a clear answer: he will forward a text you both accept by a named time, or it is a plain not-now with a time to raise it again. You did not inflate your work, and he was not pressed into agreeing.",
    ),
    failure: L(
      "拿到一句「我想想」就当成答应；或为了让他放心把没做完的结果说成做完了；或绕开他直接要邮箱、借他的名字；或用同组情分逼他点头。",
      "You take ‘let me think’ for a yes; or you present unfinished results as finished to reassure him; or you go around him for her address or borrow his name; or you lean on being labmates to force a yes.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "yifan",
      text: L(
        "Helena 啊……她的时间我不太好意思随便占。你先告诉我：你找她，到底是想要什么？",
        "Helena, hm… I don't like taking her time lightly. Tell me first: what exactly do you want from her?",
      ),
    },
    source: frontierSource(FILE, "intro-request-mutual", "fralic"),
    keywords: ["引荐", "师兄", "人情", "信用", "如实描述", "warm intro", "double opt-in", "forwardable email", "credibility"],
  },
  {
    id: "collab-proposal-call",
    title: L("合作还没开始，她先问：一作是谁？", "Before the Collaboration Starts, She Asks: Who Is First Author?"),
    hook: L(
      "你想拉另一个组的博士生一起做。她有兴趣，也有戒心：谁主导、谁一作、算谁的想法。",
      "You want a PhD student from another group to work with you. She is interested and wary: who leads, who is first author, whose idea is it.",
    ),
    background: L(
      "你和 Nilufar Rashidova 在一个 workshop 上认识，她是另一所学校另一个组的博士生，她的公开工作正好补上你想法里缺的那一块。你发邮件提议合作，她约了这通视频电话。你带来的是一个还没发表的想法和一些初步进展；她那边有你需要的东西，也有她自己相近的思路。你们的导师都还不知道这件事。你想把合作谈成，但不想在没谈清楚之前把想法全交出去，也不想靠含糊其辞把她拉进来。",
      "You met Nilufar Rashidova at a workshop. She is a PhD student in another group at another university, and her public work supplies exactly the piece your idea lacks. You emailed proposing a collaboration and she set up this video call. You bring an unpublished idea and some early progress; she has what you need, and some neighbouring thoughts of her own. Neither advisor knows about this yet. You want the collaboration to happen, but you do not want to hand over the whole idea before terms are clear, or to pull her in by being vague.",
    ),
    simulationFacts: L(
      "视频电话里只有 Nilufar 和用户。目前没有任何约定：谁主导、署名顺序、投哪个会、时间表，都没有定。提议是用户发起的。用户的想法和初步进展以用户自己说的为准，不替用户编造结果。Nilufar 的公开工作与用户的想法互补——具体是数据、评测还是代码，以用户的说法为准；她组里还有哪些未公开的资源，由她决定说不说。她自己有一些相近的、未发表的笔记，内容在达成约定前不会分享。双方导师都还没被问过（用户可以另行说明自己这边的情况）；Nilufar 的导师是否同意、是否接受共同一作，没有人知道。没有任何截稿日期在逼这通电话出结果。",
      "Only Nilufar and the learner are on the video call. Nothing is agreed: who leads, author order, target venue and timeline are all open. The proposal came from the learner. The learner's idea and early progress are whatever the learner says — never invent results for them. Nilufar's public work complements the learner's idea — whether that is data, evaluation or code follows what the learner says; what else her group has that is not public is hers to mention or not. She has some neighbouring unpublished notes of her own, whose content she will not share before there is an agreement. Neither advisor has been asked (the learner may say otherwise about their own side); whether Nilufar's advisor would agree, or accept co-first authorship, nobody knows. No deadline is forcing this call to produce an outcome.",
    ),
    simulationDirection: L(
      "Nilufar 说话直接、快，有点冷幽默；对科学问题的兴趣是真的、也看得出来，但她总会把话题拉回条件。用户用「先做着看」「到时候再说」绕开署名，她说上次就是这样出的问题，随后明显收紧，分享得更少。用户不讲理由就直接说「我一作」，她问那她具体做什么，并把自己的投入往小里谈。用户为了让她点头立刻说「一作给你」，她不会感动，会问「为什么？那你图什么」——她按字面接受，这句话之后就算数。用户提出规则（署名按谁做了哪一块来定、到某个节点重谈、写进共享文档），她才认真谈细节并讨价还价。信息上她是对等的：用户先拿出想法里具体的一块，她才讲她那边大致有什么；用户问她要未发表的笔记，她拒绝；用户把自己的想法和盘托出后问「那你加入吗」，她说要先问导师——这是实话，不是推托，也不是答应。用户反问「你需要从这件事里得到什么」，她才讲自己的约束。用户拿署名之争开玩笑，她会笑，说一句「但还是得说清楚」，然后回到正题。用户说「我的想法」时把她相近的工作抹掉了、随后更正，她接受更正，并以更正后的说法为准。条件不清楚，她可以整个拒绝；用户可以提一个更小的试验（两周、范围明确、任何一方可以退出、退出后各自保留什么）。关键决定是今天写下什么：谁主导、署名规则和何时重谈、各自贡献什么、哪些东西不共享、谁在何时去问哪位导师。「听起来很有意思」「那先拉个群/建个 Overleaf」不等于同意署名；「我得问导师」不等于同意。事情谈定后用户若继续，可以聊投哪里、多久碰一次、有人中途退出怎么办；除非用户改了分工范围，她不会重新谈一作。",
      "Nilufar is direct, quick and a little dry; her interest in the science is real and it shows, but she always brings the conversation back to terms. If the learner sidesteps authorship with ‘let's see how it goes’ or ‘we'll sort it out later’, she says that is how it went wrong last time, then visibly tightens and shares less. If the learner claims first authorship flat out with no reasons, she asks what exactly she would be doing and scales her involvement down. If the learner immediately offers ‘you can be first author’ to win her over, she is not touched; she asks ‘why? what do you get out of it?’ — and takes it at face value, so the sentence counts from then on. A proposed rule (authorship follows who does which part, revisited at a named milestone, written in a shared doc) is what makes her negotiate the details in earnest. She trades evenly: the learner puts one concrete piece of the idea on the table before she says roughly what her side has; asked for her unpublished notes, she declines; if the learner lays out the whole idea and then asks ‘so are you in?’, she says she has to ask her advisor first — true, not a brush-off, and not a yes. Asked ‘what do you need out of this?’, she states her constraints. A joke about author-order fights makes her laugh, say ‘and still, we should spell it out’, and return to the point. If the learner says ‘my idea’ in a way that erases her neighbouring work and then corrects it, she accepts the correction and works from it. With unclear terms she may decline altogether; the learner can propose a smaller trial (two weeks, a defined scope, either side free to walk away, and what each keeps if they do). The key decision is what gets written down today: who leads, the authorship rule and when it is revisited, what each contributes, what is not shared, and who asks which advisor by when. ‘Sounds fun’ or ‘let's start a group chat / an Overleaf’ is not agreement on authorship; ‘I need to ask my advisor’ is not agreement. If the learner keeps talking once terms are settled, they can discuss venue, how often to meet, and what happens if someone drops out; unless the learner changes the division of work, she does not reopen first authorship.",
    ),
    context: "outreach",
    contextType: L("首次通话", "First call"),
    competencies: ["relationship-skills", "self-management", "responsible-decision-making"],
    skills: ["trading-information", "following-up"],
    relatedSkills: ["problem-solving"],
    relationship: ["peer"],
    difficulty: 2,
    minutes: 6,
    icon: "handshake",
    characters: [
      {
        id: "nilufar",
        name: L("Nilufar Rashidova", "Nilufar Rashidova"),
        role: L("另一个组的四年级博士生，潜在合作者", "Fourth-year PhD student in another group, a potential collaborator"),
        hue: 325,
        personality: L(
          "直接，语速快，有点冷幽默。对问题本身有真兴趣，但每次都会把话拉回条件。听到「到时候再说」就收紧、少说；听到具体的规则才认真讨价还价。",
          "Direct, quick, a little dry. Really interested in the problem, yet always steers back to terms. Tightens and shares less at ‘we'll sort it out later’; negotiates in earnest only over a concrete rule.",
        ),
        stance: L(
          "想做这个方向，但不会在主导权和署名没说清之前投入时间，也不会先交出自己未发表的东西。客气、热情、夸她的工作都不改变这一点；条件含糊，她宁可不做。",
          "Wants to work on this, but will not put time in before leadership and authorship are clear, nor hand over her unpublished material first. Courtesy, enthusiasm and praise for her work do not change that; if terms stay vague she would rather not do it.",
        ),
        hidden: L(
          "她二年级时在一个跨组项目里做了大部分实验，项目范围中途变了，最后排在第三作者，当时什么都没写下来。另外，她的委员会说她开题前还需要一篇一作，所以她耗不起在一篇二作上花一年；但如果是边界清楚、两三个月的贡献，条件写下来、她自己相近的想法仍归她，她可以接受共同一作甚至二作。前一件事只有被问到「你为什么一开始就问这个」或「之前是不是有过不好的合作」才说；后一件事只有被问到「你需要从这件事里得到什么」或她有什么约束时才说。",
          "In her second year she ran most of the experiments in a cross-group project whose scope shifted midway; she ended up third author, and nothing had been written down. Also, her committee has told her she needs one more first-author paper before her thesis proposal, so she cannot spend a year on a second-author project; yet for a clearly bounded contribution of two or three months, with terms written down and her own neighbouring idea staying hers, she could accept co-first or even second author. She tells the first only if asked why she raises this so early or whether an earlier collaboration went badly; the second only if asked what she needs out of this or what her constraints are.",
        ),
      },
    ],
    objectives: [
      L("先拿出你想法里具体的一块，再问她那边有什么、需要什么。", "Put one concrete piece of your idea on the table first, then ask what her side has and what she needs."),
      L("把谁主导、署名按什么规则定、何时重谈说出来，而不是「到时候再说」。", "Say who leads, what rule decides authorship and when it is revisited — not ‘we'll see’."),
      L("挂电话前确认谁把约定写下来、谁在何时去问各自的导师。", "Before hanging up, confirm who writes the terms down and who asks which advisor by when."),
    ],
    success: L(
      "条件摆上了桌面：谁主导、署名规则、各自贡献什么、哪些不共享都谈过，并且有人负责写下来。她可以决定不参加，或只先做一个小范围的试验。",
      "The terms are on the table: who leads, the authorship rule, what each contributes and what stays unshared have all been discussed, and someone owns writing them down. She may decide not to join, or to start with a small scoped trial only.",
    ),
    failure: L(
      "用「先做着看」绕开署名；或为了让她点头随口把一作送出去、之后又想改；或条件没谈就把未发表的想法和盘托出，或追着要她未发表的东西。",
      "You dodge authorship with ‘let's see how it goes’; or you give first authorship away on the spot to win her over and later want it back; or you lay out your unpublished idea before any terms, or keep asking for her unpublished material.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "nilufar",
      text: L(
        "先说在前面，这个方向我是有兴趣的。但聊想法之前我想先问清一件事：如果真做成一篇 paper，一作是谁？",
        "Let me say first that I am interested in this. But before we get into the idea, one thing: if this turns into a paper, who is first author?",
      ),
    },
    source: frontierSource(FILE, "collab-proposal-call", "collaborationRules"),
    keywords: ["合作", "一作", "署名", "跨组", "未发表", "collaboration", "authorship", "first author", "written terms"],
  },
  {
    id: "follow-up-gone-cold",
    title: L("「我把你介绍给我们团队」之后，三周没有回音", "Three Weeks After “I'll Introduce You to Our Team”"),
    hook: L(
      "两封邮件都没回。今晚你在另一个活动上又碰见了她——提，还是不提？怎么提？",
      "Two emails, no reply. Tonight you run into her at another event — do you raise it, and how?",
    ),
    background: L(
      "三周前的一次晚宴上，Larkspur AI 的研究负责人 Selin Kaya 听你讲完工作后说：「我把你介绍给我们团队。」你隔了几天发了一封邮件，一周后又发了一封，都没有回音。今晚在另一个活动上，你在饮料台旁边迎面碰上了她，她认出了你。你不知道她是忘了、太忙，还是那句话本来就只是客气。你想把这件事弄清楚，但不想让她难堪，也不想再带着一句「回头找你」离开。",
      "Three weeks ago at a dinner, Selin Kaya, a research lead at Larkspur AI, heard you describe your work and said: ‘I'll introduce you to our team.’ You emailed a few days later and again a week after that; no reply to either. Tonight, at a different event, you come face to face with her by the drinks table and she recognises you. You do not know whether she forgot, was swamped, or was only being polite. You want to find out — without embarrassing her, and without walking away with another ‘I'll get back to you’.",
    ),
    simulationFacts: L(
      "对话只在 Selin 和用户之间；周围有别人，但没有人加入，也没有人来把她叫走。三周前她说的原话是「我把你介绍给我们团队」——没有说介绍给谁、为了什么、什么时候。用户之后发了两封邮件，都没有得到回复；邮件具体怎么写的，以用户自己说的为准。Selin 两封都扫过一眼。到现在没有任何引荐发生。她从未就工作、实习或合作许诺过什么。Larkspur 的招聘和内部安排属于非公开信息，她不讲细节。用户的工作以用户自己说的为准，不替用户编造成果；Selin 只记得晚宴上聊过的大概方向。",
      "The conversation is between Selin and the learner only; others are around, but nobody joins and nobody comes to pull her away. Her words three weeks ago were ‘I'll introduce you to our team’ — no person, purpose or date. The learner then sent two emails and neither was answered; how they were worded is whatever the learner says. Selin skimmed both. No introduction has happened. She has never promised anything about a job, an internship or a collaboration. Larkspur's hiring and internal arrangements are non-public and she gives no details. The learner's work is whatever the learner says — never invent results for them; Selin remembers only the rough area from the dinner.",
    ),
    simulationDirection: L(
      "Selin 得体、周到，有一点不好意思，说话带着工业界那种熟练的含糊。用户说「没事没事，我就是跟进一下」而没有具体请求，她松一口气，说「一定一定，我回头找你」——这和三周前那句话是同一种东西，说完她就开始往别处走。用户带着责备提邮件（「我发了两封」），她会正式地道歉，人却收紧了，什么也不给，并准备礼貌地离开；用户放下责备、改说具体的事，气氛可以修复。用户提出一个小而具体的请求（和做某个公开工作的那位研究者聊十五分钟、聊哪个问题），她才开始认真想：谁合适、她得先问对方。用户直接要内推或实习，她如实说这方面她现在什么也承诺不了；不被问到，不解释原因。用户不带责备地点出没回信这件事，并问「是不是情况有变化」「这个引荐现在还现实吗」，她才讲出背后的原因。知道原因后，用户可以改请求、问什么时候再联系合适，或主动让她不必再惦记这句话——都可以。用户提出今晚就发一封三行、请求写在最前面、可以直接转发的短邮件，而她已经答应了那件小事，她才会说「这周内我转给他」；有具体的邮件和时间才算承诺。用户拿她的收件箱开玩笑，她真的笑了，气氛松下来，但她仍然需要听到具体请求。用户说错了当时的约定（比如把她的话说成答应了面试）随后更正，她接受更正。她明确说做不到之后用户继续要，她温和地再说一次，不改口。关键决定是：把那句含糊的「介绍给团队」换成一个具体的小请求，还是放下它；以及谁在什么时候发什么。「我回头找你」「一定」「你再提醒我一下」都不算。事情说定后用户若继续，她可以问用户这三周做了什么，或聊一封跟进邮件怎样写她才回得动；她不会重新讨论已经说定的事。",
      "Selin is gracious and considerate, a little embarrassed, and speaks with practised industry vagueness. If the learner says ‘no worries, just following up’ with no specific request, she is relieved and says ‘absolutely, I'll get back to you’ — the same thing as her line three weeks ago — and starts drifting off. If the learner brings up the emails with reproach (‘I wrote twice’), she apologises formally, tightens, offers nothing and prepares a polite exit; dropping the reproach and getting specific can repair it. A small, specific request (fifteen minutes with the researcher behind a particular public piece of work, on a particular question) is what makes her think concretely: who fits, and that she would have to ask them first. Asked directly for a referral or an internship, she says honestly that she cannot promise anything on that front right now, and gives no reason unless asked. Only when the learner names the silence without blame and asks whether something has changed, or whether the intro is still realistic, does she give the reason behind it. Knowing it, the learner may change the ask, ask when it makes sense to check back, or release her from the remark altogether — all acceptable. If the learner offers to send tonight a three-line, forwardable email with the request at the top, and she has already agreed to the small thing, she says ‘I'll forward it this week’; a commitment needs that specific email and a time. A joke about her inbox makes her laugh for real and loosens things, yet she still needs to hear a specific request. If the learner misstates what was said back then (for instance, turning her remark into a promised interview) and then corrects it, she accepts the correction. If the learner keeps asking after she has clearly said she cannot, she says it once more, kindly, and does not change her answer. The key decision is whether to swap the vague ‘introduce you to the team’ for one specific small request or to let it go, and who sends what when. ‘I'll get back to you’, ‘definitely’ and ‘remind me again’ do not count. If the learner keeps talking once it is settled, she may ask what they have done in the past three weeks, or say what makes a follow-up email answerable from her side; she does not reopen what was settled.",
    ),
    context: "outreach",
    contextType: L("引荐与跟进", "Intros & follow-up"),
    competencies: ["self-management", "social-awareness"],
    skills: ["following-up", "making-the-ask"],
    relatedSkills: ["perspective-taking"],
    relationship: ["industry"],
    difficulty: 2,
    minutes: 5,
    icon: "send",
    characters: [
      {
        id: "selin",
        name: L("Selin Kaya", "Selin Kaya"),
        role: L("Larkspur AI 研究负责人", "Research lead at Larkspur AI"),
        hue: 95,
        personality: L(
          "得体、周到，有点不好意思，习惯用「一定」「回头找你」把话收住。被责备时会正式道歉然后收紧；听到一个她做得到的小请求，才会具体地想该找谁。",
          "Gracious, considerate, a little embarrassed, in the habit of closing things off with ‘definitely’ and ‘I'll get back to you’. Under reproach she apologises formally and tightens; she starts thinking about actual names only for a small request she can deliver.",
        ),
        stance: L(
          "不想失礼，也不想再许一个兑现不了的诺。你客气，她只会更客气地含糊过去；只有请求具体、小、她确实做得到，她才给出带时间的答复。做不到的事，被追着要也不会改口。",
          "Wants to be neither rude nor on the hook for another promise she cannot keep. Courtesy only earns more courteous vagueness; she gives an answer with a date only when the request is specific, small and really within her power. What she cannot do, she will not be pressed into.",
        ),
        hidden: L(
          "那次晚宴后不久，她团队的 headcount 被冻结，一部分人划给了另一位负责人；「介绍给团队」如果指的是实习或职位，她现在兑现不了。她没回邮件，是因为没有好消息，而且两封邮件都没说清你到底想要什么。她仍然做得到的是：先问过对方，再把你介绍给一位具体的研究者，聊公开工作；或者告诉你下个季度规划之后再来问。只有当你不带责备地提起没回信，并问到「是不是情况变了」或「这个引荐现在还现实吗」时，她才会笼统地说「我们这边有变化，headcount 冻结了」，不讲细节。",
          "Soon after that dinner her team's headcount was frozen and part of the team moved under another lead; if ‘introduce you to the team’ meant an internship or a role, she can no longer deliver it. She did not reply because she had no good news, and because neither email said what you actually wanted. What she can still do: introduce you to one specific researcher, after asking them, to talk about public work; or tell you to ask again after next quarter's planning. Only if you bring up the silence without blame and ask whether something changed, or whether the intro is still realistic, does she say in general terms that ‘things changed on our side, headcount is frozen’ — no details.",
        ),
      },
    ],
    objectives: [
      L("不带责备地提起没回的邮件，并问清情况有没有变。", "Raise the unanswered emails without reproach, and find out whether something has changed."),
      L("把「介绍给团队」换成一个具体、小、她做得到的请求。", "Replace ‘introduce you to the team’ with one specific, small request she can actually deliver."),
      L("分开前说定谁在什么时候发什么。", "Before you part, settle who sends what, and when."),
    ],
    success: L(
      "那句含糊的话变成了清楚的东西：一个她做得到的小请求加上具体的下一步；或一个明确的「现在做不了，某个时间之后再问」；或你主动放下这件事，体面收尾。",
      "The vague remark has become something clear: a small request she can deliver plus a concrete next step; or a plain ‘not now, ask again after such-and-such’; or you let it go yourself and close gracefully.",
    ),
    failure: L(
      "一句「没事没事」换回又一句「我回头找你」；或拿两封没回的邮件让她下不来台；或在她说明做不到之后继续要内推。",
      "‘No worries’ buys you another ‘I'll get back to you’; or you use the two unanswered emails to put her on the spot; or you keep asking for a referral after she has said she cannot.",
    ),
    maxTurns: 10,
    opening: {
      characterId: "selin",
      text: L(
        "啊——是你。我是不是还欠你邮件？好像是两封。你提醒我一下：你当时是想让我们团队帮你什么？",
        "Oh — it's you. I owe you an email, don't I? Two, I think. Remind me: what was it you wanted from the team?",
      ),
    },
    source: frontierSource(FILE, "follow-up-gone-cold", "fralic", "email"),
    keywords: ["跟进", "没回邮件", "引荐", "下一步", "客套话", "follow-up", "intro", "headcount", "forwardable email"],
  },
];
