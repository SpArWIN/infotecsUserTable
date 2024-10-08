interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
import "./index.css"
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const  isNoPage = totalPages ===0;
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1  || isNoPage}
        className="pagination-button"
      >
        Назад
      </button>
      <span className="pagination-info">
        Страница {currentPage} из {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages || isNoPage }
        className="pagination-button"
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;