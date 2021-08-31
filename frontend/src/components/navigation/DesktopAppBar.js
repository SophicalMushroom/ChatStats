import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { NavContext } from "./../../contexts/NavContext";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	divider: {
		margin: "0.8% 0 0 0",
		width: "100%",
	},
	subtitle: theme.typography.subtitle3,
}));

let path2title = new Map();
path2title.set("overview", "Overview");
path2title.set("vocabulary", "Vocabulary");
path2title.set("emojis", "Emojis");
path2title.set("miscellaneous", "Miscellaneous");
path2title.set("regex", "Regex");
path2title.set("upload", "Upload Data");

export const DesktopAppBar = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const location = useLocation();
	const { curChat } = useContext(NavContext);

	return (
		<Hidden xsDown>
			<div>
				{!props.disableChatTitle && (
					<Typography noWrap color="textSecondary" className={classes.subtitle}>
						{curChat}
					</Typography>
				)}
				<Typography noWrap color="textPrimary" variant="h4">
					{path2title.get(location.pathname.replace(/\W/g, ""))}
				</Typography>
				<Divider className={classes.divider} />
			</div>
		</Hidden>
	);
};
