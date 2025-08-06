import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";

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
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
  advanced: {
    // para usar cookies cross-domain si tus dominios cambian
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true, // true en producción HTTPS
      partitioned: true,
    },
    crossSubDomainCookies: {
      enabled: true,
      domain: "localhost",
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
