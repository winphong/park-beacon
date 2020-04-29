import RPi.GPIO as GPIO
import time
from picamera import PiCamera
from openalpr import Alpr
import datetime

# Pin  Definitions
pirSensorPin = 40

# Pin Setup
GPIO.setmode(GPIO.BOARD)
GPIO.setup(pirSensorPin, GPIO.IN)

def scan(expectedCar):
    try:
        print("Starting scan")

        #Take Photo
        print("Taking picture")
        cam = PiCamera()
        cam.start_preview()
        time.sleep(2)
        pictime = datetime.datetime.now()
        picname = pictime.strftime("/home/pi/Desktop/%Y-%m-%d_%H-%M-%S_pic.jpg")
        cam.capture(picname)
        cam.stop_preview()
        cam.close()

        #Scan with ALPR
        print("Scanning picture")
        result = ["0"]
        alpr = Alpr("eu", "/etc/openalpr/openalp.conf", "/usr/share/openalpr/runtime_data")

        if not alpr.is_loaded():
                print("Failed to load OpenALPR", "error")
                result[0] = "-1"
                return result
        results = alpr.recognize_file(picname)

        if len(results['results']) > 0:
            #Print out carplates
            for plate in results['results']:
                for candidate in plate['candidates']:
                    print(candidate['plate'])

                    #See if it's a match w/ expected carplate
                    if candidate['plate'] in expectedCar:
                        print("FOUND")
                        return
    except:
        return

#Main Method
try:
    while True:
        if GPIO.input(pirSensorPin):
            print('Motion detected')
            scan("SDN7484U") #need to change the carplate number

        else:
            print('No motion detected')

        time.sleep(8)
    
except KeyboardInterrupt:
    GPIO.cleanup()
    print("Program terminated")
