import { useState } from "react";

export function useSilentRefresh() {
  const [key, setKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      // إضافة تأخير صغير للتحديث
      await new Promise((resolve) => setTimeout(resolve, 100));
      setKey((prevKey) => prevKey + 1);
    } finally {
      setIsRefreshing(false);
    }
  };

  return { refresh, key, isRefreshing };
}
