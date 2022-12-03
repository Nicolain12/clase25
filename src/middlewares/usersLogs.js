const fs = require('fs')
const path = require('path')
const logTextPath = path.join(__dirname, '../../logs/usersLog.txt')

function logMiddleware(req,res,next){
    fs.appendFileSync(logTextPath,'\n' + `El usuario ingrso a la ruta: ${req.url}`)
    next()
}

module.exports = logMiddleware