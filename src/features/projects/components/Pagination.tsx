type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ page, totalPages, onPageChange }: Props) => (
  <div className="flex justify-center items-center gap-3 mt-4">
    <button
      onClick={() => onPageChange(page - 1)}
      disabled={page === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>
    <span className="text-sm">
      {page} / {totalPages}
    </span>
    <button
      onClick={() => onPageChange(page + 1)}
      disabled={page === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
);
