import { Fragment, useStatCarde, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingLeft: theme.spacing(2),
		width: "100%",
		height: "8vh",
		[theme.breakpoints.down("lg")]: {
			height: "10vh",
		},
	},
	title: {
		...theme.typography.subtitle3,
		fontSize: "11px",
		[theme.breakpoints.down("xs")]: {
			fontSize: "10px",
		},
	},
	value: {
		...theme.typography.h6,
		[theme.breakpoints.down("xs")]: {
			fontSize: "16px",
		},
	},
}));

export const StatCard = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Paper className={classes.root}>
			<div>
				<Typography noWrap color="textSecondary" className={classes.title}>
					{props.label}
				</Typography>
				<Typography noWrap color="textPrimary" className={classes.value}>
					{props.value}
				</Typography>
			</div>
		</Paper>
	);
};
