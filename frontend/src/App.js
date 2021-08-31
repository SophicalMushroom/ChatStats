import { useContext, Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { DesktopNav } from "./components/navigation/DesktopNav";
import { MobileNav } from "./components/navigation/MobileNav";
import { MobileAppBar } from "./components/navigation/MobileAppBar";
import { Overview } from "./components/Overview";
import { Vocab } from "./components/Vocab";
import { Emojis } from "./components/Emojis";
import { Misc } from "./components/Misc";
import { Regex } from "./components/Regex";
import { UploadData } from "./components/UploadData";
import { Login } from "./components/Login";
import { NavContext } from "./contexts/NavContext";
import { AuthContext } from "./contexts/AuthContext";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	main: {
		width: "100vw",
		height: "100vh",
		padding: theme.spacing(3),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(1),
			paddingTop: "8vh",
		},
	},
}));

const PrivateRoute = ({ component: Component, user, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				user.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

const HomeRoute = ({ ...rest }) => {
	return <Route {...rest} render={(props) => <Redirect to="/overview" />} />;
};

const NoMatch = () => {
	return <Typography variant="h4">Error 404</Typography>;
};

const App = () => {
	const classes = useStyles();
	const theme = useTheme();
	const { user } = useContext(AuthContext);
	const { diableDataUpload } = useContext(NavContext);

	return (
		<Router>
			<div className={classes.root}>
				{user.isLoggedIn && (
					<Fragment>
						<Hidden xsDown>
							<DesktopNav diableDataUpload={diableDataUpload} />
						</Hidden>

						<Hidden smUp>
							<MobileNav diableDataUpload={diableDataUpload} />
							<MobileAppBar />
						</Hidden>
					</Fragment>
				)}
				<div className={classes.main}>
					<Switch>
						<HomeRoute exact path="/" />
						<PrivateRoute path="/overview" component={Overview} user={user} />
						<PrivateRoute path="/vocabulary" component={Vocab} user={user} />
						<PrivateRoute path="/emojis" component={Emojis} user={user} />
						<PrivateRoute path="/miscellaneous" component={Misc} user={user} />
						<PrivateRoute path="/regex" component={Regex} user={user} />
						<PrivateRoute path="/upload" component={UploadData} user={user} />
						<Route path="/login" component={Login} />
						<Route path="*" component={NoMatch} />
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
