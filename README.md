<!-- CTRL + Shift + V to see preview -->

# IoT karpuzs

Repository of Selin Karpuz (500823718)

## General information

This repository was made as part of a project of the IoT course of the Amsterdam University of Applied Sciences.

This repository contains an application that represents a die roller.
With the press on a physical button, connected to a Wemos, a webserver is called. The webserver does some operations before it displays the number that was rolled onto the screen along with some additional data. The rolled number is also displayed on a LCD display that is connected to the Wemos.

## Architecture

This repository consists/makes use of multiple components:

1. Wemos
2. Node.js server
3. MySQL database
4. Browser

#### Wemos
The Wemos is the Wemos D1 mini Pro . It has a button  and an 1602 LCD display attached to it. Furthermore a WiFi/internet connection is required.

#### Node.js server
The Node.js server serves as a central Hub between all these components and is the component that combines all information to display it on the webpage.

#### MySQL Database
The MySQL database stores information relevant to the dice roll and enables operations on that data. This stored data is used in many forms on the webpage.

#### Browser
The browser displays the result on the webpage. It is the follow-up information that the user gets after having pressed on the button.

## How to start the application

To run the application, first ensure that all configuration is set.

- Make sure that a MySQL service is running on an exposed port.
- Create a database with name `$NAME` of your own choice.
  - Create a table named `dicedata`.
  - Create a column named `date` with `type=date`.
  - Create a column named `time` with `type=time` and set this column to be the primary key.
  - Create a column named `number` with `type=int(1)`.

- Afterwards configure the .env file that stores various variables that the application uses. The repository already has a .env file with preconfigured values, adjust these if needed.
  - PORT={The port on which the application should run, you can choose this freely as long as it is an unused port}
  - USER={The username of the MySQL account}
  - PASSWORD={The password of the MySQL account}
  - DATABASE={The `$NAME` of the MySQL database}
  - DB_PORT={The port on which the MySQL database runs}
  - HOST={The URL on which the application should run, to try it out setting this to `localhost` is easiest}

- Open the terminal/commandline
- Navigate to the folder where the `dice-server.js` is, that is, the `IoT-Dice` folder.
- This same directory contains the `package.json` file containing all dependencies. It is necessary to install these dependencies. To do this run `npm install`
- After having installed the dependencies the application can be run by `node dice-server.js` in the same folder.

#### Wemos

##### Libraries
Import 'LiquidCrystal' and 'ArduinoJson' libraries into Arduino.

##### ngrok
If the server is not hosted on the internet but on your own computer, meaning localhost, the Wemos can connect to the server by conneccting to the same network to which the server/computer is connected or it can connect to the server via the internet by exposing the localhost url to the internet through [ngrok](https://ngrok.com/).

If you use `ngrok`, you should run the executable and copy the `ngrok.io` URL into the Wemos Arduino script and load that onto the Wemos.

See line 9 of the Arduino script: `char* url = "http://{URL.NGROK.IO}/rolldice";`
You should replace `{URL.NGROK.IO}` with your `ngrok.io` URL.

##### Set WiFi name
Fill in the WiFi name in the Arduino script, see line `23` of the Arduino script. Replace `{SET_WIFI_NAME}` with your WiFi name.

##### Set Wifi password
Fill in the WiFi name in the Arduino script, see line `23` of the Arduino script. Replace `{SET_WIFI_PASSWORD}` with your WiFi name.
