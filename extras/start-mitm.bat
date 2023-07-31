@echo off

set MITMPROXY_SSLKEYLOGFILE=C:/Path/to/keylog.txt
set pcapin=input.pcap
set filter=example.com
set jsonout=output.json

echo launching mitmweb...
mitmweb --set scripts="C:\Path\to\redirect.py" --set save_stream_file=+"C:\Path\to\%pcapin%"
pause