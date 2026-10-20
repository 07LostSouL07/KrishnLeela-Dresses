import React from 'react';

/**
 * Dynamically highlights matched substring inside text
 * Safe against regex injection and maintains original casing
 */
export function HighlightText({ text = '', query = '', className = '' }) {
  if (!text) return null;
  if (!query || !query.trim()) {
    return <span className={className}>{text}</span>;
  }

  const cleanQuery = query.trim();
  // Safe regex escaping
  const escaped = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isMatch = part.toLowerCase() === cleanQuery.toLowerCase();
        return isMatch ? (
          <mark
            key={i}
            className="highlight-text rounded-sm px-1 py-0.5"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        );
      })}
    </span>
  );
}

export default HighlightText;

