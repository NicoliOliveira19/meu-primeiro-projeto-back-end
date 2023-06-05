const express = require("express")//aqui estou iniciando o express
const router = express.Router()//aqui estou configurando a primeira parte da rota
const cors = require('cors')//aqui estou trazendo o pacote cors que permite consumir essa api no front-end

const conectaBancoDeDados = require('./bancoDeDados')//aqui estou ligando ao arquivo banco de dados
conectaBancoDeDados()//estou chamando a função que conecta o banco de dados

const mulher = require('./mulherModel')

const app = express()//aqui estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333//aqui estou criando a porta


//GET
async function mostraMulheres(request, response) {
    try{
        const mulheresVindasDoBancoDeDados = await mulher.find()

        response.json(mulheresVindasDoBancoDeDados)

    }catch(erro){
        console.log(erro)

    }

}

//POST
async function criaMulher(request, response){
    const novaMulher = new mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)

    } catch(erro){
        console.log(erro)
    }
        
}

//PATCH
async function corrigeMulher(request,response){
    try {
        const mulherEncontrada = await mulher.findById(request.params.id)

        if(request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
    
        if(request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if(request.body.imagem){
            mulherEncontrada = request.body.imagem
        }  
        
        if(request.body.citacao){
            mulherEncontrada = request.body.citacao
        }  
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }

}

//DELETE
async function deletaMulher(request,response){
    try {

        await mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso!'})

    } catch(erro){
        console.log(erro)
    }
}

//PORTA
function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))//COFIGUREI ROTA GET/MULHERES
app.use(router.post('/mulheres',criaMulher))//configurei rota POST/mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))//configurei a rota PATCH/MULHERES/:ID
app.use(router.delete('/mulheres/:id', deletaMulher))//configurei a rota DELETE/Mulheres/:ID
app.listen(porta, mostraPorta)//SERVIDOR OUVINDO A PORTA