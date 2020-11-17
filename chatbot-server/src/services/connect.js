'use strict';
const mongoose = require('mongoose');

class dbConnection {

    connect(connectionURL) {
        mongoose.connect(connectionURL,{ 
            useNewUrlParser : true,
            useFindAndModify: false 
        })
        .then(() => console.log('Connected to DB'))
        .catch( err => console.log(err) );
    }

}

module.exports = new dbConnection();