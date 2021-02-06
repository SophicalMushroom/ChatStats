import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { NavContext } from "./../../contexts/NavContext";

const useStyles = makeStyles((theme) => ({
	divider: {
		margin: "0.8% 0 0 0",
		width: "100%",
	},
	subtitle: theme.typography.subtitle3,
}));

export const DesktopAppBar = () => {
	const classes = useStyles();
	const theme = useTheme();
	const { curTab, curChat } = useContext(NavContext);

	return (
		<Hidden xsDown>
			<div>
				<Typography noWrap color="textSecondary" className={classes.subtitle}>
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
