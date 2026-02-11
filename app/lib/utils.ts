import { EventForm } from "./definitions";

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-SE',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const eventTypeToString = (type: number) => {
  switch (type) {
    case 0: return "Inte arbetspass";
    case 1: return "Fredagspub";
    case 2: return "Storevent";
    case 3: return "Betalevent";
    case 4: return "Betalevent (öppet)";
    default: return "Undefined";
  }
}

export const itemTypeToString = (type: number) => {
  switch (type) {
    case 0: return "Kalla drycker";
    case 1: return "Öl";
    case 2: return "Vin";
    case 3: return "Cider";
    case 4: return "Sprit";
    case 5: return "Inventarie";
    default: return "Undefined";
  }
}

export const eventTypeIsPaid = (type: number): boolean => {
  switch (type) {
    case 0: return false;
    case 1: return false;
    case 2: return false;
    case 3: return true;
    case 4: return true;
    default: return false;
  }
}

export const eventWorkStartDateTime = (event: EventForm) : Date => {
  var date = new Date(event.date);
  date.setHours(parseInt(event.start_work_time.slice(0, 2)))
  date.setMinutes(parseInt(event.start_work_time.slice(3, 5)))
  return date;
}

export const eventIsReportable = (event: EventForm): boolean => {
  const start_work_date_time = eventWorkStartDateTime(event);
  return eventTypeIsPaid(event.type) && (start_work_date_time <= new Date());
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
