import { useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import IconButton from "@material-ui/core/IconButton";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { NavContext } from "./../../Contexts/NavContext";

const useStyles = makeStyles((theme) => ({}));

export const ChatSelector = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [allChats, setAllChats] = useState([
		"Bunch Of Traitors 🔪",
		"Kocher Furniture",
		"Example Chat name",
	]);
	const [menuAnchor, setMenuAnchor] = useState(null);
	const [_1, _2, _3, _4, curChat, setCurChat] = useContext(NavContext);

	const handleMenuOpen = (event) => {
		setMenuAnchor(event.currentTarget);
	};
	const handleMenuClick = (chatName) => {
		setCurChat(chatName);
		setMenuAnchor(null);
	};
	const handleMenuClose = () => {
		setMenuAnchor(null);
	};

	return (
		<ListItem>
			<ListItemIcon>
				<QuestionAnswerIcon />
			</ListItemIcon>

			<ListItemText
				secondary
				primary={
					<Typography variant="subtitle2" noWrap>
						{curChat}
					</Typography>
				}
			/>
			<Tooltip title="Select a chat">
				<IconButton onClick={handleMenuOpen}>
					<ExpandMore />
				</IconButton>
			</Tooltip>
			<Menu
				getContentAnchorEl={null}
				keepMounted
				anchorEl={menuAnchor}
				open={Boolean(menuAnchor)}
				onClose={handleMenuClose}
			>
				{allChats.map((chatName) => (
					<MenuItem
						key={chatName}
						selected={chatName === curChat}
						onClick={() => handleMenuClick(chatName)}
					>
						{chatName}
					</MenuItem>
				))}
			</Menu>
		</ListItem>
	);
};
