"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import DualSlider from "@/Components/DualSlider";
import axios from "axios";
import { DownArrowIcon, LocationIcon, SearchIcon, JobType } from "@/Utils/Svg";
import Card from "./Component/Card";
import Errorpage from "./Component/Errorpage";
import toast from "react-hot-toast";

export default function JobBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [range, setRange] = useState({ min: 20, max: 1500000 });
  const [jobListings, setJobListings] = useState([]);
  const LOCATIONS = [
    "Remote",
    "Bengaluru",
    "Chennai",
    "Pune",
    "Hyderabad",
    "Mumbai",
  ];

  useEffect(() => {
    fetchdata();
  }, []);

  const Cachedata = useRef({});

  const fetchdata = async () => {
    const tid = toast.loading("Fetching job listings...");
    if (Cachedata.current.jobs) {
      setJobListings(Cachedata.current.jobs);
      return;
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/all`);
      toast.dismiss();
      if (response.status == 200) {
        setJobListings(response.data);
        toast.success("Job listings fetched successfully!");
      }
    } catch (error) {
      toast.error("Failed to fetch job listings. Please try again later.");
    }
  };

  const filteredJobs = useMemo(() => {
    return jobListings.filter((job) => {
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(term) ||
        job.company_name.toLowerCase().includes(term);

      const matchesLocation =
        !location || job.location.toLowerCase() === location.toLowerCase();

      const matchesType =
        !jobType || job.job_type.toLowerCase().includes(jobType.toLowerCase());

      const [minSalaryStr, maxSalaryStr] = job.salary_range?.split("-") || [];
      const minSalary = parseInt(minSalaryStr);
      const maxSalary = parseInt(maxSalaryStr);

      const matchesSalary =
        !isNaN(minSalary) &&
        !isNaN(maxSalary) &&
        minSalary <= range.max &&
        maxSalary >= range.min;

      return matchesSearch && matchesLocation && matchesType && matchesSalary;
    });
  }, [searchTerm, location, jobType, range, jobListings]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search by Job title, Role"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-l border-r placeholder:text-gray-500 placeholder:font-sans text-zinc-950 border-gray-300 outline-none"
              />
            </div>

            <div className="relative flex-1 max-w-md">
              <LocationIcon />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-8 py-2  rounded-lg  text-gray-500 outline-none appearance-none placeholder:text-zinc-400  bg-white"
              >
                <option value="" className="">
                  All Locations
                </option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <DownArrowIcon />
            </div>

            <div className="relative flex-1  max-w-md">
              <JobType />
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full pl-10 pr-8 py-2 border-l border-r border-gray-200   outline-none appearance-none placeholder:text-zinc-400 text-gray-500 bg-white "
              >
                <option value="" defaultChecked>
                  Job type
                </option>
                <option value="internship">Internship</option>
                <option value="full-time">Full time</option>
                <option value="part-time">Part time</option>
                <option value="contract">Contract</option>
              </select>

              <DownArrowIcon />
            </div>

            <div className="flex-1 max-w-md">
              <DualSlider range={range} setRange={setRange} />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {filteredJobs.length ? (
            filteredJobs.map((job) => <Card key={job.id} job={job} />)
          ) : (
            <div className="flex justify-center items-center w-full col-span-4">
              <Errorpage />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
