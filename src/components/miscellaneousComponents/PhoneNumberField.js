import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
const PhoneNumberField = ({
  onChange,
  value,
  defaultValue,
  placeholder,
  name,
  containerStyle,
  inputStyle,
  inputProps,
  country,
}) => {
  return (
    <PhoneInput
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      name={name}
      placeholder={placeholder}
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      inputProps={inputProps}
      enableSearch
      autoFormat
      preferredCountries={["pk", "tr", "ae"]}
    />
  );
};

export default PhoneNumberField;
