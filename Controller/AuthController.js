const jwt = require('jsonwebtoken');

exports.generateToken = (req, res) => {
    try {
        if (req.body.secure_pass === process.env.SECURE_PASS) {   
            const token = jwt.sign({ data: String(Math.random(10))}, process.env.SECRET_KEY, { expiresIn: '1hr' });   
            res.status(200).json({ token })
        } else {
            throw new Error("incorrect_secure_pass")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}


exports.verifyJWToken = (req, res, next) => {
    try {
        if (process.env.ENV==="development"){
                return next()
        }
            const responseToken = req.headers.authorization?.split(" ")[1]
            jwt.verify(responseToken, process.env.SECRET_KEY);
            next()
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: 'something wrong' })
    }
}

