import prisma from "../services/prismaClient";

export const getTravels = async (req: Request, res: Response) => {
  try {
    const travels = await prisma.travel.findMany();
    res.status(200).json(travels);
  } catch (err: any) {
    res.status(400).json({ message: "Failed to fetch travels" });
  }
};

export const createTravel = async (req: Request, res: Response) => {
  console.log("create travel");
  const { destiny, start_date, end_date, userId } = req.body;
  const travel = await prisma.travel.create({
    // data: ...req.body
    data: {
      destiny,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      userId
    }
  });
  res.status(201).json({ message: "user created succesfully", travel });
};
