"use client";

import { ExternalLink } from "@/components/external-link";
import { Timeline } from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";

function TimelinePage({}) {
  return (
    <div className="mx-auto max-w-2xl px-4 w-full">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          <ExternalLink href="https://brainstream.app">Timeline</ExternalLink>{" "}
        </h1>
        <div>
          <Timeline />
        </div>
      </div>
    </div>
  );
}

export default TimelinePage;
