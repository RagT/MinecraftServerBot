const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
const https = require('https');
const { prefix, token, API_HOSTNAME, API_KEY, API_STAGE} = require('./config.json');

var startServer = function() {
	return apiCall('https://' + `${API_HOSTNAME}` + '/' + `${API_STAGE}` + '/start', 'post');
};

var stopServer = function() {
	return apiCall('https://' + `${API_HOSTNAME}` + '/' + `${API_STAGE}` + '/shutdown', 'post');
};

var forceStopServer = function() {
	return apiCall('https://' + `${API_HOSTNAME}` + '/' + `${API_STAGE}` + '/force-shutdown', 'post');
};

var serverStatus = function() {
	return apiCall('https://' + `${API_HOSTNAME}` + '/' + `${API_STAGE}` + '/status', 'get');
};

var apiCall = async function(url, method) {
	const config = {
        method: method,
        url: url,
        headers: {
 			'x-api-key': `${API_KEY}`
 		}
    }

    const promise = axios(config);

    const dataPromise = promise.then((response) => response.data);

    return dataPromise;
};

client.on('ready', () => {
 	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if(msg.channel.name === 'minecraftserver') {
		console.log(msg.content);
		if (msg.content === `${prefix}start`) {
		 	//Start the server
		 	startServer().then(data => {
			    msg.reply(data);
			})
			.catch(err => msg.reply(err)); 	
		}

		if(msg.content === `${prefix}status`) {
		 	//Get server status
		 	serverStatus().then(data => {
			    msg.reply(data);
			})
			.catch(err => msg.reply(err));
		}

		if(msg.content === `${prefix}stop`) {
		 	//Stop the server
		 	stopServer().then(data => {
			    msg.reply(data);
			})
			.catch(err => msg.reply(err));
		}

		if(msg.content === `${prefix}force-stop`) {
		 	//Stop the server even if other players are online
		 	forceStopServer().then(data => {
			    msg.reply(data);
			})
			.catch(err => msg.reply(err));
		}
	}	
});

client.login(`${token}`);
