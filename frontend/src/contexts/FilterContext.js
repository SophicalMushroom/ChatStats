import React, { useState, createContext } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = (props) => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
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
