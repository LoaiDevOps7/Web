export const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    سنة: 31536000,
    شهر: 2592000,
    أسبوع: 604800,
    يوم: 86400,
    ساعة: 3600,
    دقيقة: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `منذ ${interval} ${unit}${interval > 1 ? "" : ""}`;
    }
  }

  return "الآن";
};
