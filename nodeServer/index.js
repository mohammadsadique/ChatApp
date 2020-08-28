var io = require('socket.io')(8000);

     const users = {};                                                                                                                                                                                                                                                                                 ;

io.on('connection', (socket) => {
    socket.on('new-user-join', name => {
        socket.broadcast.emit('new-user-join', { name:name, id:socket.id } ); 
        socket.emit('ownname', name);
        socket.emit('ownid', socket.id);
        users[socket.id] = name;
        
    });

    socket.on('msg', message => {
       
        socket.broadcast.emit('sendmsg', { name: users[socket.id] , msg:message  } );
        socket.emit('myselfsendmsg', { name: users[socket.id] , msg:message  } );
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('discon', {id:socket.id});
    });
});



// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// // app.get('/', (req, res) => {
// //     res.sendFile( 'D:/ChatApp/index.html');
// //     // res.send('Hello');
// // });

// console.log('a user connected');

// io.on('connection', (socket) => {
//     console.log('b user connected');
//     // socket.on('new-user-join', name => {
//     //      console.log(name);   
//     // });
// });

// http.listen(8000, () => {
//     console.log('check port');
// });