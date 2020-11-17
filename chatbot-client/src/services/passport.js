const axios = require('axios');
const config = require('../config/config.json');

export default class Passport {

    static validateSession = async (jwt_token) => {
        try {
            const base_url = process.env.REACT_APP_API_URL || config.host+':'+config.app_server_port;
            let endpoint = base_url+'/v1/jwt_auth/verify_session';
            const response = await axios.post(endpoint,{
                token : jwt_token
            });
            return response;
        }catch(error){
            return error;
        }
    }

    static generatenewToken = async () => {
        try{
            const base_url = process.env.REACT_APP_API_URL || config.host+':'+config.app_server_port;
            let endpoint = base_url+'/v1/jwt_auth/new_session';
            const response = await axios.get(endpoint,{
                params: {
                    timezone : Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            });
            return response;

        }catch(error){
            return error;
        }
    }

}