

(async () => {
    const mockttp = require('mockttp');
    const fs = require('fs');

    const options = {
        key: fs.readFileSync('./certs/key.pem'),
        cert: fs.readFileSync('./certs/cert.pem')
    };
      
    const serverPort = 8080;
      
    const server = mockttp.getLocal({ https: options, port: 8080 });


    await server.forAnyRequest()
    .forHost("d2r-sim.d2megaten.com").always()
    .thenForwardTo("http://localhost:8000");

    await server.forAnyRequest()
    .forHost("d2r-chat.d2megaten.com").always()
    .thenForwardTo("http://localhost:8000");

    await server.forAnyRequest()
    .forHost("d2r-dl.d2megaten.com").always()
    .thenForwardTo("http://localhost:3000");

    await server.forAnyRequest()
    .forHost("d2-megaten-l.sega.jp").always()
    .thenForwardTo("http://localhost:3000");

    await server.forAnyRequest()
    .forHostname("cert.pem").always()
    .thenForwardTo("http://localhost:3000");

    await server.forAnyRequest().thenPassThrough();

    await server.start();


    // Print out the server details for manual configuration:
    console.log(`Server running on port ${server.port}`);
})(); // (All run in an async wrapper, so we can easily use top-level await)