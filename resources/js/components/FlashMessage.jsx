import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

export const FlashMessage = () => {
  const { props } = usePage(); // Destructure props directly
  const flash = props?.flash || {};

  useEffect(() => {
    // It's important that the dependency array for useEffect correctly captures
    // when a new message of a specific type arrives.
    // Using the message string itself as a dependency ensures the effect
    // re-runs if the message content changes.

    if (flash?.success) {
      toast.success(flash.success);
      // To prevent re-triggering, ideally Inertia clears this or the backend sends unique IDs.
      // For now, we'll rely on Sonner's default behavior or manual dismissal by the user.
      // If re-triggering becomes an issue, one might need to set props.flash.success = null;
      // but this is not ideal. A better solution would be event-based or unique message IDs.
      if (props.flash) props.flash.success = null; // Attempt to clear after showing
    }
    if (flash?.error) {
      toast.error(flash.error);
      if (props.flash) props.flash.error = null;
    }
    if (flash?.warning) {
      toast.warning(flash.warning);
      if (props.flash) props.flash.warning = null;
    }
    if (flash?.info) {
      toast.info(flash.info);
      if (props.flash) props.flash.info = null;
    }
  }, [flash?.success, flash?.error, flash?.warning, flash?.info, props]); // Added props to dep array due to direct mutation

  return null; // This component no longer renders anything itself
};
