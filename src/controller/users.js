const bcrypt = require('bcrypt')
const helper = require('../helper/index')
const jwt = require('jsonwebtoken')
const { postUser, checkUser } = require('../model/users')

module.exports = {
    registerUser: async (request, response) => {
        const { user_email, user_password, user_name } = request.body
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(user_password, salt)
        // console.log('user Password = ' + user_password)
        // console.log('user Password Bcrypt = ' + encryptPassword)
        // kondisi jika misalnya email sama itu tidak bisa
        const setData = {
            user_email,
            user_password: encryptPassword,
            user_name,
            user_role: 2,
            user_status: 0,
            user_created_at: new Date()
        }
        try {
            const checkEmailUser = await checkUser(user_email)
            if (checkEmailUser.length >= 1) {
                return helper.response(response, 400, "Email has been registered")
            } else if (request.body.user_email === '') {
                return helper.response(response, 400, "Email can't be empty")
            } else if (request.body.user_email.search('@') < 1) {
                return helper.response(response, 400, "Email not valid")
            } else if (request.body.user_password.length < 8 || request.body.user_password.length > 16) {
                return helper.response(response, 400, "Password must be 8 - 16 characters")
            } else if (request.body.user_name === '') {
                return helper.response(response, 400, "Username can't be empty")
            } else {
                const result = await postUser(setData)
                return helper.response(response, 200, "Register Success", result)
            }
        } catch (error) {
            console.log(error)
            // return helper.response(response, 400, "Bad Request")
        }
    },
    loginUser: async (request, response) => {
        try {
            const { user_email, user_password } = request.body
            console.log(user_email)
            const checkDataUser = await checkUser(user_email)
            if (checkDataUser.length >= 1) {
                //proses 2
                const checkPassword = bcrypt.compareSync(user_password, checkDataUser[0].user_password)
                console.log(checkPassword)
                if (checkPassword) {
                    // proses 3 = set JWT 
                    const { user_id, user_email, user_name, user_role, user_status } = checkDataUser[0]
                    let payload = {
                        user_id,
                        user_email,
                        user_name,
                        user_role,
                        user_status
                    }
                    if (payload.user_status === 0) {
                        return helper.response(response, 400, "Your account is not active. Please contact admin.")
                    } else {
                        const token = jwt.sign(payload, "RAHASIA", { expiresIn: "24h" })
                        payload = { ...payload, token }
                    }
                    return helper.response(response, 200, "Login Success", payload)
                } else {
                    return helper.response(response, 400, "Wrong Password!")
                }
            } else {
                return helper.response(response, 400, "Email / Account is not registered!")
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request")
        }
    },
}