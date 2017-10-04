const express = require('express');		//importa o framework 'express'
const sqlite3 = require('sqlite3');		//importa o 'sqlite3'



let app = express();					//inicia o framework 'express'
let db = new sqlite3.Database('./database.sqlite');

app.use(express.static('public'));		//passa como parametro os arquivos estaticos utilizados

app.get('/sites', (req, res) => {

	const query = ` SELECT site.*, historico_site.status
					FROM site 
					LEFT JOIN historico_site ON historico_site.site_id = site.id GROUP BY site.id ORDER BY site.id`;

	db.all(query, (err, row) => {

		if (err) {
			return res.send('erro');
		}
		res.setHeader('Content-type', 'application/json');
		res.send(row);
	});

	// res.send('it works!');				//envia como resposta no browser a msg
});

app.listen(3000, () => {
	console.log('UP and running');
});