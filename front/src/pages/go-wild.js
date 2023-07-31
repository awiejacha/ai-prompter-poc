"use client";

import { useState } from "react";
import styles from "../app/page.module.css";
import Completion from "@/components/Completion";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

export default function GoWild() {
  const [contextName, setContextName] = useState("");

  const [role, setRole] = useState("");

  const [isSaved, setIsSaved] = useState(false);

  const [prompt, setPrompt] = useState("");

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Go wild&trade;!</h1>
        <div className={"row"}>
          <div className={"col-6"}>
            <Input
              name={"Context"}
              value={contextName}
              setValueFn={setContextName}
              prefill={"context-that-gone-completely-wild"}
              description={"Enter the name of the context you want to train"}
            />
            <Textarea
              name={"Role"}
              value={role}
              rows={10}
              isDisabledFn={() => !!isSaved}
              setValueFn={setRole}
              prefill={"You are going wild with your creativity..."}
              description={`Role that you want the AI to assume${
                isSaved ? ". It is disabled because context is saved" : ""
              }`}
            />
            <Textarea
              name={"Prompt"}
              value={prompt}
              rows={5}
              setValueFn={setPrompt}
              prefill={"How wild we can go with our creativity?"}
              description={"What you would like the AI to ask for"}
            />
          </div>
          <Completion
            contextName={contextName}
            role={role}
            setRoleFn={setRole}
            prompt={prompt}
            setIsSavedFn={setIsSaved}
            requiredForValidPrompt={[contextName, role, prompt]}
            rows={22}
          />
        </div>
      </div>
    </main>
  );
}
