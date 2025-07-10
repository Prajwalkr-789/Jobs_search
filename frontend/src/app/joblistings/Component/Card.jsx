import { ExperienceIcon, LocationIconSmall, SalaryIcon } from "@/Utils/Svg";
import React from "react";

function Card({ job }) {

  const formattedTime = (createdAt) => {
    const diffMs = Date.now() - new Date(createdAt).getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return "just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;

    return `${Math.floor(diffSec / 86400)}d ago`;
  };

  return (
    <div>
      <div
        key={job.id || 2}
        className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-lg`}
          >
            {job.company_name.charAt(0) || "C"}
          </div>
          <span className="bg-blue-300 text-gray-800 text-xs px-2 py-2 rounded-lg font-medium">
            {formattedTime(job.created_at) || "hrs ago"}
          </span>
        </div>
        <h3 className="font-sans font-semibold text-lg text-gray-900 mb-3">
          {job.title}
        </h3>
        <div className="flex items-center justify-between gap-4 text-sm text-gray-600 mb-4">
          <div className="flex flex-row items-center gap-1">
            <span>
              <ExperienceIcon />
            </span>
            <span className="flex flex-row items-center ">
              {job.experienceRange}
            </span>
          </div>
          <div className="flex flex-row items-center  gap-1">
            <span>
              <LocationIconSmall />
            </span>
            <span> {job.location}</span>
          </div>
          <div className="flex flex-row items-center  gap-1">
            <span>
              <SalaryIcon />
            </span>

            <span>
              ${parseInt(job.salary_range.split("-")[0]) / 100000}L -{" "}
              {parseInt(job.salary_range.split("-")[1]) / 100000}L
            </span>
          </div>
        </div>
        <ul className="">
          <li className="text-sm text-gray-800 mb-2 ">
            {job.description}
          </li>
        </ul>
        {job.requirements && (
          <ul className="text-sm text-gray-600 mb-3 list-disc list-inside">
            {job.requirements
              .replace(/[{}"]/g, "")
              .split(",")
              .slice(0, 2)
              .map((req, idx) => (
                <li key={idx}>{req.trim()}</li>
              ))}
          </ul>
        )}

        <button className="w-full bg-[#00A8FF] hover:bg-[#00aaffc2] text-white py-2 hover:cursor-pointer rounded-lg">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default Card;
