import React, { Fragment, useState, useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import { DesktopAppBar } from "./navigation/DesktopAppBar";
import axios from "axios";
import Grow from "@material-ui/core/Grow";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Check from "@material-ui/icons/Check";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDropzone } from "react-dropzone";
import { config } from "./../config";
const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(2),
	},
	uploadArea: {
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonIcons: {
		width: "25px",
		height: "25px",
		fill: theme.palette.text.secondary,
	},
	uploadIcon: {
		width: "45px",
		height: "45px",
		color: theme.palette.text.secondary,
	},
	uploadBox: {
		width: "95%",
		height: "15vh",
	},
	fileDisplayArea: {
		overflowY: "auto",
		scrollbarWidth: "thin",
		height: "10vh",
		[theme.breakpoints.down("xs")]: {
			height: "15vh",
		},
		width: "100%",
		margin: "20px auto 0 auto",
	},
	confirmationPanel: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
		margin: "20px auto 0 auto",
	},
	uploadStatusBar: {
		marginTop: "10px",
		width: "80%",
	},
	test: {
		color: theme.palette.text.secondary,
	},
}));

export const UploadData = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	// files that are being uploaded
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [error, setError] = useState(false);
	// progres of the upload out of 100%
	const [uploadedProgress, setUploadedProgress] = useState(0);
	const [processingFiles, setProcessingFiles] = useState(false);
	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragAccept,
	} = useDropzone({
		onDrop: (files) => {
			setUploadedProgress(0);
			setUploadedFiles(files);
		},
	});

	const uploadBoxStyles = {
		baseStyle: {
			height: "100%",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			borderStyle: "solid",
			borderWidth: "2px",
			borderRadius: theme.shape.borderRadius,
			borderColor: theme.palette.primary.main,
			backgroundColor: theme.palette.background.default,
			transition: "border .24s ease-in-out",
		},
		acceptStyle: {
			borderColor: theme.palette.secondary.main,
		},
	};
	const uploadBoxStyled = useMemo(
		() => ({
			...uploadBoxStyles.baseStyle,
			...(isDragAccept ? uploadBoxStyles.acceptStyle : {}),
		}),
		[isDragAccept]
	);

	const uploadFiles = () => {
		// this function sends files that the user uploaded to the backend

		//create formdata object that will be uploaded
		let formData = new FormData();
		uploadedFiles.map((file) => {
			formData.append("uploadedFiles", file);
		});

		// compute file upload progress
		const options = {
			onUploadProgress: (event) => {
				const progressPercent = Math.floor((event.loaded * 100) / event.total);
				setUploadedProgress(progressPercent);
				if (progressPercent === 100) {
					setProcessingFiles(true);
				}
			},
		};
		// upload to backend
		axios
			.post(`${config.apiURL}/rawdata`, formData, options)
			.then((res) => setProcessingFiles(false))
			.catch((err) => {
				console.log(err);
				setError(true);
			});
	};

	return (
		<Grid
			container
			spacing={isMobile ? 2 : 3}
			className={classes.root}
			justify="center"
			alignItems="center"
		>
			<Grid item xs={12}>
				<DesktopAppBar disableChatTitle />
			</Grid>
			<Grid item xs={12} sm={6} xl={5}>
				{/* upload box */}
				<Card className={classes.uploadArea}>
					<div className={classes.uploadBox}>
						<div {...getRootProps({ style: uploadBoxStyled })}>
							<input {...getInputProps()} />
							<Typography color="textSecondary" variant="body2">
								Drag and drop or click to browse files
							</Typography>
							<CloudUploadIcon className={classes.uploadIcon} />
						</div>
					</div>

					{/* file display area */}
					<div className={classes.fileDisplayArea}>
						{uploadedFiles.length > 0 && (
							<Grow in timeout={500}>
								<ListItem divider>
									<ListItemIcon>
										<InsertDriveFileIcon className={classes.buttonIcons} />
									</ListItemIcon>

									{/* Show sum of all file sizes in kilobytes */}
									<ListItemText
										primary={
											(uploadedFiles[0].path.length > 10
												? uploadedFiles[0].path.slice(0, 10).concat("...")
												: uploadedFiles[0].path) || ""
										}
										secondary={
											<div>
												{`${Math.ceil(
													uploadedFiles.reduce((a, b) => a + b.size, 0) / 1024
												)} KB`}
												{uploadedProgress > 0 &&
													uploadedProgress < 100 &&
													!error && (
														<LinearProgress
															className={classes.uploadStatusBar}
															variant={"determinate"}
															value={uploadedProgress}
														/>
													)}
												{processingFiles &&
													uploadedProgress === 100 &&
													!error && (
														<LinearProgress
															className={classes.uploadStatusBar}
														/>
													)}
											</div>
										}
									/>
									{error && (
										<Fragment>
											<Typography
												style={{ paddingRight: "10px" }}
												variant="subtitle2"
											>
												Upload Failed
											</Typography>
										</Fragment>
									)}
									{(uploadedProgress === 0 || error) && (
										<IconButton
											className={classes.iconButtons}
											onClick={() => setUploadedFiles([])}
										>
											{error ? (
												<ClearIcon className={classes.buttonIcons} />
											) : (
												<DeleteIcon className={classes.buttonIcons} />
											)}
										</IconButton>
									)}

									{!processingFiles && uploadedProgress === 100 && (
										<Fragment>
											<Typography
												style={{ paddingRight: "10px" }}
												variant="subtitle2"
											>
												Uploaded
											</Typography>
											<Check />
										</Fragment>
									)}
								</ListItem>
							</Grow>
						)}
					</div>
					<div className={classes.confirmationPanel}>
						<Button
							disabled={
								(uploadedProgress > 0 && uploadedProgress < 100) ||
								uploadedFiles.length === 0
							}
							className={classes.test}
							onClick={uploadFiles}
						>
							Upload
						</Button>
					</div>
				</Card>
			</Grid>
		</Grid>
	);
};
