import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { NavItems } from "./NavItems";
import { NavLogo } from "./NavLogo";
import { NavContext } from "./../../contexts/NavContext";

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
	const { setCurTab } = useContext(NavContext);

	const HandleNavItemClick = (text) => {
		setCurTab(text);
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
			<NavLogo />
			<NavItems
				HandleNavItemClick={HandleNavItemClick}
				diableDataUpload={props.diableDataUpload}
			/>
		</Drawer>
	);
};
