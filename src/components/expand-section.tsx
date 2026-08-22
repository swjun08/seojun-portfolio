"use client";

import { useState } from "react";

export function ExpandSection({
  visible,
  hidden,
  totalCount,
}: {
  visible: React.ReactNode;
  hidden: React.ReactNode;
  totalCount: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {visible}
      {open && hidden}
      <button
        onClick={() => setOpen((o) => !o)}
        className="block w-full py-4 text-center text-xs font-medium text-accent"
      >
        {open ? "접기" : `전체 ${totalCount}개 보기`}
      </button>
    </div>
  );
}
