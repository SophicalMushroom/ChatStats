import { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { NavItems } from "./NavItems";
import { NavLogo } from "./NavLogo";
import { NavContext } from "./../../contexts/NavContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: 240,
	},
	drawerPaper: {
		width: 240,
	},
}));

export const MobileNav = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const { isMobileNavOpen, setIsMobileNavOpen } = useContext(NavContext);
	const history = useHistory();

	const HandleNavItemClick = (path) => {
		history.push(path);
		setIsMobileNavOpen(!isMobileNavOpen);
	};

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
			open={isMobileNavOpen}
			onClose={() => setIsMobileNavOpen(!isMobileNavOpen)}
		>
			<NavLogo />
			<NavItems
				HandleNavItemClick={HandleNavItemClick}
				diableDataUpload={props.diableDataUpload}
			/>
		</Drawer>
	);
};
