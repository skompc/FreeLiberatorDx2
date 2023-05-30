This is my WIP private server for Shin Megami Tensei:Dx2

Follow along on my dev journey at https://www.youtube.com/watch?v=yyznmOjwHMI&list=PLV4ay6xrx8nRm06QnXDBUYqTn3Xk_-wdr

The completed server will aim to have the game fully operational, including multiplayer components

It should be noted that this is a rewrite of my first attempt

The uploaded code will NOT have game assets from Sega's servers. There is an asset scraper however.

## Instructions
Make sure you have nodejs installed (https://nodejs.org/en/download/).

Also make sure you have ADB installed (google it).

Run <code>git clone https://github.com/skompc/FreeLiberatorDx2.git</code> to copy this repo to your pc.

Run <code>npm install</code> to install dependencies.

Run <code>npm run scraper</code> to fetch assets.

copy everything from <code>./contents/Android/(asset_bundle_version)</code> to a new folder called <code>./contents/Android/custom</code>

edit the first line of <code>./contents/Android/custom/en/ab_list.txt</code> from whatever it is to <code>custom</code>

Run <code>npm run server</code> to run the server.

Run <code>npm run proxy</code> to run the proxy. Please note that for some reason it tends to ignore the port and use it's own. So make sure to run it AFTER starting the server to make sure that the game server's port isnt used. The port it uses will be displayed in the terminal window.

# If you use an Android phone:
Install the modded APK onto your phone (available in the releases zip soon).

Make sure your phone is on the same network as your pc (or whatever is hosting the proxy and game server).

Set your phones proxy settings to [pc's IP]:[whatever port the proxy server is running on].

Visit <code>cert.pem/certs/index.html</code> and click download.

Install the certificate through your phone's settings as a CA certificate (google it).

Run the game!

# If you use an android emulator:
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

# Troubleshooting

My android emulator isn't showing up in adb!

    The solution to that one varies, but as I personally use Windows Subsystem for Android, the command to fix that would be to run "adb connect 127.0.0.1:58526"


## Relevent links:
Youtube - https://www.youtube.com/@SquirrelDevDiaries
Github - https://github.com/skompc
