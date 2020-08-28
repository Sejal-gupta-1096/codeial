module.exports.chatSockets = function(chatServer){

    //Requiring socket.io for chat engine
     var socketio = require("socket.io")(chatServer);

     //Recieving request for connecting socket and acknowledging the connection
     socketio.sockets.on("connection" , function(socket){
         console.log("new connection recieved" , socket.id);

         socket.on("disconnect" , function(){
             console.log("Socket disconnected");
         })

         //Receiving request for joining
         socket.on("join_room" , function(data){
             console.log("Joining request received" , data);

             //Joined the user to the chat room
             socket.join(data.chatRoom);

             //Acknowledging all members in the that chat room that new user joined
             socketio.in(data.chatRoom).emit("user_joined" , data);
         })

         //Emitting receive messsage event when handled send message
         socket.on("send_message" , function(data){
             console.log("Send message request received");
            socketio.in(data.chatRoom).emit("receive_msg" , data);
         })
         
     })

}