import { Fragment, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SearchIcon from "@material-ui/icons/Search";
import CodeIcon from "@material-ui/icons/Code";
import { StatCard } from "./miscellaneous/StatCard";
import { DesktopAppBar } from "./navigation/DesktopAppBar";
import { Card } from "./miscellaneous/Card";
import { Filters } from "./miscellaneous/Filters";
import { Footer } from "./miscellaneous/Footer";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(2),
	},
	searchBar: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		width: "100%",
	},
	searchBarInput: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	placeholder: {
		"&::placeholder": {
			color: theme.palette.text.secondary,
		},
	},
	searchBarIcon: {
		padding: 10,
	},
	inputAdornment: {
		margin: 10,
	},
}));

const SearchBar = () => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Paper component="form" className={classes.searchBar}>
			<CodeIcon className={classes.inputAdornment} />
			<InputBase
				onKeyPress={(e) => {
					if (e.which === 13 /* disable Enter press */) {
						e.preventDefault();
					}
				}}
				onChange={(e) => console.log(e)}
				className={classes.searchBarInput}
				classes={{ input: classes.placeholder }}
				placeholder="Enter a Regex"
			/>
			<IconButton className={classes.searchBarIcon}>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export const Regex = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Grid container spacing={isMobile ? 2 : 3} className={classes.root}>
			<Grid item xs={12}>
				<DesktopAppBar />
			</Grid>

			<Grid item container justify="center" alignItems="center" xs={12}>
				<Grid item xs={12} sm={5} xl={4}>
					<SearchBar />
				</Grid>
			</Grid>

			<Grid item xs={12} sm={6} xl={5}>
				<Filters />
			</Grid>
			<Hidden xsDown>
				<Grid item sm={6} xl={7}></Grid>
			</Hidden>

			<Grid item xs={12} sm={2}>
				<StatCard label="Total Kicks" value="42" />
			</Grid>
			<Hidden xsDown>
				<Grid item sm={10}></Grid>
			</Hidden>

			<Grid item xs={12} sm={4}>
				<Card title="Messge count by type">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
					mattis nunc tempor scelerisque congue. Nullam ultrices lacinia ex, in
					pretium nibh maximus eu. Phasellus mi felis, maximus lacinia efficitur
					ornare, o
				</Card>
			</Grid>
			<Grid item xs={12}>
				<Card title="Message count by type per user">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
					mattis nunc tempor scelerisque congue. Nullam ultrices lacinia ex, in
					pretium nibh maximus eu. Phasellus mi felis, maximus lacinia efficitur
					ornare, o
				</Card>
			</Grid>

			<Grid item xs={12}>
				<Footer date="May 20, 2020" />
			</Grid>
		</Grid>
	);
};
