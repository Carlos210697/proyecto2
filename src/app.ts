import { createBot,createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowHola = addKeyword('hola').addAnswer('hola bienvenido')

const main = async () =>{
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http.server.post('/send-message',handleCtx(async(bot,req,res) =>{
        const body = req.body
        const message = body.message
        const mediaUrl = body.mediaUrl
        await bot.sendMessage('51972778552',message,{
            media: mediaUrl
        })
        res.end('esto es una terminal de polka')
    }))

    await createBot({
        flow: createFlow([flowHola]),
        database: new MemoryDB(),
        provider
    })
}

main()