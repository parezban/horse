import dotenv from 'dotenv';

dotenv.config({
    path:  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

console.log(process.env.GOOGLE_CLOUD_PROJECT)
export const config = {
  port: process.env.PORT || 3000,
  firestoreProjectID: process.env.GOOGLE_CLOUD_PROJECT || '',
  environment: process.env.NODE_ENV || 'development',
};