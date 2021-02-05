import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavContext } from "./../../contexts/NavContext";

const useStyles = makeStyles((theme) => ({
	appBar: { backgroundColor: theme.palette.background.paper },
	toolbar: {},
	menuButton: {
		paddingRight: theme.spacing(2),
	},
}));

export const MobileAppBar = () => {
	const classes = useStyles();
	const theme = useTheme();
	const { curTab, isMobileNavOpen, setIsMobileNavOpen, curChat } = useContext(
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
						<Typography noWrap color="textSecondary">
							{curChat}
						</Typography>
						<Typography noWrap color="textSecondary">
							{curTab}
						</Typography>
					</Breadcrumbs>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};
