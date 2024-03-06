import express from 'express'

import session from 'express-session'

import morgan from 'morgan'

import cors from 'cors'

import { config } from 'dotenv'

import cookieParser from 'cookie-parser'

import { join } from 'node:path'

const app = express()

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

config({
  path: `${join(process.cwd(), process.env.NODE_ENV === 'devel' ? '.env.dev' : '.env.prod')}`
})

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET ?? 'secret',
  cookie: {
    maxAge: Math.pow(3.6, 6)
  }
}))

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'devel') {
  app.use(morgan('dev'))
}

app.use(cors())

app.use(cookieParser())

export default app
