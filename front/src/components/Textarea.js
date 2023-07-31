import React from "react";

const Textarea = ({
  name,
  value,
  setValueFn,
  rows = 3,
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
          <textarea
            rows={rows}
            id={nameToSnake("textarea")}
            value={value}
            placeholder={prefill ? `eg. ${prefill}` : ""}
            disabled={isDisabledFn()}
            onChange={(event) => {
              setValueFn(event.target.value);
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
export default Textarea;
