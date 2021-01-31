import { Fragment, useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import CodeIcon from "@material-ui/icons/Code";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { ThemeContext } from "./../../Contexts/ThemeContext";
import { NavContext } from "./../../Contexts/NavContext";
import { ChatSelector } from "./ChatSelector";

const navItems = [
	{ label: "Home", icon: <HomeIcon /> },
	{ label: "Vocab", icon: <LibraryBooksIcon /> },
	{ label: "Emojis", icon: <EmojiEmotionsIcon /> },
	{ label: "Misc", icon: <EqualizerIcon /> },
	{ label: "Regex", icon: <CodeIcon /> },
];

const useStyles = makeStyles((theme) => ({
	nestedItems: {
		paddingLeft: theme.spacing(4),
	},
	mainDivider: {
		width: "90%",
		margin: "0 auto 0 auto",
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export const NavItems = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const { currentTheme, setTheme } = useContext(ThemeContext);

	const handleThemeChange = (event) => {
		setTheme(currentTheme === "dark" ? "light" : "dark");
	};

	return (
		<Fragment>
			<List>
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
						<ListItemText primary={item.label} />
					</ListItem>
				))}
			</List>
			<Switch checked={currentTheme === "dark"} onChange={handleThemeChange} />
		</Fragment>
	);
};
