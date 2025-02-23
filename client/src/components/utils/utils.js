function formatDate(dateStr) {
  const [day, month, year] = dateStr.split("-");
  const date = new Date(`${year}-${month}-${day}`);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  const weekday = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
  }).format(date);

  return `${formattedDate} (${weekday})`;
}

function getLabel(percentage) {
  if (percentage >= 75) return "Good";
  if (percentage >= 50) return "Ok";
  if (percentage >= 30) return "Low";
  return "Critical";
}

function getColor(percentage) {
  if (percentage >= 75) return "#4CAF50";
  if (percentage >= 50) return "#FFC107";
  if (percentage >= 30) return "#FF9800";
  return "#F44336";
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export { formatDate, getLabel, getColor, emailRegex };
