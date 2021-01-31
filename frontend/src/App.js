import { useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { DesktopNav, MobileNav, MobileAppBar } from "./components/NavBars";
import Main from "./components/Main";

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
	const classes = useStyles();
	const theme = useTheme();
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [curTab, setCurTab] = useState("Home");

	return (
		<div className={classes.root}>
			<Hidden xsDown>
				<DesktopNav setCurTab={setCurTab} />
			</Hidden>

			<Hidden smUp>
				<MobileNav
					isMobileNavOpen={isMobileNavOpen}
					setIsMobileNavOpen={setIsMobileNavOpen}
					setCurTab={setCurTab}
				/>
				<MobileAppBar
					isMobileNavOpen={isMobileNavOpen}
					setIsMobileNavOpen={setIsMobileNavOpen}
				/>
			</Hidden>

			<div className={classes.main}>
				<Main curTab={curTab} />
			</div>
		</div>
	);
};

export default App;
