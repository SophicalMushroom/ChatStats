import { useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import MenuIcon from "@material-ui/icons/Menu";
import { DesktopNav, MobileNav, MobileAppBar } from "./components/NavBars";
import { CustomThemeContext } from "./Theme";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	main: {
		[theme.breakpoints.down("xs")]: {
			paddingTop: "5vh",
		},
	},
}));

const App = () => {
	const { currentTheme, setTheme } = useContext(CustomThemeContext);
	const classes = useStyles();
	const theme = useTheme();
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	const handleThemeChange = (event) => {
		setTheme(currentTheme === "dark" ? "light" : "dark");
	};

	return (
		<div className={classes.root}>
			<Hidden xsDown>
				<DesktopNav />
			</Hidden>

			<Hidden smUp>
				<MobileNav
					isMobileNavOpen={isMobileNavOpen}
					setIsMobileNavOpen={setIsMobileNavOpen}
				/>
			</Hidden>

			<Hidden smUp>
				<MobileAppBar
					isMobileNavOpen={isMobileNavOpen}
					setIsMobileNavOpen={setIsMobileNavOpen}
				/>
			</Hidden>

			<div className={classes.main}>
				<Typography paragraph>Lorem Ipsum is simply dummy</Typography>
				<Switch
					checked={currentTheme === "dark"}
					onChange={handleThemeChange}
				/>
			</div>
		</div>
	);
};

export default App;
