## Inicio rapido

- Clone el repositorio: `git clone https://github.com/GiovanniNocetiBracking/front-GD-REACT.git`.
- Luego de extraer el proyecto, ingrese a la carpeta principal e instale las dependencias del proyecto.
- Rellene archivo .env con sus datos de firebase.
  (
  apiKey: "" => REACT_APP_FIREBASE_KEY = ""
  authDomain: "" => REACT_APP_FIREBASE_DOMAIN = ""
  databaseURL: "" => REACT_APP_FIREBASE_DATABASE = ""
  projectId: "" => REACT_APP_FIREBASE_PROJECT_ID = ""
  storageBucket: "" => REACT_APP_FIREBASE_STORAGE_BUCKET = ""
  messagingSenderId: "" => REACT_APP_FIREBASE_SENDER_ID = ""
  appId: "" => REACT_APP_FIREBASE_APP_ID = ""
  ).
  No requiere migracion de base de datos, las colecciones necesarias son creadas al momento de registrarse el usuario.
- Configurar url base en archivo .env: REACT_APP_URL_API = "http://127.0.0.1:3030" (dominio y puerto de ejemplo).
- Luego de completar las configuraciones iniciar el proyecto con el comando npm run start o yarn start.
