"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  } catch (error) {
    console.error("Sign-up error:", error);
  }

  redirect("/");
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);
  }

  redirect("/");
}

export async function signOutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Sign-out error:", error);
  }

  redirect("/");
}
