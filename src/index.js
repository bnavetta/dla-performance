const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const engine = require('./engine');

let hasGardener = false;

function handleGardener(socket) {
    console.log(`${socket.id} became the Gardener`);
    socket.on('disconnect', () => {
        console.log(`Lost the Gardener (${socket.id})`);
        hasGardener = false;
    });

    socket.on('cellClick', ({ row, col, op }) => {
        console.log(`${socket.id} (Gardener) clicked (${row}, ${col})`);
        engine.addGardenerClick({ row, col, op });
    });
}

function handleRabbit(socket) {
    console.log(`${socket.id} joined the rabbit horde`);

    socket.on('cellClick', ({ row, col }) => {
        console.log(`${socket.id} (Rabbit) clicked (${row}, ${col})`);
        engine.addRabbitClick(socket.id, { row, col });
    });
}

io.on('connection', socket => {
    console.log(`${socket.id} connected`);

    socket.on('chooseRole', ({ role }) => {
        if (role === 'gardener') {
            if (hasGardener) {
                socket.emit('userError', { message: 'The Gardener is already present' });
            } else {
                handleGardener(socket);
            }
        } else {
            handleRabbit(socket);
        }
    });
});

app.use(express.static('client/build'));

const port = process.env.PORT || 5000;

http.listen(port, () => {
    console.log(`Listening on port ${port}`);

    engine.start(state => {
        io.emit('update', state);
    })
});
