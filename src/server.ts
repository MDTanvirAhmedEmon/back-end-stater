import { Server } from 'http';
// import app from './app'
import mongoose from 'mongoose'
import config from './app/config'
import httpServer from './app';

let server: Server;

async function main() {
  try {

    await mongoose.connect(config.database_url as string)
    // socket = app.get("io")
    server = httpServer.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on('unhandledRejection', (error) => {
  console.log(`unahandledRejection is detected , shutting down ...`, error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected , shutting down ...`);
  process.exit(1);
});