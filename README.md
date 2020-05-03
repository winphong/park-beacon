# ParkBeacon

ParkBeacon is an application to automated reservation of parking slot in National University of Singapore by retrieving user's Google Calendar information.

## Setup

1. Ensure that [nodejs](https://nodejs.org/en/download/) is installed on your laptop.
2. This setup requires 2 Raspberry Pi, 3 servo motor, 1 pi camera and an ultrasonic sensor HC-SR04.
3. In Raspberry Pi 1, install [OpenALPR](https://drive.google.com/file/d/1zn-n41qtsnhrrgr4zwi3dllsuomod-oq/view?usp=sharing). (This will take a while to install)

### Hardware

#### Rasberry Pi 1

1. Setup the ultrasonic sensor as shown in the diagram above.
2. Connect power to 5.0V, ground to GND and pulse to pin 33 for servo 1.
3. Connect power to 5.0V, ground to GND and pulse to pin 32 for servo 2.
4. Connect the Pi camera with the designated camera slot on PI.

#### Rasberry Pi 2

1. Connect power to 5.0V, ground to GND and pulse to pin 35 for servo 1.

### Raspberry Pi

In both raspberry pi, `git clone https://github.com/winphong/park-beacon.git`

Navigate to `pi`

Run `python3 -m pip install Flask`
Run `python3 -m pip install connexion==2.3.0`

#### Rasberry Pi 1

1. Run `python3 client.py` to start the Flask server.
2. Run `python3 CP15-GPIO.py` to start the CP15 GPIO programme.
3. Open **motionCarplate.py** and the IP address at line 17 to IP address of your laptop running the node programme.
4. Run `python3 motionCarplate.py` to start the carplate capturing programme.
5. Open **ultrasonic_sensor.py** and the IP address at line 53 to IP address of your laptop running the node programme.
6. Run `python3 ultrasonic_sensor.py` to start the distance sensor programme.

#### Raspberry Pi 2

1. Run `python3 client.py` to start the Flask server.
2. Run `python CP11-GPIO.py` to start the CP11 GPIO programme.

### Nodejs [Laptop]

1. Run `npm install -g nodemon` to install nodemon

2. Navigate to `backend` and run `npm install`

3. Identify your PI IP address and ensure that your PI and laptop is connected to the same network and can connect to each other on VNC.

4. Run `PI_IP_1={YOUR_PI_1_IP} PI_IP_2={YOUR_PI_2_IP} NODE_ENV=custom-environment-variables nodemon` to start the Node programme. Ensure that `Connected to mongodb+...` is printed on the screen.

5. Using Postman, send a `GET` request to `http://localhost:5000/api/auth/reset` to reset the state of the database (clear all reservation and restore all parking lots to vacant) for testing.

6. Login to the calendar and create an event with start time lesser than 24 hours from now and specify the location. The location must contain the word `NUS` (non case-sensitive).
   _24 hours is used for development purposes so that there is no need to constantly adjust the event timing. The code can be modified in `/backend/services/calendar.js` at line 9-12._

7. The Node programme will check the calendar every 1 minute and make reservation which will expire in 5 minutes (for development purposes). Observe the servo motor for movement.
   _The actual implementation should make parking lot reservation 10 minutes before the event and will expire 5 minutes after the event start time._

### React Native

1. Navigate to `frontend/src/constants/routes.js` and change the **IP_ADDR** the of the laptop hosting the react native programme.
2. Install expo-cli with `npm install -g expo-cli` if you do not have expo-cli installed.
3. Run `npm install` to install all the dependencies
4. You will need an [Expo](https://expo.io/signup) account to generate the push notification token.
5. Once the account is created and verified, run `expo login` and login with your Expo credential.
6. Ensure that you are using an Android phone to run the application.
7. Install [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_SG) from Google Play Store if you do not have Expo installed
8. Ensure that the laptop that is hosting the mobile application is using the same network as the mobile phone
9. Open Expo app on your Android mobile phone once installation is complete and login to your Expo account.
10. Click **Scan QR Code** and scan the QR code generated from `expo start`
11. The Javascript bundle will be built and might take a while when accessing the app for the first time.
12. Once the build is done, the login page will be shown.
13. Sign up for an account and login. You will be prompted to provide access to your Google Calendar.
14. Ensure that you have an event that has start and end time, starting in less than 24 hours from the time you are accessing the system and with event location containing the word **NUS**
