"use server";

export async function resetPasswordAction(values: {
  email: string;
  newPassword: string;
}) {
  const res = await fetch(`${process.env.API_URL}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return data;
}
