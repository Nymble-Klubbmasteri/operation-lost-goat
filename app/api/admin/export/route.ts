import { auth } from '@/auth';
import { NextRequest } from 'next/server';
import { fetchEventsBetweenDates } from '@/app/lib/data';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user.role) {
    return new Response("", {
      status: 404,
    });
  }
  if (session.user.admin !== 'Yes') {
    return new Response("", {
      status: 404,
    });
  }
  const searchParams = request.nextUrl.searchParams;
  const events = await fetchEventsBetweenDates(
    parseInt(searchParams.get('type') as string),
    searchParams.get('date_from') as string,
    searchParams.get('date_to') as string
  );
  return new Response(
    JSON.stringify(events),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
