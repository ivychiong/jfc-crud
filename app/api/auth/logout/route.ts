import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({ message: "Logged out successfully" });
    res.cookies.set({
      name: "token",
      value: "",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
