int buttonState = 0;
int ReadPin = 7;
int LedPin = 13;
void setup() {
  // put your setup code here, to run once:  pinMode(ReadPin, INPUT_PULLUP);
  pinMode(LedPin, OUTPUT);
  pinMode(ReadPin, INPUT_PULLUP);
  Serial.begin(9600);
}
void loop() {
  // put your main code here, to run repeatedly:  
  buttonState = digitalRead(7);
  
   if(buttonState)
   {
      digitalWrite(LedPin, HIGH);
   }
   else   {
      digitalWrite(LedPin, LOW);
   }
}
