import { Fragment, useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { NavContext } from "./../contexts/NavContext";
import { AuthContext } from "./../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: "12%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		paddingBottom: theme.spacing(2),
	},
}));

export const Login = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const { user, setUser } = useContext(AuthContext);
	const history = useHistory();

	return (
		<div className={classes.root}>
			<Typography color="textPrimary" variant="h4" className={classes.title}>
				Sign in
			</Typography>
			<button
				onClick={() => {
					history.push("/overview");
					setUser({ ...user, isLoggedIn: true });
				}}
			>
				button
			</button>
		</div>
	);
};
