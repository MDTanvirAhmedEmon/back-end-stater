import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/notFound'
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { createServer } from 'http';
import { Server } from 'socket.io';
import initialChats from './app/modules/chats/chats.socket';
const app: Application = express()


const httpServer = createServer(app);
const io = new Server(httpServer);
initialChats(io)
app.set("io",io)

// parser
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use('/api/v1', router)

app.use(globalErrorHandler)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.use(notFound)

// export default app
export default httpServer
