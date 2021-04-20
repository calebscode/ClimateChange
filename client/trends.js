function numTuples() {
	fetch(`http://localhost:4000/total`)
		.then(response => response.json())
		.then((result) => {
			alert(`Total tuples in database: ${result[0].TOTAL}`);
		})

}


function getTrendOne() {
	let startYear = document.getElementById("startYear").value;
	let endYear = document.getElementById("endYear").value;

	if (startYear == 0) {
		// if the input is default, change to earliest year in database
		startYear = 1985;
	}
	if (endYear == 0) {
		// if the input is default, change to earliest year in database
		endYear = 2021;
	}



	fetch(`http://localhost:4000/trend1`)
		.then(response => response.json())
		.then((result) => {
			// console.log({
//				result
//			});

			for (let i = 0; i < 35; i++) {
				removeData(myChart);
			}

			result.forEach((tuple) => {
				if (tuple.YEAR_ >= startYear && tuple.YEAR_ <= endYear) {
					let newTuple = {
						x: tuple.SOLAR_PV_MODULE_COST_2019_USD_PER_W,
						y: Math.log(tuple.ELECTRICITY_FROM_SOLAR_TWH)
					}

					// console.log(newTuple);

					addData(myChart, newTuple.x, newTuple.y);
				}
			});
		})
		.catch(err => {
			console.error(err)
		});
}

function getTrendTwo() {
	let startYear = document.getElementById("startYear").value;
	let endYear = document.getElementById("endYear").value;

	if (startYear == 0) {
		// if the input is default, change to earliest year in database
		startYear = 1985;
	}
	if (endYear == 0) {
		// if the input is default, change to earliest year in database
		endYear = 2021;
	}

	fetch(`http://localhost:4000/trend2`)
		.then(response => response.json())
		.then((result) => {
			// console.log({
//				result
//			});

			for (let i = 0; i < 35; i++) {
				removeData(myChart);
			}

			result.forEach((tuple) => {
				if (tuple.YEAR_ >= startYear && tuple.YEAR_ <= endYear) {
					let newTuple = {
						x: tuple.INVESTMENT_IN_RENEWABLES_USD,
						y: tuple.CO2_GROWTH_ABS
					}

					// console.log(newTuple);

					addData(myChart, newTuple.x, newTuple.y);
				}
			});
		})
		.catch(err => {
			console.error(err)
		});
}

function getTrendThree() {
	let startYear = document.getElementById("startYear").value;
	let endYear = document.getElementById("endYear").value;

	if (startYear == 0) {
		// if the input is default, change to earliest year in database
		startYear = 1985;
	}
	if (endYear == 0) {
		// if the input is default, change to earliest year in database
		endYear = 2021;
	}



	fetch(`http://localhost:4000/trend3`)
		.then(response => response.json())
		.then((result) => {
			// console.log({
//				result
//			});

			for (let i = 0; i < 27; i++) {
				removeData(myChart);
			}

			result.forEach((tuple) => {
				if (tuple.YEAR_ >= startYear && tuple.YEAR_ <= endYear) {
					let newTuple = {
						x: tuple.ELECTRICITY_FROM_FOSSIL_FUELS_TWH,
						y: tuple.CO2_GROWTH_ABS
					}

					// console.log(newTuple);

					addData(myChart, newTuple.x, newTuple.y);
				}
			});
		})
		.catch(err => {
			console.error(err)
		});
}

function getTrendFour() {
	let startYear = document.getElementById("startYear").value;
	let endYear = document.getElementById("endYear").value;

	if (startYear == 0) {
		// if the input is default, change to earliest year in database
		startYear = 1985;
	}
	if (endYear == 0) {
		// if the input is default, change to earliest year in database
		endYear = 2021;
	}

	fetch(`http://localhost:4000/trend4`)
		.then(response => response.json())
		.then((result) => {
			// console.log({
//				result
//			});

			for (let i = 0; i < 27; i++) {
				removeData(myChart);
			}

			result.forEach((tuple) => {
				if (tuple.YEAR_ >= startYear && tuple.YEAR_ <= endYear) {
					let newTuple = {
						x: tuple.ACCESS_TO_ELECTRICITY_OF_POPULATION,
						y: tuple.CO2_GROWTH_ABS
					}

					// console.log(newTuple);

					addData(myChart, newTuple.x, newTuple.y);
				}
			});
		})
		.catch(err => {
			console.error(err)
		});
}

function getTrendFive() {
	let startYear = document.getElementById("startYear").value;
	let endYear = document.getElementById("endYear").value;

	if (startYear == 0) {
		// if the input is default, change to earliest year in database
		startYear = 1985;
	}
	if (endYear == 0) {
		// if the input is default, change to earliest year in database
		endYear = 2021;
	}



	fetch(`http://localhost:4000/trend5`)
		.then(response => response.json())
		.then((result) => {
			// console.log({
//				result
//			});

			for (let i = 0; i < 50; i++) {
				removeData(myChart);
			}

			result.forEach((tuple) => {
				if (tuple.YEAR_ >= startYear && tuple.YEAR_ <= endYear) {
					let newTuple = {
						x: tuple.RENEWABLES_PER_CAPITA_KWH,
						y: tuple.PER_CAPITA_CO2_EMISSIONS_TONNES
					}

					// console.log(newTuple);

					addData(myChart, newTuple.x, newTuple.y);
				}
			});
		})
		.catch(err => {
			console.error(err)
		});
}

function addData(chart, label, data) {
	chart.data.labels.push(label);
	chart.data.datasets.forEach((dataset) => {
		dataset.data.push(data);
	});
	chart.update();
}

function removeData(chart) {
	chart.data.labels.pop();
	chart.data.datasets.forEach((dataset) => {
		dataset.data.pop();
	});
	chart.update();
}