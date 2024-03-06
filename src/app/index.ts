import { server } from './server'

import io from './io'

import { db } from './db'

server.listen(parseInt(process.env.PORT ?? '3000'), () => {
  console.log('Server is listening on port', process.env.PORT ?? 3000)
})

io.socketConnection(server)

db.connect(err => {
  if (err !== null) console.error(err)
  else console.log('Conected to database')
})
