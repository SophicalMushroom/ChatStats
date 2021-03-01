import { Fragment, useState, useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FilterContext } from "./../../contexts/FilterContext";

const tempUsers = [
	"Gilbert Chui",
	"Smit Patel",
	"Chedy Sankar",
	"Alex Greff",
	"Tony Attalla",
	"Alex Andros",
	"Dittam Dey",
	"Michael Cottow",
	"Eleni Tuca",
	"Parth Parpyani",
	"Anton Kaminsky",
	"Sean Applebaum",
	"PyBot Alpha",
].map((item, key) => ({ key: key, label: item }));

const useStyles = makeStyles((theme) => ({
	chipListContainer: {
		display: "flex",
		justifyContent: "flex-start",
		flexWrap: "wrap",
		padding: theme.spacing(0.2),
		margin: 0,
		listStyle: "none",
		backgroundColor: theme.palette.background.default,
		overflowY: "scroll",
		scrollbarWidth: "thin",
		[theme.breakpoints.down("xl")]: {
			maxHeight: "9vh",
		},
		[theme.breakpoints.down("lg")]: {
			maxHeight: "11vh",
		},
		[theme.breakpoints.down("sm")]: {
			maxHeight: "15vh",
		},
	},
	chipListTitle: {
		...theme.typography.subtitle3,
		marginBottom: "3px",
	},
	chip: {
		margin: theme.spacing(0.3),
	},
	chipStyles: {
		// borderColor: theme.palette.secondary.main,
	},
}));

export const UserSelection = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [menuAnchor, setMenuAnchor] = useState(null);
	const { selectedUsers, setSelectedUsers } = useContext(FilterContext);

	const handleDelete = (chipToDelete) => () => {
		setSelectedUsers(
			selectedUsers.filter((chip) => chip.key !== chipToDelete.key)
		);
	};
	const handleMenuOpen = (event) => {
		setMenuAnchor(event.currentTarget);
	};
	const handleMenuClick = (user) => {
		setSelectedUsers([user, ...selectedUsers]);
	};
	const handleMenuClose = () => {
		setMenuAnchor(null);
	};

	useEffect(() => {
		setSelectedUsers(tempUsers);
	}, []);

	return (
		<div className={classes.chipList}>
			<Typography className={classes.chipListTitle} color="textSecondary">
				Users
			</Typography>
			<Paper className={classes.chipListContainer} variant="outlined">
				{/* "Add" user chip*/}
				<Chip
					className={classes.chip}
					label="Add"
					size="small"
					clickable
					onClick={handleMenuOpen}
					icon={<AddCircleIcon />}
				/>

				<Menu
					getContentAnchorEl={null}
					keepMounted
					anchorEl={menuAnchor}
					open={Boolean(menuAnchor)}
					onClose={handleMenuClose}
				>
					{tempUsers
						.filter(
							(user) =>
								!selectedUsers.map((item) => item.key).includes(user.key)
						)
						.map((user) => (
							<MenuItem key={user.key} onClick={() => handleMenuClick(user)}>
								{user.label}
							</MenuItem>
						))}
				</Menu>

				{/* render chips for all selected users*/}
				{selectedUsers?.map((chip) => (
					<Chip
						className={classes.chip}
						variant="outlined"
						label={chip.label}
						size="small"
						onDelete={handleDelete(chip)}
						classes={{ outlined: classes.chipStyles }}
					/>
				))}
			</Paper>
		</div>
	);
};
