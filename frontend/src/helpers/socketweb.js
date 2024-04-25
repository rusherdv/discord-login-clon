const token = document.cookie.replace(/(?:(?:^|.*;\s*)sessionid\s*=\s*([^;]*).*$)|^.*$/, "$1");

const startConnection = () => {
    if (!token) {
        navigate('/login');
        reject('No se encontró un token de sesión');
        return;
    }

    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = function () {
        console.log('Conectado al servidor WebSocket');

    };

    ws.onmessage = function (event) {
        try {
            console.log(event)
        } catch (error) {
            console.error('Error al analizar el mensaje:', error);
        }
    };

    ws.onclose = function () {
        console.log('Desconectado del servidor WebSocket');
    };
    return ws;
};

const sendMessageSocket = async (message) => {
    const ws = await startConnection();

    ws.addEventListener('open', function () {
        ws.send(JSON.stringify({ message, token }));
    });
};

export {
    startConnection,
    sendMessageSocket
};
