"use client";

import React, { useEffect, useRef, useState } from "react";

interface VirtualScrollProps<T> {
  data: T[];
  rowHeight?: number; // pixel
  containerHeight?: string; // CSS string e.g. "calc(100vh - 200px)"
  overScan?: number;
  renderRow: (item: T, index: number) => React.ReactNode;
}

const VirtualScroll = <T,>(props: VirtualScrollProps<T>) => {
  const {
    data,
    rowHeight = 40,
    containerHeight = "600px",
    overScan = 5,
    renderRow,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(15);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const newStart = Math.floor(scrollTop / rowHeight);
      setStartIndex(newStart);
    }
  };

  const endIndex = Math.min(startIndex + visibleCount, data.length);
  const visibleItems = data.slice(startIndex, endIndex);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeightPx = containerRef.current.clientHeight;
      const count = Math.ceil(containerHeightPx / rowHeight) + overScan;
      setVisibleCount(count);
    }
  }, [rowHeight, overScan]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: containerHeight, overflowY: "scroll" }}
    >
      <div style={{ height: data.length * rowHeight, position: "relative" }}>
        {visibleItems.map((item, i) => {
          const actualIndex = startIndex + i;
          return (
            <div
              key={actualIndex}
              style={{
                position: "absolute",
                top: actualIndex * rowHeight,
                left: 0,
                right: 0,
                height: rowHeight,
              }}
            >
              {renderRow(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const data = Array.from({ length: 10000 }, (_, i) => `แถวที่ ${i + 1}`);

const Page = () => {
  return (
    <VirtualScroll
      data={data}
      rowHeight={40}
      containerHeight="200px"
      renderRow={(item, index) => (
        <div className="px-4 py-2 border-b bg-white hover:bg-gray-50">
          {item}
        </div>
      )}
    />
  );
};

export default Page;
