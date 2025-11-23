"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { removeMember } from "@/server/members";
import { Button } from "./ui/button";

export default function MembersTableAction({ memberId }: { memberId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRemoveMember = async () => {
    try {
      setIsLoading(true);
      const { success, error } = await removeMember(memberId);

      if (!success) {
        toast.error(error || "Failed to remove member");
        return;
      }

      setIsLoading(false);
      toast.success("Member removed from organization");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove member from organization");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={handleRemoveMember}
      size="sm"
      variant="destructive"
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Remove"}
    </Button>
  );
}
