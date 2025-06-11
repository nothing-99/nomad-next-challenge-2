import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) return user;
  }
  notFound();
}

export default async function ProfilePage() {
  const user = await getUser();
  return (
    <div className='max-w-xs flex flex-col gap-4 mx-auto py-2 px-4 bg-stone-200 rounded-sm shadow-orange-400 shadow-2xl'>
      <h1>Welcome, {user?.username}</h1>
    </div>
  );
}
