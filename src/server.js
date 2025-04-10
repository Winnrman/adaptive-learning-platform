import express from 'express';
import bodyParser from 'body-parser';
import romanjiTranslations from './romanjiManager.js';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/romanji', (req, res) => {
console.log('Received request:', req.body);
  const { romanji } = req.body;
  const translation = romanjiTranslations[romanji];
  if (translation) {
    res.json({ translation });
  } else {
    res.status(404).json({ error: 'Translation not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
