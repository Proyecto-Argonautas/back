// oxlint-disable no-unused-vars
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
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
    }
  },
});
