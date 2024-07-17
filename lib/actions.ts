"use server";

const listId = process.env.EMAIL_OCTOPUS_LIST_ID!;

if (!listId) {
  throw new Error("Missing env var: EMAIL_OCTOPUS_LIST_ID");
}

const apiKey = process.env.EMAIL_OCTOPUS_API_KEY!;

if (!apiKey) {
  throw new Error("Missing env var: EMAIL_OCTOPUS_API_KEY");
}

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
