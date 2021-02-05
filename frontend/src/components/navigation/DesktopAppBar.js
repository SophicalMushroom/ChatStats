import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { NavContext } from "./../../contexts/NavContext";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: "1%",
	},
	divider: {
		margin: "0.8% 0 0.4% 0",
		width: "100%",
	},
	tiny: theme.typography.subtitle3,
}));

export const DesktopAppBar = () => {
	const classes = useStyles();
	const theme = useTheme();
	const { curTab, curChat } = useContext(NavContext);

	return (
		<Hidden xsDown>
			<div className={classes.root}>
				<Typography noWrap color="textSecondary" className={classes.tiny}>
					{curChat}
				</Typography>
				<Typography noWrap color="textPrimary" variant="h4">
					{curTab}
				</Typography>
				<Divider className={classes.divider} />
			</div>
		</Hidden>
	);
};
