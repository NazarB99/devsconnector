const express = require('express');
const router = express.Router();

router.use('/test',(req,res) => res.json({msg:'Profile Works'}));

module.exports = router;