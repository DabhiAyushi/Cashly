"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ChartDonutIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
    width={size}
  >
    <path
      fillRule="evenodd"
      d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
      clipRule="evenodd"
    />
  </svg>
);

const PlusCircleIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
    width={size}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
      clipRule="evenodd"
    />
  </svg>
);

const ReceiptIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
    width={size}
  >
    <path
      fillRule="evenodd"
      d="M12 1.5c-1.921 0-3.816.111-5.68.327-1.497.174-2.57 1.46-2.57 2.93V21.75a.75.75 0 0 0 1.029.696l3.471-1.388 3.472 1.388a.75.75 0 0 0 .556 0l3.472-1.388 3.471 1.388a.75.75 0 0 0 1.029-.696V4.757c0-1.47-1.073-2.756-2.57-2.93A49.255 49.255 0 0 0 12 1.5Zm3.53 7.28a.75.75 0 0 0-1.06-1.06l-6 6a.75.75 0 1 0 1.06 1.06l6-6ZM8.625 9a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm5.625 3.375a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
      clipRule="evenodd"
    />
  </svg>
);

export const BottomNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error(
        "Invalid file type. Please upload a JPEG, PNG, or WebP image."
      );
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 10MB.");
      return;
    }

    setIsUploading(true);
    const loadingToast = toast.loading("Analyzing receipt...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze-receipt", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze receipt");
      }

      toast.dismiss(loadingToast);
      toast.success(
        `Receipt analyzed! Found ${data.analysis.expenses.length} expense(s)`
      );

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Redirect to receipts page
      router.push("/receipts");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error instanceof Error ? error.message : "Failed to analyze receipt"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const navLinks = [
    {
      href: "/analysis",
      label: "Analysis",
      icon: <ChartDonutIcon size={32} />,
    },
    {
      href: null,
      label: "Add Receipt",
      icon: <PlusCircleIcon size={32} />,
      onClick: handlePlusClick,
    },
    {
      href: "/receipts",
      label: "Receipts",
      icon: <ReceiptIcon size={32} />,
    },
  ];

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        disabled={isUploading}
      />

      <div className="p-2.5 fixed bottom-0 w-full z-50">
        <div className="rounded-full p-4 bg-muted/80  backdrop-blur-md max-w-4xl mx-auto">
          <div className="flex justify-around items-center">
            {navLinks.map((link, index) =>
              link.href ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-col items-center transition-colors ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {link.icon}
                  <span className="text-sm mt-1 hidden md:block">
                    {link.label}
                  </span>
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={link.onClick}
                  disabled={isUploading}
                  className={`flex flex-col items-center transition-colors ${
                    isUploading
                      ? "text-foreground/40 cursor-not-allowed"
                      : "text-foreground/60 hover:text-foreground cursor-pointer"
                  }`}
                >
                  {link.icon}
                  <span className="text-sm mt-1 hidden md:block">
                    {link.label}
                  </span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
