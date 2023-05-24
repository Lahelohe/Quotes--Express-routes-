const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
  const randomElement = getRandomElement(quotes);
  res.send({quote: randomElement});
});

app.get('/api/quotes', (req, res) => {
  if (req.query.person) {
    const filterQuotes = quotes.filter(author => {
    return author.person === req.query.person;
  });
    res.send({ quotes: filterQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});

app.post('/api/quotes', (req, res) => {
  const quote = req.query.quote;
  const person = req.query.person;
  if (quote != '' && person != '') {
    quotes.push({
      quote: quote,
      person: person
    });
    res.send({quote: {
      quote: quote,
      person: person
    }})
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
