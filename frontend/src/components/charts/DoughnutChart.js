import react from "react";
import { Doughnut } from "react-chartjs-2";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { hex2rgb } from "./../../utils/hex2rgb";

const dummyData = [10, 5, 18, 12, 23, 15, 23, 41, 9, 12, 21, 3, 26, 14, 18];

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(2),
	},
	chart: {
		height: "45vh",
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			height: "55vh",
		},
	},
}));

export const DoughnutChart = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const chartFills = theme.chartFills.map((i) => hex2rgb(i));

	let dataObject = {
		labels: [
			"data set 1",
			"data set 2",
			"data set 3",
			"data set 4",
			"data set 5",
			"data set 6",
			"data set 7",
			"data set 8",
			"data set 9",
			"data set 10",
			"data set 11",
			"data set 12",
			"data set 13",
			"data set 14",
			"data set 15",
		],
		datasets: [],
	};

	dataObject.datasets = dataObject.datasets.concat({
		backgroundColor: chartFills.map((i) => `rgba(${i.r}, ${i.g}, ${i.b}, 0.5)`),
		borderColor: "rgba(122, 196, 239,0.3)",
		borderWidth: 0.5,
		data: dummyData,
	});

	return (
		<div className={classes.chart}>
			<Doughnut
				data={dataObject}
				options={{ maintainAspectRatio: false, cutoutPercentage: 70 }}
			/>
		</div>
	);
};
