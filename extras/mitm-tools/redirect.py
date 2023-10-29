from mitmproxy import http


def request(flow: http.HTTPFlow) -> None:

    #Webview
    if flow.request.pretty_host == "d2-megaten-l.sega.jp":
        flow.request.host = "localhost"
        flow.request.port = 3000
        flow.request.scheme = 'http'

    #Assets
    if flow.request.pretty_host == "d2r-dl.d2megaten.com":
        flow.request.host = "localhost"
        flow.request.port = 3000
        flow.request.scheme = 'http'

    #Game
    if flow.request.pretty_host == "d2r-sim.d2megaten.com":
        flow.request.host = "localhost"
        flow.request.port = 8000
        flow.request.scheme = 'http'

    #Chat
    if flow.request.pretty_host == "d2r-chat.d2megaten.com":
        flow.request.host = "localhost"
        flow.request.port = 8000
        flow.request.scheme = 'http'