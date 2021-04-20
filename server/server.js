// Import packages
var oracledb = require('oracledb');
var express = require('express');
var morgan = require('morgan');
var cors = require('cors')

// Set up dotenv
require('dotenv').config()
var PORT = process.env.PORT | 4000;

// Create app
var app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny'));
initOracle();

// console.log(process.env.DB_HOST)
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)

// Tell oracledb where to look for the client binaries

// Start express app
app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}...`);
});

// GET '/' returns some text
app.get('/', function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.write("Server is running...");
	res.end();
});

// GET '/test' returns some sample tuples to check DB connection
app.get('/test', function (req, res) {

	handleDatabaseOperation(req, res, function (request, response, connection) {

		var SELECTStatement = `SELECT * FROM PROJECT_TEST`;

		connection.execute(SELECTStatement, [], {
			outFormat: oracledb.OBJECT // Return the result as Object
		}, function (err, result) {
			if (err) {
				console.log('Error in execution of SELECT statement: ' + err.message);
				response.writeHead(500, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify({
					status: 500,
					message: "Error performing test SELECT",
					detailed_message: err.message
				}));
			} else {								
				console.log(`DB Response: ${result.rows.length} rows returned with ${result.metaData.length} columns.`);
				response.writeHead(200, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify(result.rows));
			}
			doRelease(connection);
		});
	});
});

// GET '/trend1' returns trend 1 data
app.get('/trend1', function (req, res) {
	var trendIdentifier = req.params.trendId;

	handleDatabaseOperation(req, res, function (request, response, connection) {

		var SELECTStatement = `select G32_Global_AVG_Solar_Prices.SOLAR_PV_MODULE_COST_2019_USD_PER_W, G32_Solar_Consumption.Year_,
		G32_Solar_Consumption.ELECTRICITY_FROM_SOLAR_TWH
		from G32_Global_AVG_Solar_Prices, G32_Solar_Consumption
		where G32_Global_AVG_Solar_Prices.region = 'World'
		and G32_Solar_Consumption.region = 'World'
		and G32_Global_AVG_Solar_Prices.year_ >= 1985
		and G32_Global_AVG_Solar_Prices.year_ <= 2021
		and G32_Solar_Consumption.year_ >= 1985
		and G32_Solar_Consumption.year_ <= 2021
		and G32_Global_AVG_Solar_Prices.year_ = G32_Solar_Consumption.year_`;

		connection.execute(SELECTStatement, [], {
			outFormat: oracledb.OBJECT // Return the result as Object
		}, function (err, result) {
			if (err) {
				console.log('Error in execution of SELECT statement 1: ' + err.message);
				response.writeHead(500, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify({
					status: 500,
					message: "Error getting trend",
					detailed_message: err.message
				}));
			} else {
				// 				console.log(`DB response is ready: ${result.rows}`);
				response.writeHead(200, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify(result.rows));
			}
			doRelease(connection);
		});
	});
});

// GET '/trend2' returns trend 2 data
app.get('/trend2', function (req, res) {
	var trendIdentifier = req.params.trendId;

	handleDatabaseOperation(req, res, function (request, response, connection) {

		var SELECTStatement = `select G32_INVESTMENT_IN_RENEWABLE_ENERGY_USD.YEAR_, G32_INVESTMENT_IN_RENEWABLE_ENERGY_USD.INVESTMENT_IN_RENEWABLES_USD, G32_C02_Dataset.CO2_GROWTH_ABS
		from G32_INVESTMENT_IN_RENEWABLE_ENERGY_USD, G32_C02_Dataset
		where G32_INVESTMENT_IN_RENEWABLE_ENERGY_USD.region = 'United States of America'
		and G32_C02_Dataset.country = 'United States'
		and G32_INVESTMENT_IN_RENEWABLE_ENERGY_USD.year_ >= 2004
		and G32_INVESTMENT_IN_RENEWABLE_ENERGY_USD.year_ <= 2015
		and G32_C02_Dataset.year_ >= 2004
		and G32_C02_Dataset.year_ <= 2015
		and G32_INVESTMENT_IN_RENEWABLE_ENERGY_USD.year_ = G32_C02_Dataset.year_`;

		connection.execute(SELECTStatement, [], {
			outFormat: oracledb.OBJECT // Return the result as Object
		}, function (err, result) {
			if (err) {
				console.log('Error in execution of SELECT statement 1: ' + err.message);
				response.writeHead(500, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify({
					status: 500,
					message: "Error getting trend",
					detailed_message: err.message
				}));
			} else {
				// 				console.log(`DB response is ready: ${result.rows}`);
				response.writeHead(200, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify(result.rows));
			}
			doRelease(connection);
		});
	});
});

// GET '/trend3' returns trend 3 data
app.get('/trend3', function (req, res) {
	var trendIdentifier = req.params.trendId;

	handleDatabaseOperation(req, res, function (request, response, connection) {

		var SELECTStatement = `select G32_ELECTRICITY_GENERATION_FROM_FOSSILE_FUELS.YEAR_, G32_ELECTRICITY_GENERATION_FROM_FOSSILE_FUELS.ELECTRICITY_FROM_FOSSIL_FUELS_TWH, G32_C02_Dataset.CO2_GROWTH_ABS
		from G32_ELECTRICITY_GENERATION_FROM_FOSSILE_FUELS, G32_C02_Dataset
		where G32_ELECTRICITY_GENERATION_FROM_FOSSILE_FUELS.region = 'World'
		and G32_C02_Dataset.country = 'World'
		and G32_ELECTRICITY_GENERATION_FROM_FOSSILE_FUELS.year_ >= 1985
		and G32_ELECTRICITY_GENERATION_FROM_FOSSILE_FUELS.year_ <= 2020
		and G32_C02_Dataset.year_ >= 1985
		and G32_C02_Dataset.year_ <= 2020
		and G32_ELECTRICITY_GENERATION_FROM_FOSSILE_FUELS.year_ = G32_C02_Dataset.year_`;

		connection.execute(SELECTStatement, [], {
			outFormat: oracledb.OBJECT // Return the result as Object
		}, function (err, result) {
			if (err) {
				console.log('Error in execution of SELECT statement 1: ' + err.message);
				response.writeHead(500, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify({
					status: 500,
					message: "Error getting trend",
					detailed_message: err.message
				}));
			} else {
				// 				console.log(`DB response is ready: ${result.rows}`);
				response.writeHead(200, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify(result.rows));
			}
			doRelease(connection);
		});
	});
});

// GET '/trend4' returns trend 4 data
app.get('/trend4', function (req, res) {
	var trendIdentifier = req.params.trendId;

	handleDatabaseOperation(req, res, function (request, response, connection) {
		var SELECTStatement = `select G32_PERCENT_POPULATION_WITH_ELECTRICITY_ACCESS.YEAR_, G32_PERCENT_POPULATION_WITH_ELECTRICITY_ACCESS.ACCESS_TO_ELECTRICITY_OF_POPULATION, G32_C02_Dataset.CO2_GROWTH_ABS
		from G32_PERCENT_POPULATION_WITH_ELECTRICITY_ACCESS, G32_C02_Dataset
		where G32_PERCENT_POPULATION_WITH_ELECTRICITY_ACCESS.region = 'World'
		and G32_C02_Dataset.country = 'World'
		and G32_PERCENT_POPULATION_WITH_ELECTRICITY_ACCESS.year_ >= 1990
		and G32_PERCENT_POPULATION_WITH_ELECTRICITY_ACCESS.year_ <= 2016
		and G32_C02_Dataset.year_ >= 1990
		and G32_C02_Dataset.year_ <= 2016
		and G32_PERCENT_POPULATION_WITH_ELECTRICITY_ACCESS.year_ = G32_C02_Dataset.year_`;

		connection.execute(SELECTStatement, [], {
			outFormat: oracledb.OBJECT // Return the result as Object
		}, function (err, result) {
			if (err) {
				console.log('Error in execution of SELECT statement 1: ' + err.message);
				response.writeHead(500, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify({
					status: 500,
					message: "Error getting trend",
					detailed_message: err.message
				}));
			} else {
				// 				console.log(`DB response is ready: ${result.rows}`);
				response.writeHead(200, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify(result.rows));
			}
			doRelease(connection);
		});
	});
});

// GET '/trend5' returns trend 5 data
app.get('/trend5', function (req, res) {
	var trendIdentifier = req.params.trendId;

	handleDatabaseOperation(req, res, function (request, response, connection) {

		var SELECTStatement = `select G32_RENEWABLES_CONSUMPTION_PER_CAPITA.YEAR_, G32_RENEWABLES_CONSUMPTION_PER_CAPITA.RENEWABLES_PER_CAPITA_KWH, G32_CO2_EMISSIONS_PER_CAPITA.PER_CAPITA_CO2_EMISSIONS_TONNES
		from G32_RENEWABLES_CONSUMPTION_PER_CAPITA, G32_CO2_EMISSIONS_PER_CAPITA
		where G32_RENEWABLES_CONSUMPTION_PER_CAPITA.region = 'World'
		and G32_CO2_EMISSIONS_PER_CAPITA.region = 'World'
		and G32_RENEWABLES_CONSUMPTION_PER_CAPITA.year_ >= 1970
		and G32_RENEWABLES_CONSUMPTION_PER_CAPITA.year_ <= 2019
		and G32_CO2_EMISSIONS_PER_CAPITA.year_ >= 1970
		and G32_CO2_EMISSIONS_PER_CAPITA.year_ <= 2019
		and G32_RENEWABLES_CONSUMPTION_PER_CAPITA.year_ = G32_CO2_EMISSIONS_PER_CAPITA.year_`;

		connection.execute(SELECTStatement, [], {
			outFormat: oracledb.OBJECT // Return the result as Object
		}, function (err, result) {
			if (err) {
				console.log('Error in execution of SELECT statement 1: ' + err.message);
				response.writeHead(500, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify({
					status: 500,
					message: "Error getting trend",
					detailed_message: err.message
				}));
			} else {
				// 				console.log(`DB response is ready: ${result.rows}`);
				response.writeHead(200, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify(result.rows));
			}
			doRelease(connection);
		});
	});
});

// GET '/total' returns total number of tuples in database
app.get('/total', function (req, res) {
	var trendIdentifier = req.params.trendId;

	handleDatabaseOperation(req, res, function (request, response, connection) {

		var SELECTStatement = `select sum(cnt.a) as total
		from
		(
			select count(*) as a from G32_Access_To_Clean_Fuels_And_Tech_For_Cooking
			union all
			select count(*) as a from G32_Annual_Change_Hydro 
			union all
			select count(*) as a from G32_Annual_Change_Renewables
			union all
			select count(*) as a from G32_Annual_Change_Solar
			union all
			select count(*) as a from G32_Annual_Change_Wind
			union all
			select count(*) as a from G32_Annual_Percentage_Change_Hydro
			union all
			select count(*) as a from G32_Annual_Percent_Change_Renewables
			union all
			select count(*) as a from G32_Annual_Percent_Change_Solar
			union all
			select count(*) as a from G32_Annual_Percent_Change_Wind
			union all
			select count(*) as a from G32_Biofuels_Production
			union all
			select count(*) as a from G32_CO2_Emissions_Per_Capita
			union all
			select count(*) as a from G32_Cummulative_Marinne_Energy_Capacity
			union all
			select count(*) as a from G32_Global_Hydro_Consumption
			union all
			select count(*) as a from G32_Hydro_Consumption_By_Region
			union all
			select count(*) as a from G32_Percent_Primary_Energy_From_Hydro
			union all
			select count(*) as a from G32_Installed_Geothermal_Capacity
			union all
			select count(*) as a from G32_Installed_Renewable_Energy_Capacity_From_Energy_Tech
			union all
			select count(*) as a from G32_Installed_Marine_Energy_Capacity
			union all
			select count(*) as a from G32_Installed_Renewable_Energy_Capacity_By_Region
			union all
			select count(*) as a from G32_Installed_Solar_Capacity
			union all
			select count(*) as a from G32_International_Financing_Received_For_Clean_Energy_Research_and_Development_Millions_USD
			union all
			select count(*) as a from G32_World_Investment_In_Renewable_Energy_By_Technology_Type_USD
			union all
			select count(*) as a from G32_Marine_Energy_Production
			union all
			select count(*) as a from G32_Modern_Renewable_Energy_Consumption
			union all
			select count(*) as a from G32_Modern_Renewable_Energy_Production
			union all
			select count(*) as a from G32_Patents_For_Renewables_By_Country
			union all
			select count(*) as a from G32_Hydro_Consumption_Per_Capita
			union all
			select count(*) as a from G32_Renewables_Consumption_Per_Capita
			union all
			select count(*) as a from G32_Solar_Consumption_Per_Capita
			union all
			select count(*) as a from G32_Wind_Energy_Consumption_Per_Capita
			union all
			select count(*) as a from G32_Primary_Energy_From_Solar
			union all
			select count(*) as a from G32_Primary_Energy_From_Hydro
			union all
			select count(*) as a from G32_Primary_Energy_From_Renewables
			union all
			select count(*) as a from G32_Primary_Energy_From_Wind
			union all
			select count(*) as a from G32_Renewable_Energy_Consumption
			union all
			select count(*) as a from G32_Renewable_Energy_Generation
			union all
			select count(*) as a from G32_Renewable_Energy_Investment_Percent_of_GDP 
			union all
			select count(*) as a from G32_Investment_In_Renewable_Energy_USD
			union all
			select count(*) as a from G32_Percent_Primary_Energy_From_Renewables
			union all
			select count(*) as a from G32_Percent_Final_Energy_Consumption_From_Renewables
			union all
			select count(*) as a from G32_Percent_Electricity_Production_From_Hydro
			union all
			select count(*) as a from G32_Percent_Electricity_Production_From_Renewables
			union all
			select count(*) as a from G32_Percent_Electricity_Production_From_Solar
			union all
			select count(*) as a from G32_Percent_Electricity_Production_From_Wind
			union all
			select count(*) as a from G32_Solar_Consumption_By_Region
			union all
			select count(*) as a from G32_Solar_Consumption
			union all
			select count(*) as a from G32_Solar_Panel_Cumulative_Capacity
			union all
			select count(*) as a from G32_Solar_Consumption_VS_Total_Capacity
			union all
			select count(*) as a from G32_Global_AVG_Solar_Prices
			union all
			select count(*) as a from G32_Percent_Primary_Energy_From_Solar
			union all
			select count(*) as a from G32_Wind_Energy_Consumption
			union all
			select count(*) as a from G32_Wind_Consumption_VS_Total_Capacity
			union all
			select count(*) as a from G32_Wind_Energy_Generation
			union all
			select count(*) as a from G32_Percent_Primary_Energy_From_Wind
			union all
			select count(*) as a from G32_C02_Dataset
			union all
			select count(*) as a from G32_Nuclear_Energy_Generation
			union all
			select count(*) as a from G32_Nuclear_Energy_Consumption_Per_Capita
			union all
			select count(*) as a from G32_Annual_Change_Nuclear
			union all
			select count(*) as a from G32_Electricity_Generation_From_Fossile_Fuels
			union all
			select count(*) as a from G32_Percent_Population_With_Electricity_Access
		)cnt`;

		connection.execute(SELECTStatement, [], {
			outFormat: oracledb.OBJECT // Return the result as Object
		}, function (err, result) {
			if (err) {
				console.log('Error in execution of SELECT statement 1: ' + err.message);
				response.writeHead(500, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify({
					status: 500,
					message: "Error getting trend",
					detailed_message: err.message
				}));
			} else {
				// 				console.log(`DB response is ready: ${result.rows}`);
				response.writeHead(200, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify(result.rows));
			}
			doRelease(connection);
		});
	});
});

// Initializes the oracledb client
function initOracle() {
	try {
		oracledb.initOracleClient({
			libDir: process.env.ORCL_PATH
		});
	} catch (err) {
		console.error('Whoops!');
		console.error(err);
		process.exit(1);
	}
}

// General function invoked by all GET requests
function handleDatabaseOperation(request, response, callback) {
	// console.log(request.method + ":" + request.url);
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	response.setHeader('Access-Control-Allow-Credentials', true);

	console.log(`Connecting to OracleDB at: ${process.env.DB_HOST}`);
	oracledb.getConnection({
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			connectString: process.env.DB_HOST
		},
		function (err, connection) {
			if (err) {
				console.log('Error connecting to OracleDB...');
				console.log('Error message ' + err.message);

				// Error connecting to DB
				response.writeHead(500, {
					'Content-Type': 'application/json'
				});
				response.end(JSON.stringify({
					status: 500,
					message: "Error connecting to DB",
					detailed_message: err.message
				}));
				return;
			}
			// do with the connection whatever was supposed to be done
			console.log('Connected to database!');
			callback(request, response, connection);
		});
}

// Ends database connection
function doRelease(connection) {
	connection.release(
		function (err) {
			if (err) {
				console.error(err.message);
			}
		});
}