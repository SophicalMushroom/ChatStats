import React, { useState, createContext } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = (props) => {
	const [startDate, setStartDate] = useState(new Date("2014-08-18T23:59:59"));
	const [endDate, setEndDate] = useState(new Date("2014-08-19T23:59:59"));
	const [selectedUsers, setSelectedUsers] = useState([]);

	return (
		<FilterContext.Provider
			value={{
				startDate,
				setStartDate,
				endDate,
				setEndDate,
				selectedUsers,
				setSelectedUsers,
			}}
		>
			{props.children}
		</FilterContext.Provider>
	);
};
export default FilterContextProvider;
