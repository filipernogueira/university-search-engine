import { useState } from 'react';
import { Select, Option } from "@material-tailwind/react";

const Dropdown = ({ label, options, value, setValue }) => {
    const [selectedOption, setSelectedOption] = useState(null);  

  return (
    <div>
      <Select variant="outlined" label={label} value={value} onChange={(val) => setValue(val)}>
        {options.map((option, idx) => (
          <Option key={idx} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
