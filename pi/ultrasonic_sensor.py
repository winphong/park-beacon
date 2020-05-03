
import RPi.GPIO as GPIO
import time
import json
import requests

GPIO.setmode(GPIO.BOARD)
GPIO_TRIGGER = 16
GPIO_ECHO = 18

GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)

GPIO.output(GPIO_TRIGGER, False)
print("Waiting For Sensor To Settle")
time.sleep(2)


def distance():
    # set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER, True)

    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER, False)

    StartTime = time.time()
    StopTime = time.time()

    # save StartTime
    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()

    # save time of arrival
    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()

    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2

    return distance


try:
    carparkName = "Car Park 15"
    vacant_count = 0
    occupied_count = 0
    ultrasonic_sensor_pin = 32

    vacate_url = "http://{}:5000/api/reservation/vacate".format(
        "192.168.43.245")
    headers = {'content-type': 'application/json'}

    while True:
        dist = distance()
        print("Measured Distance = %.1f cm" % dist)
        time.sleep(1)

        # parking lot occupied by car
        if (dist <= 20):
            occupied_count = occupied_count + 1
            vacant_count = 0

        # parking lot is occupied but sensor value shows vacant => car left
        # for ultrasonic_sensor pin only since there's only 1 ultrasonic sensor
        if (dist > 20 and occupied_count >= 3):
            vacant_count = vacant_count + 1

        # vacant_count = 3 to ensure the sensor value is accurate before confirming
        # that the slot is indeed empty
        if (vacant_count >= 3):
            # Send request to node to vacate
            print("vacating")
            response = requests.post(vacate_url,
                                     headers=headers, json={
                                         'carparkName': carparkName,
                                         'pin': ultrasonic_sensor_pin,
                                     })
            vacant_count = 0
            occupied_count = 0

except KeyboardInterrupt:
    pass

finally:
    GPIO.cleanup()
    pass
