"use client";

import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

export default function ErrorTips({ msg }: { msg: string }) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      variant: "destructive",
      description: msg,
    });
  }, [msg, toast]);
  return <div></div>;
}
