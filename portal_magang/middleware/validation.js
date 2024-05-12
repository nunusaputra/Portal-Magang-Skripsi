const { ValidationResult, validationResult } = require('express-validator')

module.exports = {

    validator: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(404).json({
                message: errors.array() [0].msg
            })
        }
        next()
    }
}