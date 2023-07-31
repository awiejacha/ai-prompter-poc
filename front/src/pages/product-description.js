"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import Completion from "@/components/Completion";
import Input from "@/components/Input";

export default function ProductDescription() {
  const contextName = "product-description";

  const [role, setRole] = useState("");

  const [product, setProduct] = useState("");
  const productPrefill = "Sofa Adrian (3-seater)";

  const [features, setFeatures] = useState("");
  const featuresPrefill = "deep seats, soft upholstery, four cushions";

  const [impression, setImpression] = useState("");
  const impressionPrefill = "style, comfort, decorative";

  const [words, setWords] = useState(80);

  const [prompt, setPrompt] = useState("");

  useEffect(
    () =>
      setPrompt(
        `Write in <mark>${words}</mark> words an information about "${
          product || "%product%"
        }" product, emphasizing these features: <mark>${
          features || "%features%"
        }</mark>. Description should not be a call to action. Immerse customer, create an impression of: <mark>${
          impression || "%impression%"
        }</mark>.`
      ),
    [product, impression, features, words]
  );

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Product description</h1>
        <div className={"row"}>
          <div className={"col-6"}>
            <Input
              name={"Product name"}
              value={product}
              setValueFn={setProduct}
              prefill={productPrefill}
            />
            <Input
              name={"Product features"}
              value={features}
              setValueFn={setFeatures}
              prefill={featuresPrefill}
              description={"Emphasize good product features"}
            />
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
            requiredForValidPrompt={[product, impression, features, words]}
          />
        </div>
      </div>
    </main>
  );
}
