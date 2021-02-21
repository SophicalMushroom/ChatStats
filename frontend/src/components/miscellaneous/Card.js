import { Fragment, useStatCarde, useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Picker, Emoji } from "emoji-mart";
import { FilterContext } from "./../../contexts/FilterContext";
import "emoji-mart/css/emoji-mart.css";
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	title: {
		padding: theme.spacing(1.5),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	content: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(1.5),
	},
	divider: {
		backgroundColor: "rgba(79, 131, 204, 0.15)",
	},
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

export const Card = (props) => {
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
		<Paper className={classes.root}>
			<div className={classes.title}>
				<Typography variant="subtitle2">{props.title}</Typography>
				{props.emojiPicker && (
					<div>
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
					</div>
				)}
			</div>

			<Divider className={classes.divider} />

			<div className={classes.content}>
				{props.isLoading ? (
					<CircularProgress color="secondary" size={30} />
				) : (
					props.children
				)}
			</div>
		</Paper>
	);
};
