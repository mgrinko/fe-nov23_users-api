import express from 'express';
import cors from 'cors';
import { Color, User } from './types';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: '*' }));

const users: User[] = [
  { id: 1, name: 'Valeriy Zaluzhnyi', carColorId: 5 },
  { id: 2, name: 'Pany Anna', carColorId: 4 },
  { id: 3, name: 'Pan Roman', carColorId: 2 },
];

const colors: Color[] = [
  { id: 1, name: 'Black' },
  { id: 2, name: 'DeepPink' },
  { id: 3, name: 'Red' },
  { id: 4, name: 'Aquamarine' },
  { id: 5, name: 'Gold' },
  { id: 6, name: 'YellowGreen' },
  { id: 7, name: 'Yellow' },
];

function getColor(colorId: number) {
  return colors.find(color => color.id === colorId);
}

function normalizeUser(user: User) {
  return {
    ...user,
    carColor: getColor(user.carColorId),
  };
}

app.get('/users', (req, res) => {
  res.send(users.map(normalizeUser));
});

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.status(400).send('Invalid user ID');
    return;
  }

  const user = users.find(user => user.id === +userId);

  if (user) {
    res.send(normalizeUser(user));
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/users', express.json(), (req, res) => {
  const { name, carColorId } = req.body;

  if (typeof name !== 'string' || typeof carColorId !== 'number') {
    res.status(422).send('Invalid user data');
    return;
  }

  const user: User = {
    id: users.length + 1,
    name,
    carColorId,
  };

  users.push(user);
  res.send(normalizeUser(user));
});

app.get('/colors', (req, res) => {
  res.send(colors);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
