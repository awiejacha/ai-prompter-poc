"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import Completion from "@/components/Completion";
import Input from "@/components/Input";

export default function NewsletterSubject() {
  const contextName = "newsletter-subject";

  const [role, setRole] = useState("");

  const [title, setTitle] = useState("");
  const titlePrefill = "Outdoor-Trend: Rope Furniture";

  const [moods, setMoods] = useState("");
  const moodsPrefill = "joyful, sunny, hot, refreshing";

  const [encourage, setEncourage] = useState("");
  const encouragePrefill =
    "have a fascinating journey throughout campaign web page and lots of chances to buy a sophisticated product";

  const [product, setProduct] = useState("");
  const productPrefill = '"Outdoor armchair Florencia"';

  const [characters, setCharacters] = useState(80);

  const [prompt, setPrompt] = useState("");

  useEffect(
    () =>
      setPrompt(
        `Write in <mark>${
          characters || 80
        }</mark> characters a newsletter subject for home and living sales campaign titled "<mark>${
          title || "%title%"
        }</mark>", presenting this campaign in <mark>${
          moods || "%moods%"
        }</mark> way.${
          encourage
            ? ` The subject should encourage to: <mark>${encourage}</mark>.`
            : ""
        }${
          product
            ? ` The subject should feature product: <mark>${product}</mark>.`
            : ""
        }`
      ),
    [characters, title, moods, encourage, product]
  );

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Newsletter subject</h1>
        <div className={"row"}>
          <div className={"col-6"}>
            <Input
              name={"Newsletter subject title"}
              value={title}
              setValueFn={setTitle}
              prefill={titlePrefill}
            />
            <Input
              name={"Newsletter subject moods"}
              value={moods}
              setValueFn={setMoods}
              prefill={moodsPrefill}
              description={
                "Add impression or emotional flavour of newsletter subject here"
              }
            />
            <Input
              name={"Newsletter subject should encourage to"}
              value={encourage}
              setValueFn={setEncourage}
              prefill={encouragePrefill}
              isRequired={false}
              description={"Complete the sentence: Should encourage to..."}
            />
            <Input
              name={"Featured product"}
              value={product}
              setValueFn={setProduct}
              prefill={productPrefill}
              isRequired={false}
              description={"Fill in, if you want to feature a product"}
            />
            <Input
              name={"How many characters"}
              value={characters}
              setValueFn={setCharacters}
            />
          </div>
          <Completion
            contextName={contextName}
            role={role}
            setRoleFn={setRole}
            prompt={prompt}
            requiredForValidPrompt={[title, moods, characters]}
          />
        </div>
      </div>
    </main>
  );
}
