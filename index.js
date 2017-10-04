const express = require('express');		//importa o framework 'express'


let app = express();			//inicia o framework 'express'

app.use(express.static('public'));						//passa como parametro os arquivos estaticos utilizados

app.get('/teste', (req, res) => {

	res.send('it works!');		//envia como resposta no browser a msg
});

app.listen(3000, () => {
	console.log('UP');
});