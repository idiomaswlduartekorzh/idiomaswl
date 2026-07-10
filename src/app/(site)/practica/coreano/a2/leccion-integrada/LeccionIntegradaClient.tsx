'use client';
import { useEffect } from 'react';

export default function LeccionIntegradaClient() {
  useEffect(() => {
    // Fetch and render the HTML file
    const loadHTML = async () => {
      try {
        const response = await fetch('/korean-a2-lesson.html');
        const html = await response.text();
        const container = document.getElementById('lesson-container');
        if (container) {
          container.innerHTML = html;
          // Re-execute scripts if any
          const scripts = container.querySelectorAll('script');
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
              newScript.src = script.src;
            } else {
              newScript.textContent = script.textContent;
            }
            container.appendChild(newScript);
          });
        }
      } catch (error) {
        console.error('Error loading lesson:', error);
      }
    };
    
    loadHTML();
  }, []);

  return (
    <div
      id="lesson-container"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'block',
      }}
    />
  );
}
