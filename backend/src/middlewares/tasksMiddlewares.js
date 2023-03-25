const validateBody = (body, key) => {
    const errors = []
    if(body[key] === undefined)
        errors.push(`The field "${key}" is required`)
    if(body[key] === '')
        errors.push(`"${key}" cannot be empty`)

    return errors
}

exports.validateFieldTitle = (req, res, next) => {
    const validatedBody = validateBody(req.body, 'title')
    req.flash('errors', ...validatedBody)
    next()
}

exports.validateFieldStatus = (req, res, next) => {
    const validatedBody = validateBody(req.body, 'status')
    req.flash('errors', ...validatedBody)
    next()
}