"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import Completion from "@/components/Completion";
import Input from "@/components/Input";

export default function SalesCampaignCta() {
  const contextName = "sales-campaign-cta";

  const [role, setRole] = useState("");

  const [title, setTitle] = useState("");
  const titlePrefill = "Feminine Studio";

  const [description, setDescription] = useState("");
  const descriptionPrefill =
    "Feminine, functional, and fashion forward. The label relies on thoughtful design that is timeless and transcends trends. We especially love the heart-shaped bags. Ends on Wed, 07.06 at 23:59";

  const [moods, setMoods] = useState("");
  const moodsPrefill = "stylish, sunny, hot, leisurely";

  const [encourage, setEncourage] = useState("");
  const encouragePrefill =
    "go to the beach after buying our stylish summer product";

  const [product, setProduct] = useState("");
  const productPrefill = 'Big Toast Tan leather handbag';

  const [characters, setCharacters] = useState(80);

  const [prompt, setPrompt] = useState("");

  useEffect(
    () =>
      setPrompt(
        `Write in <mark>${
          characters || 80
        }</mark> characters a campaign call to action slogan for home and living sales campaign titled "<mark>${
          title || "%title%"
        }</mark>". CTA should contain a summary of campaign description "<mark>${
          description || "%description%"
        }</mark>", presenting this campaign in <mark>${
          moods || "%moods%"
        }</mark> way.${
          encourage
            ? ` The CTA should encourage to: <mark>${encourage}</mark>.`
            : ""
        }${
          product
            ? ` The CTA should feature product: "<mark>${product}</mark>".`
            : ""
        }`
      ),
    [title, description, moods, encourage, product, characters]
  );

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Sales campaign call to action</h1>
        <div className={"row"}>
          <div className={"col-6"}>
            <Input
              name={"Sales campaign title"}
              value={title}
              setValueFn={setTitle}
              prefill={titlePrefill}
            />
            <Input
              name={"Sales campaign description"}
              value={description}
              setValueFn={setDescription}
              prefill={descriptionPrefill}
            />
            <Input
              name={"Call to action moods"}
              value={moods}
              setValueFn={setMoods}
              prefill={moodsPrefill}
              description={
                "Add impression or emotional flavour of campaign CTA here"
              }
            />
            <Input
              name={"Call to action should encourage to"}
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
            requiredForValidPrompt={[title, description, moods, characters]}
          />
        </div>
      </div>
    </main>
  );
}
