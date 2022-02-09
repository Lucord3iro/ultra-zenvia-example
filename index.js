var express = require('express');
const axios = require("axios");
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

//Rota que recebe as mensagens do ZENVIA
app.post('/:target/api/zenvia', receiveZenvia);
app.post('/:target/api/ultra', receiveUltra);

//Função que recebe mensagem do ZENVIA e repassa para ULTRABOT para que seja tratado e dado um retorno
async function receiveZenvia(req, res, next){
    var message = req.param.message;
    const payload = {
        url:`https://ultrabotdev.mybluemix.net/${message.number}/api/message`,
        method:'POST',
        data:message
    }
    
    await axios(payload);
}
//Função que recebe mensagem de resposta do ULTRABOT para que seja tratado e dado um retorno ao ZENVIA
async function receiveUltra(req, res, next){
    var message = req.param.message;
    const response = await sendUltra(message.number, message);
    /*Caso a resposta de solicitação ao ULTRABOT tenha ( transbordo = true )
    é porque foi solicitado falar com atendente*/
    if(response.transbordo){
        newChatSession()
    }else{
        const payload = {
            url:proccess.env.ZENVIA_API,
            method:'POST',
            data:message,
            headers: {
                "cache-control": "no-cache",
                "content-type": "application/json",
                "X-API-TOKEN": this._zenviaOpt.zenviaToken,
              },
        }
        await axios(payload)
    }
}

function newChatSession(){
    //Uma nova sessão do LiveChat...
}
//Função que envia mensagem para LiveChat
function sendMessage(){
 
}


app.listen(3000, function () {
    console.log('Server listening on port: 3000');
  });
  
  
  module.exports = app;