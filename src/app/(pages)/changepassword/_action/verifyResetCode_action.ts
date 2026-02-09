"use server";

export async function verifyResetCodeAction(values: { resetCode: string }) {
  const res = await fetch(`${process.env.API_URL}/auth/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return data;
}
