exports.validateBody = (req, res, next) => {
    if(!req.body.title) 
        return res.status(400).json({ message: "'title' is required"})
    next()
}