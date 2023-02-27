const router = require('express').Router()
const Character = require('../models/Character.model')
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get('/', async (req, res, next) => {
	try {
		const allCharacters = await Character.find()
		res.status(200).json(allCharacters)
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post('/', async (req, res, next) => {
	try {
		const { name, occupation, cartoon, weapon } = req.body
		console.log(req.body)
		if (!name || !occupation || !cartoon || !weapon) {
			return res.json({ message: `Please fill out all fields` })
		}

		const creeatedChar = await Character.create({ name, occupation, cartoon, weapon })
		res.status(200).json(creeatedChar)
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should respond with one character
 */
router.get('/:id', async (req, res, next) => {
	try {
		const foundCharacter = await Character.findById(req.params.id)
		res.status(200).json(foundCharacter)
	} catch (error) {
		next(error)
	}
})

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch('/:id', async (req, res, next) => {
	try {
		const { name, occupation, cartoon, weapon } = req.body
		const foundCharacter = await Character.findById(req.params.id)
		if (foundCharacter) {
			const updatedChar = await Character.findByIdAndUpdate(req.params.id, { name, occupation, cartoon, weapon }, { new: true })
			res.json(updatedChar)
		} else { res.json({ message: `Character not found` }) }
	} catch (error) {
		next(error)
	}
})

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete('/:id', async (req, res, next) => {
	try {
		const foundCharacter = await Character.findById(req.params.id)
		if (foundCharacter) {
			const deletedCharacter = await Character.findByIdAndDelete(req.params.id)
			res.json({ message: `${deletedCharacter} has been successfully deleted` })
		} else { res.json({ message: `Character not found` }) }
	} catch (error) {
		next(error)
	}
})

module.exports = router
