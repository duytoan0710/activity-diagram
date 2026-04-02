import React, { useEffect, useRef, useId } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e0f2fe',
    primaryTextColor: '#0f172a',
    primaryBorderColor: '#0284c7',
    lineColor: '#64748b',
    secondaryColor: '#fef3c7',
    tertiaryColor: '#fce7f3'
  },
  securityLevel: 'loose',
});

export const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = `mermaid-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (ref.current) {
      mermaid.render(id, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error);
        if (ref.current) {
          ref.current.innerHTML = `<div class="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm font-mono overflow-auto whitespace-pre-wrap">${error.message || 'Error rendering diagram'}</div>`;
        }
      });
    }
  }, [chart, id]);

  return <div ref={ref} className="flex justify-center w-full overflow-x-auto py-4" />;
};
