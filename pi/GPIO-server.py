import RPi.GPIO as GPIO
import time
import socket
import json

GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)  # PWM

servo = GPIO.PWM(12, 50)
servo.start(0)


def lowerCone():
    servo.ChangeDutyCycle(1)  # turn towards 0 degree
    time.sleep(0.03)
    servo.ChangeDutyCycle(0)
    time.sleep(1)  # sleep 1 second


def raiseCone():
    servo.ChangeDutyCycle(7)  # turn towards 0 degree
    time.sleep(0.03)
    servo.ChangeDutyCycle(0)
    time.sleep(1)  # sleep 1 second


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
                    if data['expired'] == True:
                        # NOTE: Timeout to lower the cone
                        lowerCone()
                        print("lower cone because reservation expired")

                    elif (data['carparkName'] == carparkName):
                        if (data['reserve'] == False):
                            lowerCone()
                            pass
                    elif (data['reserve'] == True):
                        raiseCone()
                        pass

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
