import { Fragment, useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import { StatCard } from "./miscellaneous/StatCard";
import { DesktopAppBar } from "./navigation/DesktopAppBar";
import { Card } from "./miscellaneous/Card";
import { Filters } from "./miscellaneous/Filters";
import { Footer } from "./miscellaneous/Footer";
import { LineChart } from "./charts/LineChart";
import { DoughnutChart } from "./charts/DoughnutChart";
import { BarChart } from "./charts/BarChart";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(2),
	},
}));

export const Misc = (props) => {
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
				<StatCard label="Total Kicks" value="42" />
			</Grid>

			<Hidden xsDown>
				<Grid item sm={10}></Grid>
			</Hidden>

			<Grid item xs={12} sm={4} xl={3}>
				<Filters />
			</Grid>

			<Hidden xsDown>
				<Grid item sm={8} xl={9}></Grid>
			</Hidden>

			<Grid item xs={12} sm={4}>
				<Card title="Kicks Received per User">
					{showCharts && <DoughnutChart />}
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card title="Kicks Given per User">
					{showCharts && <DoughnutChart />}
				</Card>
			</Grid>

			<Grid item xs={12}>
				<Card title="Kicks Over Time">{showCharts && <LineChart />}</Card>
			</Grid>

			<Grid item xs={12}>
				<Card title="Nicknames">{showCharts && <LineChart />}</Card>
			</Grid>

			<Grid item xs={12}>
				<Footer date="May 20, 2020" />
			</Grid>
		</Grid>
	);
};
