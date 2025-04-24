import { useEffect } from 'react';

export function useNumberHighlighter(enabled: boolean, onNumberClick: (number: string) => void) {
  useEffect(() => {
    if (!enabled) return;

    const phoneRegex = /(\+?1?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/g;

    const highlightNumbers = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );

      let node;
      while ((node = walker.nextNode())) {
        const text = node.textContent || '';
        if (phoneRegex.test(text)) {
          const span = document.createElement('span');
          span.innerHTML = text.replace(phoneRegex, '<a href="#" class="text-blue-600 hover:text-blue-800">$1</a>');
          span.addEventListener('click', (e) => {
            if (e.target instanceof HTMLAnchorElement) {
              e.preventDefault();
              onNumberClick(e.target.textContent || '');
            }
          });
          node.parentNode?.replaceChild(span, node);
        }
      }
    };

    highlightNumbers();

    return () => {
      // Cleanup highlighted numbers
    };
  }, [enabled, onNumberClick]);
}