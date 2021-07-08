import Joi from "joi-browser";
import Input from "../components/common/input";

const validateProperty = (name, value, schema) => {
  const propertyObj = { [name]: value };
  const propertySchema = { [name]: schema[name] };

  const { error } = Joi.validate(propertyObj, propertySchema);
  return error && error.details[0].message;
};

const validate = (state, schema) => {
  const { error } = Joi.validate(state, schema, { abortEarly: false });
  if (!error) {
    return null;
  }
  const errors = {};
  for (const detailsItem of error.details) {
    errors[detailsItem.path[0]] = detailsItem.message;
  }
  return errors;
};

const input = (name, handleChange, errors, value, type = "text") => {
  return (
    <Input
      type={type}
      name={name}
      handleChange={handleChange}
      error={errors[name]}
      placeholder={name}
      value={value}
    />
  );
};

const service = {
  validate,
  validateProperty,
  input,
};

export default service;
