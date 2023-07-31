"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import Completion from "@/components/Completion";
import Input from "@/components/Input";

export default function Translator() {
  const contextName = "translator";

  const [role, setRole] = useState("");

  const [langCode, setLangCode] = useState("");
  const langCodePrefill = "FR";

  const [text, setText] = useState("");
  const textPrefill =
    "Sommer-Trend: Greek Goddess Style. Sophisticated, elegant und absolut im Trend – wir tauchen ein in eine göttliche Interior-Welt, in denen Blau und Weiß den Ton angeben und natürliche Materialien hohe Wellen schlagen";

  const [prompt, setPrompt] = useState("");

  useEffect(
    () =>
      setPrompt(
        `Translate to the language of country with <mark>${
          langCode || "%lang%"
        }</mark> country code the following text: "<mark>${
          text || "%text%"
        }</mark>"`
      ),
    [langCode, text]
  );

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Translator</h1>
        <div className={"row"}>
          <div className={"col-6"}>
            <Input
              name={"Language code"}
              value={langCode}
              setValueFn={setLangCode}
              prefill={langCodePrefill}
              description={"Two-character language code"}
            />
            <Input
              name={"Translation moods"}
              value={text}
              setValueFn={setText}
              prefill={textPrefill}
              description={"Text to translate"}
            />
          </div>
          <Completion
            contextName={contextName}
            role={role}
            setRoleFn={setRole}
            prompt={prompt}
            requiredForValidPrompt={[langCode, text]}
          />
        </div>
      </div>
    </main>
  );
}
