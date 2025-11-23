"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const isAdmin = async () => {
  try {
    const { success, error } = await auth.api.hasPermission({
      headers: await headers(),
      body: {
        permissions: {
          organization: ["update", "delete"],
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error || "Failed to check permissions",
      };
    }

    return success;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error || "Failed to check permissions",
    };
  }
};
