import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const FlashMessage = () => {
  const props = usePage().props;
  const flash = props?.flash || {};
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [opacity, setOpacity] = useState(1);

  // Handle close with fade-out animation
  const handleClose = () => {
    setOpacity(0);
    setTimeout(() => {
      setVisible(false);
      setOpacity(1);
    }, 300); // Match this with the transition duration in CSS
  };

  useEffect(() => {
    try {
      // Check if we have a flash message
      if (flash?.success) {
        setMessage(flash.success);
        setType("success");
        setVisible(true);
        setOpacity(1);
      } else if (flash?.error) {
        setMessage(flash.error);
        setType("error");
        setVisible(true);
        setOpacity(1);
      } else if (flash?.warning) {
        setMessage(flash.warning);
        setType("warning");
        setVisible(true);
        setOpacity(1);
      } else if (flash?.info) {
        setMessage(flash.info);
        setType("info");
        setVisible(true);
        setOpacity(1);
      }
    } catch (error) {
      console.error("Error processing flash message:", error);
    }

    // Auto-hide after 5 seconds
    if (visible) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [flash?.success, flash?.error, flash?.warning, flash?.info]);

  if (!visible) return null;

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const icons = {
    success: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    error: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    warning: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    info: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  };

  return (
    <div
      style={{ 
        opacity, 
        transition: 'opacity 300ms ease-in-out',
        transform: `translateY(${opacity === 1 ? '0' : '-10px'})`,
      }}
      className={cn(
        "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-white flex items-center gap-3 max-w-sm border border-white border-opacity-20",
        bgColor[type]
      )}
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <div className="flex-grow text-sm font-medium">
        {message}
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
};
