import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Busca el usuario por email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // Verifica la contraseña
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // Retorna datos mínimos del usuario
        return { id: user.id.toString(), email: user.email, name: user.username };
      },
    }),
  ],
  pages: {
    signIn: "/login", // 👈 tu página de login
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
