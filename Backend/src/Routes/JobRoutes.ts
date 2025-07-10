import { Router } from 'express';
import { createJob, getAllJobs } from '../Controllers/JobController';

const router = Router();

router.post('/create', createJob);
router.get('/all', getAllJobs);

export default router;
