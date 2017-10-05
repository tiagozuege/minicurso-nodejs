const express = require('express');		//importa o framework 'express'
const db = require('./app/db');
const crawler = require('./app/crawler');

crawler();

let app = express();					//inicia o framework 'express'


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

});


app.get('/historico', (req, res) => {

	const id = req.query.site_id;			//procura na requisicao get o parametro 'site_id'
	

	//consulta no bd o id que vem da req
	const query = `SELECT * FROM historico_site WHERE site_id = ${id}		
	ORDER BY id DESC LIMIT 10`;

	db.all(query, (err, row) => {

		if (err) {
			return res.status(500).send(err);
		}
		res.setHeader('Content-type', 'application/json');
		res.send(row);
	});


});

// app.post('/site', (req, res) => {

// 	const id = req.query.site_id;
	

// 	//consulta no bd o id que vem da req
// 	const query = `SELECT * FROM historico_site WHERE site_id = ${id}		
// 	ORDER BY id DESC LIMIT 10`;

// 	db.all(query, (err, row) => {

// 		if (err) {
// 			return res.status(500).send(err);
// 		}
// 		res.setHeader('Content-type', 'application/json');
// 		res.send(row);
// 	});


// });

app.listen(3000, () => {
	console.log('UP and running');
});