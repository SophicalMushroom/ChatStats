import react from "react";
import { Line, Chart } from "react-chartjs-2";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { hex2rgb } from "./../../utils/hex2rgb";
import "chartjs-plugin-crosshair";

const dummyData = {
	"data set 1": [3, 10, 5, 2, 20, 30, 45],
	"data set 2": [0, 15, 3, 13, 50, 25, 32],
	"data set 3": [22, 2, 22, 35, 27, 27, 34],
	"data set 4": [34, 17, 1, 1, 45, 37, 14],
	"data set 5": [1, 27, 3, 43, 17, 11, 42],
	"data set 6": [15, 42, 31, 56, 24, 16, 2],
	"data set 7": [3, 16, 28, 4, 47, 0, 12],
	"data set 8": [1, 38, 15, 24, 22, 48, 20],
	"data set 9": [16, 24, 4, 27, 42, 22, 48],
	"data set 10": [16, 29, 31, 48, 32, 7, 32],
	"data set 11": [4, 21, 22, 3, 30, 27, 18],
	"data set 12": [23, 32, 9, 27, 38, 42, 6],
	"data set 13": [27, 10, 41, 24, 34, 38, 14],
	"data set 14": [12, 27, 0, 3, 50, 28, 36],
	"data set 15": [27, 10, 41, 24, 34, 38, 14],
};
const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(2),
	},
	chart: {
		height: "50vh",
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			height: "75vh",
		},
	},
}));

export const LineChart = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const chartFills = theme.chartFills.map((i) => hex2rgb(i));

	let dataObject = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
		datasets: [],
	};

	Object.keys(dummyData).map((dataSet, index) => {
		dataObject.datasets = dataObject.datasets.concat({
			label: dataSet,
			backgroundColor: `rgba(${chartFills[index].r}, ${chartFills[index].g}, ${chartFills[index].b}, 0.1)`,
			borderColor: `rgba(${chartFills[index].r}, ${chartFills[index].g}, ${chartFills[index].b}, 0.6)`,
			borderWidth: 1,
			pointRadius: 0,
			data: dummyData[dataSet],
		});
	});

	return (
		<div className={classes.chart}>
			<Line
				data={dataObject}
				options={{
					maintainAspectRatio: false,
					tooltips: {
						mode: "interpolate",
						intersect: false,
					},
					plugins: {
						crosshair: {
							line: {
								color: theme.palette.text.primary,
								width: 1,
							},
							zoom: {
								enabled: false,
							},
						},
					},
				}}
			/>
		</div>
	);
};
