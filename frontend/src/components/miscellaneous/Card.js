import { Fragment, useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Picker, Emoji } from "emoji-mart";
import { FilterContext } from "./../../contexts/FilterContext";
import "emoji-mart/css/emoji-mart.css";
const useStyles = makeStyles((theme) => ({
	root: {},
	title: {
		padding: theme.spacing(1.5),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	content: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(1.5),
	},
	divider: {
		backgroundColor: "rgba(79, 131, 204, 0.15)",
	},
	noCharts: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "45vh",
		[theme.breakpoints.down("xs")]: {
			height: "70vh",
		},
	},
	noChartsText: {
		...theme.typography.subtitle3,
		fontStyle: "italic",
		fontWeight: "500",
		fontSize: "14px",
		opacity: "0.6",
	},
}));

export const Card = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Paper className={classes.root}>
			<div className={classes.title}>
				<Typography variant="subtitle2">{props.title}</Typography>
				{props.headerButtons && props.headerButtons}
			</div>

			<Divider className={classes.divider} />

			<div className={classes.content}>
				{props.isLoading && (
					<div className={classes.noCharts}>
						<CircularProgress color="secondary" size={30} />{" "}
					</div>
				)}
				{props.isEmpty && (
					<div className={classes.noCharts}>
						<Typography color="textSecondary" className={classes.noChartsText}>
							No data
						</Typography>
					</div>
				)}
				{!props.isLoading && !props.isEmpty && props.children}
			</div>
		</Paper>
	);
};
