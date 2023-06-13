import React from 'react'
import { TextField } from '@mui/material'

const CustomField = ({
  error,
  onChange,
  onBlur,
  name,
  label,
  helperText,
  minRows,
  multiline,
  type,
  value,
  defaultValue,
  placeholder,
}) => {
  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      size="small"
      type={type}
      fullWidth
      error={error}
      multiline={multiline}
      minRows={minRows}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      className="mb-2"
      label={label}
      name={name}
      value={value}
      helperText={helperText}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  )
}

export default CustomField
