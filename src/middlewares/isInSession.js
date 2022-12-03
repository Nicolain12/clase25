function isInSession (req, res, next) {
    res.locals.isLogged = false
    
    if (req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
        console.log('USER LOGGED');
    }

    next()
    
}
module.exports = isInSession