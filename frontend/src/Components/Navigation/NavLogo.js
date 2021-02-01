import { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ThemeContext } from "./../../Contexts/ThemeContext";
import LogoDark from "./../../Assets/logoDark.svg";
import LogoLight from "./../../Assets/logoLight.svg";

const useStyles = makeStyles((theme) => ({
	logo: {
		marginLeft: "3%",
		width: "15%",
		height: "auto",
	},
	logoHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "8%",
		marginBottom: "5%",
	},
}));

export const NavLogo = () => {
	const classes = useStyles();
	const theme = useTheme();
	const { currentTheme, setTheme } = useContext(ThemeContext);

	return (
		<div className={classes.logoHeader}>
			<Typography variant="h5"> ChatStats</Typography>
			<img
				src={currentTheme === "dark" ? LogoLight : LogoDark}
				className={classes.logo}
			/>
		</div>
	);
};
