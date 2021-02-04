import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import { AuthContext } from "./../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
	icons: {
		fill: theme.palette.text.secondary,
		width: "32px",
		height: "32px",
	},
	signOutText: {
		fontStyle: "italic",
		fontSize: 12,
		fontWeight: theme.typography.fontWeightLight,
		"&:hover": {
			color: theme.palette.text.primary,
		},
	},
}));

export const Profile = () => {
	const classes = useStyles();
	const theme = useTheme();
	const { user } = useContext(AuthContext);

	return (
		<ListItem>
			<ListItemIcon>
				<PersonIcon className={classes.icons} />
			</ListItemIcon>
			<ListItemText
				primary={
					<Typography color="textSecondary" variant="subtitle2" noWrap>
						{`${user.firstName} ${user.lastName}`}
					</Typography>
				}
				secondary={
					<ButtonBase>
						<Typography className={classes.signOutText} color="textSecondary">
							Sign out
						</Typography>
					</ButtonBase>
				}
			/>
		</ListItem>
	);
};
