import StarsReview from "../stars-review/stars-review";

function ReviewsModal({ data, setShowModal }) {
    const closeModal = () => {
        setShowModal(false);
    }
  return (
    <div
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="fixed inset-0 bg-beige-light opacity-50 z-[-1] flex"></div>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white  shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 md:px-5 md:py-4 border-b border-brown-medium bg-brown-light">
            <h3 className="text-xl font-semibold text-beige-light">Reviews</h3>
            <button
              onClick={closeModal}
              type="button"
              className="text-beige-light bg-transparent hover:bg-brown-dark hover:text-beige-medium text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-brown hover:rounded-md cursor-pointer"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 md:p-8 space-y-4 overflow-y-auto max-h-96">
            {data?.map((review, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">
                    {review.user.firstName} {review.user.lastName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                    <StarsReview rating={review.rating} />
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsModal;
