#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
 
LiquidCrystal_I2C lcd(0x27,16,2); // set the LCD address to 0x3F for a 16 chars and 2 line display

StaticJsonDocument<3000> doc;

int buttonPressed;
int buttonPin = D3;

char* url = "http://{URL.NGROK.IO}/rolldice";

// Digital Pin 3 (D3) is GPIO Pin 0, the two are equivalent and can both be used with the pinMode method
//  So pinMode(D3, INPUT_PULLUP) is the same as pinMode(0, INPUT_PULLUP)

/*
 * Pin numbering: https://chewett.co.uk/blog/1066/pin-numbering-for-wemos-d1-mini-esp8266/#:~:text=//Digital%20pin%201%20is%20pin%205%20on%20the%20ESP8266
 * https://randomnerdtutorials.com/esp8266-pinout-reference-gpios/
 */

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(115200);

  WiFi.begin("{SET_WIFI_NAME}", "{SET_WIFI_PASSWORD}");

  Serial.println("Setting up connection..");
  
  // Stay in while-loop while the device is not connected to your accesspoint.
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting..");
    delay(1000); // Waiting on connection...
  }

  Serial.println("Connected!");

  // Initialize buttonPressed to 0, meaning it is not pressed (see code in the loop() function)
  buttonPressed = 0;

  // initialize the lcd
  lcd.init();
  
  // Print a message to the LCD.
  lcd.backlight();
  lcd.setCursor(0,0);
}

void loop() {
  
  // digitalRead(buttonPin) returns 0 when pressed
  // digitalRead(buttonPin) returns 1 when not pressed
  // With this conditional operator, this behaviour is inverted which is easier to understand.
  // So now 0 means button is not pressed and 1 means button is pressed.
  buttonPressed = digitalRead(buttonPin) == 1 ? 0 : 1;

  if(buttonPressed) {
    Serial.println("Button pressed!");
    sendHTTPRequest();
  }
}

void sendHTTPRequest() {  
  WiFiClient client;
  HTTPClient httpClient;
  
  Serial.println("Sending HTTP request..");

  httpClient.begin(client, url);  

  int httpStatusCode = httpClient.GET();

  if(httpStatusCode == HTTP_CODE_OK) { // HTTP_CODE_OK == 200
    String payloadString = httpClient.getString();
    int str_len = payloadString.length() + 1;     // Length (with one extra character for the null terminator)
    char payload[str_len];                        // Prepare the character array (the buffer) 
    payloadString.toCharArray(payload, str_len);  // Copy it over 
    
    Serial.println("payload =");
    Serial.println(payload);
    Serial.println("Successfully sent a GET request!");

    DeserializationError err = deserializeJson(doc, payload);

    if(err){
      Serial.println("ERROR");
      Serial.println(err.c_str());
      return;
    }
    
    int latestRoll = doc["number"];
    lcd.clear();
    lcd.print("Rolling...");
    delay(1500);
    lcd.clear();
    lcd.print("Latest roll: ");
    lcd.print(latestRoll);
  } else {
    Serial.println("Unable to connect :(");
  }

  delay(1000);
}
