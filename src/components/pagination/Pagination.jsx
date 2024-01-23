import "./pagination.css";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Pagination({
  postsPerPage,
  length,
  handlePagination,
  currentPage,
}) {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination__buttons">
      <div className="pagination__button " onClick={() => handlePagination(1)}>
        <button className="first-page">
         <MdKeyboardDoubleArrowLeft />
        </button>
      </div>
      <div className="pagination__button " onClick={() => handlePagination(currentPage-1)}>
        <button className="previous-page">
          <FaCircleArrowLeft />
        </button>
      </div>

      {paginationNumbers?.map((pageNumber) => (
        <div className="pagination__button">
          <button
            key={pageNumber}
            className={currentPage == pageNumber ? "active" : ""}
            onClick={() => handlePagination(pageNumber)}
          >
            {pageNumber}
          </button>
        </div>
      ))}
      <div className="pagination__button"  onClick={() => handlePagination(currentPage+1)}>
        <button className="next-page">
          <FaCircleArrowRight />
        </button>
      </div>
      <div className="pagination__button " onClick={() => handlePagination(Math.ceil(length / postsPerPage))}>
        <button className="last-page">
         <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}
