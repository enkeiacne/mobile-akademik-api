const jwt = require("jsonwebtoken");
module.exports = {
    isLoggedin: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(400).send({
                message: "session anda telah berakhir",
            });
        }
        try {
            const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
            if (!token) {
                throw new Error('session anda telah berakhir!');
            }
            const verified = jwt.verify(token, "SECRETKEY");
            req.user = verified;
            next();
        } catch (err) {
            // throw err;
            return res.status(400).send({
                message: "session anda telah berakhir",
            });
        }
    },
}