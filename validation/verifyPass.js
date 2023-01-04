const bcrypt = require('bcrypt');

const verifyPassword = async (input_pass,user_pass) => {
    
    const isValid = await bcrypt.compare(input_pass,user_pass);

    return isValid;
}

module.exports = verifyPassword;