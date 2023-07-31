"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import Completion from "@/components/Completion";
import Input from "@/components/Input";

export default function HomeArrangementDescription() {
  const contextName = "home-arrangement-description";

  const [role, setRole] = useState("");

  const [title, setTitle] = useState("");
  const titlePrefill = "Modern vibes in the living room";

  const [moods, setMoods] = useState("");
  const moodsPrefill = "comfortable, modern, comfort, coziness";

  const [featuring, setFeaturing] = useState("");
  const featuringPrefill =
    "khaki green Lennon sofa, cocktail armchairs, organically shaped coffee table";

  const [words, setWords] = useState(50);

  const [prompt, setPrompt] = useState("");

  useEffect(
    () =>
      setPrompt(
        `Write in up to <mark>${words}</mark> words an article for the home arrangement titled <mark>${
          title || "%title%"
        }</mark>, emphasizing the following moods: <mark>${
          moods || "%moods%"
        }</mark>. Article should feature the following: <mark>${
          featuring || "%featuring%"
        }</mark>`
      ),
    [words, title, moods, featuring]
  );

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Home arrangement description</h1>
        <div className={"row"}>
          <div className={"col-6"}>
            <Input
              name={"Home arrangement title"}
              value={title}
              setValueFn={setTitle}
              prefill={titlePrefill}
            />
            <Input
              name={"Moods"}
              value={moods}
              setValueFn={setMoods}
              prefill={moodsPrefill}
              description={
                "Add impression or emotional flavour of the arrangement here"
              }
            />
            <Input
              name={"Featuring"}
              value={featuring}
              setValueFn={setFeaturing}
              prefill={featuringPrefill}
              description={
                "What products or product are featured in the arrangement"
              }
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
            requiredForValidPrompt={[title, moods, words]}
          />
        </div>
      </div>
    </main>
  );
}
