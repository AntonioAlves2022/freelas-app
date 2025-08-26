import  Fastify  from 'fastify'

export async function builApp(){
  const app = Fastify({logger:true})

  app.get('/api', ()=>{
    return {message: 'Hi People'}
  })
  
  return app
}