import socket


def server():

    host = socket.gethostname()
    port = 8888

    s = socket.socket()
    s.bind((host, port))

    s.listen(1)
    s.settimeout(20)

    while True:
        try:
            client_socket, address = s.accept()
        except socket.timeout:
            print("Timeout")
            break

        print("Connection from: " + str(address))
        data = client_socket.recv(1024).decode('utf-8')

        print("From online user: " + data)
        data = data.upper()
        client_socket.send(data.encode('utf-8'))

        client_socket.close()


if __name__ == "__main__":
    server()
