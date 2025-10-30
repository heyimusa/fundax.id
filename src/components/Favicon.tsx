
import React, { useEffect } from 'react';
// Remove the incorrect import of ReactComponent

const Favicon = () => {
  useEffect(() => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw a circular background
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, 2 * Math.PI);
      ctx.fillStyle = '#0D9488'; // Teal color from the Fundax theme
      ctx.fill();
      
      // Add an "F" letter in the center
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('F', 16, 16);
      
      // Convert canvas to favicon - fix DOM element handling
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      
      // If the link doesn't exist, create it
      if (!link) {
        link = document.createElement('link');
        document.head.appendChild(link);
      }
      
      // Now properly set attributes on the HTMLLinkElement
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL('image/x-icon');
    }
  }, []);

  return null;
};

export default Favicon;
