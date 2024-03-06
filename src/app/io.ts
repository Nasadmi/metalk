import { Server as IoServer } from 'socket.io'

import { type IncomingMessage, type ServerResponse, type Server } from 'http'

export default {
  socketConnection: (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
    const io = new IoServer(server)
    io.on('connection', (socket) => {
      console.info(`Client connected, id=${socket.id}`)
    })
  }
}
