"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import Completion from "@/components/Completion";
import Input from "@/components/Input";

export default function Newsletter() {
  const contextName = "newsletter";

  const [role, setRole] = useState("");

  const [subjectLine, setSubjectLine] = useState("");
  const subjectLinePrefill = "Small sofas = big love!";

  const [moods, setMoods] = useState("");
  const moodsPrefill = "compact, space-saving, stylish";

  const [paragraphs, setParagraphs] = useState(2);

  const [prompt, setPrompt] = useState("");

  useEffect(
    () =>
      setPrompt(
        `Write in <mark>${
          paragraphs || 2
        }</mark> paragraphs a newsletter with a subject line "<mark>${
          subjectLine || "%title%"
        }</mark>", create an impression of the following moods: <mark>${
          moods || "%moods%"
        }</mark>. At the end, write call to action slogan, encouraging to visit campaign's web page. Do not use trivial words for this type of content`
      ),
    [paragraphs, subjectLine, moods]
  );

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Newsletter</h1>
        <div className={"row"}>
          <div className={"col-6"}>
            <Input
              name={"Newsletter title"}
              value={subjectLine}
              setValueFn={setSubjectLine}
              prefill={subjectLinePrefill}
            />
            <Input
              name={"Newsletter moods"}
              value={moods}
              setValueFn={setMoods}
              prefill={moodsPrefill}
              description={
                "Add impression or emotional flavour of newsletter here"
              }
            />
            <Input
              name={"How many paragraphs"}
              value={paragraphs}
              setValueFn={setParagraphs}
            />
          </div>
          <Completion
            contextName={contextName}
            role={role}
            setRoleFn={setRole}
            prompt={prompt}
            requiredForValidPrompt={[subjectLine, moods, paragraphs]}
          />
        </div>
      </div>
    </main>
  );
}
