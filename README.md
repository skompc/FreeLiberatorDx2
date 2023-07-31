This is my WIP private server for Shin Megami Tensei:Dx2

Follow along on my dev journey at https://www.youtube.com/watch?v=yyznmOjwHMI&list=PLV4ay6xrx8nRm06QnXDBUYqTn3Xk_-wdr

The completed server will aim to have the game fully operational, including multiplayer components

It should be noted that this is a rewrite of my first attempt

The uploaded code will NOT have game assets from Sega's servers. There is an asset scraper however.

# First Steps
Make sure you have nodejs installed (https://nodejs.org/en/download/).

Also make sure you have ADB installed if you are using an android emulator.

Run <code>git clone https://github.com/skompc/FreeLiberatorDx2.git</code> to copy this repo to your pc.

Run <code>npm install</code> to install dependencies.

# Update The Scraper

Todo

# Scrape The Assets

Run <code>npm run scraper</code> to fetch assets.

copy everything from <code>./contents/Android/(asset_bundle_version)</code> to a new folder called <code>./contents/Android/custom</code>

edit the first line of <code>./contents/Android/custom/en/ab_list.txt</code> from whatever it is to <code>custom</code>

# Run The Server

Run <code>npm run game</code> to run the main server. This has the main game logic.

Run <code>npm run asset</code> to run the asset server. This hosts the static assets for the game, as well as the certificate page.

Run <code>npm run proxy</code> to run the proxy. This will allow the app to connect with this server.

Run <code>npm run mod-servers</code> to run only the game and asset servers. This is useful if you are using a different proxy (e.g. mitmProxy) for development. Note that both servers will open in their own window.

Run <code>npm run mitm-servers</code> to run only the asset and proxy servers. This is useful if you want to play the "official (read mitm)" version of the game but have a slow internet connection. Note that you need to have the correct assets scraped for the version of the app you are using! 

Run <code>npm run all</code> to run all three servers. Note that all three servers will open in their own window.

By default the Game server will run on port 8000, the Asset server will run on port 3000, and the proxy will run on port 8080. If you wish to change the ports the servers will use, the lines to do so are in the top of gameServer.js, assetServer.js, and proxyServer.js for the game, asset, and proxy commands respectively. Make sure that the game and asset ports are the same in both their respective files AND proxyServer.js if you plan on using the proxy command!

# If You Use An Android Phone:
Install the modded APK onto your phone (Check the FAQ for a video on YouTube on how to mod it).

Make sure your phone is on the same network as your pc (or whatever is hosting the proxy and servers).

Set your phones proxy settings to [pc's IP]:[whatever port the proxy server is running on].

Visit <code>cert.pem/certs/index.html</code> and click download.

Install the certificate through your phone's settings as a CA certificate (google it if you need help).

Run the game!

# If You Use An Android Emulator:
Install the modded apk onto the emulator (methods vary)
    
Run "adb devices"

It should return something like:

    List of devices attached
    127.0.0.1:58526 device

Run the following:

    adb -s [device_to_connect_to] shell settings put global http_proxy [PC_IP_on_network]:[proxy_port]"

For example, if my PC is on IP 192.168.0.136 and my proxy is on port 8001, then I would run:

    adb -s 127.0.0.1:58526 shell settings put global http_proxy 192.168.0.136:8001

Visit <code>cert.pem/certs/index.html</code> and click download.

Install the certificate through your emulator's settings as a CA certificate (google it).

Run the game!

# Known bugs

1. The party doesn't seem to display right unless you go to "party" then "demons" before entering a mission. You only need to do this once per app launch.
2. The results of a battle will ALWAYS softlock the game! Simply restart the app to get around this... this does NOT apply to the tutorial battle thankfully.
3. Any unimplemented endpoints will softlock the game. Again simply restart the app.

# FAQ

Q: My android emulator isn't showing up in adb!

A: The solution to that one varies, but as I personally use Windows Subsystem for Android, the command to fix that would be to run "adb connect 127.0.0.1:58526"

----------------------------------------------

Q: The modded version of the app isn't fetching the assets I downloaded

A: Make sure to do all the steps in Scrape The Assets

-----------------------------

Q: The official (read mitm) version of the app isn't fetching the assets I downloaded

A: Rerun the scraper with an after following the instructions in Update The Scraper (Todo)

--------------------

Q: I want to run the server on my phone/tablet alongside my game

A: While this isn't officially supported yet, it is on the list of things to acomplish with this project.

---------------------------

Q: How do I patch the game!

A: There is a video on my YouTube channel on how to do this here: https://youtu.be/U4BZSEMW9XM

----------------------

Q: I don't have a computer that I can do this with! Can I still patch the app myself?

A: Not yet, but soon I will have a patcher that will do this on an Android device.

----------------

Q: Will iOS devices be supported?

A: While I don't have an iOS device to test with, if I do get one and time allows it, I will add iOS device support to both the scraper and servers eventually. Do note that running the server on an iOS device will NOT be officially supported.

# Relevent links:

Youtube - https://www.youtube.com/@SquirrelDevDiaries
Github - https://github.com/skompc
