export interface Job {
  id?: string;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryRange: string;
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: string;
  experienceRange:string;
  createdAt?: string;
}
