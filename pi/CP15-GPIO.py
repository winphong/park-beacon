import RPi.GPIO as GPIO
import time
import socket
import json

GPIO.setmode(GPIO.BOARD)
GPIO_TRIGGER = 16
GPIO_ECHO = 18

GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)

GPIO.output(GPIO_TRIGGER, False)
print("Waiting For Sensor To Settle")
time.sleep(2)


def lowerCone(servo):
    print("lowering")
    servo.ChangeDutyCycle(7)  # turn towards 0 degree
    time.sleep(0.5)  # sleep 0.05 second to prevent jerking
    servo.ChangeDutyCycle(0)
    servo.stop()


def raiseCone(servo):
    print("raising")
    servo.ChangeDutyCycle(2)  # turn towards 0 degree
    time.sleep(0.5)  # sleep 0.05 second
    servo.ChangeDutyCycle(0)
    servo.stop()


def server():

    host = socket.gethostname()
    port = 8887
    carparkName = "Car Park 15"

    s = socket.socket()
    s.bind((host, port))

    s.listen(1)
    s.settimeout(1)

    pins = []

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

                if data['pin'] not in pins:
                    GPIO.setup(data['pin'], GPIO.OUT)  # PWM
                    pins.append(data['pin'])

                servo = GPIO.PWM(data['pin'], 50)
                servo.start(0)

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
        pass

    finally:
        servo.stop()
        GPIO.cleanup()
        pass


if __name__ == "__main__":
    server()
