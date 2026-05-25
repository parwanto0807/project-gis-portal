import app from './app.js';
import dotenv from 'dotenv';
import prisma from './config/prisma.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Check Database Connection
    await prisma.$connect();
    console.log('📦 Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('DEBUG process.env.NODE_ENV =>', process.env.NODE_ENV);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
