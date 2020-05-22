class ChatEngine{
    constructor(chatBoxId , userEmail){
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        //Requestion for connection with chat server
        this.socket = io.connect("http://localhost:200");
        
        if(this.userEmail){
            
            this.connectionHandler();
            
        }
        
    }

    //Requesting for connecting socket to the chat server
    connectionHandler(){
        this.socket.on("connect" , function(){
            console.log("connection is elstablished using sockets");
        })
    }
}