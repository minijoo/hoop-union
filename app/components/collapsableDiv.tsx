'use client';

import { useState } from "react";

export default function CollapsableDiv({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return <>
    <div className="py-1 flex items-center justify-center bg-blue-100 border-b border-gray-200 hover:bg-blue-900 hover:cursor-pointer hover:text-white text-gray-600 rounded-t-lg"
      onClick={() => setIsOpen(current => !current)}
    >
      <div
        className="text-xs font-semibold uppercase tracking-wider flex gap-2 items-center"
      >
        {
          isOpen
            ? <div className="inline-block"
              style={{
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '8px solid black'
              }}
            />
            : <div className="inline-block"
              style={{
                width: 0,
                height: 0,
                borderTop: '5px solid transparent',
                borderBottom: '5px solid transparent',
                borderLeft: '8px solid black'
              }}
            />
        }
        <div>{title}</div>
      </div>
    </div>
    {
      isOpen &&
      <div>
        {children}
      </div>
    }
  </>

}
