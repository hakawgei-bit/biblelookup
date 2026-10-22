import gzip
import json
import re
import zipfile
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
ARCHIVE = ROOT / "kj_new.zip"
OUTPUT = ROOT / "bible-en.json.gz"
CHAPTER_COUNTS = tuple(
    map(
        int,
        "50 40 27 36 34 24 21 4 31 24 22 25 29 36 10 13 10 42 150 31 12 8 "
        "66 52 5 48 12 14 3 9 1 4 7 3 3 3 2 14 4 28 16 24 21 28 16 16 13 6 "
        "6 4 4 5 3 6 4 3 1 13 5 5 3 5 1 1 1 22".split(),
    )
)
CHAPTER_PATH = re.compile(r"kj_new/(\d{2})/(\d+)\.htm\Z")


class VerseParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_text_body = False
        self.div_depth = 0
        self.current_verse = None
        self.skip_verse_number = False
        self.verses = {}

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "div" and "textBody" in attributes.get("class", "").split():
            self.in_text_body = True
            self.div_depth = 1
            return
        if not self.in_text_body:
            return
        if tag == "div":
            self.div_depth += 1
        if tag == "span" and "verse" in attributes.get("class", "").split():
            verse_id = attributes.get("id", "")
            if not verse_id.isdigit():
                raise ValueError(f"Invalid verse id: {verse_id!r}")
            self.current_verse = int(verse_id)
            self.verses[self.current_verse] = []
            self.skip_verse_number = True

    def handle_endtag(self, tag):
        if not self.in_text_body:
            return
        if tag == "span" and self.skip_verse_number:
            self.skip_verse_number = False
        if tag == "div":
            self.div_depth -= 1
            if self.div_depth == 0:
                self.in_text_body = False

    def handle_data(self, data):
        if self.in_text_body and self.current_verse and not self.skip_verse_number:
            self.verses[self.current_verse].append(data)

    def chapter(self):
        verse_ids = sorted(self.verses)
        if not verse_ids or verse_ids != list(range(1, len(verse_ids) + 1)):
            raise ValueError("Chapter verses are missing or out of order")
        verses = [
            re.sub(r"\s+", " ", "".join(self.verses[verse_id])).strip()
            for verse_id in verse_ids
        ]
        if any(not verse for verse in verses):
            raise ValueError("Chapter contains an empty verse")
        return verses


def decode_page(data):
    try:
        return data.decode("utf-8")
    except UnicodeDecodeError:
        return data.decode("cp1252")


def main():
    if not ARCHIVE.is_file():
        raise FileNotFoundError(f"Place the English archive at {ARCHIVE}")

    chapters = {}
    with zipfile.ZipFile(ARCHIVE) as archive:
        for name in archive.namelist():
            match = CHAPTER_PATH.fullmatch(name)
            if not match:
                continue
            book_id, chapter_id = map(int, match.groups())
            parser = VerseParser()
            parser.feed(decode_page(archive.read(name)))
            chapters.setdefault(book_id, {})[chapter_id] = parser.chapter()

    if sorted(chapters) != list(range(1, len(CHAPTER_COUNTS) + 1)):
        raise ValueError("Archive must contain all 66 Bible books")

    books = []
    for book_id, expected_count in enumerate(CHAPTER_COUNTS, start=1):
        book_chapters = chapters[book_id]
        if sorted(book_chapters) != list(range(1, expected_count + 1)):
            raise ValueError(f"Book {book_id} has missing or unexpected chapters")
        books.append([book_chapters[n] for n in range(1, expected_count + 1)])

    payload = json.dumps(books, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    compressed = gzip.compress(payload, mtime=0)
    OUTPUT.write_bytes(compressed)
    print(
        f"Imported {sum(map(len, books))} chapters and "
        f"{sum(len(chapter) for book in books for chapter in book)} verses "
        f"to {OUTPUT.name} ({len(compressed):,} bytes)."
    )


if __name__ == "__main__":
    main()
