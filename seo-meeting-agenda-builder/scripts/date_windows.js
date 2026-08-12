#!/usr/bin/env node
/*
 * date_windows.js — compute the GSC compare-window date ranges the SEO agenda uses.
 *
 * Usage:  node date_windows.js [referenceDate=YYYY-MM-DD]
 *   referenceDate defaults to today. GSC data lags ~3 days, so the latest reliable
 *   end date is (referenceDate - 3). All windows are anchored to that adjusted end.
 *
 * Output: JSON with three windows, each having a `current` and `prior` {startDate,endDate}:
 *   - biweekly : last 14 days vs the 14 days before that   ("since our last meeting")
 *   - quarter  : last 90 days vs the 90 days before that    ("3 months vs previous period")
 *   - yoy      : last 30 days vs the same 30 days one year earlier (seasonality-adjusted)
 *
 * Pass each {startDate,endDate} straight to google_searchconsole_analytics. Pull the `date`
 * dimension for each and SUM the daily rows to get accurate totals (see references/data-sources.md).
 *
 * Pure date math — no network, no MCP. Safe to run anytime.
 */

function iso(d) {
  return d.toISOString().slice(0, 10);
}
function addDays(d, n) {
  const x = new Date(d.getTime());
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

const arg = process.argv[2];
// Parse reference date as UTC midnight to avoid timezone drift.
const ref = arg ? new Date(arg + "T00:00:00Z") : new Date();
if (isNaN(ref.getTime())) {
  console.error("Invalid date. Use YYYY-MM-DD, e.g. node date_windows.js 2026-07-17");
  process.exit(1);
}

const GSC_LAG_DAYS = 3;
const end = addDays(ref, -GSC_LAG_DAYS); // latest reliable data day

function window(days) {
  const curEnd = end;
  const curStart = addDays(curEnd, -(days - 1));
  const priEnd = addDays(curStart, -1);
  const priStart = addDays(priEnd, -(days - 1));
  return {
    current: { startDate: iso(curStart), endDate: iso(curEnd) },
    prior: { startDate: iso(priStart), endDate: iso(priEnd) },
  };
}

// Year-over-year: trailing 30 days vs the same calendar dates last year.
function yoyWindow() {
  const curEnd = end;
  const curStart = addDays(curEnd, -29);
  const priEnd = new Date(Date.UTC(curEnd.getUTCFullYear() - 1, curEnd.getUTCMonth(), curEnd.getUTCDate()));
  const priStart = new Date(Date.UTC(curStart.getUTCFullYear() - 1, curStart.getUTCMonth(), curStart.getUTCDate()));
  return {
    current: { startDate: iso(curStart), endDate: iso(curEnd) },
    prior: { startDate: iso(priStart), endDate: iso(priEnd) },
  };
}

const out = {
  referenceDate: iso(ref),
  gscDataThrough: iso(end),
  note: "GSC lags ~3 days; end anchored to referenceDate-3. Sum the `date` dimension for totals.",
  windows: {
    biweekly: window(14),
    quarter: window(90),
    yoy: yoyWindow(),
  },
};

console.log(JSON.stringify(out, null, 2));
