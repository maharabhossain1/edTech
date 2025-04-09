import DOMPurify from 'dompurify';

interface FormattedTextProps {
  text: string;
}

// Utility functions
const containsArabic = (text: string) => {
  const arabicCharCount = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const totalLength = text.trim().length;

  return arabicCharCount > 0 && arabicCharCount / totalLength > 0.2;
};

const isParenthesizedTranslation = (text: string) => {
  return /^\s*\([^)]+\)\s*$/.test(text) && !containsArabic(text);
};

const addLTRFormattingToBrackets = (text: string) =>
  text.replace(/﴾(.*?)﴿/g, '\u202A﴾$1﴿\u202C');

const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  const sanitizedContent = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [
      'span',
      'br',
      'h2',
      'h3',
      'b',
      'p',
      'div',
      'strong',
      'em',
      'i',
      'u',
      'ul',
      'ol',
      'li',
      'table',
      'tr',
      'td',
      'th',
      'thead',
      'tbody',
      'img',
      'a',
      'code',
      'pre',
      'blockquote',
      'hr',
      'h1',
      'h4',
      'h5',
      'h6',
    ],
    ALLOWED_ATTR: ['class', 'alt', 'rel', 'style'],
  });

  const formattedContent = sanitizedContent.split('\n').map((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) return null;

    const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(trimmedLine);
    if (hasHtmlTags) {
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: trimmedLine }} />
      );
    }

    // Skip Arabic formatting for parenthesized translations
    if (isParenthesizedTranslation(trimmedLine)) {
      return <p key={index}>{trimmedLine}</p>;
    }

    if (containsArabic(trimmedLine)) {
      const formattedArabicText = addLTRFormattingToBrackets(trimmedLine);
      return (
        <p
          key={index}
          className="arabic-text text-2xl leading-[50px]"
          dir="rtl"
          style={{ fontFamily: `var(--font-uthman_taha)` }}
        >
          {formattedArabicText}
        </p>
      );
    }

    return <p key={index}>{trimmedLine}</p>;
  });

  return <>{formattedContent}</>;
};

export default FormattedText;
