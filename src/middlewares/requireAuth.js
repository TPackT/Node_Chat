export default (req, res, next) => {
    if (res.locals.user) {
        next()
    } else {
        res.redirect("/register")
    }
}
