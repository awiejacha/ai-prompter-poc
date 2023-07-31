import React, { useState } from "react";
import csv from "csvtojson";

const CsvFileInput = ({
  name,
  setValueFn,
  isDisabledFn = () => false,
  isRequired = true,
  description = undefined,
}) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isValidFileUploaded, setIsValidFileUploaded] = useState(false);

  const nameToSnake = (suffix) =>
    `${name.toLowerCase().replaceAll(" ", "-")}-${suffix}`;

  const changeHandler = (event) => {
    event.preventDefault();

    if (event.target.files.length !== 1) {
      setIsFileUploaded(false);
      return;
    }
    setIsFileUploaded(true);
    const reader = new FileReader();
    reader.onload = (blob) => {
      const text = blob.target?.result?.toString() || "";
      // console.log(text);
      const output = csv().fromString(text);

      if (output.readable) {
        setIsValidFileUploaded(true);
        output.then((rows) => console.log(rows) || setValueFn(rows));
      } else {
        setIsValidFileUploaded(false);
      }
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <>
      <div className={"row mt-4"}>
        <div className={"col-12"}>
          <label htmlFor={nameToSnake("input")} className={"form-label"}>
            {name}
          </label>
        </div>
        <div className="col-12 has-validation">
          <input
            id={nameToSnake("input")}
            type="file"
            disabled={isDisabledFn()}
            onChange={changeHandler}
            className={`form-control${
              (isRequired && !isFileUploaded) || !isValidFileUploaded
                ? " is-invalid"
                : ""
            }`}
          />
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
export default CsvFileInput;
