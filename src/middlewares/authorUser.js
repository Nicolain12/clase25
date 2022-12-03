const fs = require('fs')
const path = require('path')

function authorUser(req, res, next){
    let usersAllowed = ["Ada", "Greta", "Vim", "Tim"]
    let allowed = usersAllowed.find(element => element == req.query.user)
    if (allowed) {
        return next()
    }
    else{
        return res.send('No tienes los privilegios para ingresar')
    }
    
}
module.exports = authorUser