"use client";

const Word = ({ word }) => {
  const showByWords = true;
  const arabicFont = "kfgqpc_hafs";
  const arabicFontSize = 28;

  return (
    <div className="inline-block text-center align-middle hover:bg-neutral-100 rounded-lg cursor-pointer">
      <div className={`text-3xl ${showByWords ? "px-1 md:px-3 py-1" : "px-0"}`}>
        <p
          style={{
            fontFamily: `var(--font-${arabicFont})`,
            fontSize: `${arabicFontSize}px`,
            lineHeight: "1.6em",
          }}
        >
          {word.text_uthmani}
        </p>
        {showByWords && word.translation && (
          <p
            dir="ltr"
            className="text-neutral-700 text-xs font-plus_jakarta_sans"
          >
            {word.translation.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Word;
