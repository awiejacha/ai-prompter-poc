import React, { useEffect, useState } from "react";
import UnderTheHood from "@/components/UnderTheHood";

const Completion = ({
  contextName,
  role,
  setRoleFn,
  prompt,
  setIsSavedFn = (bool) => bool,
  requiredForValidPrompt = [],
  rows = 12,
}) => {
  const [completion, setCompletion] = useState("");
  const [training, setTraining] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [shouldReread, setShouldReread] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/context/${contextName}`
        );
        if (response.status === 404) {
          setRoleFn("");
          setTraining([]);
          setIsSavedFn(false);

          return;
        }

        if (!response.ok) {
          throw new Error("Response not OK");
        }

        const data = await response.json();
        setRoleFn(data.role);
        setTraining(data.training);
        setIsSavedFn(true);
      } catch (error) {
        console.error("Error fetching context:", error);
        setIsSavedFn(false);
      } finally {
        setIsLoading(false);
        setShouldReread(false);
      }
    };

    setIsLoading(true);
    void fetchData();
  }, [contextName, shouldReread]);

  const handleCompletionSubmit = () => {
    setIsLoading(true);
    fetch(
      `http://localhost:3000/completion/${contextName}?prompt=${encodeURIComponent(
        prompt.replaceAll("</mark>", "").replaceAll("<mark>", "")
      )}`,
      { mode: "cors" }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response not OK");
        }
        return response.json();
      })
      .then((data) => {
        setCompletion(data?.completion);
        setTraining(data?.context?.training);
        data?.context?.role ? setRoleFn(data?.context?.role) : setRoleFn(role);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error retrieving completion:", error);
        setIsLoading(false);
      });
  };

  const handleTrainingSubmit = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/train/${contextName}`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(role ? { role } : {}),
        ...{
          training: [
            {
              prompt: prompt.replaceAll("</mark>", "").replaceAll("<mark>", ""),
              completion,
            },
          ],
        },
      }),
    })
      .then(() => {
        setIsLoading(false);
        setShouldReread(true);
      })
      .catch((error) => {
        console.error("Error training:", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className={"col-6 bg-light border border-secondary rounded"}>
          <div className={"row mt-4"}>
            <div className={"col-12"}>
              <label htmlFor={"products-input"} className={"form-label"}>
                Completion
              </label>
            </div>
            <div className={"col-12"}>
              <textarea
                placeholder={"Waiting for completion response..."}
                value={""}
                disabled={true}
                className={"form-control"}
                rows={rows}
                style={{
                  border: "none",
                  overflow: "auto",
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>
          </div>
          <div className={"row mt-4 mb-4"}>
            <div className={"col-auto btn-group"}>
              <button className={"btn btn-primary"} disabled={true}>
                <i className="fa-solid fa-comments mx-2"></i>
                Ask for prompt completion
              </button>
              <button className={"btn btn-primary"} disabled={true}>
                <i className="fa-solid fa-graduation-cap mx-2"></i>
                Train context
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={"col-6 bg-light border border-secondary rounded"}>
          <div className={"row mt-4"}>
            <div className={"col-12"}>
              <label htmlFor={"products-input"} className={"form-label"}>
                Completion
              </label>
            </div>
            <div className={"col-12"}>
              <textarea
                placeholder={"Not asked or filled in / modified manually yet"}
                value={completion}
                onChange={(event) => setCompletion(event.target.value)}
                className={"form-control"}
                rows={rows}
                style={{
                  border: "none",
                  overflow: "auto",
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>
          </div>
          <div className={"row mt-4 mb-4"}>
            <div className={"col-auto btn-group"}>
              <button
                className={"btn btn-primary"}
                onClick={handleCompletionSubmit}
                disabled={
                  !(
                    prompt &&
                    requiredForValidPrompt.reduce(
                      (carry, value) => carry && value,
                      true
                    )
                  )
                }
              >
                <i className="fa-solid fa-comments mx-2"></i>
                Ask for prompt completion
              </button>
              <button
                className={"btn btn-primary"}
                onClick={handleTrainingSubmit}
                disabled={!completion}
              >
                <i className="fa-solid fa-graduation-cap mx-2"></i>
                Train context
              </button>
            </div>
          </div>
        </div>
      )}
      <UnderTheHood
        prompt={prompt}
        role={role}
        training={training}
        requiredForValidPrompt={requiredForValidPrompt}
      />
    </>
  );
};
export default Completion;
