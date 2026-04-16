import clsx from 'clsx';
import { MdOutlineArrowBackIosNew, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Button from '@/ui/Button';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <Button
        className="!px-4 !py-2 text-sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        variant="ghost"
        tabIndex={0}
      >
        <MdOutlineArrowBackIosNew />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <Button
          className={clsx(p === page && 'pointer !bg-primary-100', '!px-4 !py-2 text-sm')}
          variant={p !== page ? 'ghost' : 'outline'}
          key={p}
          onClick={() => onPageChange(p)}
          tabIndex={0}
        >
          {p}
        </Button>
      ))}

      <Button
        className="!px-4 !py-2 text-sm"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        variant="ghost"
      >
        <MdOutlineKeyboardArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
