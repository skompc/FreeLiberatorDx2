@set ip=192.168.0.16

@echo off

echo Connecting to WSA...
adb connect 127.0.0.1:58526

echo Setting http proxy for WSA
adb -s 127.0.0.1:58526 shell settings put global http_proxy %ip%:8080

echo Starting mitmProxy...
start mitmweb -s "redirect.py"

echo Press any key AFTER you are done with mitmProxy

pause

echo Resetting http proxy for WSA...
adb -s 127.0.0.1:58526 shell settings put global http_proxy :0

echo DONE!
pause