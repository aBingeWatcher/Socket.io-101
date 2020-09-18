//make connection, client side
 var socket= io.connect('http://localhost:4000');

 //query DOM

 var message= document.getElementById("message");
 var handle= document.getElementById("handle");
 var btn= document.getElementById("send");
 var output= document.getElementById("output");
 var feedback= document.getElementById("feedback");

 //emit event
btn.addEventListener('click', function(){   //listening for click event on send button

    // 1. emit a message(say chat) along with the data object down the websocket to server (from client side)
    socket.emit('chat', {
        message: message.value, //value of the input field with message id
        handle: handle.value
    });    

});


// 4. Listening for event ("chat" message) from server side (to all the clients 
//connected to the server, including the one which initially sent the message)

socket.on('chat', function(data){
    feedback.innerHTML="";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>' ;  //adding html to output div on client side
});



//Broadcasting messages(B), someone is typing
// B1. listening for keypress event in input tag with id message
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

//B4. 
socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' +data+ ' is typing...</em></p>';
});