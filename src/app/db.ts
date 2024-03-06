import { config } from 'dotenv'

import { createConnection, type ConnectionOptions } from 'mysql2'

import { join } from 'node:path'

config({
  path: `${join(process.cwd(), process.env.NODE_ENV === 'devel' ? '.env.dev' : '.env.prod')}`
})

const MYSQL_CONFIG: ConnectionOptions = {
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306'),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'metalk'
}

export const db = createConnection(MYSQL_CONFIG)
