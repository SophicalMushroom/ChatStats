import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavContext } from "./../../contexts/NavContext";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	appBar: { backgroundColor: theme.palette.background.paper },
	text: {
		fontSize: "12px",
	},
	menuButton: {
		paddingRight: theme.spacing(2),
	},
}));

let path2title = new Map();
path2title.set("overview", "Overview");
path2title.set("vocabulary", "Vocabulary");
path2title.set("emojis", "Emojis");
path2title.set("miscellaneous", "Miscellaneous");
path2title.set("regex", "Regex");
path2title.set("upload", "Upload Data");

export const MobileAppBar = () => {
	const classes = useStyles();
	const theme = useTheme();
	const location = useLocation();
	const { isMobileNavOpen, setIsMobileNavOpen, curChat } = useContext(
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

					<Breadcrumbs>
						<Typography noWrap color="textSecondary" className={classes.text}>
							{curChat}
						</Typography>
						<Typography noWrap color="textSecondary" className={classes.text}>
							{path2title.get(location.pathname.replace(/\W/g, ""))}
						</Typography>
					</Breadcrumbs>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};
