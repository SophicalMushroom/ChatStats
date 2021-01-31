import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import { CustomThemeContext } from "./../../Theme";

const navItems = [
	{ label: "Home", icon: <InboxIcon /> },
	{ label: "Vocab", icon: <InboxIcon /> },
	{ label: "Emojis", icon: <InboxIcon /> },
	{ label: "Misc", icon: <InboxIcon /> },
	{ label: "Regex", icon: <InboxIcon /> },
];

export const NavItems = (props) => {
	const { currentTheme, setTheme } = useContext(CustomThemeContext);

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
						<ListItemIcon>{item.ic}</ListItemIcon>
						<ListItemText primary={item.label} />
					</ListItem>
				))}
			</List>
			<Switch checked={currentTheme === "dark"} onChange={handleThemeChange} />
		</Fragment>
	);
};
