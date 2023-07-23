# Prueba tecnica Carvajal

En este proyecto se realizó una aplicacion fullstack la cual permite registrar usuarios a una basede datos, realizar publicaciones y permitir un CRUD sobre estas, realizar comentarios sobre las publicaciones de otros usuarios, ademas posee un mecanismo de recuperacion de contraseñas y notificacion de comentarios a traves de correo electronico.

## Funcionamiento 🔧

### backend 
La parte backend fué contruida con **nodejs**, utilizando el framework express y para la persistencia de los datos se utilizó **mysql** implementando sequelize como ORM.

### frontend
El frontend fué construido con **Reactjs** implementando MUI como libreria UI, utilizó el context-Api para la administracion del estado y react-router-dom para el manejo de las rutas. El proyecto fué construido con vite.
 
## Comenzando 🚀
a continuacion se describirá una serie de pasos para la instalacion del proyecto.
el proyecto se desplegará en tres contenedores
1. el contenedor mySql que maneja la persistencia de los datos
2. un contenedor nodejs que ejecuta toda la logica del backend y expone la informacion atraves de una API-REST en el **puerto 4000**
3. un servidor nginx  donde está desplegado la single page aplication (spa) construida con react y la sirve en el puerto **8080**.
Todo esto se construye de forma automática utlizando la aplicacion de **docker compose**

### Pre-requisitos 📋
requiere de las siguientes herramientas:
2. instalacion de node js
1. instalacion de **Docker**

## Despliegue 📦
para desplegar realizar:
1. git clone https://github.com/asuridev/prueba-carvajal.git
2. cd prueba-carvajal 
3. docker compose up

Una vez construida y desplegada la imagen usted tendrá un servidor web funcionando en el **localhost:8080** donde podrá iniciar el registro de usuarios y publicaciones.
 ![scren de login](/assets/login.png)

## Documentacion 🛠️
en el repositorio se encuentra una carpeta con nombre documentacion donde encontrará una coleccion de postman con la api documentada y el diagrama de la relacion de la base de datos.
