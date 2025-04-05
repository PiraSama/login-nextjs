// pages/api/search-user.ts
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ message: "Vui lòng nhập từ khóa." });
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: { contains: keyword, mode: 'insensitive' } },  // Tìm theo email
        { role: { contains: keyword, mode: 'insensitive' } }    // Tìm theo role
      ],
    },
  });

  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(404).json({ message: "Không thấy." });
  }
}
