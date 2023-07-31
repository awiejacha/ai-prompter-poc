import React from "react";

const Input = ({
  name,
  value,
  setValueFn,
  isDisabledFn = () => false,
  isRequired = true,
  prefill = undefined,
  description = undefined,
}) => {
  const nameToSnake = (suffix) =>
    `${name.toLowerCase().replaceAll(" ", "-")}-${suffix}`;

  return (
    <>
      <div className={"row mt-4"}>
        <div className={"col-12"}>
          <label htmlFor={nameToSnake("input")} className={"form-label"}>
            {name}
          </label>
        </div>
        <div
          className={`col-12${prefill ? " input-group" : ""}${
            isRequired ? " has-validation" : ""
          }`}
        >
          <input
            id={nameToSnake("input")}
            type={typeof value === "string" ? "text" : "number"}
            value={value}
            placeholder={prefill ? `eg. ${prefill}` : ""}
            disabled={isDisabledFn()}
            onChange={(event) => {
              if (typeof value === "string") {
                setValueFn(event.target.value);
                return;
              }
              const number = isNaN(parseInt(event.target.value))
                ? value
                : parseInt(event.target.value);
              setValueFn(number);
            }}
            className={`form-control${
              isRequired && !value ? " is-invalid" : ""
            }`}
          />
          {prefill ? (
            <button
              className={"btn btn-primary"}
              id={nameToSnake("prefill")}
              onClick={() => setValueFn(prefill)}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </button>
          ) : (
            ""
          )}
        </div>
        {description ? (
          <div className={"col-12 form-text"}>{description}</div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default Input;
