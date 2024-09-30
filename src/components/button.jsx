export const CommonButton = ({ label, onload, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="  w-full border border-strokedark bg-bodydark p-2 text-sm text-whiter shadow-md hover:bg-strokedark hover:text-whiter"
      disabled={disabled}
    >
      {onload ? (
        <div className="flex flex-row justify-center">
          <div
            className={`h-5 w-5 animate-spin rounded-full border-2 border-solid border-whiten border-t-transparent`}
          ></div>
          <div className={`pl-2 text-whiten`}>Please wait..</div>
        </div>
      ) : (
        label
      )}
    </button>
  );
};
