'use strict';
const jwt  = require('jsonwebtoken');
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

class jwtAuth {

    constructor(){}

    setOptions(i,s,a){
        this.options = {
            issuer:  i,
            subject:  s,
            audience:  a,
            expiresIn:  "2h",
        }
    }

    generateToken(payload){
        this.options.algorithm = "RS256";
        return jwt.sign(payload, PRIVATE_KEY, this.options);
    }

    verifyToken(token){
        this.options.algorithm = ["RS256"];
        return jwt.verify(token, PUBLIC_KEY, this.options);
    }

    decode(token){
        return jwt.decode(token, {complete: true});
    }
}

module.exports = jwtAuth;