const express = require('express');
const openai = require('openai');
const cors = require('cors');

openai.apiKey = process.env.OPENAI_API_KEY;

const app = express();
app.use(cors());

app.post('/ask', async (req, res) => {
  const { prompt } = req.body;
  const response = await openai.Completion.create({
    model: 'text-davinci-002',
    prompt: prompt,
    max_tokens: 60,
  });
  res.json(response.choices[0].text.trim());
});

app.listen(3000, () => console.log('Server started on port 3000'));
