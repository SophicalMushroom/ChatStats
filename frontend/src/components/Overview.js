import { Fragment, useStatCarde, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { DesktopAppBar } from "./navigation/DesktopAppBar";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingLeft: theme.spacing(2),
		width: "100%",
		height: "8vh",
		[theme.breakpoints.down("lg")]: {
			height: "10vh",
		},
	},
	paper2: {
		width: "100%",
		height: "45vh",
		padding: theme.spacing(2),
	},
	gridItem: { paddingLeft: 0, paddingRight: 0 },
	subtitle: {
		...theme.typography.subtitle3,
		[theme.breakpoints.down("xs")]: {
			fontSize: "10px",
		},
	},
	value: {
		...theme.typography.h6,
		[theme.breakpoints.down("xs")]: {
			fontSize: "16px",
		},
	},
}));

export const Overview = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const StatCard = (props) => {
		return (
			<Paper className={classes.paper}>
				<div>
					<Typography noWrap color="textSecondary" className={classes.subtitle}>
						{props.label}
					</Typography>
					<Typography noWrap color="textPrimary" className={classes.value}>
						{props.value}
					</Typography>
				</div>
			</Paper>
		);
	};

	return (
		<Grid container spacing={isMobile ? 2 : 3}>
			<Grid item xs={12}>
				<DesktopAppBar />
			</Grid>
			<Grid item xs={12} sm={2} xl={2}>
				<StatCard label="Total Messages" value="243,012" />
			</Grid>
			<Grid item xs={12} sm={2} xl={2}>
				<StatCard label="Avg. Daily Messages" value="86.23" />
			</Grid>
			<Grid item xs={12} sm={2} xl={2}>
				<StatCard label="Total Members" value="23" />
			</Grid>
			<Grid item xs={12} sm={4} xl={3}>
				<StatCard label="Active For" value="3 years 11 Month 28 days" />
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper2}>hello</Paper>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Paper className={classes.paper2}>hello</Paper>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Paper className={classes.paper2}>hello</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper2}>hello</Paper>
			</Grid>
		</Grid>
	);
};
