import dotenv from 'dotenv';
import express from 'express';
import agentRouter from './route.js';
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/v1', agentRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});