import { Fragment, useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Doughnut, Bar } from "react-chartjs-2";
import { StatCard } from "./miscellaneous/StatCard";
import { DesktopAppBar } from "./navigation/DesktopAppBar";
import { Card } from "./miscellaneous/Card";
import { Filters } from "./miscellaneous/Filters";
import { Footer } from "./miscellaneous/Footer";
import { ToggleButtons } from "./miscellaneous/ToggleButtons";
import { LineChart } from "./charts/LineChart";
import { DoughnutChart } from "./charts/DoughnutChart";
import { BarChart } from "./charts/BarChart";

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
	const [selectedMessageCount, setSelectedMessageCount] = useState("Total");

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
			<Hidden xsDown>
				<Grid item sm={2} xl={1}></Grid>
			</Hidden>

			<Grid item xs={12} sm={4} xl={3}>
				<Filters />
			</Grid>

			<Grid item xs={12}>
				<Card
					title="Message Count"
					headerButtons={
						<ToggleButtons
							exclusive
							selected={selectedMessageCount}
							setSelected={setSelectedMessageCount}
							options={["Total", "Users"]}
						/>
					}
				>
					{showCharts && selectedMessageCount === "Total" && <LineChart />}
					{showCharts && selectedMessageCount === "Users" && <p>hello</p>}
				</Card>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Card title="Messge count per user">
					{showCharts && <DoughnutChart />}
				</Card>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Card title="Message count per type">
					{showCharts && <DoughnutChart />}
				</Card>
			</Grid>
			<Grid item xs={12}>
				<Card title="Message count by type per user">
					{showCharts && <BarChart />}
				</Card>
			</Grid>
			<Grid item xs={12}>
				<Footer date="May 20, 2020" />
			</Grid>
		</Grid>
	);
};
