import { Fragment, useContext } from "react";
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

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(2),
	},
}));

export const Misc = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

			<Grid item xs={12} sm={6} xl={5}>
				<Filters />
			</Grid>

			<Hidden xsDown>
				<Grid item sm={6} xl={7}></Grid>
			</Hidden>

			<Grid item xs={12} sm={4}>
				<Card title="Kicks Received per User">
					Lorem ipsum dolor sit amet, consecdtetur adipiscing elit. Quisque
					mattis nunc tempor scelerisque congue. Nullam ultrices lacinia ex, in
					pretium nibh maximus eu. Phasellus mi felis, maximus lacinia efficitur
					ornare, o
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card title="Kicks Given per User">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
					mattis nunc tempor scelerisque congue. Nullam ultrices lacinia ex, in
					pretium nibh maximus eu. Phasellus mi felis, maximus lacinia efficitur
					ornare, o
				</Card>
			</Grid>

			<Grid item xs={12}>
				<Card title="Kicks Over Time">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
					mattis nunc tempor scelerisque congue. Nullam ultrices lacinia ex, in
					pretium nibh maximus eu. Phasellus mi felis, maximus lacinia efficitur
					ornare, o
				</Card>
			</Grid>

			<Grid item xs={12}>
				<Card title="Nicknames Over Time">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
					mattis nunc tempor scelerisque congue. Nullam ultrices lacinia ex, in
					pretium nibh maximus eu. Phasellus mi felis, maximus lacinia efficitur
					ornare, o
				</Card>
			</Grid>

			<Grid item xs={12}>
				<Footer date="May 20, 2020" />
			</Grid>
		</Grid>
	);
};
