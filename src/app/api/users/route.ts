// app/api/users/route.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return Response.json(user);
}

// app/api/users/[id]/route.ts
export async function PUT(req: Request, { params }: any) {
  const body = await req.json();
  const user = await prisma.user.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return Response.json(user);
}

export async function DELETE(req: Request, { params }: any) {
  const user = await prisma.user.delete({
    where: { id: Number(params.id) },
  });
  return Response.json(user);
}
