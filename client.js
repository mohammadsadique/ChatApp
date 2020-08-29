
 var socket = io('http://localhost:8000');

let name = prompt('Enter your name to join?');
socket.emit('new-user-join',name);

socket.on('new-user-join' , data => {
    $('.todo-list').append(`
    <li id="`+data.id+`">
        <span class="text">`
        +data.name+
        `</span>
    </li>`);
});
socket.on('ownname',name => {
    $('.ownname').text(name);
});
socket.on('ownid',socket => {
    $('.ownid').val(socket);
});


socket.on('discon' , data => {
    $('#'+data.id).remove();
});


$(document).ready(function() {


   $(document).on('click','#submit',function(e){
        $('form').submit();
   });
   $(document).on('submit','form',function(e){
        e.preventDefault();
        alert('hi');
        var message = $('#message').val();
        var name = $('.ownname').text();
        
        $('.direct-chat-messages').append(`
            <div class="direct-chat-msg right">
                <div class="direct-chat-info clearfix">
                <span class="direct-chat-name pull-right">`+name+`</span>
                </div>
                <img class="direct-chat-img" src="img/user3-128x128.jpg" alt="message user image" />

                <div class="direct-chat-text">
               `+message+`
                </div>
            </div>`);

        socket.emit('msg',message);
        
        $('#message').val('');
   }) ;
});

socket.on('sendmsg', data => {
    $('.direct-chat-messages').append(`
        <div class="direct-chat-msg">
            <div class="direct-chat-info clearfix">
            <span class="direct-chat-name pull-left">`+ data.name +`</span>
            </div>
            <img class="direct-chat-img" src="img/user1-128x128.jpg" alt="message user image" />
            <div class="direct-chat-text">
            `+ data.msg +`
            </div>
        </div>
    `);
});





// var http = require('http');
// var fs = require('fs');
// var express = require('express');
// var app = express();

// // app.use(express.static(__dirname + '/css'));
// app.use('/css',express.static('css'));
// // app.use('/js',express.static('js'));
// http.createServer(function(req,res){    
//     fs.readFile('demo.html',function(err,data){
//        // res.writeHead(200,{'Contemnt-Type':'text/html'});
//         res.write(data);
//         res.end();
//     });   
// }).listen(3000);



// // var socket = io('http://localhost:8000');
// var socket = io();


// let name = prompt('Enter your name to join?');
// socket.emit('new-user-join',name);




// $(document).ready(function(){
//     $(document).on('click','#sumit',function(){
//         const msg = $('#message').val();
//         // console.log(msg);
//         // console.log(name);
//         var rightdiv = ` 
//         <div class="direct-chat-msg right">
//             <div class="direct-chat-info clearfix">
//                 <span class="direct-chat-name pull-right">${name}</span>
//             </div>
//             <img class="direct-chat-img" src="img/user3-128x128.jpg" alt="message user image" />
//             <div class="direct-chat-text">
//                 ${msg}
//             </div>
//         </div>`;
//         $('.direct-chat-messages').append(rightdiv);
//         $('#message').val('');
//     });
// });
    


















