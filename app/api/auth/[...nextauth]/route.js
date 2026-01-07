import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabaseClient";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Save user to Supabase on first login
      if (account?.provider === "google") {
        try {
          // Check if user already exists
          const { data: existingUser } = await supabase
            .from("users")
            .select("id")
            .eq("google_id", profile.sub)
            .single();

          if (!existingUser) {
            // Create new user
            const { error } = await supabase.from("users").insert({
              google_id: profile.sub,
              email: user.email,
              name: user.name,
              image: user.image,
            });

            if (error) {
              console.error("Error creating user in Supabase:", error);
            } else {
              console.log("New user created in Supabase:", user.email);
            }
          } else {
            // Update last login time
            await supabase
              .from("users")
              .update({ last_login: new Date().toISOString() })
              .eq("google_id", profile.sub);
            
            console.log("Existing user logged in:", user.email);
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
        }
      }
      return true; // Allow sign in
    },
    async session({ session, token }) {
      // Add user ID to session
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
});

export { handler as GET, handler as POST };

