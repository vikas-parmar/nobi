import Link from "next/link";
import { signUpAction } from "@/app/api/actions/auth";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>

        <form action={signUpAction} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

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
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href="/sign-in"
            className="text-indigo-600 hover:underline text-sm"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
