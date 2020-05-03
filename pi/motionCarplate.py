import RPi.GPIO as GPIO
import time
from picamera import PiCamera
from openalpr import Alpr
import datetime
import os
import requests
import json

# Pin  Definitions
pirSensorPin = 40

# Pin Setup
GPIO.setmode(GPIO.BOARD)
GPIO.setup(pirSensorPin, GPIO.IN)

endpoint = "http://{}:5000/api/reservation/attend".format("192.168.43.245")


def scan():
    try:
        print("Starting scan")

        # Send information over
        carplateNum = ""
        carplateList = []

        # Take Photo
        print("Taking picture")
        cam = PiCamera()
        cam.start_preview()
        time.sleep(2)
        pictime = datetime.datetime.now()
        picname = pictime.strftime(
            "/home/pi/Desktop/%Y-%m-%d_%H-%M-%S_pic.jpg")
        cam.capture(picname)
        cam.stop_preview()
        cam.close()

        # Scan with ALPR
        print("Scanning picture")
        result = ["0"]
        alpr = Alpr("eu", "/etc/openalpr/openalp.conf",
                    "/usr/share/openalpr/runtime_data")

        if not alpr.is_loaded():
            print("Failed to load OpenALPR", "error")
            result[0] = "-1"
            return result
        results = alpr.recognize_file(picname)

        if os.path.exists(picname):
            os.remove(picname)
        else:
            print("The file does not exist")

        if len(results['results']) > 0:
            # Print out carplates
            for plate in results['results']:
                for candidate in plate['candidates']:
                    carplateNum = candidate['plate']
                    # TODO: Filter irrelevant carplate result before sending to note
                    carplateList.append(carplateNum)

        print(carplateList)
        response = requests.post(
            url=endpoint, json={'carplates': carplateList})
        # Print out status code
        print(response)
        # Print out the information sent over
    except Exception:
        print("error")
        return


# Main Method
try:
    while True:
        # if GPIO.input(pirSensorPin):
        # print('Motion detected')
        scan()  # need to change the carplate number

        # else:
        # print('No motion detected')

        time.sleep(6)

except KeyboardInterrupt:
    GPIO.cleanup()
    print("Program terminated")
