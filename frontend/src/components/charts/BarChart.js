import react from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Bar } from "react-chartjs-2";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { hex2rgb } from "./../../utils/hex2rgb";

const dummyData = {
	"Data Set": [10, 5, 18, 12, 23, 15, 23, 41, 9, 12, 21, 3, 26, 14, 18],
};
const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(2),
	},
	chart: {
		height: "45vh",
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			height: "70vh",
		},
	},
}));

export const BarChart = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const chartFills = theme.chartFills.map((i) => hex2rgb(i));

	let dataObject = {
		labels: [
			"Person 1",
			"Person 2",
			"Person 3",
			"Person 4",
			"Person 5",
			"Person 6",
			"Person 7",
			"Person 8",
			"Person 9",
			"Person 10",
			"Person 11",
			"Person 12",
			"Person 13",
			"Person 14",
			"Person 15",
		],
		datasets: [],
	};

	Object.keys(dummyData).map((dataSet, index) => {
		dataObject.datasets = dataObject.datasets.concat({
			label: dataSet,
			backgroundColor: `rgba(${chartFills[index].r}, ${chartFills[index].g}, ${chartFills[index].b}, 0.3)`,
			borderColor: `rgba(${chartFills[index].r}, ${chartFills[index].g}, ${chartFills[index].b}, 0.8)`,
			borderWidth: 1,
			barPercentage: isMobile ? 0.9 : 0.5,
			data: dummyData[dataSet],
		});
	});

	return (
		<div className={classes.chart}>
			<Bar
				data={dataObject}
				options={{
					maintainAspectRatio: false,
					plugins: {
						crosshair: false,
					},
				}}
			/>
		</div>
	);
};
