
import express from 'express';
const router = express.Router();
const event = require('../../oauthData')

/* GET home page. */
router.get('/', async (req, response) => {

	event.emit('oauth', req)

	return response.sendStatus(200);
});


export default router;
