export const CommonInput = ({
  input,
  type,
  placeholder,
  error,
  errorMessage,
  onInputChange,
  onKeyChange,
  children,
  reference,
  isDisabled,
  onChg,
  isAutoFocus,
}) => {
  return (
    <div className="relative">
      <input
        value={input}
        type={type}
        ref={reference}
        placeholder={placeholder}
        disabled={isDisabled}
        autoFocus={isAutoFocus}
        onInput={(event) => {
          const value = event.target.value;

          //const filtered = value.replace(/\D/g, "");

          onInputChange(value);
        }}
        onKeyDown={onKeyChange}
        onChange={onChg}
        className={`w-full border bg-white px-2  py-1 shadow-md outline-none transition ${
          error ? "border-red" : "border-strokedark"
        } bg-transparent text-black focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
      />
      {error ? (
        <span className="mt-1 text-sm text-red">{errorMessage}</span>
      ) : (
        <></>
      )}
    </div>
  );
};
