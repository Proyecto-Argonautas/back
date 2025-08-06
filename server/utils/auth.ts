import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink, openAPI } from "better-auth/plugins";

const FRONT_URL = process.env.FRONT_URL || "http://localhost:5173"
const BETTER_AUTH_URL = process.env.FRONT_URL || "http://localhost:5173"
const BETTER_AUTH_COOKIE_DOMAIN = process.env.BETTER_AUTH_COOKIE_DOMAIN || "localhost";


const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        // TODO implementar mandar un correo con nodemailer, mirar ejemplos en yt
        console.log(email, token, url);
      },
      disableSignUp: true,
    }),
    openAPI(),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: [FRONT_URL, BETTER_AUTH_URL],
  advanced: {
    // para usar cookies cross-domain si tus dominios cambian
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true, // true en producción HTTPS
      partitioned: true,
    },
    crossSubDomainCookies: {
      enabled: true,
      domain: BETTER_AUTH_COOKIE_DOMAIN,
    },
    useSecureCookies: true,
    cookies: {
      sessionToken: {
        attributes: {
          sameSite: "none",
          secure: true,
          partitioned: true,
        },
      },
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Duración de la cache en segundos (ej. 5 minutos)
      },
    },
  },
});
