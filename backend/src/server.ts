import {env} from 'env'
import { builApp } from 'app'
import { console } from 'inspector'

// Função para testar a conexão com o postgresql
async function testDBConnection(app:any){
  try{
    await app.prisma.$connect()
    console.log('Connection done! 👍')
  }catch(error){
    console.error('Connection failed! ❌')
    process.exit(1)
  }
}
async function bootstrap(){
  const app = await builApp()
  await app.listen({port:env.PORT, host:'0.0.0.0'})
  await testDBConnection(app)
  console.log(`Server is runnig on port ${env.PORT}`)
}
bootstrap()