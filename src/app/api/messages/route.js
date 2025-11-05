import { NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("❌ Error al obtener mensajes:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener los mensajes" },
      { status: 500 }
    );
  }
}
