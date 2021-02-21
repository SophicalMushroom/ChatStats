import { Fragment, useStatCarde, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { StatCard } from "./miscellaneous/StatCard";
import { DesktopAppBar } from "./navigation/DesktopAppBar";
import { Card } from "./miscellaneous/Card";
import { Filters } from "./miscellaneous/Filters";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(2),
	},
}));

export const Vocab = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Grid container spacing={isMobile ? 2 : 3} className={classes.root}>
			<Grid item xs={12}>
				<DesktopAppBar />
			</Grid>

			<Grid item xs={12} sm={2}>
				<StatCard label="Total words" value="15,243,012" />
			</Grid>
			<Grid item xs={12} sm={2}>
				<StatCard label="Total chars" value="233,558,156" />
			</Grid>
			<Grid item xs={12} sm={2}>
				<StatCard label="Avg. words per Day" value="452" />
			</Grid>
			<Grid item xs={12} sm={2}>
				<StatCard label="Avg. chars per day" value="3014" />
			</Grid>
			<Grid item xs={12} sm={2}>
				<StatCard label="Avg. words per message" value="8" />
			</Grid>
			<Grid item xs={12} sm={2}>
				<StatCard label="Avg. chars per message" value="37" />
			</Grid>

			<Grid item xs={12} sm={6} xl={5}>
				<Filters />
			</Grid>
		</Grid>
	);
};
