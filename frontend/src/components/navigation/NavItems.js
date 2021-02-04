import { Fragment, useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import CodeIcon from "@material-ui/icons/Code";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { ThemeContext } from "./../../contexts/ThemeContext";
import { ChatSelector } from "./ChatSelector";
import { Profile } from "./Profile";

const useStyles = makeStyles((theme) => ({
	nestedItems: {
		paddingLeft: theme.spacing(4),
	},
	mainDivider: {
		width: "90%",
		margin: "0 auto 0 auto",
	},
	darkModeSwitcher: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		position: "absolute",
		bottom: 0,
		paddingBottom: theme.spacing(3),
	},
	icons: {
		fill: theme.palette.text.secondary,
	},
}));

export const NavItems = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const { currentTheme, setTheme } = useContext(ThemeContext);

	const handleThemeChange = (event) => {
		setTheme(currentTheme === "dark" ? "light" : "dark");
	};

	const navItems = [
		{ label: "Home", icon: <HomeIcon className={classes.icons} /> },
		{ label: "Vocab", icon: <LocalLibraryIcon className={classes.icons} /> },
		{ label: "Emojis", icon: <EmojiEmotionsIcon className={classes.icons} /> },
		{ label: "Misc", icon: <EqualizerIcon className={classes.icons} /> },
		{ label: "Regex", icon: <CodeIcon className={classes.icons} /> },
	];
	return (
		<Fragment>
			<List>
				<Profile />
				<ChatSelector />
				<Divider className={classes.mainDivider} />
				{navItems.map((item) => (
					<ListItem
						button
						className={classes.nestedItems}
						key={item.label}
						onClick={() => props.HandleNavItemClick(item.label)}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText
							primary={
								<Typography color="textSecondary" variant="body1">
									{item.label}
								</Typography>
							}
						/>
					</ListItem>
				))}
			</List>
			<div className={classes.darkModeSwitcher}>
				<Typography color="textSecondary" variant="body1">
					Dark theme
				</Typography>
				<Switch
					color={currentTheme === "dark" ? "secondary" : "primary"}
					checked={currentTheme === "dark"}
					onChange={handleThemeChange}
				/>
			</div>
		</Fragment>
	);
};
