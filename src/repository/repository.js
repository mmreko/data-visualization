'use strict'
const http = require('http')
const sensorManagementOptions = require('../config/config').sensorManagementOptions

const repository = () => {
	
	// calls sensor management service to fetch all sensor data
	const visualizeAll = () => {
		return new Promise((resolve, reject) => {
			
			let result
			let data = []
			
			let visualizationData = {
				s2016: 0,
				s2017: 0,
				s2018: 0,
				bluetooth: 0,
				stepCount: 0,
				activity: 0,
				location: 0,
				userApps: 0,
				setting: 0,
				germany: 0,
				france: 0,
				italy: 0,
				denmark: 0,
				switzerland: 0,
				steps1: 0,
				steps2: 0,
				steps3: 0,
				steps4: 0,
				steps5: 0
			}
			
			const options = {
				host: sensorManagementOptions.host,
				port: sensorManagementOptions.port,
				path: "/sensors",
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
			
			const extractVisualizationData = (data) => {
				
				data.forEach(item => {
					switch(item.seasonId) {
						case 'S2016DE':
							visualizationData.s2016++
							break
						case 'S2017DE':
							visualizationData.s2017++
							break
						case 'S2018DE':
							visualizationData.s2018++
							break
					}
					
					switch(item.type) {
						case 'bluetooth':
							visualizationData.bluetooth++
							break
						case 'stepCount':
							visualizationData.stepCount++
							break
						case 'activity':
							visualizationData.activity++
							break
						case 'location':
							visualizationData.location++
							break
						case 'userApps':
							visualizationData.userApps++
							break
						case 'setting':
							visualizationData.setting++
							break
					}
					
					switch(item.data.mostFrequentCountry) {
						case 'Germany':
							visualizationData.germany++
							break
						case 'France':
							visualizationData.france++
							break
						case 'Italy':
							visualizationData.italy++
							break
						case 'Denmark':
							visualizationData.denmark++
							break
						case 'Switzerland':
							visualizationData.switzerland++
							break
					}
					
					if (item.data.count < 1000) visualizationData.steps1++
					else if (item.data.count >= 1000 && item.data.count < 2000) visualizationData.steps2++
					else if (item.data.count >= 2000 && item.data.count < 3000) visualizationData.steps3++
					else if (item.data.count >= 3000 && item.data.count < 4000) visualizationData.steps4++
					else if (item.data.count >= 4000) visualizationData.steps5++
				})
			}
			
			const req = http.request(options, (res) => {
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					data.push(chunk)
				});
				res.on('end', () => {
					result = JSON.parse(data.join(''));
					if (result == null) {
						resolve(null)
					}
					extractVisualizationData(result)
					resolve(visualizationData)
				});
			});

			req.on('error', (e) => {
				console.error(`Problem with request: ${e.message}`);
			});

			req.end();
		})
	}
	
	return Object.create({
		visualizeAll
	})
	
}

const connect = () => {
	return new Promise((resolve, reject) => {
		resolve(repository())
	})
}

module.exports = Object.assign({}, {connect})