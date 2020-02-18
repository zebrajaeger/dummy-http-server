const express = require('express');
const index = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const yargs = require('yargs');

function begin() {
    const argv  = yargs
        .usage('Usage: $0 <command> [options]')
        .alias('p', 'port')
        .default('port', 2999)
        .help('h')
        .alias('h', 'help')
        .argv;

    index.use(logger('dev'));
    index.use(express.json());
    index.use(express.urlencoded({extended: false}));
    index.use(cookieParser());

    index.use(function (req, res) {
        console.log('headers:', req.headers);
        console.log('cookies:', req.cookies);
        console.log(' body:', req.body);
        res.send('OK');
    });

    const server = http.createServer(index);
    server.listen(argv.port);
    server.on('error', onError);
    server.on('listening', onListening);

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    }
}

module.exports = begin;
