import { useContext } from "react";
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
import { NavContext } from "./contexts/NavContext";

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

const renderTabContent = (curTab) => {
  switch (curTab) {
    case "Overview":
      return <Overview />;
    case "Vocab":
      return <Vocab />;
    case "Emojis":
      return <Emojis />;
    case "Misc":
      return <Misc />;
    case "Regex":
      return <Regex />;
  }
};

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { curTab, setCurTab } = useContext(NavContext);

  return (
    <div className={classes.root}>
      <Hidden xsDown>
        <DesktopNav />
      </Hidden>

      <Hidden smUp>
        <MobileNav />
        <MobileAppBar />
      </Hidden>

      <div className={classes.main}>{renderTabContent(curTab)}</div>
    </div>
  );
};

export default App;
