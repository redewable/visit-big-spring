"use client";

export default function EventsFilters() {
  return (
    <form
      aria-label="Filter events"
      className="flex flex-wrap gap-3 rounded-2xl border border-stone2-100 bg-white p-4 shadow-card"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="flex-1 min-w-[200px]">
        <span className="sr-only">Search events</span>
        <input
          type="search"
          placeholder="Search events"
          className="w-full rounded-full border border-stone2-200 px-4 py-2 text-sm"
        />
      </label>
      <select className="rounded-full border border-stone2-200 px-4 py-2 text-sm" aria-label="Category">
        <option>All categories</option>
        <option>Music</option>
        <option>Rodeo</option>
        <option>Family friendly</option>
        <option>Holiday</option>
        <option>Free</option>
      </select>
      <select className="rounded-full border border-stone2-200 px-4 py-2 text-sm" aria-label="When">
        <option>Any time</option>
        <option>This weekend</option>
        <option>Next 30 days</option>
        <option>This season</option>
      </select>
      <button type="submit" className="btn-primary !py-2 text-sm">
        Apply
      </button>
    </form>
  );
}
