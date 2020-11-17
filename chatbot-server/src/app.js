'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const chatbotDb = require('./services/connect');
const app = express();
const cors = require('cors');
const port = process.env.PORT || process.env.APP_SERVER_PORT;
const connectionURL = process.env.DATABASEURL;
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const actionRoutes = require('./routes/action');
const SocketService = require('./services/socket');

class chatbotServer{
    constructor() {
        this.initCors();
        this.initExpress();
        this.initRoutes();
        this.initServer();
        this.initDB();
    }

    initDB(){
        chatbotDb.connect(connectionURL);
    }

    initCors(){
        let whitelisted_domains = {
            origin : process.env.CLIENT_HOST_URL
        };
        // whitelisting the client domain.
        app.use(cors(whitelisted_domains));
        // enabling pre-flight cors
        app.options('*', cors(whitelisted_domains));
    }

    initExpress(){
        app.use(bodyParser.json());
        app.use((req,res,next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    initRoutes(){

        app.get('/', function (req, res) {
            
            let available_routes = { 
                'new session' : { 'uri' : '/v1/jwt_auth/new_session'},
                'validate session' : { 'uri' : '/v1/jwt_auth/verify_session'},
                'user engagement' : { 'uri' : '/v1/dashboard/user_engagement'},
                'drop offs' : { 'uri' : '/v1/dashboard/drop_offs'},
                'completed users' : { 'uri' : '/v1/dashboard/completed_users'}
            }
            res.status(201).json(available_routes);
        });

        app.use('/v1/jwt_auth',authRoutes);
        app.use('/v1/dashboard',dashboardRoutes);
        app.use('/v1/action',actionRoutes);

    }

    initServer(){
        const server = app.listen(port, () => {
            console.log('Server Running');
            // initialize socket 
            new SocketService(server);
        });
    }
    
}

new chatbotServer();