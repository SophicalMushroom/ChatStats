import { Fragment, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { Card } from "./Card";
import Typography from "@material-ui/core/Typography";
import DateRangeIcon from "@material-ui/icons/DateRange";

const useStyles = makeStyles((theme) => ({
	dateLabel: theme.typography.subtitle3,
	dateValue: {
		paddingLeft: "5px",
	},
	root: {
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
	const [selectedDate, setSelectedDate] = useState(
		new Date("2014-08-18T21:11:54")
	);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Card title="Filters">
				{/* root container*/}
				<Grid item container xs={12} spacing={1}>
					{/* date filters*/}
					<Grid item container xs={12} lg={3} spacing={1}>
						<Grid item xs={6} lg={12}>
							<KeyboardDatePicker
								autoOk
								className={classes.root}
								variant={isMobile ? "dialog" : "inline"}
								format="MM/dd/yyyy"
								label="Start Date"
								value={selectedDate}
								onChange={handleDateChange}
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
								className={classes.root}
								variant={isMobile ? "dialog" : "inline"}
								format="MM/dd/yyyy"
								label="End Date"
								value={selectedDate}
								onChange={handleDateChange}
								keyboardIcon={<DateRangeIcon />}
								InputAdornmentProps={{ position: "start" }}
								InputProps={{
									disableUnderline: true,
									marginLeft: "0px",
								}}
							/>
						</Grid>
					</Grid>
					{/* other filters*/}
					<Grid item xs={12} lg={5}>
						helo
					</Grid>
					<Grid item xs={12} lg={4}>
						hello
					</Grid>
				</Grid>
			</Card>
		</MuiPickersUtilsProvider>
	);
};
