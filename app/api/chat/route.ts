import { createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export async function POST(req: Request) {
  console.log("POST request")
  const json = await req.json();
  const { messages, previewToken } = json;

  const supabaseClient = createSupabaseServerComponentClient();
  const session = (await supabaseClient.auth.getSession()).data.session;
  const userId = await session?.user.id;

  if (!userId) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // Send a fetch request to your back-end server
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "user_id": "test_user",
    "stream_id": "stream test",
    "content": "What is life? answer in 50 words"
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow' as RequestRedirect
  };

  console.log('Sending request to https://brainstream-web.uc.r.appspot.com/chat/input with body:', raw);
  const res = await fetch('https://brainstream-web.uc.r.appspot.com/chat/input', requestOptions);

  // Get the response text
  const response = await res.json();
  const responseText = response.content ?? "Something went wrong!";

  // Create a new message with the response text
  const newMessage = {
    content: responseText,
    role: "assistant",
  };

  // Add the new message to the messages array
  const updatedMessages = [...messages, newMessage];

  // Return the updated messages array
  return new Response(JSON.stringify(updatedMessages), {
    headers: { 'Content-Type': 'application/json' },
  });
}