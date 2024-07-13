"use server";

export async function subscribeToNewsletter(
  prevState: { message: string; success: boolean },
  formData: FormData,
) {
  "use server";

  const rawFormData = {
    email: formData.get("email"),
  };

  console.log(rawFormData);

  return {
    message: "Success",
    success: true,
  };
}
