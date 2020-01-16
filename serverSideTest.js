socket.on('request', function (room) {
    socket.broadcast.emit("getRequest", room);
    room_info = room;
});

socket.on('response', function (room, isGrant) {
    if(isGrant) {
        socket.broadcast.emit("getResponse", room, isGrant);
        socket.emit("enter", room);
    } else {
        // TODO 거절 했을 때 서버 side
    }
});

socket.on("onCollabo", function(id) {
    socket.emit("collabo", room_info);
});

socket.on("enter", function(room, id) {
    socket.emit("collabo", room);
    console.log("enter: " + room);
});

//
socket.on('create or join', function(room) {
    log('Received request to create or join room' + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.socket).length : 0;
    log('Room ' + room + ' now has ' + numClients + 'client(s)');

    if(numClients === 0) {
        socket.join(room);
        log('Client ID ' + socket.id + ' created room ' + room);
        socket.emit('created', room, socket.id);
    } else if(numClients === 1) {
        io.sockets.in(room).emit('join', room);
        socket.join(room);
        socket.emit('joined', room, socket.id);
        io.sockets.in(room).emit('ready', room);
        socket.broadcast.emit('ready', room);
    } else {
        socket.emit('full', room);
    }
});