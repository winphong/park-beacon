# ParkBeacon

ParkBeacon is an application to automated reservation of parking slot in National University of Singapore by retrieving user's Google Calendar information.

## Setup

Ensure that [nodejs](https://nodejs.org/en/download/) is installed on the device.

### Hardware

Connect the pulse of servo motor to PIN 12, ground to PIN 6, and power to PIN 2.

### Raspberry Pi

In your raspberry pi, `git clone https://github.com/winphong/park-beacon.git`

Navigate to `pi`

Run `python3 -m pip install Flask`
Run `python3 -m pip install connexion==2.3.0`

Run `python3 client.py` to start the Flask server.
Run `python CP11-GPIO.py` to start the CP11 GPIO programme.
Run `python CP15-GPIO.py` to start the CP15 GPIO programme.

### Nodejs

Run `npm install -g nodemon` to install nodemon

Navigate to `backend` and run `npm install`

Identify your PI IP address and ensure that your PI and laptop is connected to the same network and can connect to each other on VNC.

Run `PI_IP_1={YOUR_PI_1_IP} PI_IP_2={YOUR_PI_2_IP} NODE_ENV=custom-environment-variables nodemon` to start the Node programme. Ensure that `Connected to mongodb+...` is printed on the screen.

Using Postman, send a `GET` request to `http://localhost:5000/api/auth/reset` to reset the state of the database.

Login to the calendar and create an event with start time lesser than 24 hours from now and specify the location. The location must contain the word `NUS` (not case-sensitive).

The Node programme will check the calendar every 1 minute and make reservation which will expire in 30 seconds. Observe the servo motor for movement.
