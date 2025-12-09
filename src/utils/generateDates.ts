export function generateDates(weeksAhead = 6) {
  const today = new Date();
  const daysTotal = weeksAhead * 7;

  const result: {
    month: string;
    dates: { label: string; value: string }[];
  }[] = [];

  for (let i = 0; i <= daysTotal; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const monthName = date.toLocaleString("en-US", { month: "short" });
    const weekday = date.toLocaleString("en-US", { weekday: "short" });
    const dayNum = date.getDate();

    const monthGroup = result.find((m) => m.month === monthName);

    const entry = {
      label: `${weekday} ${dayNum}`,
      value: date.toISOString(),
    };

    if (monthGroup) {
      monthGroup.dates.push(entry);
    } else {
      result.push({
        month: monthName,
        dates: [entry],
      });
    }
  }

  return result;
}
