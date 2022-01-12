# Eco-Tunisia
Web and MOBILE project for trash collection.

This project was realized by:

-Noussayba Masseoud 

-Nour Jebali 

-Asma Ben Fredj 

-Abir Abdelmoumen

*Eco-Tunisia* is a project for smart cities that is divided in two parts.
The first part is a web app which allows us to register collection points into a map 
and indicates the type of materials allowed.
The second part is a mobile app which allows the users to  search for the nearest 
points by showing them in the map.
## The used technologies are :
 - *Back end*
    - NodeJS
    - Express
    - Typescript
    - Sqlite
    - multer
    - celebrate/Joi
  
  - *Front end*
    - ReactJS
    - Typescript
    - react-router-dom
    - axios
    - leaflet (Free map)
    - react-leaflet
  
  - *Mobile*
    - React Native/Expo
    - Typescript
    - react-navigation
    - axios
    - react-native-picker-select
    - react-native-svg
    - react-native-maps
    - expo-font
    - expo-location
    - expo-mail-composer
    
    ## How to execute this project in your machine
    
    *-1*
*First*, you have to install Node.js, React and React Native. 
    
    *-2* Clone this project and create an environment in your terminal.
    
    *-3* In your terminal, go to your project directory then type:
    
       *3.1*   cd server
          
                 yarn install
             
                 yarn dev
             
       *3.2*   cd web
          
                 yarn install
                   
                 yarn start
             
       *3.3*   cd app
          
                 yarn install
                   
                 yarn start
             
    *-4* Change the ip adress in the files with your own ip address.
           
           For example, change this code "app.listen(4445,'192.168.1.124');" with "app.listen(4445,'XXX.YYY.ZZZ.WWW');"
           
           You wan also change the port used is the 4445 port in you case is already used.
    
    ❗ To find your ip address, go to your terminal and type "ipconfig" and choose the ipv4 address.
    
    You will have the same structure as below:
    
    ![structure1](https://github.com/asmaa10-prog/ECO_TUNISIA/blob/21fb7a8002cd1a36480874c062f4286dc1dd60ef/ecotun.PNG)
    
    YEYYY! Your application is now working! 🎉
    
    
    *Unresolved Problems* Unfortunately, in the mobile app we couldn't extract the location points in the map from the database.
