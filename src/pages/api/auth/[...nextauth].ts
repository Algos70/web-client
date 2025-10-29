import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

// Issuer: KC realm OIDC discovery endpoint'in kökü:
// http://localhost:8080/realms/shop/.well-known/openid-configuration
export default NextAuth({
  providers: [
    Keycloak({
      issuer: process.env.KEYCLOAK_ISSUER, // e.g. http://localhost:8080/realms/shop
      clientId: process.env.KEYCLOAK_CLIENT_ID!, // web-client
      // Public PKCE client: clientSecret KULLANMAYIN
      clientSecret: "", // boş bırakarak public PKCE
    }),
  ],
  // SSR için HttpOnly session cookie kullanımı:
  session: { strategy: "jwt" },
  cookies: {
    // production'da __Secure- prefix ve secure:true kullanın
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_at! * 1000;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session as any).idToken = token.idToken;
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      if (token?.idToken) {
        const issuerUrl = process.env.KEYCLOAK_ISSUER;
        const logOutUrl = new URL(
          `${issuerUrl}/protocol/openid-connect/logout`
        );
        logOutUrl.searchParams.set("id_token_hint", token.idToken as string);
        try {
          await fetch(logOutUrl);
        } catch (err) {
          console.error("Error during Keycloak logout:", err);
        }
      }
    },
  },
});
