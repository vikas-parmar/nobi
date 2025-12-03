"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { signOutAction } from "@/app/api/actions/auth";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { useSession } = authClient;
  const { data: session, isPending, error } = useSession();
  const user = session?.user;

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <FileText className="w-6 h-6" />
          <span>Nobi</span>
        </Link>
        <div className="flex items-center gap-4">
          {/* Loading State */}
          {isPending && (
            <span className="text-sm text-gray-500">Loading...</span>
          )}

          {/* Error State */}
          {!isPending && error && (
            <span className="text-sm text-red-500">
              Error: {error.message ?? "Unknown error"}
            </span>
          )}

          {/* Authenticated */}
          {!isPending && !error && user && (
            <>
              <span className="text-sm text-gray-700">
                Welcome, {user.name}
              </span>
              <Button onClick={signOutAction}>Sign Out</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
