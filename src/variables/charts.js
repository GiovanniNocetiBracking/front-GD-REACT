let chart1_2_options = {
	maintainAspectRatio: false,
	legend: {
		display: false,
	},
	tooltips: {
		backgroundColor: "#f5f5f5",
		titleFontColor: "#333",
		bodyFontColor: "#666",
		bodySpacing: 4,
		xPadding: 12,
		mode: "nearest",
		intersect: 0,
		position: "nearest",
	},
	responsive: true,
	scales: {
		yAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: "rgba(29,140,248,0.0)",
					zeroLineColor: "transparent",
				},
				ticks: {
					suggestedMin: 0,
					suggestedMax: 40,
					padding: 20,
					fontColor: "#9a9a9a",
				},
			},
		],
		xAxes: [
			{
				barPercentage: 1.6,
				gridLines: {
					drawBorder: false,
					color: "rgba(29,140,248,0.1)",
					zeroLineColor: "transparent",
				},
				ticks: {
					padding: 20,
					fontColor: "#9a9a9a",
				},
			},
		],
	},
};

let chart1 = {
	options: chart1_2_options,
};
let chart2 = {
	options: chart1_2_options,
};
let chart3 = {
	options: {
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		tooltips: {
			backgroundColor: "#f5f5f5",
			titleFontColor: "#333",
			bodyFontColor: "#666",
			bodySpacing: 4,
			xPadding: 12,
			mode: "nearest",
			intersect: 0,
			position: "nearest",
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					gridLines: {
						drawBorder: false,
						color: "rgba(225,78,202,0.1)",
						zeroLineColor: "transparent",
					},
					ticks: {
						suggestedMin: 60,
						suggestedMax: 120,
						padding: 20,
						fontColor: "#9e9e9e",
					},
				},
			],
			xAxes: [
				{
					gridLines: {
						drawBorder: false,
						color: "rgba(225,78,202,0.1)",
						zeroLineColor: "transparent",
					},
					ticks: {
						padding: 20,
						fontColor: "#9e9e9e",
					},
				},
			],
		},
	},
};
const chart4 = {
	options: {
		maintainAspectRatio: false,
		legend: {
			display: false,
		},

		tooltips: {
			backgroundColor: "#f5f5f5",
			titleFontColor: "#333",
			bodyFontColor: "#666",
			bodySpacing: 4,
			xPadding: 12,
			mode: "nearest",
			intersect: 0,
			position: "nearest",
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: "rgba(29,140,248,0.0)",
						zeroLineColor: "transparent",
					},
					ticks: {
						suggestedMin: 50,
						suggestedMax: 125,
						padding: 20,
						fontColor: "#9e9e9e",
					},
				},
			],

			xAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: "rgba(0,242,195,0.1)",
						zeroLineColor: "transparent",
					},
					ticks: {
						padding: 20,
						fontColor: "#9e9e9e",
					},
				},
			],
		},
	},
};

module.exports = {
	chart1,
	chart2,
	chart3,
	chart4,
};
