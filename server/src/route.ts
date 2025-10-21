import Router from 'express';
import { testiq } from './agent/testiq.js';

const router = Router();

router.post('/testiq-agent', testiq);

export default router;