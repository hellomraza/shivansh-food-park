'use client';

import { submitContact } from "@/actions/contact";
import { useToast } from "@/hooks/use-toast";
import type { InsertContact } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";

export function useContactSubmission() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const result = await submitContact(data);
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We will get back to you shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to submit form',
        variant: "destructive",
      });
    }
  });
}
