import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { useLogger } from './LoggerContext';
import { generateShortcode } from './helpers';
import ShortLinksTable from './ShortLinksTable';

const ShortenPage = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const { log } = useLogger();
  const [shortLinks, setShortLinks] = useState(() => JSON.parse(localStorage.getItem('shortLinks') || '[]'));

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAdd = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
  };

  const handleSubmit = () => {
    const existing = shortLinks.map(link => link.shortcode);
    const newLinks = urls.map(({ longUrl, validity, shortcode }) => {
      if (!/^https?:\/\//.test(longUrl)) {
        log('Invalid URL entered');
        return null;
      }
      let code = shortcode || generateShortcode(existing);
      while (existing.includes(code)) {
        code = generateShortcode(existing);
      }
      const now = new Date();
      const validMinutes = validity ? parseInt(validity, 10) : 30;
      const expiry = new Date(now.getTime() + validMinutes * 60000);
      const newLink = {
        longUrl, shortcode: code, createdAt: now.toISOString(), expiry: expiry.toISOString(), clicks: []
      };
      log(`Shortened URL created: ${code}`);
      existing.push(code);
      return newLink;
    }).filter(Boolean);

    const updated = [...shortLinks, ...newLinks];
    setShortLinks(updated);
    localStorage.setItem('shortLinks', JSON.stringify(updated));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Shorten URLs</Typography>
      {urls.map((u, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={12} md={5}>
            <TextField fullWidth label="Long URL" value={u.longUrl}
              onChange={e => handleChange(i, 'longUrl', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Validity (minutes)" type="number" value={u.validity}
              onChange={e => handleChange(i, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Custom Shortcode" value={u.shortcode}
              onChange={e => handleChange(i, 'shortcode', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button onClick={handleAdd} variant="outlined" sx={{ mr: 2 }}>Add URL</Button>
      <Button onClick={handleSubmit} variant="contained">Shorten</Button>
      <ShortLinksTable links={shortLinks} />
    </Paper>
  );
};

export default ShortenPage;