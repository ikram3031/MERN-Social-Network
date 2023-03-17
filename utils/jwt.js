const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// Create JWT & set the expired time
const createJwt = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });

    return token;
}

// CHeck if the token is valid
const isTokenValid = ({ token }) => {
    jwt.verify(token, process.env.JWT_SECRET)
}

const oneDay = 60 * 60 * 24


// Attach Cookie to response 
const attachCookiesToResponse = ({ res, user }) => {
    const token = createJwt({ payload: user });

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
}

module.exports = {
    createJwt, isTokenValid, attachCookiesToResponse
}