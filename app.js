const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['4', 'siguiente']).addAnswer(['Digite *voltar*'])

const flowDocs = addKeyword(['1', 'agendamento', 'agenda']).addAnswer(
    [
        '📅 Para agendamento clique no link abaixo:',
        'https://bit.ly/AgendamentoMinero',
        '\n*4* Para retornar.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*4* Para retornar.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['2', 'valores']).addAnswer(
    [
        '💸 *Valores*',
        '*Corte* : R$30,00',
        '*Barba* : R$30,00',
        '\n*4* Para retornar.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['Localização', '3']).addAnswer(
    ['📍 Segue link para localização ', 'https://goo.gl/maps/o1sj3Ev3PCFa2cLRA', '\n*4* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['ola', 'olá', 'oi', 'opa', 'voltar'])
    .addAnswer('💈  Olá bem vindo a *Barbearia Mineiro* 💈 ')
    .addAnswer(
        [
            'Digite o número de uma das opções abaixo:',
            '👉 *1* Para agendamentos',
            '👉 *2* Valores',
            '👉 *3* Localização',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
