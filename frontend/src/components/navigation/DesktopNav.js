import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { NavItems } from "./NavItems";

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: 240,
	},
	drawerPaper: {
		width: 240,
	},
}));

export const DesktopNav = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	const HandleNavItemClick = (text) => {
		props.setCurTab(text);
	};

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
			<NavItems HandleNavItemClick={HandleNavItemClick} />
		</Drawer>
	);
};
