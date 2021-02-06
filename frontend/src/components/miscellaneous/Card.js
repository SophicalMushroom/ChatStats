import { Fragment, useStatCarde, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export const Card = (props) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			width: "100%",
		},
		title: {
			padding: theme.spacing(1.5),
		},
		content: {
			padding: theme.spacing(1.5),
		},
		divider: {
			backgroundColor: "rgba(79, 131, 204, 0.15)",
		},
	}));
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Paper className={classes.root}>
			<div className={classes.title}>
				<Typography variant="subtitle2">{props.title}</Typography>
			</div>

			<Divider className={classes.divider} />

			<div className={classes.content}>{props.children}</div>
		</Paper>
	);
};
