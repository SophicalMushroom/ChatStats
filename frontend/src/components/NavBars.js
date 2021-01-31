import { Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		width: 240,
	},
	drawerPaper: {
		width: 240,
	},
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

const NavItems = () => {
	const classes = useStyles();
	const theme = useTheme();
	return (
		<List>
			{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
				<ListItem button key={text}>
					<ListItemIcon>
						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
					</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			))}
		</List>
	);
};

export const DesktopNav = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Drawer
			className={classes.drawer}
			variant="permanent"
			classes={{
				paper: classes.drawerPaper,
			}}
			anchor="left"
		>
			<div style={{ width: "240px", height: "50px" }}>LOGO</div>
			<NavItems />
		</Drawer>
	);
};

export const MobileNav = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Drawer
			className={classes.drawer}
			variant="temporary"
			anchor="left"
			classes={{
				paper: classes.drawerPaper,
			}}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
			open={props.isMobileNavOpen}
			onClose={() => props.setIsMobileNavOpen(!props.isMobileNavOpen)}
		>
			<NavItems />
		</Drawer>
	);
};

export const MobileAppBar = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Fragment>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						className={classes.menuButton}
						edge="start"
						onClick={() => props.setIsMobileNavOpen(!props.isMobileNavOpen)}
					>
						<MenuIcon className={classes.menuButtonIcon} />
					</IconButton>
					<div className={classes.mobileLogo}>LOGO</div>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
};
