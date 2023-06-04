const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Simara Conceição',
        imagem: 'https://github.com/simaraconceicao.png',
        miniobio: 'Desenvolvedora e instrutora'
    },
    {
        nome: 'Iana Chan',
        imagem: 'https://www.mixpalestras.com.br/assets-custom/img/palestrantes/iana-chan_18122019_210638-G.jpg',
        minibio: 'Fundadora da PrograMaria'
    },
    {
        nome: 'Nina da hora',
        imagem: 'https://conteudo.imguol.com.br/c/noticias/47/2020/07/12/ana-carolina-da-hora-hackear-o-racismo-1594591816588_v2_1x1.jpg',
        minibio: 'Hacker antirracista'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)