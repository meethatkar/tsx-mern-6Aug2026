import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}) => {
  if (totalPages <= 1) return null;

  const PaginateComponent = (ReactPaginate as any).default || ReactPaginate;

  return (
    <div className={`flex justify-center py-6 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <PaginateComponent
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Previous"
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={(selectedItem: any) => {
          if (!disabled) {
            onPageChange(selectedItem.selected + 1);
          }
        }}
        containerClassName="flex items-center gap-2"
        pageLinkClassName="px-3 py-1.5 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
        activeLinkClassName="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30"
        previousLinkClassName="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors cursor-pointer"
        nextLinkClassName="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors cursor-pointer"
        disabledLinkClassName="opacity-50 cursor-not-allowed"
        breakLinkClassName="px-2 text-slate-400"
      />
    </div>
  );
};

export default Pagination;
