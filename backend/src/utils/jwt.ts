import fp from 'fastify-plugin'
import jwt from '@fastify/jwt'
import {env} from '../env'

export const jwtPlugin = fp(async(app)=>{
  await app.register(jwt, {
    secret: env.JWT_SECRET,
    sign:{'expiresIn':'1d'}
  })
})

export type JwtPaylod = {sub:string, email:string}