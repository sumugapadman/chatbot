'use strict';
let hash = require('object-hash');

exports.getHash = (payload) => {
    return hash(payload, { algorithm: 'md5' });
};