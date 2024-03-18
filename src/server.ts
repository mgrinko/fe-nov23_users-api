import express from 'express';
import cors from 'cors';
import prisma from './utils/db';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: '*' }));

function getColor(colorId: number) {
  return prisma.color.findUnique({
    where: {
      id: colorId,
    },
  });
}

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      carColor: true,
    },
  });

  res.send(users);
});

app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.status(400).send('Invalid user ID');
    return;
  }

  const user = prisma.user.findUnique({
    where: {
      id: +userId,
    },
    include: {
      carColor: true,
    },
  });

  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/users', express.json(), async (req, res) => {
  const { name, carColorId } = req.body;

  if (typeof name !== 'string' || typeof carColorId !== 'number') {
    res.status(422).send('Invalid user data');
    return;
  }

  const user = await prisma.user.create({
    data: {
      name,
      carColorId,
    },
    include: {
      carColor: true,
    },
  });

  res.send(user);
});

app.get('/colors', async (req, res) => {
  const colors = await prisma.color.findMany();

  res.send(colors);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
