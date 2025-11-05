import { NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, content } = await req.json();

    const newMessage = await prisma.message.create({
      data: { name, email, content },
    });

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error("❌ Error al guardar el mensaje:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
