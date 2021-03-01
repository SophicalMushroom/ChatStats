import { Fragment, useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { StatCard } from "./miscellaneous/StatCard";
import { DesktopAppBar } from "./navigation/DesktopAppBar";
import { Card } from "./miscellaneous/Card";
import { Filters } from "./miscellaneous/Filters";
import { Footer } from "./miscellaneous/Footer";
import { Line, Doughnut, Bar } from "react-chartjs-2";

const dataLine = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "My First dataset",
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgb(255, 99, 132)",
			data: [3, 10, 5, 2, 20, 30, 45],
		},
	],
};
const dataPie1 = {
	labels: [
		"Gilbert Chui",
		"Smit Patel",
		"Chedy Sankar",
		"Alex Greff",
		"Tony Attalla",
		"Alex Andros",
	],
	datasets: [
		{
			data: [10, 5, 18, 12, 23, 15],
			backgroundColor: ["Red", "Yellow", "Blue", "Green", "Orange", "Purple"],
			borderColor: "rgba(0,0,0,0)",
		},
	],
};
const dataPie2 = {
	labels: [
		"Gilbert Chui",
		"Smit Patel",
		"Chedy Sankar",
		"Alex Greff",
		"Tony Attalla",
		"Alex Andros",
	],
	datasets: [
		{
			data: [50, 42, 36, 61, 28, 27],
			backgroundColor: ["Red", "Yellow", "Blue", "Green", "Orange", "Purple"],
			borderColor: "rgba(0,0,0,0)",
		},
	],
};
const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(2),
	},
}));
export const Overview = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [showCharts, setShowCharts] = useState(false);

	useEffect(() => {
		setShowCharts(true);
	}, []);

	return (
		<Grid container spacing={isMobile ? 2 : 3} className={classes.root}>
			<Grid item xs={12}>
				<DesktopAppBar />
			</Grid>

			<Grid item xs={12} sm={2}>
				<StatCard label="Total Messages" value="243,012" />
			</Grid>
			<Grid item xs={12} sm={2}>
				<StatCard label="Avg. Daily Messages" value="86.23" />
			</Grid>
			<Grid item xs={12} sm={2}>
				<StatCard label="Total Members" value="23" />
			</Grid>
			<Grid item xs={12} sm={4} xl={3}>
				<StatCard label="Active For" value="3 years 11 Month 28 days" />
			</Grid>
			<Grid item xs={12} sm={6} xl={5}>
				<Filters />
			</Grid>
			<Grid item xs={12}>
				<Card title="Message Count">
					<div style={{ height: "400px", width: "100%" }}>
						{showCharts && (
							<Line data={dataLine} options={{ maintainAspectRatio: false }} />
						)}
					</div>
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card title="Messge count per user">
					<div style={{ height: "400px", width: "100%" }}>
						{showCharts && (
							<Doughnut
								data={dataPie1}
								options={{ maintainAspectRatio: false, cutoutPercentage: 70 }}
							/>
						)}
					</div>
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card title="Message count per type">
					<div style={{ height: "400px", width: "100%" }}>
						{showCharts && (
							<Doughnut
								data={dataPie2}
								options={{ maintainAspectRatio: false, cutoutPercentage: 70 }}
							/>
						)}
					</div>
				</Card>
			</Grid>
			<Grid item xs={12}>
				<Card title="Message count by type per user">
					<div style={{ height: "400px", width: "100%" }}>
						{showCharts && (
							<Bar data={dataLine} options={{ maintainAspectRatio: false }} />
						)}
					</div>
				</Card>
			</Grid>
			<Grid item xs={12}>
				<Footer date="May 20, 2020" />
			</Grid>
		</Grid>
	);
};
