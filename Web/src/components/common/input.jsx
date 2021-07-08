const Input = ({ name, error, handleChange, ...rest }) => {
  return (
    <div className="mb-3">
      <input
        autoComplete="off"
        className="form-control"
        name={name}
        onChange={(e) => handleChange(e)}
        {...rest}
      />
      {error && <small className="text-danger ml-2 mb-3">{error}</small>}
    </div>
  );
};

export default Input;
