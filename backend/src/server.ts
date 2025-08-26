import {env} from 'env'
import { builApp } from 'app'

async function bootstrap(){
  const app = await builApp()
  await app.listen({port:env.PORT})
  console.log(`Server is runnig on port ${env.PORT}`)
}
bootstrap()