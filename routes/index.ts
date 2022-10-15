const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');
const userRoute = require("./user.ts");

router.use('/user', authorization, userRoute);

module.exports = router;
