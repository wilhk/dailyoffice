import scriptureReadings from './workplaceScriptures.json'

// Original reflections and prayers. Scripture: public-domain World English Bible.
// Each entry contains a title, reading, devotional, three questions, practice, and prayer.
const entries = [
  [
    'When Work Feels Overwhelming', 'Matthew 11:28–30',
    'An overflowing inbox can make every request feel like a test of your worth. Jesus invites weary people to come to him before they prove anything. His gentleness gives you room to admit that your capacity has limits.\n\nBring your workload into prayer, then identify what actually belongs to today. Ask your manager to clarify competing priorities. Receiving Christ’s rest can change the way you carry responsibilities, even before your calendar changes.',
    'Which responsibility feels heaviest today?', 'What am I trying to prove through overwork?', 'Who can help me clarify my priorities?',
    'List your three most important tasks and discuss one unrealistic expectation before accepting more work.',
    'Jesus, I bring you my tired mind and crowded schedule. Teach me to work from your care and to ask for the help I need. Amen.'
  ],
  [
    'Wisdom Before the Meeting', 'James 1:5',
    'A difficult meeting may require more than preparation. You need wisdom to distinguish facts from assumptions, courage from defensiveness, and a useful question from a quick rebuttal. James invites people who lack wisdom to ask God freely.\n\nPray before entering the room. Review what you know and name what you still need to understand. God’s generosity frees you to say, “I need more information,” without treating uncertainty as failure.',
    'What decision needs wisdom rather than speed?', 'Which assumption should I check?', 'What question could help everyone understand the problem?',
    'Write one open question before your next meeting and listen carefully to the answer.',
    'Generous God, give me wisdom for today’s conversations. Help me seek understanding and choose what serves the people involved. Amen.'
  ],
  [
    'A Gentle Answer', 'Proverbs 15:1',
    'A sharp message can start a chain of equally sharp replies. Proverbs shows how the tone of an answer can change the direction of a conversation. Gentleness makes space for truth to be heard; it does not require you to agree with unfair accusations.\n\nBefore replying, pause long enough to separate the issue from your wounded pride. State the facts plainly, acknowledge what needs attention, and leave out the sentence meant only to sting.',
    'Which message has made me defensive?', 'What truth needs a calm response?', 'How could my wording lower the temperature?',
    'Draft a difficult reply, remove blame and sarcasm, and reread it before sending.',
    'Lord, steady my voice when I feel attacked. Help me speak truth with gentleness and protect others from my anger. Amen.'
  ],
  [
    'Integrity Under Pressure', 'Proverbs 10:9',
    'You may be asked to hide a mistake, improve a number, or describe unfinished work as complete. A shortcut can promise immediate relief while creating a burden you must keep concealing. Proverbs connects integrity with a secure way of walking.\n\nChoose an account of events that you can repeat honestly tomorrow. If a request crosses a line, explain the concern and propose a truthful alternative. Seek appropriate support when the pressure continues.',
    'Where am I tempted to shade the truth?', 'What would an accurate account include?', 'Who can support an ethical response?',
    'Check one report or status update for accuracy and correct any misleading wording.',
    'God of truth, strengthen my integrity when honesty feels costly. Give me courage, wisdom, and the right support. Amen.'
  ],
  [
    'Faithfulness in Small Tasks', 'Luke 16:10',
    'Routine tasks can feel insignificant beside visible achievements. Jesus’ teaching about faithfulness in little things invites you to notice the trust carried by ordinary responsibilities. A careful handover, accurate record, or kept promise can protect someone else’s day.\n\nChoose one neglected task and complete it with care. You do not need to turn every detail into perfection. Faithfulness means giving honest attention to the responsibility entrusted to you.',
    'What small task have I dismissed?', 'Who depends on it being done well?', 'Where would care matter more than polish?',
    'Finish one overlooked responsibility and make the result easy for the next person to use.',
    'Lord, help me see the people served by ordinary work. Make me dependable in the small things entrusted to me. Amen.'
  ],
  [
    'Releasing Tomorrow’s Anxiety', 'Matthew 6:34',
    'Uncertainty at work can fill today with imagined conversations, future layoffs, and outcomes you cannot predict. Jesus directs attention toward today’s trouble rather than borrowing tomorrow’s. This invitation leaves room for sensible planning while resisting endless rehearsal of fear.\n\nName the uncertainty, make one practical preparation, and return to the task before you. Your attention is a limited gift. Offer it to the work and people you can actually reach today.',
    'What future event am I repeatedly rehearsing?', 'What preparation is useful today?', 'What present responsibility needs my attention?',
    'Give planning a defined time limit, then take one useful action and close the planning document.',
    'Father, meet me in today’s uncertainty. Help me prepare wisely and release the future into your care. Amen.'
  ],
  [
    'Rest Without Earning It', 'Exodus 20:8–10',
    'Work can expand until rest feels like a reward reserved for people who have finished everything. The Sabbath command interrupts that logic. Rest belongs within a faithful life, and the command extends it to others as well.\n\nConsider how your habits affect both your own rest and your team’s. Where possible, arrange coverage, leave a clear handover, and protect time away. The world continues while you stop, and your humanity is worth honoring.',
    'Why does stopping make me uneasy?', 'Who is affected by my after-hours expectations?', 'What preparation would make rest possible?',
    'Plan a period away from work and communicate coverage or availability clearly.',
    'Creator God, teach me to honor rest for myself and for others. Help me trust you when I stop producing. Amen.'
  ],
  [
    'Listening Before Defending', 'James 1:19–20',
    'When someone criticizes your work, your mind may prepare a defense before they finish speaking. James links listening, measured speech, and slow anger. That rhythm can help you understand a concern without surrendering your own perspective.\n\nLet the other person explain. Repeat what you heard and ask whether you understood correctly. Then respond to the actual concern. Listening does not settle every disagreement, but it can prevent a misunderstanding from becoming a lasting conflict.',
    'When do I interrupt most quickly?', 'What concern might I have misunderstood?', 'How does anger affect my listening?',
    'In one conversation, summarize the other person’s concern before offering your explanation.',
    'Lord, give me patient ears and measured words. Help me understand before I defend myself. Amen.'
  ],
  [
    'Facing Conflict Directly', 'Matthew 18:15',
    'Jesus describes addressing a wrong with the person involved rather than immediately making it public. At work, a private, respectful conversation can protect dignity and give a relationship a chance to recover. Be specific about the behavior and its effect.\n\nDirect conversation is not always safe or appropriate. Serious misconduct, harassment, or a power imbalance may require a manager or formal reporting channel. Seek a path that joins honesty with protection for everyone affected.',
    'What specific behavior needs attention?', 'Is a direct conversation safe and appropriate?', 'What outcome would support repair?',
    'Write a factual description of the issue and choose the appropriate person or channel to address it.',
    'Jesus, help me face conflict with truth and care. Give me discernment about when to speak directly and when to seek help. Amen.'
  ],
  [
    'Working for a Difficult Manager', 'Romans 12:18',
    'An unpredictable manager can leave you constantly bracing for the next request. Paul’s invitation to live peaceably includes a realistic boundary: you are responsible for your own contribution, and other people’s choices remain theirs.\n\nCommunicate clearly, confirm expectations, and avoid retaliatory behavior. Keep factual records when patterns cause harm. Peace can include asking for support or a different arrangement. You do not have to control another person’s temperament to act faithfully today.',
    'Which part of this relationship can I influence?', 'What expectations need clarification?', 'What support would help me respond wisely?',
    'Confirm a priority or deadline in writing and identify one trusted source of support.',
    'God, give me steadiness in a difficult working relationship. Help me pursue peace with clear boundaries and honest communication. Amen.'
  ],
  [
    'Receiving Useful Feedback', 'Proverbs 12:1',
    'Feedback can feel like a verdict on your identity, especially when you care deeply about your work. Proverbs treats correction as part of learning. You can examine a criticism without accepting every judgment attached to it.\n\nAsk for a concrete example and a description of what better work would look like. Separate useful information from an unhelpful delivery. Growth becomes more possible when feedback leads to a specific practice rather than a vague sense of shame.',
    'What feedback am I resisting?', 'Which part is specific and useful?', 'What example or clarification do I need?',
    'Turn one piece of feedback into a small practice you can try this week.',
    'Lord, give me humility to learn and discernment to weigh criticism fairly. Let correction lead to growth rather than shame. Amen.'
  ],
  [
    'After Making a Mistake', 'Proverbs 28:13',
    'A mistake creates two responsibilities: address what happened and decide whether you will hide it. Proverbs connects confession and turning away from wrongdoing with mercy. Honesty opens a way toward repair.\n\nTell the relevant person what you know, describe the impact, and offer a practical correction. Avoid excuses, but also avoid treating one failure as your whole identity. Accountability includes learning how to prevent the same error and accepting help where your process needs to change.',
    'What error needs an honest acknowledgment?', 'Who needs accurate information now?', 'What process could prevent a repeat?',
    'Use three sentences: what happened, what it affected, and what you will do next.',
    'Merciful God, help me admit my mistakes and repair what I can. Give me humility to learn without hiding in shame. Amen.'
  ],
  [
    'When Your Work Goes Unnoticed', 'Colossians 3:23–24',
    'Quiet effort can disappear behind a team’s visible results. Paul points toward a deeper audience for faithful service: the Lord sees the heart with which you work. Recognition matters, but it cannot carry the entire weight of your purpose.\n\nOffer today’s work to God while making your contributions clear and factual. A progress summary or career conversation can be healthy stewardship. You can seek fair acknowledgment without allowing applause to decide whether your work has value.',
    'Whose recognition am I longing for?', 'What part of my work serves others quietly?', 'How could I communicate my contribution honestly?',
    'Record one meaningful contribution and share it through an appropriate update or review.',
    'Lord, receive my unseen work. Free me from dependence on praise and help me speak honestly about my contribution. Amen.'
  ],
  [
    'Stepping Out of Comparison', 'Galatians 6:4–5',
    'A colleague’s promotion can make your own progress feel smaller. Paul encourages examining your own work and carrying your own responsibility. Comparison often ignores different starting points, opportunities, and burdens.\n\nNotice what you can learn from someone else without using their success to measure your worth. Review the responsibilities actually entrusted to you. Gratitude for another person and honest ambition for your own growth can exist together.',
    'Whose success has unsettled me?', 'What responsibility is actually mine?', 'What could I learn without competing?',
    'Write one personal growth goal based on your role rather than a colleague’s timeline.',
    'Father, free me from comparison that steals joy. Help me celebrate others and carry my own responsibilities faithfully. Amen.'
  ],
  [
    'Courage to Raise a Concern', 'Esther 4:14',
    'Esther’s story shows the weight of speaking when silence might feel safer. Her situation is not a promise that every workplace risk will end well. It is an invitation to consider how your position might allow you to protect others.\n\nIf something is wrong, gather facts and seek wise advice. Choose a channel suited to the seriousness of the concern. Courage can be prepared and supported; it does not have to be impulsive or solitary.',
    'Who may be affected if I stay silent?', 'What facts do I need to verify?', 'Who can help me choose a responsible channel?',
    'Document a concern factually and seek confidential advice about the appropriate next step.',
    'God, give me courage to care about others when speaking is costly. Guide my timing, preparation, and choice of support. Amen.'
  ],
  [
    'Boundaries That Protect Good Work', 'Mark 1:35–38',
    'Even with people looking for him, Jesus withdrew to pray and continued toward the work he had come to do. His example invites you to examine the assumption that every demand must receive an immediate yes.\n\nA boundary can protect attention for your actual responsibilities. Explain your capacity honestly and offer realistic options. You may need to ask which task should move when a new one arrives. Prayer helps you discern the difference between a need and your assignment.',
    'Which demands are pulling me away from my responsibilities?', 'What limit needs a clear explanation?', 'What could I offer instead of an automatic yes?',
    'Practice saying, “I can take this on if we move this other deadline. Which is the priority?”',
    'Jesus, guide my yes and my no. Help me honor my responsibilities with clear, kind boundaries. Amen.'
  ],
  [
    'Sharing the Load', 'Exodus 18:17–23',
    'Moses was carrying so much that Jethro warned the arrangement would wear out both him and the people. The solution involved sharing responsibility with capable people. Needing help was a structural reality, not proof of weak devotion.\n\nLook for a bottleneck you have come to treat as normal. Ask what can be delegated, simplified, or shared. Give others the information and authority they need, rather than handing over a task while keeping every decision for yourself.',
    'Where have I become a bottleneck?', 'What am I holding because I fear losing control?', 'What would someone need to share this responsibility?',
    'Identify one task to share and prepare a clear handover with expectations and resources.',
    'Lord, help me recognize unsustainable burdens. Teach me to trust others and build ways of working that serve everyone. Amen.'
  ],
  [
    'Patience with a Slow Process', 'Psalm 37:7',
    'A delayed approval or slow decision can stir resentment, especially when other people appear to move ahead easily. The psalm invites stillness before God rather than anxious fixation on someone else’s advantage.\n\nWaiting can include a clear follow-up and a sensible escalation when needed. After taking that step, return to work you can advance. Refuse to let one stalled process occupy every corner of your attention or make you careless with the people involved.',
    'What delay is dominating my thoughts?', 'What follow-up would be constructive?', 'What useful work can continue while I wait?',
    'Schedule one follow-up and redirect the rest of that time toward a task you can complete.',
    'God, steady me in delays. Help me act responsibly without letting impatience govern my thoughts or words. Amen.'
  ],
  [
    'Resisting Office Gossip', 'Proverbs 16:28',
    'A private rumor can feel like a harmless way to connect. Proverbs warns that whispering can separate close friends. At work, speculation can damage trust long before anyone checks whether a story is true.\n\nNotice when conversation moves from solving a problem to exposing someone who is absent. Decline to add details, redirect toward facts, or suggest speaking to the person who can address the issue. Confidential reporting of wrongdoing deserves a responsible channel, not a rumor network.',
    'What story am I repeating without verification?', 'Would I speak this way if the person were present?', 'Does this issue need action through a proper channel?',
    'Redirect one speculative conversation toward facts or a constructive next step.',
    'Lord, guard my speech and the dignity of absent people. Help me build trust instead of spreading suspicion. Amen.'
  ],
  [
    'Welcoming a New Colleague', 'Romans 15:7',
    'Starting a job means learning unwritten rules while trying to appear capable. Paul’s call to welcome one another as Christ welcomed us gives hospitality a practical shape. A small act of inclusion can reduce someone’s loneliness and confusion.\n\nExplain an unfamiliar process, invite a question, or make room at lunch. Welcome does not require becoming everyone’s closest friend. It begins with treating another person as someone who deserves access, patience, and a place to belong.',
    'Who is still learning how our workplace works?', 'What unwritten rule could I explain?', 'Where might my team unintentionally exclude someone?',
    'Offer a colleague one practical resource and a specific invitation to ask questions.',
    'Jesus, help me welcome others with the kindness I have received from you. Show me who needs a place to belong today. Amen.'
  ],
  [
    'Learning a Skill You Do Not Yet Have', 'Proverbs 18:15',
    'A new tool or responsibility can expose the uncomfortable distance between what you know and what the role requires. Proverbs describes a discerning person as someone who actively seeks knowledge. Asking questions belongs to wisdom.\n\nChoose a manageable learning step instead of pretending to understand everything. Read the guide, ask for a demonstration, and practice on something small. Competence usually grows through repeated attempts, and honesty about your learning needs can prevent avoidable mistakes.',
    'What skill gap am I hiding?', 'Where could I find reliable instruction?', 'What small task would let me practice?',
    'Set aside twenty minutes to learn one specific skill and write down what still needs clarification.',
    'God, give me a teachable spirit. Help me ask good questions and grow through patient practice. Amen.'
  ],
  [
    'Serving Without Keeping Score', 'Mark 10:43–45',
    'Jesus redefines greatness through service. At work, service might mean helping a teammate understand a problem or doing a necessary task that carries little status. These choices can loosen the need to win every comparison.\n\nServe thoughtfully within your capacity. Constantly rescuing others or taking on their responsibilities can leave everyone less healthy. Ask what would actually help this person do their work well, then offer a clear and sustainable contribution.',
    'Where am I keeping a tally of favors?', 'What would help a colleague become more capable?', 'What can I offer sustainably?',
    'Offer a specific piece of help without attaching a request for recognition or repayment.',
    'Jesus, shape my ambition through your example of service. Help me give wisely and without keeping score. Amen.'
  ],
  [
    'Sharing Credit Generously', 'Philippians 2:3–4',
    'A successful project can create a quiet scramble over whose name will be remembered. Paul calls believers to attend to others’ interests with humility. Shared work deserves an honest account of shared effort.\n\nBe specific about the people who made a result possible, including those whose work stayed behind the scenes. You can name your own contribution accurately while honoring theirs. Generous credit strengthens trust because it tells teammates their effort will not disappear inside your success.',
    'Whose contribution have I overlooked?', 'How can I describe the result accurately?', 'What fear makes me reluctant to share credit?',
    'In your next project update, name a colleague’s specific contribution and its impact.',
    'Father, free me from selfish ambition. Teach me to notice others’ work and honor it honestly. Amen.'
  ],
  [
    'When Anger Follows You Home', 'Ephesians 4:26–27',
    'An unfair conversation can keep replaying long after the workday ends. Paul acknowledges anger while warning against letting it open a path toward sin. Feeling hurt is different from feeding a plan to punish someone.\n\nName the issue before God and decide what response is needed. Write a factual note for tomorrow, then choose a way to reconnect with the present. You may need time and support to process anger; you do not need to rehearse revenge all evening.',
    'What event am I replaying?', 'What response would address the issue constructively?', 'How is this anger affecting people at home?',
    'Write down tomorrow’s next step, put work away, and give someone at home your undivided attention.',
    'Lord, receive my anger and hurt. Help me seek repair and keep resentment from directing my actions. Amen.'
  ],
  [
    'Pressure to Cut Corners', 'Proverbs 11:1',
    'Proverbs’ concern for honest scales reaches into the ways work is measured and represented. A deadline does not make a misleading estimate, hidden defect, or false claim harmless. Someone else may carry the cost of the shortcut.\n\nExplain the tradeoff plainly. Offer a smaller scope, a revised date, or an explicit statement of what remains unverified. Faithfulness includes making limitations visible so that others can make informed decisions.',
    'Who would bear the cost of this shortcut?', 'What limitation needs to be visible?', 'What truthful alternative can I propose?',
    'Identify one quality or accuracy risk and communicate a realistic alternative before proceeding.',
    'God of justice, help me use honest measures. Give me courage to make risks visible and protect those who depend on our work. Amen.'
  ],
  [
    'Facing an Unfair Decision', 'Psalm 82:3–4',
    'An unfair schedule, evaluation, or assignment can leave you feeling powerless. This psalm calls for justice and protection for people with little power. It gives language for taking unfairness seriously rather than treating it as something you must quietly accept.\n\nGather the relevant facts and clarify the decision process. Seek a review through the appropriate channel, and consider who else may be affected. Let concern for justice guide your next step more than the desire to humiliate the person responsible.',
    'What makes this decision unfair?', 'What facts support my concern?', 'Who else needs protection or a fair hearing?',
    'Prepare a concise, factual request for clarification or review using the appropriate workplace process.',
    'God, you care about justice. Help me seek fairness with courage, sound evidence, and care for vulnerable people. Amen.'
  ],
  [
    'Letting Go of Retaliation', 'Romans 12:19–21',
    'When someone undermines you, getting even can feel like restoring balance. Paul urges believers to leave vengeance with God and overcome evil with good. This protects your own conduct from becoming a reflection of the harm you received.\n\nYou can report wrongdoing, set boundaries, and seek accountability without plotting revenge. Choose an action that protects people and addresses facts. Refusing retaliation does not erase the wrong; it keeps the wrong from choosing your character for you.',
    'What retaliation am I imagining?', 'What accountability would address the harm?', 'What good action is still within my control?',
    'Replace one retaliatory impulse with a factual, constructive step toward accountability.',
    'Lord, hold my desire to get even. Help me resist harm with actions that remain truthful and good. Amen.'
  ],
  [
    'Asking for Help Early', 'Ecclesiastes 4:9–10',
    'A problem often grows while we try to solve it privately to protect our reputation. Ecclesiastes describes the practical goodness of companionship: when one person falls, another can help them up. Collaboration belongs in ordinary work as well as crisis.\n\nTell someone where you are stuck, what you have tried, and what kind of help you need. Asking early gives the team more options. You can remain responsible for your task while inviting another person’s experience into it.',
    'Where have I been stuck too long?', 'What makes asking for help difficult?', 'What information would make my request useful?',
    'Ask a colleague for help with a clear description of the problem and what you have already tried.',
    'God, free me from the pride that keeps me isolated. Help me ask for help and receive it gratefully. Amen.'
  ],
  [
    'Adapting When Plans Change', 'Proverbs 16:9',
    'A canceled project or sudden reorganization can make careful planning feel wasted. Proverbs holds human planning together with God’s direction of our steps. You can value preparation while remaining open to a path you did not choose.\n\nName what has changed and what remains possible. Ask which assumptions no longer apply and what your team needs now. Trust does not require enthusiasm for every change. It can begin with one responsible step in the situation you actually face.',
    'What loss in this change needs acknowledgment?', 'Which assumption must I revisit?', 'What is the next responsible step?',
    'Update one plan to reflect current facts and ask a clarifying question about the new priority.',
    'Lord, guide my steps when plans change. Help me grieve what is lost and respond wisely to what is before me. Amen.'
  ],
  [
    'Bringing Worry into Prayer', 'Philippians 4:6–7',
    'Workplace worry can sound like productive thinking while circling the same uncertainty. Paul invites believers to bring requests to God with thanksgiving. Prayer makes room for honesty about what you fear and remembrance of what you have received.\n\nName a specific concern instead of asking only for a vaguely better day. Thank God for one concrete source of help. Then choose the action available to you. God’s peace is not a guarantee that the outcome will match your preference.',
    'What specific concern do I need to name?', 'What provision can I thank God for?', 'What action can follow my prayer?',
    'Write a short prayer with one concern, one expression of thanks, and one faithful next step.',
    'Father, I bring you the worry I keep carrying. Guard my heart and guide my next action with your peace. Amen.'
  ],
  [
    'When Energy Is Running Low', 'Isaiah 40:29–31',
    'Persistent fatigue can tempt you to judge yourself as lazy or spiritually weak. Isaiah describes God as the giver of strength to weary people. The passage makes room for human limits, including the limits of people who usually seem strong.\n\nTell the truth about your energy. Consider rest, workload changes, support, and appropriate care when exhaustion continues. Waiting on God can include receiving help through ordinary means. You are a person to be cared for, not a resource to be used without limit.',
    'What signs of fatigue have I ignored?', 'What demand could be reduced?', 'What kind of help would support recovery?',
    'Protect a restorative break and name one workload adjustment to discuss with the appropriate person.',
    'God of the weary, meet me in my limits. Help me receive strength, rest, and practical support without shame. Amen.'
  ],
  [
    'Compassion for a Struggling Teammate', 'Galatians 6:2',
    'A teammate’s missed deadlines may be the first visible sign of a burden you do not know about. Paul’s call to carry one another’s burdens invites care before quick judgment. Compassion starts with curiosity about the person behind the performance issue.\n\nAsk privately how they are doing and what support would help. Keep expectations clear and avoid promising secrecy you cannot maintain. You may be able to share a task, connect them with support, or simply listen without trying to solve everything.',
    'Who seems to be struggling?', 'What judgment could I replace with a question?', 'What support can I realistically offer?',
    'Check in privately with a colleague and listen before suggesting a solution.',
    'Jesus, help me notice the burdens others carry. Give me compassion with wisdom about the help I can offer. Amen.'
  ],
  [
    'Doing Unseen Work Well', 'Matthew 6:3–4',
    'Jesus’ teaching about hidden generosity challenges the need to make every good act visible. At work, some valuable contributions will never become a presentation slide: calming a tense exchange, fixing a small error, or helping someone quietly.\n\nLet one act of service remain a gift rather than a campaign for attention. This does not remove the need for fair evaluations or accurate records. It simply gives your heart practice in doing good without immediately checking who noticed.',
    'What good act do I want everyone to notice?', 'How does the need for an audience affect my motives?', 'Who could benefit from quiet help?',
    'Do one small act of service without announcing it to gain praise.',
    'Father, purify my motives in unseen work. Help me take joy in serving someone you see and love. Amen.'
  ],
  [
    'Truthful Communication', 'Ephesians 4:25',
    'Teams depend on a shared understanding of what is actually happening. Paul connects truthfulness with belonging to one another. A misleading status update can prevent colleagues from offering help until a manageable problem becomes a crisis.\n\nReport what is complete, what is uncertain, and what is blocked. Use language others can understand. Truthfulness also means correcting a mistaken impression when your technically accurate words have left someone with the wrong picture.',
    'What does my team need to know?', 'Where has vague wording hidden uncertainty?', 'What mistaken impression should I correct?',
    'Send an accurate update that clearly distinguishes completed work, risks, and next steps.',
    'God of truth, make my communication clear and trustworthy. Help me honor the people who rely on my words. Amen.'
  ],
  [
    'Leading Through Service', '1 Peter 5:2–3',
    'Peter’s instructions to church elders describe leadership through willing care and example rather than domination. Workplace leaders can examine their own use of authority in that light. People are affected by how decisions are made, not only by whether targets are reached.\n\nExplain expectations, invite concerns, and take responsibility for your own mistakes. If you lack a formal title, you can still lead through a steady example. Influence becomes trustworthy when it serves the people asked to follow.',
    'How does my authority affect others?', 'Where could I explain a decision more clearly?', 'What behavior am I asking others to copy?',
    'Ask someone you support what would help them do their work, then follow through on one useful change.',
    'Lord, teach me to lead with care and example. Keep my authority accountable to the good of those I serve. Amen.'
  ],
  [
    'Humility When You Are Right', 'James 3:17',
    'Knowing the correct answer does not guarantee a wise conversation. James describes wisdom through qualities such as gentleness, mercy, and openness to reason. The way you carry a good idea can either invite participation or make colleagues afraid to speak.\n\nPresent your evidence clearly and leave room for questions. Acknowledge the part of another person’s concern that makes sense. You do not have to weaken your conclusion to offer it with respect and a willingness to keep learning.',
    'How do I behave when I am certain?', 'What valid concern sits beneath the disagreement?', 'Am I still willing to hear new evidence?',
    'Explain one recommendation with evidence and explicitly invite questions about its limitations.',
    'God, make my wisdom gentle and open to reason. Help me care about people as well as correct answers. Amen.'
  ],
  [
    'When a Project Fails', 'Habakkuk 3:17–18',
    'Habakkuk speaks of joy in God amid the loss of visible provision. A failed project may carry real consequences: disappointment, wasted effort, or concern about your future. Faith gives you somewhere to bring those losses without pretending they are small.\n\nReview what happened with honesty and compassion. Identify what can be learned, what can be repaired, and what must be released. Your relationship with God can sustain you while you face a result you would never have chosen.',
    'What loss am I feeling most deeply?', 'What can the team learn without blaming?', 'What outcome do I need to release?',
    'Write one lesson, one repair action, and one thing that is now outside your control.',
    'Lord, stay near in disappointment. Help me learn faithfully and find hope in you when results fail. Amen.'
  ],
  [
    'Gratitude on an Ordinary Day', '1 Thessalonians 5:18',
    'Some workdays contain no dramatic breakthrough, only familiar tasks and familiar frustrations. Paul invites gratitude in every circumstance. Gratitude need not approve of injustice or deny pain; it can notice gifts that difficulty has pushed out of view.\n\nName a helpful colleague, a skill you are developing, or a need met through your work. Let that recognition become a specific thank-you. Ordinary gratitude can restore attention to the good already present without requiring you to stop seeking necessary change.',
    'What good have I overlooked today?', 'Who has made my work easier?', 'How can gratitude coexist with an honest concern?',
    'Write down three concrete gifts from today and thank one person for a specific contribution.',
    'Father, open my eyes to today’s gifts. Let gratitude make me attentive, generous, and honest. Amen.'
  ],
  [
    'Fairness in Everyday Decisions', 'Micah 6:8',
    'Justice, mercy, and humility belong in small decisions as well as public statements. Who receives the inconvenient shift? Whose idea gets heard? Who is given the opportunity to learn? Micah’s call invites you to examine how ordinary choices distribute opportunity and burden.\n\nLook at one decision from the perspective of the person with the least influence. Ask what fairness and kindness would require. Walking humbly includes admitting when your first choice served your convenience more than another person’s good.',
    'Who has the least voice in this decision?', 'How are opportunities and burdens being shared?', 'What would a fairer process look like?',
    'Review one assignment or decision for fairness and make one practical correction where you have authority.',
    'God, teach me to act justly, love mercy, and walk humbly in the decisions I make today. Amen.'
  ],
  [
    'Receiving Limits as Human', 'Psalm 103:13–14',
    'God’s compassion in this psalm includes remembering how fragile human beings are. You may expect yourself to maintain the same pace through illness, caregiving, stress, and ordinary fatigue. That expectation can be harsher than the care Scripture describes.\n\nTake stock of your present capacity. Choose what can be done well, ask for help, and renegotiate what no longer fits. Receiving your limits can make you more compassionate toward coworkers whose circumstances are different from yours.',
    'What limit am I refusing to acknowledge?', 'What expectation needs to change this week?', 'How could my own limits teach me compassion?',
    'Adjust one commitment to match your current capacity and communicate the change clearly.',
    'Compassionate Father, help me remember that I am human. Teach me to receive your care and extend that care to others. Amen.'
  ],
  [
    'Dignity Beyond Your Job Title', 'Genesis 1:27',
    'A title can describe your responsibility, but it cannot measure your humanity. Genesis grounds human dignity in being made in God’s image. That dignity belongs to the executive, the contractor, the cleaner, and the person whose role is being eliminated.\n\nNotice how status influences your attention. Offer the same basic respect to people who cannot advance your career. When your own role feels diminished, return to this deeper truth before letting an organizational chart define your value.',
    'How strongly does my title shape my identity?', 'Whom do I overlook because of status?', 'What changes when I remember our shared dignity?',
    'Give thoughtful attention and respect to someone whose work is often overlooked.',
    'Creator God, root my worth in your image. Help me honor the dignity of every person I meet at work. Amen.'
  ],
  [
    'Rebuilding Trust After Harm', 'Luke 19:8',
    'Zacchaeus’ response to Jesus included concrete restitution. His story invites a kind of repentance that goes beyond saying the right words. When your actions have harmed a colleague, rebuilding trust requires attention to what they actually lost.\n\nAcknowledge the impact without demanding immediate forgiveness. Correct the record, return credit, or repair the practical damage where possible. Trust may take time to recover. Faithful repair respects that timeline and lets changed behavior support the apology.',
    'What harm needs more than an apology?', 'What practical repair is within my power?', 'Am I pressuring someone to trust me too quickly?',
    'Offer a specific repair for harm you caused and follow through without asking for immediate reassurance.',
    'Jesus, make my repentance practical. Help me repair what I can and respect the time another person needs. Amen.'
  ],
  [
    'The Gift of Focused Attention', 'Proverbs 21:5',
    'Constant switching can leave you busy all day and unsure what moved forward. Proverbs commends diligent planning over haste. Attention becomes an act of stewardship when you direct it toward work that matters instead of only toward the newest interruption.\n\nChoose one task, define what completion means, and give it a realistic period of focus. If your role requires availability, arrange a smaller protected interval. A thoughtful plan should serve real responsibilities rather than ignore the people who depend on you.',
    'What interruption could I reduce?', 'What would meaningful progress look like?', 'How can I protect focus while remaining responsibly available?',
    'Schedule one focused work period and define a small, concrete result before you begin.',
    'Lord, guide my attention toward what matters. Help me plan diligently and work with care rather than haste. Amen.'
  ],
  [
    'Disagreeing with Respect', 'Proverbs 18:13',
    'Disagreement becomes harder when you answer a version of someone’s argument they would not recognize. Proverbs warns against speaking before listening. Respectful disagreement begins with understanding the proposal well enough to describe it fairly.\n\nAsk what problem the other person is trying to solve. Identify the evidence behind your concern and explain the tradeoff you see. You may still reach different conclusions, but you can work toward a sound decision without making the other person an enemy.',
    'Could I describe the other view fairly?', 'What problem are we both trying to solve?', 'Which evidence matters most to this decision?',
    'Before disagreeing, state the other person’s proposal in terms they recognize and ask whether you understood.',
    'God, help me listen fairly and disagree respectfully. Let our conversation serve understanding and good decisions. Amen.'
  ],
  [
    'Disappointed About a Promotion', 'Psalm 62:5–6',
    'Being passed over can bring grief, embarrassment, or anger. The psalmist locates hope and stability in God. That foundation gives you a place to stand while you assess a decision that matters to your working life.\n\nAllow the disappointment to be real. Ask for clear criteria and useful feedback, and consider whether opportunities remain in your current role. Your next step can be both prayerful and practical. One promotion decision cannot contain the whole story of your future.',
    'What part of this disappointment hurts most?', 'What information would help me evaluate the decision?', 'What next step would support healthy growth?',
    'Arrange a calm career conversation with specific questions about expectations, opportunities, and next steps.',
    'God, be my steady ground in disappointment. Help me pursue growth without surrendering my worth to a promotion decision. Amen.'
  ],
  [
    'Encouraging Someone Specifically', '1 Thessalonians 5:11',
    'A team can spend so much time fixing problems that no one hears what is going well. Paul’s call to encourage and build up one another can take a concrete form: tell someone what they did and why it mattered.\n\nAvoid vague praise meant only to keep the atmosphere cheerful. Notice patience, care, improvement, or an act of integrity. Specific encouragement helps a colleague recognize the good they can keep practicing, especially when their effort has been difficult or unseen.',
    'Who has contributed quietly this week?', 'What specific behavior deserves recognition?', 'How did that behavior help someone else?',
    'Tell a colleague one precise thing you appreciated and the difference it made.',
    'Lord, make me attentive to the good in others. Let my words strengthen people with honest, specific encouragement. Amen.'
  ],
  [
    'Looking Beyond the Metrics', 'Matthew 16:26',
    'A dashboard can show important results while leaving out the effect of those results on people. Jesus’ question about gaining the world and losing one’s soul challenges the assumption that visible success justifies every cost.\n\nReview what your goals encourage. Are you neglecting relationships, hiding problems, or crossing ethical lines to protect a number? Metrics can serve good work when they remain accountable to truth and human well-being. Ask what success should include that the dashboard cannot measure.',
    'What cost does our main metric leave out?', 'Which behavior does this target encourage?', 'What would a fuller account of success include?',
    'Add one quality, integrity, or human-impact consideration to your next review of results.',
    'Jesus, keep my pursuit of success accountable to what is good. Help me value people and integrity above appearances. Amen.'
  ],
  [
    'Working Across Differences', '1 Corinthians 12:18–21',
    'Paul’s picture of a body describes the church, and it challenges the idea that difference makes a member unnecessary. At work, people also bring different skills, backgrounds, and ways of noticing a problem. No single perspective sees everything.\n\nAsk whose knowledge is missing before making a decision. Make space for someone who communicates differently from you. Respect does not require agreement on every conviction; it requires treating another person’s contribution as worthy of fair attention.',
    'Whose perspective is missing?', 'What strength does a different colleague bring?', 'How can I make participation easier?',
    'Invite input from someone with a different role or perspective before finalizing a decision.',
    'God, help me value gifts unlike my own. Teach me to listen across differences and work with respect. Amen.'
  ],
  [
    'When There Is Too Much to Do', 'Psalm 90:12',
    'A long task list can tempt you to believe that wisdom means fitting everything in. The psalm’s prayer about numbering our days invites a deeper awareness that time is finite. Choosing well includes deciding what cannot receive your attention now.\n\nDistinguish urgent requests from important responsibilities. Name the tradeoffs instead of silently promising impossible capacity. Seek agreement about priorities. A limited day can still contain faithful work when you spend it honestly rather than pretending it has no boundaries.',
    'What matters most within today’s limits?', 'What must move if I accept a new task?', 'Who needs to agree on the priority?',
    'Review your workload with the relevant person and explicitly defer or remove one lower-priority task.',
    'Lord, teach me to number my days wisely. Help me choose faithfully within the time and strength I have. Amen.'
  ],
  [
    'Hope During Job Insecurity', 'Psalm 46:1–2',
    'Rumors of restructuring can make the ground beneath your work feel unstable. Psalm 46 speaks of God as refuge amid upheaval. Its hope is rooted in God’s presence rather than a promise that every position will be preserved.\n\nTake sensible steps: review practical needs, update your experience, and seek accurate information. Let a trusted person know how you are doing. Preparation and prayer can sit together. You do not have to face uncertainty alone or treat every rumor as settled fact.',
    'What information is confirmed and what is rumor?', 'What preparation would reduce avoidable difficulty?', 'Who can help me carry this uncertainty?',
    'Take one practical preparation step and speak with one trusted person about your concern.',
    'God, be my refuge when work feels uncertain. Give me clear judgment, practical support, and courage for the next step. Amen.'
  ],
  [
    'Admitting You Do Not Know', 'Proverbs 11:2',
    'The pressure to look capable can make an invented answer feel easier than an honest pause. Proverbs connects humility with wisdom. Knowing where your knowledge ends protects both your credibility and the people relying on your judgment.\n\nSay what you know, identify what needs checking, and commit to a realistic follow-up. An admission of uncertainty becomes useful when paired with a plan to learn. You can contribute thoughtfully without pretending to have expertise you have not developed.',
    'Where am I pretending to be certain?', 'Who could be affected by an unchecked answer?', 'What would a useful follow-up involve?',
    'Use the words “I do not know yet” where needed, then verify the answer through a reliable source.',
    'Lord, give me the humility to acknowledge uncertainty. Help me seek truth and become worthy of the trust others place in me. Amen.'
  ],
  [
    'Navigating Competing Loyalties', 'Acts 5:29',
    'Peter’s response to the authorities shows that obedience to God can conflict with human demands. Workplace loyalty matters, but it cannot make every instruction right. A request to deceive, exploit, or harm someone requires serious moral attention.\n\nClarify what is actually being asked and explain your concern. Seek wise counsel and use the appropriate reporting process when needed. Disagreement over preference is different from an ethical conflict; careful discernment helps you recognize the distinction and respond with courage.',
    'Is this a matter of preference or conscience?', 'What exactly am I being asked to do?', 'What wise counsel or reporting channel is available?',
    'Write down the ethical concern and seek appropriate guidance before acting on a questionable request.',
    'God, order my loyalties rightly. Help me honor others while refusing actions that betray truth or harm people. Amen.'
  ],
  [
    'Kindness in Written Messages', 'Colossians 4:6',
    'Short messages can carry more force than you intend, especially when readers cannot hear your voice. Paul’s call for gracious speech invites care about how your words land. Clarity and kindness can belong in the same sentence.\n\nState the request, include necessary context, and avoid assigning motives. If a thread becomes tense or confused, suggest a conversation. A thoughtful message can save someone from spending the rest of the day trying to interpret frustration between the lines.',
    'How might my message sound to a tired reader?', 'What context have I left out?', 'Would a conversation serve this issue better?',
    'Reread one important message for clarity, unnecessary sharpness, and assumptions about another person’s motives.',
    'Lord, season my words with grace. Help me communicate clearly and remember the person reading my message. Amen.'
  ],
  [
    'Forgiveness with Wise Boundaries', 'Ephesians 4:31–32',
    'Paul calls believers away from bitterness and toward forgiveness shaped by God’s kindness. Forgiveness can begin with releasing a desire to make another person suffer. It does not automatically restore trust or remove the need for protection and accountability.\n\nBring the hurt to God without forcing yourself to pretend it is resolved. Seek support if the harm continues. Boundaries, reporting, and changed working arrangements can coexist with a heart that is learning to let go of hatred.',
    'What bitterness do I need to bring to God?', 'What boundary is still necessary?', 'Who can support me as I process the harm?',
    'Pray honestly about one hurt and identify a boundary or support that remains necessary.',
    'Merciful God, help me release bitterness without denying harm. Guide me toward forgiveness, wise boundaries, and appropriate accountability. Amen.'
  ],
  [
    'Taking the Next Small Step', 'Zechariah 4:10',
    'Zechariah’s message concerns the rebuilding of the temple, where a small beginning could be dismissed beside past glory. It invites reflection on the ways discouragement makes us overlook modest progress. Important work often starts with something unimpressive.\n\nBreak a difficult responsibility into an action you can complete. Do not turn a small step into a guarantee of eventual success; simply receive it as today’s opportunity for faithfulness. Progress can be real before it becomes visible to everyone.',
    'What small beginning have I dismissed?', 'How could I make this task less overwhelming?', 'What action is possible today?',
    'Choose a task you have avoided, define its first small step, and complete that step.',
    'God, help me honor small beginnings. Give me patience to take the next faithful step without demanding the whole outcome today. Amen.'
  ],
  [
    'Entrusting the Outcome', 'Psalm 127:1–2',
    'This psalm challenges work driven by the belief that everything depends on your effort. Planning and diligence matter, yet anxious overwork cannot guarantee security. You can contribute responsibly without pretending to control every result.\n\nReview what you have done, communicate what remains, and stop at a sensible point. If responsibilities require coverage, arrange it rather than staying silently available forever. Entrusting the outcome to God includes accepting that your best effort still has limits.',
    'What outcome am I trying to control through extra work?', 'Have I done the responsible preparation?', 'What would a clear stopping point look like?',
    'Write a brief handover or next-step note, then end work at an agreed and realistic time.',
    'Lord, receive my work and the results beyond my control. Teach me diligent effort and restful trust. Amen.'
  ],
  [
    'Being Present to People at Home', 'Deuteronomy 6:6–7',
    'The rhythm of teaching in Deuteronomy includes ordinary moments at home and along the way. Faith is carried through daily attention, not only through special occasions. Work can consume that attention even after you have physically left it.\n\nChoose a transition that helps you become available to the people in your care. Put away a device, take a short walk, or name tomorrow’s task before closing the laptop. Presence grows through repeated choices to listen to the person actually beside you.',
    'What keeps my mind at work after I leave?', 'Who needs my attention today?', 'What transition could help me become present?',
    'Create a short end-of-work ritual and protect a period of attentive time with someone you care about.',
    'Father, help me carry faith into ordinary relationships. Teach me to give the people in my care patient and loving attention. Amen.'
  ],
  [
    'Mentoring with Patience', '2 Timothy 2:2',
    'Paul describes passing what has been learned to trustworthy people who can teach others. Knowledge becomes a gift that extends beyond its first recipient. At work, mentoring can help someone grow rather than remain dependent on your availability.\n\nExplain why a process works, invite practice, and allow room for questions. Remember what was confusing when you began. Patient teaching requires time, but it can build another person’s confidence and make the team’s knowledge less fragile.',
    'What knowledge could I pass on?', 'What was difficult when I first learned it?', 'How can I invite practice rather than only demonstrate?',
    'Teach one useful process, explain its purpose, and invite the other person to try it with support.',
    'God, make me generous with what I have learned. Give me patience to teach in ways that help others grow. Amen.'
  ],
  [
    'A Quiet Witness at Work', '1 Peter 3:15–16',
    'Peter joins readiness to explain hope with gentleness, respect, and a clear conscience. At work, your conduct shapes how your words are received. Patience under pressure and honesty when it costs something can make hope visible in ordinary life.\n\nBe willing to answer sincere questions about faith without using professional power to pressure anyone. Respect another person’s freedom and the setting of the conversation. Your responsibility is to speak honestly and kindly, leaving the response in God’s hands.',
    'How does my conduct reflect the hope I describe?', 'Can I explain my faith simply and respectfully?', 'How can I honor another person’s freedom?',
    'Prepare a brief, personal explanation of your hope, and practice listening respectfully to a different perspective.',
    'Jesus, let my conduct and words reflect your kindness. Help me share hope with gentleness, respect, and a clear conscience. Amen.'
  ],
  [
    'Continuing with Renewed Purpose', 'Galatians 6:9–10',
    'After sixty days, some challenges may remain. Paul encourages persistence in doing good while opportunities are present. Faithfulness is a continuing practice, not a certificate earned by reaching the end of a devotional plan.\n\nLook back for one change in how you speak, rest, lead, or ask for help. Thank God for that growth and choose a sustainable practice to carry forward. Perseverance can include changing an unhealthy situation while continuing to seek the good of the people involved.',
    'What has changed during these sixty days?', 'Which practice has helped me most?', 'What good can I continue in my present circumstances?',
    'Choose one practice from this theme to continue for the next month and put a reminder in your calendar.',
    'Faithful God, thank you for walking with me through work’s challenges. Help me continue doing good with wisdom, courage, and hope. Amen.'
  ],
]

export const workplaceDays = entries.map(([title, scripture, devotional, q1, q2, q3, reflection, prayer], index) => ({
  day: index + 1,
  title: `Day ${index + 1} — ${title}`,
  scripture,
  scriptureText: `Suggested reading: ${scripture}`,
  scriptureFullText: scriptureReadings[scripture],
  scriptureTranslation: 'World English Bible (WEB)',
  devotional,
  questions: [q1, q2, q3],
  reflection,
  prayer
}))
