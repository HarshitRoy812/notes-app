const jwt = require('jsonwebtoken');
const path = require('path');

const auth = async (req,res,next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).redirect('/');
    }

    const token = authHeader.split(' ')[1];

    try {
        const token_info = jwt.verify(token,process.env.SECRET_KEY);

        const {userId,name} = token_info;

        req.user = {userId,name}
        next()

    } catch (err){ 
        res.status(401).json({msg : 'Unauthorized access'});
    }

}

module.exports = auth;