// First steps for Jake's days off — nudge to get out of the house in the first 4–5 hours.
// Jake: ops coordinator @ Pixel Factory; into clothes, ecommerce, AI, marketing,
// meeting people, creative/entrepreneurial vibes. Mix of that + life (check-ins, exercise).

export const FIRST_STEPS = [
  // Get out / move
  'Go for a 20 min walk before 11am',
  'Leave the house once before 10 — even just a coffee run',
  'Pick a new café and work or read there for an hour',
  'Run or gym before noon to lock in the rest of the day',
  '15 min stretch or yoga, then step outside for 5 min',
  'Walk to a shop you’ve never been to and browse',
  'Do one errand outside before 11am',
  'Cycle or walk to a different suburb and back',
  'Get coffee or breakfast somewhere you haven’t been this month',
  'Spend 30 min outside (park, street, balcony) before lunch',
  // Clothes / retail / ecommerce
  'Visit one op shop or clothes store and try one thing on',
  'Scroll one brand you like and note 3 things you’d actually wear',
  'Post one fit or product shot (phone is fine)',
  'Check one competitor’s new drop or campaign',
  'Sketch or note one product or range idea',
  'Walk through one retail strip and notice what’s selling',
  'DM one brand or creator you admire (no pressure, just say hi)',
  'Organise one rail or drawer so you can see what you’ve got',
  'List one item to sell or donate',
  'Watch one short video on styling or trends and try one idea',
  // Ecommerce / ops / entrepreneurial
  'Open one tool (Notion, spreadsheet, etc.) and clear or plan one thing',
  'Write down one process that’s been messy at work or side project',
  'Reply to one email or DM you’ve been sitting on',
  'Spend 20 min on one side idea (idea doc, landing page, list)',
  'Listen to one ops or ecommerce podcast episode',
  'Note 3 things that went well this week and one to improve',
  'Block 30 min later to do the one task you keep avoiding',
  'Message one person in your industry to catch up or ask one question',
  'Research one thing (supplier, tool, trend) for 15 min',
  'Write one “if I had time I’d…” and pick the smallest first step',
  // AI / marketing / creative
  'Try one AI tool for something you do often (writing, images, scheduling)',
  'Draft one post or caption — doesn’t have to go live',
  'Consume one piece of content (article, video) and note one takeaway',
  'Spend 20 min on a small creative thing (moodboard, copy, idea)',
  'Comment or reply to one person whose work you like',
  'Outline one idea for a campaign, shoot, or collab',
  'Use AI to brainstorm 5 headlines or hooks for something you’re working on',
  'Share one thing you’re working on with a friend or in a group',
  'Sketch or write one “what if” for a project',
  'Watch one case study or breakdown and write down one tactic',
  // People / connection
  'Text one friend you haven’t talked to in a while',
  'Call one family member or close friend',
  'Message someone you’ve been meaning to catch up with and suggest a time',
  'Reply to one person who’s reached out recently',
  'Say yes to one invite or suggest one plan for the next 2 weeks',
  'DM or email one person you’d like to work with or learn from',
  'Check in on one person who’s had a big week (work or life)',
  'Leave one genuine comment on someone’s post or work',
  'Introduce two people who should know each other',
  'Plan one coffee or call with someone you’ve been putting off',
  // Life / balance
  'Cook one proper meal (not takeaway)',
  'Do one household task you’ve been avoiding (one surface, one load)',
  'Read one chapter or 10 pages of something non-work',
  'Unplug for 1 hour — no phone, no laptop',
  'Write down 3 things you want to do this month',
  'Plan one thing to look forward to next week',
  'Listen to one album or podcast start to finish',
  'Watch one film you’ve never seen',
  'Sleep or rest without guilt for one block',
  'Write one sentence about how you want the rest of the day to feel',
];

export function getRandomFirstStep(exclude) {
  const options = exclude
    ? FIRST_STEPS.filter((s) => !exclude.includes(s))
    : [...FIRST_STEPS];
  return options[Math.floor(Math.random() * options.length)];
}
