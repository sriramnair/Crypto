const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      
      const {username, password} = req.body
      
      for (let i = 0; i < users.length; i++) {
        let existing = bcrypt.compareSync(password, users[i].pasHash)
        if (existing) {
          users[i].usernames.push(username)
          let userReturn = {...users[i]}
          delete userReturn.pasHash
          res.status(200).send(users[i])
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        const {password, username, email, firstName, lastName} = req.body
        const salt = bcrypt.genSaltSync(5)
        let pasHash = bcrypt.hashSync(password,salt)

        const newUser = {
          pasHash,
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName
        }

        users.push(newUser)
        let userReturn = {...newUser}
        delete userReturn.pasHash
        res.status(200).send(userReturn)
    }
}