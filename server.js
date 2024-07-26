import express from 'express';
import qr from 'qr-image';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/generate', (req, res) => {
  const { websiteName, URL } = req.body;
  
  if (!websiteName || !URL) {
    return res.status(400).json({ error: 'websiteName and URL are required' });
  }

  const qr_svg = qr.imageSync(URL, { type: 'png' });

  const imagePath = path.join(__dirname, 'public', 'image', `${websiteName}.png`);
  const textPath = path.join(__dirname, 'public', 'url_text', `${websiteName}.txt`);

  fs.writeFileSync(imagePath, qr_svg);
  fs.writeFileSync(textPath, URL);

  res.json({
    message: 'QR code and URL saved successfully',
    imagePath: `/image/${websiteName}.png`
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});