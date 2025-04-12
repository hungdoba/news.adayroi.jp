import { vi } from 'date-fns/locale';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { format, subDays } from 'date-fns';
import { get7DaysCentered, toDateString, todayJST } from '@/lib/utils';

interface Props {
  selectedDateStr?: string;
}

export default function DatePagination({ selectedDateStr }: Props) {
  const today = toDateString(todayJST());
  const selectedDate = selectedDateStr || today;
  const last7Days = get7DaysCentered(selectedDate);
  const yesterdayLink = format(
    subDays(new Date(selectedDate), -1),
    'yyyy-MM-dd'
  );
  const tomorrowLink = format(subDays(new Date(selectedDate), 1), 'yyyy-MM-dd');

  return (
    <Pagination className="py-8 border-t border-b">
      <PaginationContent>
        {!last7Days.includes(today) && (
          <PaginationItem>
            <PaginationPrevious href={`/${yesterdayLink}`} />
          </PaginationItem>
        )}

        {last7Days.map((dateStr) => (
          <PaginationItem key={dateStr}>
            <PaginationLink
              className="hidden sm:inline"
              href={`/${dateStr}`}
              isActive={dateStr === selectedDate}
            >
              {format(new Date(dateStr), "dd 'tháng' MM", { locale: vi })}
            </PaginationLink>
            <PaginationLink
              href={`/${dateStr}`}
              isActive={dateStr === selectedDate}
              className="sm:hidden"
              size={new Date(dateStr).getDate() === 1 ? 'default' : 'icon'}
            >
              {new Date(dateStr).getDate() === 1
                ? format(new Date(dateStr), 'dd/MM')
                : format(new Date(dateStr), 'dd')}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={`/${tomorrowLink}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
