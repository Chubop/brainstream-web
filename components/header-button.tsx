"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface HeaderButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactElement;
  children: React.ReactNode;
  groupHover: boolean;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon,
  children,
  groupHover,
  ...props
}) => {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!groupHover) {
      setHover(false);
    }
  }, [groupHover]);

  return (
    <Link href="/" {...props} passHref onMouseEnter={() => setHover(true)}>
      <div
        className={`group inline-block ${cn(
          buttonVariants({ variant: "link" })
        )}`}
      >
        <div className="flex flex-row items-center space-x-1">
          {icon}
          <span
            className={cn(
              "mt-0.5 ml-2 overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300",
              hover && "max-w-xs"
            )}
          >
            {children}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HeaderButton;
