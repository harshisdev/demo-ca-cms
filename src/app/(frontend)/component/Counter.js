"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
    let timer;

    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 30);

      timer = setInterval(() => {
        start += increment;

        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 30);
    } else {
      setCount(0); // reset when leaving viewport
    }

    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}