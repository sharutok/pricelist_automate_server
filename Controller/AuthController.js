const jwt = require('jsonwebtoken');

exports.generateToken = (req, res) => {
    try {
        const token = jwt.sign({ data: String(Math.random(10)) }, process.env.SECRET_KEY, { expiresIn: '1h' });   
        res.status(200).json({ token })
    }
    catch (error) {
        console.log(error);
    }
}


exports.verifyJWToken = (req, res, next) => {
    try {
        // console.log(req.headers.authorization?.split(" ")[1]);
        const responseToken = req.headers.authorization?.split(" ")[1]
        const decode = jwt.verify(responseToken, process.env.SECRET_KEY);
        console.log(decode);
        next()
        
    } catch (error) {
        console.log(error);
        res.json({ error: 'something wrong' })
    }
}

