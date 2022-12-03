const path = require('path')
const fs = require('fs');
const bcrypt = require('bcryptjs')


const usersDirname = path.join(__dirname, '../dataBase/users.json')
const usersDB = JSON.parse(fs.readFileSync(usersDirname, 'utf-8'));


const mainController = {
    index: (req, res) => {
        res.render('index')
    },
    adminAutho: (req, res) => {
        res.send(`Hola Admin: ${req.query.user}`)
    },
    register: (req, res) => {
        res.render('register')
    },
    registerSubmit: (req, res) => {
        let newUser = {
            id: usersDB.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            color: req.body.color
        }
        
        if(req.body.password != req.body.passwordConfirm){
            return res.render('register', {
                errors:{
                    passwordConfirm:{
                        msg: 'Las contraseñas deben ser iguales'
                    }
                }
            })
        }

        let userInDb = usersDB.find(element => element.email == req.body.email)
        if (userInDb){
            return res.render('register', {
                errors:{
                    email:{
                        msg: 'El Email ya se encuentra registrado'
                    }
                }
            })
        }else{
            usersDB.push(newUser)
            fs.writeFileSync(usersDirname, JSON.stringify(usersDB))
            return res.redirect('/login')
        }
        

   


    },
    login: (req, res) => {
        res.render('login')
    },
    loginSubmit: (req, res) => {
        let userToLogin = usersDB.find(element => element.email == req.body.email)

        if (userToLogin){
            if (bcrypt.compareSync(req.body.password, userToLogin.password)){
                console.log(userToLogin)
                console.log(req.session)
                // return res.redirect('/')
            }
        }else{
            res.render('login',{
                errors:{
                    email:{
                        msg: 'Los datos son invalidos'
                    }
                }
            } )
        }
    }
}

module.exports = mainController