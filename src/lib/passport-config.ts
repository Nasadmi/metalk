import { db } from '../app/db'

import { Strategy } from 'passport-local'

import passport from 'passport'

import { type RowDataPacket } from 'mysql2'

import { compare } from 'bcrypt'

const pass = passport

pass.use(new Strategy((email, password, done) => {
  db.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err !== null) {
      done(true, false, {
        message: 'Query Error'
      })
      throw err
    }

    if (row.length === 0) {
      done(null, false, {
        message: 'User doesnt exists'
      })
    }

    if (!(await compare(password, row[0].password as string))) {
      done(null, false, {
        message: 'Incorrect password'
      })
    }

    done(null, row[0].id as Express.User)
  })
}))

pass.serializeUser((user, done) => {
  done(null, user)
})

pass.deserializeUser((id, done) => {
  db.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err !== null) {
      done(true, false)
      throw err
    }

    if (row.length === 0) {
      done(null, false)
    }

    done(null, row[0].id as Express.User)
  })
})

export default pass
