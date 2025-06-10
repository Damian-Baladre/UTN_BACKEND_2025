import dotenv from 'dotenv'

dotenv.config()

export const ENVIRONMENT = {
    API_KEY: process.env.API_KEY,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.PORT,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    DB_MONGO_PASSWORD: process.env.DB_MONGO_PASSWORD,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

