//"use client";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { store } from "@/store/index";
import {
  setPage,
  setSearch,
  setStartupUsers,
  setTotalPages
} from "@/store/userSearchSlice";
import { userSearchApi } from "@/store/userSearchApi";

const PaginationButtons = ({ pageNumber, setPageNumber }) => {
  const dispatch = store.dispatch;
  const totalPages = useSelector((state) => state.userSearch.totalPages);
  console.log(`pagination: ${totalPages}`);

  //const pageNumber = useSelector((state) => state.userSearch.page);
  //const firstName = useSelector((state) => state.userSearch.search);

  const router = useRouter();
  const searchParams = useSearchParams();

  //const pageNumber = searchParams.get("pageNumber") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "10";
  const firstName = searchParams.get("firstName") ?? "";

  const [currentPage, setCurrentPage] = useState(pageNumber - 1);
  //const pageNumber = useSelector((state) => state.userSearch.page);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setPageNumber(selected + 1);
    //store.dispatch(setPage(selected + 1));
    //console.log(selected + 1)
    //console.log(store.getState().userSearch.page)
    router.push(
      `/User/UserList/?pageNumber=${
        selected + 1
      }&pageSize=${pageSize}&firstName=${firstName}`
    );
    //dispatch(userSearchApi.endpoints.search.initiate({firstName:firstName, pageNumber: pageNumber , pageSize:pageSize}));
  };

  useEffect(() => {
    if (pageNumber === 1) {
      //handlePageClick({ selected: 0 });
    } else {
      //setCurrentPage(pageNumber - 1);
    }
  }, [pageNumber]);

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 100,
        duration: 2
      }
    }
  };
  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">.....</span>}
        nextLabel={
          showNextButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md">
              <BsChevronRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        forcePage={0}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4">
              <BsChevronLeft />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mt-2 mb-2"
        pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-purple text-white"
      />
    </motion.div>
  );
};

export default PaginationButtons;
