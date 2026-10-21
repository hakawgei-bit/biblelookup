const verses = [
  { book: 'Genesis', chapter: 1, verse: 1, text: 'In the beginning God created the heavens and the earth.' },
  { book: 'Genesis', chapter: 1, verse: 3, text: 'God said, "Let there be light," and there was light.' },
  { book: 'Psalms', chapter: 23, verse: 1, text: 'The Lord is my shepherd; I shall not want.' },
  { book: 'Psalms', chapter: 27, verse: 1, text: 'The Lord is my light and my salvation; whom shall I fear?' },
  { book: 'Proverbs', chapter: 3, verse: 5, text: 'Trust in the Lord with all your heart and lean not on your own understanding.' },
  { book: 'Matthew', chapter: 5, verse: 14, text: 'You are the light of the world. A city set on a hill cannot be hidden.' },
  { book: 'John', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
  { book: 'Romans', chapter: 8, verse: 28, text: 'We know that all things work together for good for those who love God.' },
  { book: 'Philippians', chapter: 4, verse: 13, text: 'I can do all things through Christ who strengthens me.' },
  { book: '1 Corinthians', chapter: 13, verse: 4, text: 'Love is patient, love is kind. It does not envy, it does not boast.' },
  { book: 'Isaiah', chapter: 40, verse: 31, text: 'They that wait upon the Lord shall renew their strength.' },
  { book: 'Joshua', chapter: 1, verse: 9, text: 'Be strong and courageous. Do not be afraid; do not be discouraged.' },
  { book: 'Psalm', chapter: 91, verse: 1, text: 'He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.' },
  { book: 'Hebrews', chapter: 11, verse: 1, text: 'Faith is the assurance of things hoped for, the conviction of things not seen.' }
];

const verseList = document.getElementById('verseList');
const searchInput = document.getElementById('searchInput');
const bookSelect = document.getElementById('bookSelect');
const resultCount = document.getElementById('resultCount');
const randomVerseBtn = document.getElementById('randomVerseBtn');

const uniqueBooks = ['All', ...new Set(verses.map((verse) => verse.book))];

function populateBooks() {
  uniqueBooks.forEach((book) => {
    const option = document.createElement('option');
    option.value = book;
    option.textContent = book;
    bookSelect.appendChild(option);
  });
}

function filterVerses() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedBook = bookSelect.value;

  return verses.filter((verse) => {
    const matchesBook = selectedBook === 'All' || verse.book === selectedBook;
    const haystack = `${verse.book} ${verse.text}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesBook && matchesQuery;
  });
}

function renderVerses() {
  const filteredVerses = filterVerses();
  resultCount.textContent = filteredVerses.length;

  if (!filteredVerses.length) {
    verseList.innerHTML = '<div class="empty-state">No verses match your search.</div>';
    return;
  }

  verseList.innerHTML = filteredVerses
    .map(
      (verse) => `
        <article class="verse-card">
          <div class="verse-meta">
            <span>${verse.book}</span>
            <span>•</span>
            <span>Chapter ${verse.chapter}</span>
            <span>•</span>
            <span>Verse ${verse.verse}</span>
          </div>
          <h2>${verse.book} ${verse.chapter}:${verse.verse}</h2>
          <p class="verse-text">${verse.text}</p>
        </article>
      `
    )
    .join('');
}

function showRandomVerse() {
  const random = verses[Math.floor(Math.random() * verses.length)];
  searchInput.value = random.book;
  bookSelect.value = random.book;
  renderVerses();
  const targeted = verseList.querySelector('.verse-card');
  targeted.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

searchInput.addEventListener('input', renderVerses);
bookSelect.addEventListener('change', renderVerses);
randomVerseBtn.addEventListener('click', showRandomVerse);

populateBooks();
renderVerses();
