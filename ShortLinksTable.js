import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ShortLinksTable = ({ links }) => {
  if (!links.length) return <Typography>No shortened URLs yet.</Typography>;

  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6">Shortened URLs</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shortcode</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Expiry</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((l, idx) => (
            <TableRow key={idx}>
              <TableCell><Link to={`/${l.shortcode}`}>{l.shortcode}</Link></TableCell>
              <TableCell>{l.longUrl}</TableCell>
              <TableCell>{new Date(l.expiry).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ShortLinksTable;