import React, { useState } from "react";


function FilterableSelect({ options, onTeamChange, selectedTeam }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };



  return (
    <div className="relative">
      <input
        type="text"
        className="block w-full px-4 py-2 border rounded-lg"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <select className="block w-full px-4 py-2 border rounded-lg mt-1"
      value={selectedTeam}
      onChange={e => {
        console.log("Dropdown value changed:", e.target.value);
        onTeamChange(e.target.value);
    }}
      >
        {filteredOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterableSelect;