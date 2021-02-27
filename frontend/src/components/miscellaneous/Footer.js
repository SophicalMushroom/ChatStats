import { React } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	footer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	footerText: theme.typography.subtitle3,
}));

export const Footer = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<div className={classes.footer}>
			<Typography color="textSecondary" className={classes.footerText}>
				Data last updated {props.date}
			</Typography>
		</div>
	);
};
