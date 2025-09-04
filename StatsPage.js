import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material';

const StatsPage = () => {
  const links = JSON.parse(localStorage.getItem('shortLinks') || '[]');

  if (!links.length) return <Typography>No statistics available.</Typography>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Statistics</Typography>
      {links.map((l, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{l.shortcode}</Typography>
          <p><strong>Original:</strong> {l.longUrl}</p>
          <p><strong>Created:</strong> {new Date(l.createdAt).toLocaleString()}</p>
          <p><strong>Expires:</strong> {new Date(l.expiry).toLocaleString()}</p>
          <p><strong>Total Clicks:</strong> {l.clicks.length}</p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {l.clicks.map((c, i) => (
                <TableRow key={i}>
                  <TableCell>{new Date(c.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{c.source}</TableCell>
                  <TableCell>{c.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ))}
    </Paper>
  );
};

export default StatsPage;