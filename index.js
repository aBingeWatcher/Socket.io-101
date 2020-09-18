//server side

var express= require('express');

var socket= require('socket.io');  //importing socket.io

//set up express app
var app=express();
var server= app.listen(4000, function() {
    console.log("listening to requests on port 4000");
});

//static files
app.use(express.static('public'));

//socket setup
var io= socket( server);    //param is the name of the server where we want to work

//listening out for connection request from client side
io.on('connection', function(socket) {     //particular instance of socket b/w one of the client and server
    console.log('Made socket connection', socket.id );

    // 2. listening out for "chat" message (from 1.) from client side
    socket.on('chat', function(data){   //data object send from client side (1.)

        // 3. emiting the above data down all the sockets( ie including the client who 
        //sent the message in first place ) connected to this server
        io.sockets.emit('chat', data);
    })

    // B2. listening for "typing" message from a client (B1)
    socket.on('typing', function(data) {

        // B3. broadcasting the typing message to every other client. ie excluding the client who
        //sent the message in first place 
        socket.broadcast.emit('typing', data);

    });

});

//socket.id is unique for all client-server connection