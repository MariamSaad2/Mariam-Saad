/* ============================================================
   data.js — Portfolio Data Layer
   All editable content lives here. Reads/writes localStorage.
   ============================================================ */

const STORAGE_KEY = 'mariam_portfolio_data';

const DEFAULT_DATA = {
  meta: {
    pageTitle: 'Mariam Saad — Social Media Specialist',
    navLogo: 'MS.'
  },
  hero: {
    badgeText: 'Available for projects',
    titleLine1: 'Social Media',
    titleLine2: 'Specialist',
    subtitle: 'Helping brands grow through strategic content, creative reels, and marketing campaigns that attract customers and increase engagement.',
    description: 'I help restaurants, cafés, retail stores, and lifestyle brands build a strong social media presence through engaging content and smart marketing strategies.',
    btn1Text: 'View My Work',
    btn2Text: 'Contact Me',
    badge1Num: '120K+',
    badge1Label: 'Reels Views',
    badge2Num: '40%',
    badge2Label: 'Engagement ↑'
  },
  stats: [
    { num: '40%',  label: 'Engagement Increase' },
    { num: '120K+', label: 'Reels Views' },
    { num: '10+',  label: 'Brands Managed' },
    { num: '4',    label: 'Industries Served' }
  ],
  brands: {
    sectionLabel: 'Brands & Industries',
    heading: 'Trusted by Great Brands',
    description: 'Experience working with brands across different industries including malls, restaurants, cafés, and retail businesses.'
  },
  about: {
    sectionLabel: 'About Me',
    heading: 'The person behind<br>the strategy',
    paragraphs: [
      "I'm Mariam Saad, a Social Media Specialist with hands-on experience managing and growing social media accounts for restaurants, cafés, retail stores, and malls.",
      "I focus on creating strategic and engaging content that helps brands attract customers, increase visibility, and build a strong online presence.",
      "My approach combines creativity with marketing strategy to turn social media platforms into powerful tools for business growth."
    ],
    tags: ['Content Strategy', 'Social Media Management', 'Reels', 'Marketing Campaigns', 'Brand Growth'],
    infoName: 'Mariam Saad',
    infoRole: 'Social Media Specialist',
    infoItems: [
      { icon: '📍', text: 'Egypt' },
      { icon: '💼', text: '2+ Years Experience' },
      { icon: '🌐', text: 'Arabic & English Content' }
    ]
  },
  services: {
    sectionLabel: 'Services',
    heading: 'What I Offer',
    items: [
      { icon: '📱', title: 'Social Media Management', description: 'Managing social media accounts through strategic planning, consistent posting, audience engagement, and performance tracking.' },
      { icon: '🎯', title: 'Content Strategy',         description: "Developing monthly content plans tailored to the brand's goals, target audience, and marketing objectives." },
      { icon: '🎬', title: 'Reels & Short-Form Content', description: 'Creating engaging reels ideas designed to increase reach, visibility, and audience interaction.' },
      { icon: '📣', title: 'Marketing Campaigns',       description: 'Planning and executing promotional campaigns for events, product launches, and seasonal offers.' }
    ]
  },
  process: {
    sectionLabel: 'Process',
    heading: 'How I Work',
    steps: [
      { num: '1', title: 'Brand Research',      desc: 'Understanding the brand, target audience, and competitors.' },
      { num: '2', title: 'Content Strategy',    desc: 'Creating a clear content strategy aligned with business goals.' },
      { num: '3', title: 'Content Creation',    desc: 'Developing engaging posts, reels, and marketing campaigns.' },
      { num: '4', title: 'Performance Analysis',desc: 'Tracking results and improving content performance.' }
    ]
  },
  work: {
    sectionLabel: 'Selected Work',
    heading: 'Case Studies',
    items: [
      {
        category: 'Mall · Retail',
        title: 'West Arena Mall',
        challenge: 'The mall needed stronger social media engagement and more visibility for events, promotions, and store activities.',
        results: [
          'Increased engagement on posts and reels',
          'Higher reach through short-form video',
          'Improved brand visibility on social media',
          'Stronger audience interaction'
        ]
      },
      {
        category: 'Food & Beverage',
        title: 'Restaurant Social Media Growth',
        challenge: 'The restaurant wanted to attract more customers and increase visibility through engaging food content.',
        results: [
          'Increased engagement on food posts',
          'Higher reach through reels content',
          'Improved brand presence on Instagram'
        ]
      },
      {
        category: 'Lifestyle · Café',
        title: 'Café Social Media Strategy',
        challenge: 'The café needed a stronger online presence and more engaging content to attract customers.',
        results: [
          'Increased engagement on reels',
          'Stronger brand identity on social media',
          'Improved reach and visibility'
        ]
      }
    ]
  },
  results: {
    sectionLabel: 'Results & Impact',
    heading: 'Measurable Growth',
    items: [
      { icon: '📈', num: '40%',  text: 'Increase in engagement through strategic content planning' },
      { icon: '🎬', num: '120K+', text: 'Views generated on reels and short-form video content' },
      { icon: '🌐', num: '↑',   text: 'Improved brand visibility across social media platforms' },
      { icon: '🎯', num: '✓',   text: 'Successful promotional campaigns for events and offers' }
    ]
  },
  testimonial: {
    quote: 'Mariam helped us create engaging content and improve our social media presence. Her strategic approach made a real difference in how our brand connects with customers online.',
    author: '— West Arena Mall'
  },
  contact: {
    sectionLabel: 'Contact',
    heading: "Let's Work Together",
    description: "If you're looking to grow your brand through strategic social media marketing, feel free to get in touch.",
    email: 'mariamsssd75@gmail.com',
    whatsapp: [
      { number: '201289389948', display: '01289389948' },
      { number: '201029234450', display: '01029234450' }
    ]
  },
  footer: {
    name: 'Mariam Saad',
    copy: '© 2025 · Social Media Specialist'
  },
  workModal: {
    title: 'West Arena Mall',
    description: 'Managed social media content for the mall including event coverage, promotional campaigns, and engaging posts designed to increase brand visibility and audience interaction.',
    challenge: 'The mall needed stronger social media engagement and more visibility for events, promotions, and store activities.',
    strategyItems: ['Event coverage', 'Promotional campaigns', 'Interactive posts', 'Reels showcasing mall experience'],
    contentItems: ['Reels highlighting events', 'Promotional posts for stores', 'Carousel posts for activities', 'Interactive engagement posts'],
    resultsItems: ['Increased engagement on posts', 'Higher reach through video', 'Improved brand visibility', 'Stronger audience interaction'],
    contentTypes: ['Post designs', 'Carousel posts', 'Reels', 'Campaign visuals', 'Event coverage']
  }
};

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const parsed = JSON.parse(stored);
    // Deep merge: stored overrides defaults
    return deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), parsed);
  } catch (e) {
    console.warn('Portfolio: Could not load data from localStorage, using defaults.', e);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Portfolio: Could not save data to localStorage.', e);
    return false;
  }
}

function resetData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

function deepMerge(target, source) {
  if (typeof source !== 'object' || source === null) return source;
  if (Array.isArray(source)) return source;
  const result = Object.assign({}, target);
  for (const key of Object.keys(source)) {
    if (key in target && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
