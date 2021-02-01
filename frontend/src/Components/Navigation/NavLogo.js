import { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ThemeContext } from "./../../Contexts/ThemeContext";
import LogoDark from "./../../Assets/logoDark.svg";
import LogoLight from "./../../Assets/logoLight.svg";

const useStyles = makeStyles((theme) => ({
	logo: {
		marginLeft: theme.spacing(1),
		width: "15%",
		height: "auto",
	},
	logoHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
}));

export const NavLogo = () => {
	const classes = useStyles();
	const theme = useTheme();
	const { currentTheme, setTheme } = useContext(ThemeContext);

	return (
		<div className={classes.logoHeader}>
			<Typography
				color={currentTheme === "dark" ? "secondary" : "primary"}
				variant="h5"
			>
				{" "}
				ChatStats
			</Typography>
			<img
				src={currentTheme === "dark" ? LogoLight : LogoDark}
				className={classes.logo}
			/>
		</div>
	);
};
