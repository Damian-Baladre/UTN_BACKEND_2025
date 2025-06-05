import dotenv from 'dotenv'
//Como el type de nuestro proyecto es commonjs no podemos usar export y import
//const dotenv = require('dotenv');
dotenv.config()
//Esto carga las variables de entorno en la variable process.envconsole.log('Environment variables loaded:', ENVIRONMENT);
export const ENVIRONMENT = {
    API_KEY: process.env.API_KEY,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.PORT,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
}
//suele ser un objeto
//module.exports = {
//    ENVIRONMENT: ENVIRONMENT
//}//



