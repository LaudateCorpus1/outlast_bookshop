var express = require('express');
var router = express.Router();

// dummy database
let favorites = []

// route for getting all the favorites books
router.get('/favorite', (_, res) => {
  try {
    res.json({ success: true, favorites })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
});

// route for marking books as favorite
router.post('/favorite', (req, res) => {
  const { bookId } = req.body
  try {
    if (isFinite(bookId) && !isNaN(bookId)) {
      if (favorites.includes(bookId)) {
        const index = favorites.indexOf(bookId);
        if (index > -1) {
          favorites.splice(index, 1)
        }
      } else {
        favorites.push(bookId)
      }
      res.json({ success: true, favorites })
    } else {
      res.json({ success: false, message: "Missing required parameters" })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
});

module.exports = router;