import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { DesktopNav } from "./Components/Navigation/DesktopNav";
import { MobileNav } from "./Components/Navigation/MobileNav";
import { MobileAppBar } from "./Components/Navigation/MobileAppBar";
import { Main } from "./Components/Main";

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

	return (
		<div className={classes.root}>
			<Hidden xsDown>
				<DesktopNav />
			</Hidden>

			<Hidden smUp>
				<MobileNav />
				<MobileAppBar />
			</Hidden>

			<div className={classes.main}>
				<Main />
			</div>
		</div>
	);
};

export default App;
