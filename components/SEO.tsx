import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  favicon?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, favicon }) => {
  useEffect(() => {
    // Update Title
    if (title) {
      document.title = title;
    }

    // Update Meta Tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) {
      updateMeta('description', description);
      // Open Graph
      let ogDesc = document.querySelector(`meta[property="og:description"]`);
      if (ogDesc) ogDesc.setAttribute('content', description);
    }

    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // Update Favicon
    if (favicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = favicon;
    }

  }, [title, description, keywords, favicon]);

  return null;
};