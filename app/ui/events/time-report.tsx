'use client';
import { createOrUpdateTimeReport } from '@/app/lib/actions';
import { TimeReport } from '@/app/lib/definitions';
import { BookOpenIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useFormState } from 'react-dom';

export default function Form({ event_id, user_id, time_report }: { event_id: string; user_id: string; time_report: TimeReport | null }) {
  const createOrUpdateTimeReportWithIds = createOrUpdateTimeReport.bind(null, time_report == null, event_id, user_id);
  const [_, dispatch] = useFormState(createOrUpdateTimeReportWithIds, {})

  return (
    <div className="rounded-md bg-surface-light dark:bg-surface-dark p-6 text-text-light dark:text-text-dark">
      <form action={dispatch}>
        <label>
          <h1 className="text-xl font-bold">
            Tidsrapportering
          </h1>
        </label>
        <div className="flex flex-cols mt-3">
          <div className="relative">
            <input
              id="start_time"
              name="start_time"
              type="time"
              defaultValue={time_report ? time_report.start_time : ""}
              className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pr-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='work-time-error'
              required
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
          <p className="flex items-center justify-center px-2 font-bold">-</p>
          <div className="relative">
            <input
              id="end_time"
              name="end_time"
              type="time"
              defaultValue={time_report ? time_report.end_time : ""}
              className="w-35 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pr-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              aria-describedby='work-time-error'
              required
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center gap-2">
          <button className="flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-sm font-medium leading-tight text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
            <BookOpenIcon className="w-6 h-6 mr-2" />
            <span>
              Rapportera
            </span>
          </button>
          {time_report && <CheckIcon className="w-8 stroke-green-600" />}
        </div>
      </form>
    </div>
  );
}
