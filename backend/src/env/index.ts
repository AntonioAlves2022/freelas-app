import 'dotenv/config'
import {z} from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test','production']),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.url({message:'Invalid URL'})
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
  throw new Error('Incorrect configuration')
}

export const env = _env.data