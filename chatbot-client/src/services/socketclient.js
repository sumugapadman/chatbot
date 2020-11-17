export default class SocketClient {
    constructor(socket){
        this.socket = socket;
    }
    sendMessage = (type,message) =>{
        const jwt_auth_token = localStorage.getItem('jwt_auth_token');
        this.socket.emit(type, {
            token : jwt_auth_token,
            message : message
        })
    }
}