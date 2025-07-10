"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateJobOpening() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      companyName: "",
      location: "",
      jobType: "",
      salaryMin: "",
      salaryMax: "",
      requirements: "",
      applicationDeadline: "",
      description: "",
      ExpirienceMin: "",
      ExpirienceMax: "",
    },
  });

  const onPublish = async (data) => {
    if (!validateData(data)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const { salaryMin, salaryMax, ExpirienceMin, ExpirienceMax, ...rest } =
      data;

    const payload = {
      ...rest,
      salaryRange: `${salaryMin}-${salaryMax}`,
      experienceRange: `${ExpirienceMin}-${ExpirienceMax}`,
    };

    try {
      toast.loading("Publishing job...");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/create`,
        payload
      );
      toast.dismiss();
      if (res.status === 201) {
        reset();
        toast.success("Job published successfully!");
      }
    } catch (err) {
      toast.error("Failed to publish job. Please try again later.");
    }
  };

  const validateData = (data) => {
    const requiredFields = [
      "title",
      "companyName",
      "location",
      "jobType",
      "salaryMin",
      "salaryMax",
      "applicationDeadline",
      "requirements",
      "description",
      "ExpirienceMin",
      "ExpirienceMax",
    ];

    for (const field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === "") {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Job Board
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onPublish)}
          className="bg-white shadow-sm rounded-lg border border-gray-200"
        >
          <div className="text-center py-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Create Job Opening
            </h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Full Stack Developer"
                  {...register("title")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Amazon, Microsoft, Swiggy"
                  {...register("companyName")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="relative">
                  <select
                    id="location"
                    {...register("location")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option value="">Choose Preferred Location</option>
                    <option value="Remote">Remote</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="jobType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Type
                </label>
                <div className="relative">
                  <select
                    id="jobType"
                    {...register("jobType")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option value="">Full Time</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Expirience
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></span>
                    <input
                      type="text"
                      placeholder="0"
                      {...register("ExpirienceMin")}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <span className="flex items-center text-gray-500">to</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></span>
                    <input
                      type="text"
                      placeholder="3"
                      {...register("ExpirienceMax")}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="applicationDeadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Application Deadline
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="applicationDeadline"
                    {...register("applicationDeadline")}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Salary Range
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="text"
                      placeholder="1"
                      {...register("salaryMin")}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <span className="flex items-center text-gray-500">to</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="text"
                      placeholder="1000000"
                      {...register("salaryMax")}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

           
            <div className="space-y-2">
              <label
                htmlFor="jobDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Job Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Please share a description to let the candidates know more about the job role"
                {...register("description")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="jobDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Requirements
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Please share a requirements to let the candidates know more about the job role"
                {...register("requirements")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>

            
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
              <button
                type="button"
                className="flex-1 sm:flex-none px-8 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium inline-flex items-center justify-center"
              >
                Save Draft
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-none bg-[#00A8FF] hover:bg-[#00aaffc6] hover:cursor-pointer text-white px-8 py-2 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
              >
                Publish
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
