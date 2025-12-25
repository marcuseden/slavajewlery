import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Your Jewelry - Make It",
  description: "Create your one-of-a-kind jewelry piece with our advanced design tool",
};

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-stone-950 min-h-screen">
      {children}
    </div>
  );
}
