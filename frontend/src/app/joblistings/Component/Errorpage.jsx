import React from 'react'

function Errorpage() {
  return (
    <div>
      <div className="flex justify-center items-center w-full col-span-4">
              <div className="flex flex-col items-center justify-center h-[60vh] mx-auto  text-center text-gray-600">
                <img
                  className="h-auto w-24"
                  src="https://cdn-icons-png.freepik.com/512/17134/17134620.png?ga=GA1.1.165051181.1733249985"
                  alt=""
                />
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  No jobs found
                </h2>
                <p className="max-w-sm text-sm text-gray-500">
                  Try adjusting the filters
                </p>
              </div>
            </div>
    </div>
  )
}

export default Errorpage
