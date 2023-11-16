import { getPaginationItems } from "@/utils/pagination-helper";
import PageLink from "./pageLink";
import LeftArrowIcon from "../icons/leftArrowIcon";
import RightArrowIcon from "../icons/rightArrowIcon";

export interface Props {
  lastPage: number;
  pageSize: number;
  setPageSize: (page: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxLength: number;
}

const Pagination = ({
  lastPage,
  maxLength,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize
}: Props) => {
  const pageNumbers = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <nav aria-label="pagination" >
      <PageLink
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <LeftArrowIcon className="-mt-0.5 md:mt-0 " />
      </PageLink>
      {pageNumbers?.map((pageNum, index) => (
        <PageLink
          key={index}
          active={currentPage === pageNum}
          onClick={() => setCurrentPage(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : "..."}
        </PageLink>
      ))}
      <PageLink
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <RightArrowIcon className="-mt-0.5 md:mt-0 " />
      </PageLink>
      <select
        className="-mt-0.5 md:mt-0 ml-2 md:ml-3 border-solid border border-gray-300 rounded h-7 lg:h-9 dark:text-black"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50, 100].map((ps) => (
          <option key={ps} value={ps}>
            Show {ps}
          </option>
        ))}
      </select>
    </nav>
  );
};

export default Pagination;
