import React from "react";

const UnderTheHood = ({
  prompt,
  role,
  training,
  requiredForValidPrompt = [],
}) => {
  return (
    <>
      <div
        className={`row alert alert-${
          prompt &&
          requiredForValidPrompt.reduce((carry, value) => carry && value, true)
            ? "success"
            : "warning"
        } mt-4`}
      >
        <div className={"col-12 lead"}>
          <i className="fa-regular fa-lightbulb mx-2"></i>Generated prompt
        </div>
        <div
          className={"col-12 text-muted"}
          dangerouslySetInnerHTML={{
            __html:
              prompt ||
              "Prompt can not be generated yet, please fill the form in",
          }}
        />
      </div>
      <div className={`row alert alert-${role ? "secondary" : "warning"}`}>
        <div className={"col-12 lead"}>
          <i className="fa-regular fa-lightbulb mx-2"></i>Context role
        </div>
        <div className={"col-12 text-muted"}>
          {role || "No role has been set for this context"}
        </div>
      </div>
      {training.length ? (
        training.map((instruction, idx) => (
          <div className={"row alert alert-secondary"}>
            <div className={"col-12 lead"}>
              <i className="fa-solid fa-graduation-cap mx-2"></i>Trained
              instruction #{idx + 1}
            </div>
            <div className={"col-6"}>
              <em>
                <small>{instruction.prompt}</small>
              </em>
            </div>
            <div className={"col-6 text-muted"}>{instruction.completion}</div>
          </div>
        ))
      ) : (
        <div className={"row alert alert-secondary"}>
          <div className={"col-12 lead"}>
            <i className="fa-solid fa-graduation-cap mx-2"></i>There was no
            training yet
          </div>
        </div>
      )}
    </>
  );
};
export default UnderTheHood;
