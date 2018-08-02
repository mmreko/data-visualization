'use strict'
const status = require('http-status')

module.exports = (app, options) => {
	
	const {repo} = options
	
	// GET /visualization/all
	app.get('/visualization/all', (req, res, next) => {
		repo.visualizeAll().then(data => {
			res.status(status.OK).json(data)
		}).catch(next)
	})
	
}