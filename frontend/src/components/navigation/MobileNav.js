import { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { NavItems } from "./NavItems";
import { NavContext } from "./../../Contexts/NavContext";

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: 240,
	},
	drawerPaper: {
		width: 240,
	},
}));

export const MobileNav = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [curTab, setCurTab, isMobileNavOpen, setIsMobileNavOpen] = useContext(
		NavContext
	);

	const HandleNavItemClick = (text) => {
		setCurTab(text);
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
			<NavItems HandleNavItemClick={HandleNavItemClick} />
		</Drawer>
	);
};
