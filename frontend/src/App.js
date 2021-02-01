import { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { DesktopNav } from "./Components/Navigation/DesktopNav";
import { MobileNav } from "./Components/Navigation/MobileNav";
import { MobileAppBar } from "./Components/Navigation/MobileAppBar";
import { Home } from "./Components/Home";
import { Vocab } from "./Components/Vocab";
import { Emojis } from "./Components/Emojis";
import { Misc } from "./Components/Misc";
import { Regex } from "./Components/Regex";
import { NavContext } from "./Contexts/NavContext";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	main: {
		width: "100vw",
		height: "100vh",
		[theme.breakpoints.down("xs")]: {
			paddingTop: "5vh",
		},
	},
}));

const renderTabContent = (curTab) => {
	switch (curTab) {
		case "Home":
			return <Home />;
		case "Vocab":
			return <Vocab />;
		case "Emojis":
			return <Emojis />;
		case "Misc":
			return <Misc />;
		case "Regex":
			return <Regex />;
	}
};

const App = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [curTab, setCurTab] = useContext(NavContext);

	return (
		<div className={classes.root}>
			<Hidden xsDown>
				<DesktopNav />
			</Hidden>

			<Hidden smUp>
				<MobileNav />
				<MobileAppBar />
			</Hidden>

			<div className={classes.main}>{renderTabContent(curTab)}</div>
		</div>
	);
};

export default App;
