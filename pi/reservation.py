from datetime import datetime
import socket
import json


def move_cone(carparkName, pin, lower):
    '''
    This function send a request to GPIO-server to
    lower the cone by specifying the pin to lower the cone

    :return:  void
    '''
    host = socket.gethostname()
    # TODO: Use carparkName to determine which raspberry pi (port) to call
    if (carparkName == "Car Park 11"):
        port = 8888
    elif (carparkName == "Car Park 15"):
        port = 8887

    s = socket.socket()
    s.connect((host, port))

    if lower:
        s.send(json.dumps(
            {"carparkName": carparkName,
             "pin": pin,
             "reserve": False,
             "expired": False}
        ).encode('utf-8'))
    else:
        s.send(json.dumps(
            {"carparkName": carparkName,
             "pin": pin,
             "reserve": True,
             "expired": False}
        ).encode('utf-8'))

    data = s.recv(1024).decode('utf-8')
    print('Received from server: ' + data)
    s.close()

    return "success {} {}".format(carparkName, pin)


def lower_cone(carparkName, pin, expired):
    host = socket.gethostname()

    if (carparkName == "Car Park 11"):
        port = 8888
    elif (carparkName == "Car Park 15"):
        port = 8887

    s = socket.socket()
    s.connect((host, port))

    s.send(json.dumps(
        {"carparkName": carparkName,
           "pin": pin,
           "expired": expired}
    ).encode('utf-8'))

    data = s.recv(1024).decode('utf-8')
    print('Received from server: ' + data)
    s.close()

    return "lowered cone for expired reservation {} {}".format(carparkName, pin)
