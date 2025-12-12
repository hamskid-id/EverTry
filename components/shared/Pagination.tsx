"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactPaginate from "react-paginate";

interface IPagination {
  totalPageNumber: number;
  activePage: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const NextPagination = () => (
  <div className="bg-[#1C2023] text-sm rounded-md flex items-center gap-2 py-4 px-4 justify-center cursor-pointer">
    <ArrowRight className="w-4 h-4 text-[#24AE7C]" />
  </div>
);

const PrevPagination = () => (
  <div className="bg-[#1C2023] text-sm rounded-md flex items-center gap-2 py-4 px-4 justify-center cursor-pointer">
    <ArrowLeft className="w-4 h-4 text-[#24AE7C]" />
  </div>
);

const pagination_Style = {
  nextLabel: <NextPagination />,
  previousLabel: <PrevPagination />,
  containerClassName:
    "flex text-xs w-full justify-center items-center flex-wrap bg-thick-purple-5  py-1",
  activeClassName: " bg-[#1C2023]",
  previousClassName: "w-fit px-2 me-auto",
  nextClassName: "w-fit px-2 ms-auto",
  pageClassName:
    "gap-2 px-4 py-2  text-sm cursor-pointer  rounded-lg text-center md:w-auto w-[1.5rem] text-thick-purple",
};

export const Pagination: React.FC<IPagination> = ({
  totalPageNumber,
  activePage,
  setPageNumber,
}) => {
  const handlePageClick = (event: any) => {
    const page_number = event.selected + 1;
    setPageNumber(page_number);
  };

  const pageCount = Math.max(Math.floor(totalPageNumber), 1);

  if (pageCount < 2) return null;

  const initialPageIndex = activePage
    ? Math.max(parseInt(activePage?.toString(), 10) - 1, 0)
    : 0;

  return (
    <div className="flex flex-wrap-reverse justify-end items-end mt-auto md:flex-wrap-nowrap gap-2 pb-4 pt-6">
      <ReactPaginate
        breakLabel="..."
        nextLabel={pagination_Style.nextLabel}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        initialPage={initialPageIndex}
        disableInitialCallback={true}
        previousLabel={pagination_Style.previousLabel}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={1}
        containerClassName={pagination_Style.containerClassName}
        activeClassName={pagination_Style.activeClassName}
        previousClassName={pagination_Style.previousClassName}
        nextClassName={pagination_Style.nextClassName}
        pageClassName={pagination_Style.pageClassName}
      />
    </div>
  );
};
