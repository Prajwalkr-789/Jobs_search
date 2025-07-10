import { Request, Response } from 'express';
import { pool } from '../Database/Db';
import { Job } from '../Models/models';
import { JobType } from '../types/Job';

export const createJob = async (req: Request<{},{},JobType>, res: Response) => {
  const {
    title, companyName, location, jobType, salaryRange,
    description, requirements, responsibilities, applicationDeadline,experienceRange
  } = req.body as JobType;

  if (!title || !companyName || !location || !jobType || !salaryRange ||
      !description  || !applicationDeadline ||!experienceRange) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO jobs
        (title, company_name, location, job_type, salary_range,
         description, requirements, responsibilities, application_deadline , "experienceRange")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [title, companyName, location, jobType, salaryRange,
       description, requirements, responsibilities, applicationDeadline,experienceRange]
    );
    return res.status(201).json({message:"Job created successfully"});
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create job.' });
  }
};

export const getAllJobs = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch jobs.' });
  }
};
