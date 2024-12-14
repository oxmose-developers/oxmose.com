"use server";

import "server-only";

const listId = process.env.EMAIL_OCTOPUS_LIST_ID!;

if (!listId) {
  throw new Error("Missing env var: EMAIL_OCTOPUS_LIST_ID");
}

const apiKey = process.env.EMAIL_OCTOPUS_API_KEY!;

if (!apiKey) {
  throw new Error("Missing env var: EMAIL_OCTOPUS_API_KEY");
}

export async function subscribeToNewsletter(
  prevState: any,
  formData: FormData,
) {
  "use server";

  const email = formData.get("email");

  if (!email) {
    return {
      message: "Email is required",
      success: false,
    };
  }

  const response = await fetch(
    `https://emailoctopus.com/api/1.6/lists/${listId}/contacts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email_address: email,
        status: "PENDING",
      }),
    },
  );

  const body = await response.json();

  if (!response.ok) {
    return {
      message: `Unable to subscribe to newsletter:\n${body.error.message}`,
      success: false,
    };
  }

  return {
    message: "Success",
    success: true,
  };
}
