const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    type: 'Single Feed',
    title: 'Would there be Cure to COVID-19?',
    excerpt: 'Lorem Ipsum dolor',
    description: 'This will be a really long description but short...'
  });
});

module.exports = router;
