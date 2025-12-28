"use client";

import { useEffect, useState } from "react";

const LocalDate = ({ date }: { date: Date | string | null }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !date) return null;

  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
  }).format(new Date(date));
};

export default LocalDate;
