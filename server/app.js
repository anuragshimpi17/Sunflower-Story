/**
 * Sunflower Scrollytelling — Express Server
 * Serves static files from /public directory
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, '..', 'public'), {
  // Enable aggressive caching for assets
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// Fallback to index.html for SPA-like behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌻 Sunflower Scrollytelling server running at http://localhost:${PORT}`);
});
