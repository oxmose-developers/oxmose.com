"use client";

import ListItem from "components/pages/faq/ListItem";
import { CustomPortableText } from "components/shared/CustomPortableText";
import { useState } from "react";
import { FaqPayload } from "types";

export default function FaqPage ({ data }: { data: FaqPayload[]} ) {
  const [currentQuestion, setCurrentQuestion] = useState<FaqPayload>(data[0]);

  function handleQuestionClick(id: string) {
    const updatedQuestion = data.find(faq => faq._id === id)

    if (updatedQuestion) setCurrentQuestion(updatedQuestion)
  }

  return (
    <div className="grid lg:grid-cols-2 divide-x divide-slate-400">
      <div className="">
        {
          data && data.map((faq) => (
            <ListItem key={faq._id} content={faq.question} handleClick={() => handleQuestionClick(faq._id)}/>
          ))
        }
      </div>

      <div className="px-7 py-5">
        <CustomPortableText value={currentQuestion.answer} paragraphClasses="max-w-3xl mb-6 text-lg lg:mb-9 lg:text-xl text-gray-900"/>
      </div>
    </div>
  );
}