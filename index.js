const { Client, LocalAuth  } = require('whatsapp-web.js'); //importando o cliente e o autentificador local do whatsapp-web.js
const qrcode = require('qrcode-terminal'); //importando o qr code terminal para que seja possivel fazer a conexão do whatsapp

//fazendo a configuração do cliente
const client = new Client({
  authStrategy: new LocalAuth(), //autentificador local para que ao reiniciar o bot ele não precise ficar se conectando
  //configuração para ajustar um erro de versão que estava dando (peguei do discord que estava na documentação)
  webVersion: '2.2409.2', 
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html'
  }
});

//iniciando o client
client.on('ready', () => {
    console.log('Client is ready!'); //mensagem que será exibida quando o bot for iniciado
});

//criando o qr code para conexão com o whatsapp web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true}); //imprimindo no terminal o qr code do whatsapp web
});

//pegando mensagens do whatsapp e enviando alguma resposta
//usando o message_create irá funcionar para fazer testes em grupos sozinhos, porém usando somente o 'message' como parametro funcionará apenas quando o usuário receber mensagem de outras pessoas
client.on('message_create', message => {
  //message.body são as mensagens que o usuário esta recebendo  
  if (message.body === "teste"){ // tentando pegar uma mensagem teste
    client.sendMessage(message.from, 'mensagem de teste do chatbot de whatsapp') //mensagem que será enviada caso o usuário receba a mensagem acima
  }

  //caso o usuário receba a mensagem !ping será enviado como resposta pong
	if (message.body === '!ping') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'pong');
	}
});

//iniciando o cliente
client.initialize();
