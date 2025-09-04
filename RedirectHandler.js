import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLogger } from './LoggerContext';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const { log } = useLogger();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shortLinks') || '[]');
    const link = stored.find(l => l.shortcode === shortcode);
    if (!link) {
      log(`Shortcode not found: ${shortcode}`);
      navigate('/');
      return;
    }
    if (new Date(link.expiry) < new Date()) {
      log(`Shortcode expired: ${shortcode}`);
      navigate('/');
      return;
    }
    link.clicks.push({
      timestamp: new Date().toISOString(),
      source: document.referrer || 'direct',
      location: navigator.language || 'unknown'
    });
    localStorage.setItem('shortLinks', JSON.stringify(stored));
    window.location.href = link.longUrl;
  }, [shortcode, navigate, log]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;