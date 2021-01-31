import { useContext } from "react";
import { Home } from "./Home";
import { Vocab } from "./Vocab";
import { Emojis } from "./Emojis";
import { Misc } from "./Misc";
import { Regex } from "./Regex";
import { NavContext } from "./../Contexts/NavContext";

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

export const Main = () => {
	const [curTab, setCurTab, isMobileNavOpen, setIsMobileNavOpen] = useContext(
		NavContext
	);

	return <div>{renderTabContent(curTab)}</div>;
};
