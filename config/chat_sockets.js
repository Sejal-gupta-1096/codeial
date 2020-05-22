module.exports.chatSockets = function(chatServer){

    //Requiring socket.io for chat engine
     var socketio = require("socket.io")(chatServer);

     //Recieving request for connecting socket and acknowledging the connection
     socketio.sockets.on("connect" , function(socket){
         console.log("new connection recieved" , socket.id);

         socket.on("disconnect" , function(){
             console.log("Socket disconnected");
         })
     })

}