import { Fragment, useContext } from "react";
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
import { ThemeContext } from "./../../Contexts/ThemeContext";

const navItems = [
	{ label: "Home", icon: <HomeIcon /> },
	{ label: "Vocab", icon: <LibraryBooksIcon /> },
	{ label: "Emojis", icon: <EmojiEmotionsIcon /> },
	{ label: "Misc", icon: <EqualizerIcon /> },
	{ label: "Regex", icon: <CodeIcon /> },
];

export const NavItems = (props) => {
	const { currentTheme, setTheme } = useContext(ThemeContext);

	const handleThemeChange = (event) => {
		setTheme(currentTheme === "dark" ? "light" : "dark");
	};

	return (
		<Fragment>
			<List>
				{navItems.map((item) => (
					<ListItem
						button
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
