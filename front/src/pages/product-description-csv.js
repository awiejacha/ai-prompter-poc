"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import Completion from "@/components/Completion";
import Input from "@/components/Input";
import CsvFileInput from "@/components/CsvFileInput";

export default function ProductDescriptionCsv() {
  const contextName = "product-description-csv";

  const [role, setRole] = useState("");

  const [csvRows, setCsvRows] = useState([]);

  const [impression, setImpression] = useState("");
  const impressionPrefill = "style, comfort, decorative";

  const [words, setWords] = useState(120);

  const [prompt, setPrompt] = useState("");

  useEffect(
    () =>
      setPrompt(
        `Having the following JSON array of objects containing product traits: "${JSON.stringify(
          csvRows
        )}", write in <mark>${words}</mark> words for each product a description emphasizing product traits that are not empty. Description should not be a call to action. Immerse customer with the impression of: <mark>${
          impression || "%impression%"
        }</mark>.`
      ),
    [impression, words, csvRows]
  );

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Product description from CSV file</h1>
        <div className={"row"}>
          <div className={"col-6"}>
            <CsvFileInput name={"CSV file to open"} setValueFn={setCsvRows} />
            <Input
              name={"Impression"}
              value={impression}
              setValueFn={setImpression}
              prefill={impressionPrefill}
              description={"What customer should feel reading information"}
            />
            <Input
              name={"How many words"}
              value={words}
              setValueFn={setWords}
            />
          </div>
          <Completion
            contextName={contextName}
            role={role}
            setRoleFn={setRole}
            prompt={prompt}
            requiredForValidPrompt={[csvRows, impression, words]}
          />
        </div>
      </div>
    </main>
  );
}
