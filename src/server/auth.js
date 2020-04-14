const jsonWebToken = require("jsonwebtoken");
const config = require("../config");

exports.auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            error: "Unauthorized: no token provided"
        });
    }
    else {
        jsonWebToken.verify(token, config.secretKey, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    error: "Unauthorized: invalid token"
                });
            }
            else {
                req.login = decoded.login;
                req.isAdmin = decoded.isAdmin;
                next();
            }
        });
    }
}