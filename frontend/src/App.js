import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { DesktopNav, MobileNav, MobileAppBar } from "./components/NavBars";
import "./App.css";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
}));

const App = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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
			<div>
				<Hidden smUp>
					<MobileAppBar
						isMobileNavOpen={isMobileNavOpen}
						setIsMobileNavOpen={setIsMobileNavOpen}
					/>
				</Hidden>
				<Typography paragraph>hello</Typography>
			</div>
		</div>
	);
};

export default App;
