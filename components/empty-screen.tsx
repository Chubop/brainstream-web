import { UseChatHelpers } from "ai/react";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { IconArrowRight } from "@/components/ui/icons";
import { Timeline } from "./timeline";

const exampleMessages = [
  {
    heading: "Find next steps",
    message: `What is a "serverless function"?`,
  },
  {
    heading: "Generate an executive summary",
    message: "Summarize the following article for a 2nd grader: \n",
  },
  {
    heading: "Create an .ics file",
    message: `Draft an email to my boss about the following: \n`,
  },
];

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, "setInput">) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          <ExternalLink href="https://brainstream.app">
            Brainstream
          </ExternalLink>{" "}
          Console
        </h1>
        <div className="mb-2 leading-normal text-muted-foreground">
          View your recording history by clicking the top-left icon.
        </div>
        <div className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </div>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
