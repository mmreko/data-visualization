// server parameters
const serverSettings = {
	port: 5000
}

// user management service parameters
const sensorManagementOptions = {
	host: "192.168.99.100",
	port: 5001
}

module.exports = Object.assign({}, { serverSettings, sensorManagementOptions })