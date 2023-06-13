import { fetchAutoCompleteResults } from "../../api/mapApiCalls";
import { useEffect, useState } from "react";

const AutoCompleteSearchCustom = ({
  name,
  searchOption,
  customStyle,
  handleChange,
  placeholder,
  dontRestrict,
  country,
  value,
  setValue,
  style,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const staggerResults = setTimeout(() => {
      if (value.length >= 2) {
        fetchAutoCompleteResults(
          value,
          setSuggestions,
          searchOption,
          country,
          dontRestrict
        );
      }
    }, 500);
    return () => clearTimeout(staggerResults);
  }, [value]);

  const handleInputReceived = (e) => {
    const input = e.target.value;
    setValue(input);
    handleChange(e);
  };
  return (
    <>
      <input
        type="text"
        className={customStyle}
        style={style}
        key={name}
        list={name}
        name={name}
        value={value}
        placeholder={placeholder || ""}
        onChange={handleInputReceived}
      />

      <datalist id={name}>
        {suggestions?.map((item, i) => (
          <option key={i}>
            {item?.terms[dontRestrict ? item.terms.length - 1 : 0]?.value || ""}
          </option>
        ))}
      </datalist>
    </>
  );
};

export default AutoCompleteSearchCustom;
