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

app.post('/generate-lesson-plan', async (req, res) => {
  console.log('Received request:', req.body);
  try {
    const response = await fetch('http://localhost:5000/generate-lesson-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
