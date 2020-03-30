from datetime import datetime
import socket


def lowerCone(carparkName, pin):
    '''
    This function send a request to GPIO-server to
    lower the cone by specifying the pin to lower the cone

    :return:  void
    '''
    host = socket.gethostname()
    # TODO: Use carparkName to determine which raspberry pi (port) to call
    port = 8888

    s = socket.socket()
    s.connect((host, port))

    s.send("hello".encode('utf-8'))
    data = s.recv(1024).decode('utf-8')
    print('Received from server: ' + data)
    s.close()

    return "success {} {}".format(carparkName, pin)
