import { Fragment, useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import { Picker, Emoji } from "emoji-mart";
import { FilterContext } from "./../../contexts/FilterContext";
import "emoji-mart/css/emoji-mart.css";

const useStyles = makeStyles((theme) => ({
	emojiPicker: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		border: "1px solid",
		borderRadius: theme.shape.borderRadius,
		borderColor: theme.palette.divider,
		backgroundColor: "transparent",
		padding: "1px",
	},
}));

export const EmojiPicker = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState(null);
	const { selectedEmoji, setSelectedEmoji } = useContext(FilterContext);

	const handleEmojiOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleEmojiClose = () => {
		setAnchorEl(null);
	};
	const handleEmojiSelect = (emoji, event) => {
		setSelectedEmoji(emoji.id);
		handleEmojiClose();
	};
	return (
		<Fragment>
			<button className={classes.emojiPicker} onClick={handleEmojiOpen}>
				<Emoji emoji={selectedEmoji} set="apple" size={30} />
			</button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				getContentAnchorEl={null}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleEmojiClose}
			>
				<Picker
					color={theme.palette.primary.light}
					showPreview={false}
					onClick={handleEmojiSelect}
					theme="dark"
					title=""
					emoji=""
				/>
			</Menu>
		</Fragment>
	);
};
