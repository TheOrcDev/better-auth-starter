import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ invitationId: string }> }
) {
  const { invitationId } = await params;

  try {
    const data = await auth.api.acceptInvitation({
      body: {
        invitationId,
      },
      headers: await headers(),
    });

    console.log(data);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
