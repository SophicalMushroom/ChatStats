import { Fragment, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles((theme) => ({
	root: {},
	title: {
		...theme.typography.subtitle3,
		fontSize: "10px",
	},
	button: {
		textTransform: "none",
		height: "12px",
	},
}));

export const ToggleButtons = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<ToggleButtonGroup
			value={props.selected}
			exclusive={props.exclusive}
			onChange={(event, newSelected) => props.setSelected(newSelected)}
		>
			{props.options.map((option) => {
				return (
					<ToggleButton key={option} value={option} className={classes.button}>
						<Typography noWrap color="textPrimary" className={classes.title}>
							{option}
						</Typography>
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
};
