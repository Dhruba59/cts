import { getPaginationItems } from "@/utils/pagination-helper";
import PageLink from "./pageLink";
import LeftArrowIcon from "../icons/leftArrowIcon";
import RightArrowIcon from "../icons/rightArrowIcon";

export interface Props {
  lastPage: number;
  maxLength: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  lastPage,
  maxLength,
  currentPage,
  setCurrentPage
}: Props) => {
  const pageNumbers = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <>
      <nav aria-label="pagination">
        <PageLink
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <LeftArrowIcon className="-mt-0.5 md:mt-0" />
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
          <RightArrowIcon className="-mt-0.5 md:mt-0" />
        </PageLink>
        <select
        className="-mt-0.5 md:mt-0 ml-2 md:ml-3 border-solid border border-sky-500 rounded h-7 lg:h-9"
        value={maxLength}
        onChange={(e) => {
          maxLength = Number(e.target.value);
        }}
      >
        {[10, 20, 30, 40, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      </nav>
    </>
  );
};

export default Pagination;
