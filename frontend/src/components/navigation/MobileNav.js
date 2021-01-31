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

export const MobileNav = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const HandleNavItemClick = (text) => {
		props.setCurTab(text);
		props.setIsMobileNavOpen(!props.isMobileNavOpen);
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
			open={props.isMobileNavOpen}
			onClose={() => props.setIsMobileNavOpen(!props.isMobileNavOpen)}
		>
			<NavItems HandleNavItemClick={HandleNavItemClick} />
		</Drawer>
	);
};
