import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavContext } from "./../../Contexts/NavContext";

const useStyles = makeStyles((theme) => ({
	appBar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "5%",
		marginBottom: "50px",
	},
	toolbar: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
	},
	mobileLogo: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		width: "20%",
		height: "100%",
	},
	menuButton: {
		position: "relative",
		marginLeft: "5px",
		marginRight: "auto",
	},
	menuButtonIcon: {
		width: "20px",
		height: "20px",
	},
}));

export const MobileAppBar = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [curTab, setCurTab, isMobileNavOpen, setIsMobileNavOpen] = useContext(
		NavContext
	);
	return (
		<Fragment>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						className={classes.menuButton}
						edge="start"
						onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
					>
						<MenuIcon className={classes.menuButtonIcon} />
					</IconButton>
					<div className={classes.mobileLogo}>LOGO</div>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};
