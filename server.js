import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Explicit vendor endpoints for client-side libraries
app.use('/vendor/jspdf.min.js', express.static(join(__dirname, 'node_modules/jspdf/dist/jspdf.umd.min.js')));
app.use('/vendor/jszip.min.js', express.static(join(__dirname, 'node_modules/jszip/dist/jszip.min.js')));

// Serve static files from root
app.use(express.static(__dirname));

// Fallback
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`RedactZero server running on http://${HOST}:${PORT}`);
});
