// Global Variables
const gamePort = 8000;
const assetPort = 3000;
const proxyPort = 8080;

async function proxyServer (gamePort, assetPort, proxyPort) {
    const mockttp = require('mockttp');
    const fs = require('fs');

    const options = {
        key: fs.readFileSync('./static/cert/key.pem'),
        cert: fs.readFileSync('./static/cert/cert.pem')
    };
      
    const server = mockttp.getLocal({ https: options });

    // Main Game Server
    await server.forAnyRequest()
    .forHost("d2r-sim.d2megaten.com").always()
    .thenForwardTo(`http://localhost:${gamePort}`);

    // Game Chat Server
    await server.forAnyRequest()
    .forHost("d2r-chat.d2megaten.com").always()
    .thenForwardTo(`http://localhost:${gamePort}`);

    // Asset Server
    await server.forAnyRequest()
    .forHost("d2r-dl.d2megaten.com").always()
    .thenForwardTo(`http://localhost:${assetPort}`);

    // Webview Server
    await server.forAnyRequest()
    .forHost("d2-megaten-l.sega.jp").always()
    .thenForwardTo(`http://localhost:${assetPort}`);

    // Liberated-Dx2 Webpage
    await server.forAnyRequest()
    .forHost("dx2.local").always()
    .thenForwardTo(`http://localhost:${assetPort}`);

    await server.forAnyRequest().thenPassThrough();

    await server.start(proxyPort);

    console.log(`Server running on port ${server.port}`);
}; // (All run in an async wrapper, so we can easily use top-level await)

proxyServer(gamePort, assetPort, proxyPort)
module.exports = { proxyServer };