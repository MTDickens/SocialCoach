/**
 * Sources behind the Hallway Track corpus. Every URL was opened and its title,
 * authors and the points used here were checked on 2026-10-09. Journal articles
 * were checked against their Crossref records. Scenarios and cases built on
 * them are original fiction and are labelled as such; nothing here is a quote.
 */
export const FRONTIER_SOURCES = {
  ernstConference: {
    book: "Attending an academic conference",
    author: "Michael Ernst, University of Washington",
    url: "https://homes.cs.washington.edu/~mernst/advice/conference-attendance.html",
  },
  posterRules: {
    book: "Ten Simple Rules for a Good Poster Presentation",
    author: "Thomas C. Erren & Philip E. Bourne, PLoS Computational Biology 3(5): e102 (2007)",
    url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.0030102",
  },
  meetingRules: {
    book: "Ten Simple Rules for Organizing a Scientific Meeting",
    author: "Manuel Corpas, Nils Gehlenborg, Sarath Chandra Janga & Philip E. Bourne, PLoS Computational Biology 4(6): e1000080 (2008)",
    url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000080",
  },
  chairRules: {
    book: "Ten Simple Rules for Chairing a Scientific Session",
    author: "Alex Bateman & Philip E. Bourne, PLoS Computational Biology 5(9): e1000517 (2009)",
    url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000517",
  },
  reputationRules: {
    book: "Ten Simple Rules for Building and Maintaining a Scientific Reputation",
    author: "Philip E. Bourne & Virginia Barbour, PLoS Computational Biology 7(6): e1002108 (2011)",
    url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002108",
  },
  collaborationRules: {
    book: "Ten Simple Rules for a Successful Collaboration",
    author: "Quentin Vicens & Philip E. Bourne, PLoS Computational Biology 3(3): e44 (2007)",
    url: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.0030044",
  },
  pgConvince: {
    book: "How to Convince Investors",
    author: "Paul Graham (2013)",
    url: "https://paulgraham.com/convince.html",
  },
  pgRaise: {
    book: "How to Raise Money",
    author: "Paul Graham (2013)",
    url: "https://paulgraham.com/fr.html",
  },
  hamming: {
    book: "You and Your Research",
    author: "Richard W. Hamming, Bell Communications Research Colloquium (1986)",
    url: "https://www.cs.virginia.edu/~robins/YouAndYourResearch.html",
  },
  questionAsking: {
    book: "It Doesn't Hurt to Ask: Question-Asking Increases Liking",
    author: "Karen Huang, Michael Yeomans, Alison Wood Brooks, Julia Minson & Francesca Gino, Journal of Personality and Social Psychology 113(3), 430–452 (2017)",
    url: "https://doi.org/10.1037/pspi0000097",
  },
  justAsk: {
    book: "If You Need Help, Just Ask: Underestimating Compliance With Direct Requests for Help",
    author: "Francis J. Flynn & Vanessa K. B. Lake, Journal of Personality and Social Psychology 95(1), 128–143 (2008)",
    url: "https://doi.org/10.1037/0022-3514.95.1.128",
  },
  adviceSeeking: {
    book: "Smart People Ask for (My) Advice: Seeking Advice Boosts Perceptions of Competence",
    author: "Alison Wood Brooks, Francesca Gino & Maurice E. Schweitzer, Management Science 61(6), 1421–1435 (2015)",
    url: "https://doi.org/10.1287/mnsc.2014.2054",
  },
  humblebrag: {
    book: "Humblebragging: A Distinct—and Ineffective—Self-Presentation Strategy",
    author: "Ovul Sezer, Francesca Gino & Michael I. Norton, Journal of Personality and Social Psychology 114(1), 52–74 (2018)",
    url: "https://doi.org/10.1037/pspi0000108",
  },
  bragging: {
    book: "You Call It “Self-Exuberance”; I Call It “Bragging”: Miscalibrated Predictions of Emotional Responses to Self-Promotion",
    author: "Irene Scopelliti, George Loewenstein & Joachim Vosgerau, Psychological Science 26(6), 903–914 (2015)",
    url: "https://doi.org/10.1177/0956797615573516",
  },
  likingGap: {
    book: "The Liking Gap in Conversations: Do People Like Us More Than We Think?",
    author: "Erica J. Boothby, Gus Cooney, Gillian M. Sandstrom & Margaret S. Clark, Psychological Science 29(11), 1742–1756 (2018)",
    url: "https://doi.org/10.1177/0956797618783714",
  },
  deeperTalk: {
    book: "Overly Shallow?: Miscalibrated Expectations Create a Barrier to Deeper Conversation",
    author: "Michael Kardas, Amit Kumar & Nicholas Epley, Journal of Personality and Social Psychology 122(3), 367–398 (2022)",
    url: "https://doi.org/10.1037/pspa0000281",
  },
  chatham: {
    book: "Chatham House Rule",
    author: "Chatham House, The Royal Institute of International Affairs",
    url: "https://www.chathamhouse.org/about-us/chatham-house-rule",
  },
  email: {
    book: "How to send and reply to email",
    author: "Matt Might",
    url: "https://matt.might.net/articles/how-to-email/",
  },
  fralic: {
    book: "How to Become Insanely Well-Connected",
    author: "First Round Review, on Chris Fralic (2017)",
    url: "https://review.firstround.com/how-to-become-insanely-well-connected",
  },
  neuripsWorkshops: {
    book: "NeurIPS 2026 Call for Workshops",
    author: "Neural Information Processing Systems Foundation",
    url: "https://neurips.cc/Conferences/2026/CallForWorkshops",
  },
  neuripsConduct: {
    book: "Neural Information Processing Systems Foundation Code of Conduct",
    author: "Neural Information Processing Systems Foundation",
    url: "https://neurips.cc/public/CodeOfConduct",
  },
} as const;

export type FrontierSourceKey = keyof typeof FRONTIER_SOURCES;

/**
 * Provenance line for an authored scenario: original fiction, the sources that
 * informed its design, and where the record lives.
 */
export const frontierSource = (file: string, id: string, ...keys: FrontierSourceKey[]) =>
  `Original fictional practice — Hallway Track, 2026-10-09. Informed by ${keys
    .map((k) => `${FRONTIER_SOURCES[k].book} — ${FRONTIER_SOURCES[k].author} (${FRONTIER_SOURCES[k].url})`)
    .join("; ")}. Authored scenario record: app/src/data/corpus/frontier/${file}.ts#${id}`;
