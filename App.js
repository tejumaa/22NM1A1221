import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ShortenPage from './ShortenPage';
import StatsPage from './StatsPage';
import RedirectHandler from './RedirectHandler';
import { LoggerProvider } from './LoggerContext';

function App() {
  return (
    <LoggerProvider>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              React URL Shortener
            </Typography>
            <Button color="inherit" component={Link} to="/">Shorten</Button>
            <Button color="inherit" component={Link} to="/stats">Stats</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<ShortenPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/:shortcode" element={<RedirectHandler />} />
          </Routes>
        </Container>
      </Router>
    </LoggerProvider>
  );
}

export default App;