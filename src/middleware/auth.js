const jwt = require('jsonwebtoken')
const helper = require('../helper')

module.exports = {
    adminAuth: (request, response, next) => {
        let token = request.headers.authorization
        if (token) {
            token = token.split(' ')[1]
            jwt.verify(token, 'RAHASIA', (error, result) => {
                if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
                    return helper.response(response, 403, error.message)
                } else {
                    if (result.user_role === 1) {
                        request.token = result
                        next()
                    } else {
                        return helper.response(response, 400, 'You are not allowed to do that')
                    }
                }
            })
        } else {
            return helper.response(response, 400, 'Please login first')
        }
    },
    authorization: (request, response, next) => {
        let token = request.headers.authorization
        if (token) {
            token = token.split(' ')[1]
            jwt.verify(token, "RAHASIA", (error, result) => {
                if (
                    (error && error.name === "JsonWebTokenError") ||
                    (error && error.name === "TokenExpiredError")) {
                    return helper.response(response, 403, error.message)
                } else {
                    request.token = result
                    next()
                }
            })
        } else {
            return helper.response(response, 400, "Please login first!")
        }
    }
}