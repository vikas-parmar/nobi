import Link from "next/link";
import { signInAction } from "@/app/api/actions/auth";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>

        <form action={signInAction} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href="/sign-up"
            className="text-indigo-600 hover:underline text-sm"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
