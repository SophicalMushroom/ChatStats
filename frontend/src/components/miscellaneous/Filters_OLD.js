import { Fragment, useState, useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DateFnsUtils from "@date-io/date-fns";
import Paper from "@material-ui/core/Paper";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { Card } from "./Card";
import { UserSelection } from "./UserSelection";
import { FilterContext } from "./../../contexts/FilterContext";

const useStyles = makeStyles((theme) => ({
	dateRoot: {
		"& .MuiInputBase-root": {
			padding: 0,
			"& .MuiButtonBase-root": {
				padding: 0,
				paddingLeft: 0,
			},
			"& .MuiInputBase-input": {
				padding: 8,
				paddingLeft: 0,
			},
		},
	},
}));

export const Filters = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const { startDate, setStartDate, endDate, setEndDate } = useContext(
		FilterContext
	);

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Card title="Filters">
				{/* root container*/}
				<Grid item container xs={12} spacing={1}>
					{/* date filters*/}
					<Grid item container xs={12} lg={4} spacing={1}>
						<Grid item xs={6} lg={12}>
							<KeyboardDatePicker
								autoOk
								className={classes.dateRoot}
								variant={isMobile ? "dialog" : "inline"}
								format="MM/dd/yyyy"
								label="Start Date"
								value={startDate}
								onChange={(newDate) => setStartDate(newDate)}
								keyboardIcon={<DateRangeIcon />}
								InputAdornmentProps={{ position: "start" }}
								InputProps={{
									disableUnderline: true,
								}}
							/>
						</Grid>
						<Grid item xs={6} lg={12}>
							<KeyboardDatePicker
								autoOk
								className={classes.dateRoot}
								variant={isMobile ? "dialog" : "inline"}
								format="MM/dd/yyyy"
								label="End Date"
								value={endDate}
								onChange={(newDate) => setEndDate(newDate)}
								keyboardIcon={<DateRangeIcon />}
								minDate={startDate}
								minDateMessage={"Cannot be before start date"}
								InputAdornmentProps={{ position: "start" }}
								InputProps={{
									disableUnderline: true,
									marginLeft: "0px",
								}}
							/>
						</Grid>
					</Grid>
					{/* other filters*/}
					<Grid item xs={12} lg={8}>
						<UserSelection />
					</Grid>
				</Grid>
			</Card>
		</MuiPickersUtilsProvider>
	);
};
