import RPi.GPIO as GPIO
import time
import socket
import json

GPIO.setmode(GPIO.BOARD)


def lowerCone(servo):
    print("lowering")
    servo.ChangeDutyCycle(1)  # turn towards 0 degree
    time.sleep(1)  # sleep 1 second
    servo.ChangeDutyCycle(0)


def raiseCone(servo):
    print("raising")
    servo.ChangeDutyCycle(7)  # turn towards 0 degree
    time.sleep(1)  # sleep 1 second
    servo.ChangeDutyCycle(0)


def server():

    host = socket.gethostname()
    port = 8888
    carparkName = "Car Park 11"

    s = socket.socket()
    s.bind((host, port))

    s.listen(1)
    s.settimeout(1)

    try:
        while True:

            # TODO: Motion sensor to trigger capturing of carplate
            # TODO: Take photo
            # TODO: Analyse photo to lower the cone

            try:
                client_socket, address = s.accept()

                print("Connection from: " + str(address))
                data = json.loads(client_socket.recv(1024).decode('utf-8'))

                print(data)

                try:
                    GPIO.setup(data['pin'], GPIO.OUT)  # PWM
                    servo = GPIO.PWM(data['pin'], 50)
                    servo.start(0)
                except Exception:
                    print("xx")

                try:
                    if data['expired'] == True:
                        # NOTE: Timeout to lower the cone
                        lowerCone(servo)
                        print("lower cone because reservation expired")

                    elif (data['carparkName'] == carparkName):
                        if (data['reserve'] == False):
                            lowerCone(servo)
                            print("lower cone")
                        elif (data['reserve'] == True):
                            raiseCone(servo)
                            print("raise cone")

                except Exception:
                    print("bypassing exception")

                data = "Cone lowered"
                client_socket.send(data.encode('utf-8'))

                client_socket.close()

            except socket.timeout:
                print("Timeout")
                # break

    except KeyboardInterrupt:
        servo.stop()
        GPIO.cleanup()
        pass

    finally:
        servo.stop()
        GPIO.cleanup()
        pass


if __name__ == "__main__":
    server()
