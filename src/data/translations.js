// Translations available via bible-api.com (public domain, no API key needed)
// To add NIV, ESV, NLT, MSG etc — switch to api.bible (see README)

export const TRANSLATIONS = [
  { id: 'kjv',          abbr: 'KJV',   name: 'King James Version' },
  { id: 'web',          abbr: 'WEB',   name: 'World English Bible' },
  { id: 'bbe',          abbr: 'BBE',   name: 'Bible in Basic English' },
  { id: 'asv',          abbr: 'ASV',   name: 'American Standard Version' },
  { id: 'darby',        abbr: 'DARBY', name: 'Darby Bible' },
  { id: 'ylt',          abbr: 'YLT',   name: "Young's Literal Translation" },
  { id: 'douayrheims',  abbr: 'DRB',   name: 'Douay-Rheims Bible' },
  { id: 'oeb-us',       abbr: 'OEB',   name: 'Open English Bible (US)' },
  { id: 'webbe',        abbr: 'WBBE',  name: 'World English Bible (British)' },
  { id: 'clementine',   abbr: 'VCLM',  name: 'Clementine Vulgate (Latin)' },
  { id: 'almeida',      abbr: 'ALM',   name: 'Almeida (Português)' },
  { id: 'rccv',         abbr: 'RCCV',  name: 'Romanian Cornilescu' },
]

export const DEFAULT_SELECTED = ['kjv', 'esv', 'bbe', 'asv', 'darby']

export const EXAMPLE_VERSES = [
  'John 3:16',
  'Psalm 23:1-6',
  'Romans 8:28',
  'Proverbs 3:5-6',
  'Genesis 1:1',
  'Isaiah 40:31',
  'Philippians 4:13',
]
