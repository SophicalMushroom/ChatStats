import { Home } from "./Home";
import { Vocab } from "./Vocab";
import { Emojis } from "./Emojis";
import { Misc } from "./Misc";
import { Regex } from "./Regex";

const renderTabContent = (curTab) => {
	switch (curTab) {
		case "Home":
			return <Home />;
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

const Main = (props) => {
	return <div>{renderTabContent(props.curTab)}</div>;
};

export default Main;
