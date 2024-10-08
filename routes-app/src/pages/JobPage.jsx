import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//single job page

const JobPage = ({ deleteJob }) => {
  const { id } = useParams();
  const job = useLoaderData();
  if (!job) {
    return <div>Job not found</div>;
  }

  const navigate = useNavigate();
  const onDeleteClick = (jobId) => {
    const confirm = window.confirm("Are you sure want to delete ?");

    if (!confirm) return;

    deleteJob(jobId);
    toast.success("Job deleted successfully");
    navigate("/jobs");
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">{job.shopName}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-lg text-orange-700 mr-2" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Shop Info</h3>
                <h3 className="text-m">Name:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.name}
                  </p>

                <hr className="my-4" />

                <h3 className="text-m">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.contactPhone}
                </p>

                <h3 className="text-m">Address:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.shopAddress}
                </p>
                <h3 className="text-m">Route No:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.routeNo}
                </p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              <div className="bg-white  p-6 rounded-lg shadow-md">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  CompletionStatus
                </h3>

                <p className="mb-4">
                  {job.completionStatus ? "success" : "not done"}
                </p>
                
              </div>
              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/jobs/edit/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => {
                    onDeleteClick(job.id);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  try {
    const res = await fetch(`http://localhost:8000/api/jobs/${params.id}`); 
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data; // Return the job data
  } catch (error) {
    console.error('Error fetching job:', error);
    return null; // Handle errors and return null or appropriate value
  }
};


;

export { JobPage as default, jobLoader };
