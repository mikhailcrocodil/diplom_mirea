const socket = require("net");

const TCP_PORT = process.env.TCP_PORT;
const TCP_HOST = process.env.TCP_HOST;

function TcpClient(client) {
    const tcpSocket = new socket.Socket();

    tcpSocket.connect({host: TCP_HOST, port: TCP_PORT}, () => {

        tcpSocket.on("data", (data) => {
            client.write(data.toString());
            tcpSocket.end();
        });

        tcpSocket.on("end", (type) => {
            client.end();
        });
    });

    return tcpSocket;
}


module.exports = TcpClient;