"use client";

import { CustomPortableText } from "_old/components/shared/CustomPortableText";
import ListItem from "_old/components/shared/ListItem";
import { useState } from "react";
import { CategoryArticlePayload } from "_old/types";

export default function CategoryArticleComponent({
  data,
}: {
  data: CategoryArticlePayload[];
}) {
  const [currentQuestion, setCurrentQuestion] =
    useState<CategoryArticlePayload>(data[0]);

  function handleQuestionClick(id: string) {
    const updatedQuestion = data.find((faq) => faq._id === id);

    if (updatedQuestion) setCurrentQuestion(updatedQuestion);
  }

  return (
    <div className="grid divide-x divide-slate-400 lg:grid-cols-2">
      <div className="">
        {data &&
          data.map((faq) => (
            <ListItem
              key={faq._id}
              content={faq.category}
              handleClick={() => handleQuestionClick(faq._id)}
              classesWrapper="cursor-pointer"
            />
          ))}
      </div>

      <div className="px-7 py-5">
        <CustomPortableText
          value={currentQuestion.article}
          paragraphClasses="max-w-3xl mb-6 text-lg lg:mb-9 lg:text-xl text-slate-800"
        />
      </div>
    </div>
  );
}
