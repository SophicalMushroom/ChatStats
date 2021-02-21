import React, { useState, createContext } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = (props) => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [selectedEmoji, setSelectedEmoji] = useState("laughing");

	return (
		<FilterContext.Provider
			value={{
				startDate,
				setStartDate,
				endDate,
				setEndDate,
				selectedUsers,
				setSelectedUsers,
				selectedEmoji,
				setSelectedEmoji,
			}}
		>
			{props.children}
		</FilterContext.Provider>
	);
};
export default FilterContextProvider;
