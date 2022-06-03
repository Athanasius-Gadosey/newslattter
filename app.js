// jshint eversion: 6
const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
const https = require('https');

const app = express();

// Static Files
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(req, res){
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;

	let data = {
		members: [
			{
				email_address: email,
				status:'subscribed',
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	};

	const jsonData = JSON.stringify(data);

	const url = 'https://us9.api.mailchimp.com/3.0/lists/6e13b0c007';

	const options = {
		method:'POST',
		auth: 'kojo25:061b97bf2963ff3bb6b3f3d717cfbfb6-us9' //an authentication method
	}

	const request = https.request(url, options, function(response){

		if (response.statusCode === 200){
			res.sendFile(__dirname + '/success.html');
		}
		else {
			res.sendFile(__dirname + '/failure.html');
		}

		response.on('data', function(data){
			console.log(JSON.parse(data));
		})
	})

	// request.write(jsonData);
	request.end()

})

// REDIRECT PAGE
app.post('/failure', function(req, res){
	res.redirect('/')
})

app.listen(process.env.PORT || 2000,'127.0.0.1');



// API KEY
// 061b97bf2963ff3bb6b3f3d717cfbfb6-us9

// AUDIENCE ID
// 6e13b0c007