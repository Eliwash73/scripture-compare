// Translations available via Bolls Bible API (https://bolls.life/)
// Free, no API key needed. Includes modern and classic translations.

export const TRANSLATIONS = [
  // Modern English Translations
  { id: 'ESV',          abbr: 'ESV',   name: 'English Standard Version' },
  { id: 'NLT',          abbr: 'NLT',   name: 'New Living Translation' },
  { id: 'NIV',          abbr: 'NIV',   name: 'New International Version' },
  { id: 'MSG',          abbr: 'MSG',   name: 'The Message' },
  { id: 'NKJV',         abbr: 'NKJV',  name: 'New King James Version' },
  
  // Classic Translations
  { id: 'KJV',          abbr: 'KJV',   name: 'King James Version' },
  { id: 'NASB',         abbr: 'NASB',  name: 'New American Standard Bible' },
  { id: 'NRSV',         abbr: 'NRSV',  name: 'New Revised Standard Version' },
  { id: 'ASV',          abbr: 'ASV',   name: 'American Standard Version' },
  { id: 'YLT',          abbr: 'YLT',   name: "Young's Literal Translation" },
  
  // Other Translations
  { id: 'WEB',          abbr: 'WEB',   name: 'World English Bible' },
  { id: 'AKJV',         abbr: 'AKJV',  name: 'Authorized King James Version' },
  { id: 'DARBY',        abbr: 'DARBY', name: 'Darby Bible' },
]

export const DEFAULT_SELECTED = ['NIV', 'KJV', 'ESV', 'NLT', 'NASB']

export const EXAMPLE_VERSES = [
  'John 3:16',
  'Psalm 23:1-6',
  'Matthew 22:37-40',
  'Proverbs 3:5-6',
  'Genesis 1:1',
  'Isaiah 43:18',
  'Psalms 73:26',
]
