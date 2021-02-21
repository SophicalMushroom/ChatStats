import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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

export const Overview = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
				<Card title="Message Dist">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
					mattis nunc tempor scelerisque congue. Nullam ultrices lacinia ex, in
					pretium nibh maximus eu. Phasellus mi felis, maximus lacinia efficitur
					ornare, o
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card title="Total messages per user">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
					mattis nunc tempor scelerisque congue. Nullam ultrices lacinia ex, in
					pretium nibh maximus eu. Phasellus mi felis, maximus lacinia efficitur
					ornare, o
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card title="Messge count by type">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
					mattis nunc tempor scelerisque congue. Nullam ultrices lacinia ex, in
					pretium nibh maximus eu. Phasellus mi felis, maximus lacinia efficitur
					ornare, o
				</Card>
			</Grid>
			<Grid item xs={12}>
				<Card title="Message count by type per user">
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
