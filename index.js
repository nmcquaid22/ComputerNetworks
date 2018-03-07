
/* //creating the value and running it right away
const app = require('express')();
//create a server which requires http - then use the server function and pass the app to it.
const server = require('http').Server(app);
// this is the socket.io variable that will hold the socket.io dependences
const io = require('socket.io')(server);


const  port = 3000;

//server will listen on the port that just passed inside of that variable
server.listen(port, () => {
    //pass port inside the template strings
    console.log(`server is running on port ${port}`);
});
// when some tries to get to this specific address then there is a request response

app.get('/', (req,res) => {
    //pass and send a file - index.html from the public folder
    res.sendFile(__dirname + '/public/index.html');
});

// whenever there is an even called connection (when someone is connecting to the server)
io.on('connection', (socket) => {
    console.log('user connected');
    //emit- function within socket that emits something. basically send a message to another person that is connected
    socket.emit('message', { manny: 'hey how are you'});
    //another event to wait on another event, when this event occurs then theres the data.
    
    //basically whatever data we pass from the event is sent.  

    socket.on('another event', (data) => {
        console.log(data);  
    })
}) */


const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//here are all of the routes to each room

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/swift', (req, res) => {
    res.sendFile(__dirname + '/public/swift.html');
});

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css.html');
});


//tech namespace
const tech = io.of('/tech');


tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`)
    })

    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);
        tech.in(data.room).emit('message', data.msg);
         });

         socket.on('disconnect', () => {
             console.log('user disconnected');

             tech.emit('message', 'user disconnected');
         })

    })

