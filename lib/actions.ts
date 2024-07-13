"use server";

const listId = "";

const apiKey = "";

export async function subscribeToNewsletter(
  prevState: { message: string; success: boolean },
  formData: FormData,
) {
  "use server";

  const response = await fetch(
    `https://emailoctopus.com/api/1.6/lists/${listId}/contacts`,
    {
      method: "POST",
      body: JSON.stringify({
        api_key: apiKey,
        email_address: formData.get("email"),
        /**
         * @note Needed for double-opt in
         */
        status: "PENDING",
      }),
    },
  );

  if (!response.ok) {
    const body = await response.json();

    return {
      code: body.code,
      message: body.message,
      success: false,
    };
  }

  return {
    message: "Success",
    success: true,
  };
}
