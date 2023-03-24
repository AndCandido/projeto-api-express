exports.validateBody = (req, res, next) => {
    if(!req.body.title) return res.status(404)
    next()
}