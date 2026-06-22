'use client';

import { useRef, useState } from "react";

export default function TagCheckboxes({ tags, selectedTags }: { tags: string[], selectedTags: Set<string> }) {
  const [showApply, setShowApply] = useState<boolean>(false);
  const tagsDivRef = useRef<HTMLDivElement>(null);

  const handleApplyTags = () => {
    const checkboxes = tagsDivRef.current?.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
    const tagsOn = Array.from(checkboxes).filter(elem => elem.checked).map(elem => elem.name);

    window.location.href = window.location.origin + window.location.pathname + (tagsOn.length ? '?' + (new URLSearchParams([['tags', tagsOn.join(',')]])).toString() : '')
  }

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-wrap gap-2 justify-start items-center px-2 py-2"
        ref={tagsDivRef}
      >
        {tags?.map((t: string) => (
          <div
            className="flex gap-2 hover:cursor-pointer items-center pl-2 pr-1 "
            key={t}
            onClick={(ev) => {
              const inputElem = ev.currentTarget.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
              inputElem[0].checked = !inputElem[0].checked;
              setShowApply(true);
            }}
          >
            <input
              name={t}
              type="checkbox"
              className="scale-150"
              defaultChecked={selectedTags.has(t)}
              onClick={(ev) => {
                ev.currentTarget.checked = !ev.currentTarget.checked;
                setShowApply(true);
              }}
            />
            <div>{t}</div>
          </div>
        ))}
      </div>
      {
        showApply
        &&
        <div className="w-full px-2 py-2">
          <div
            className="flex justify-center items-center py-1 click-icon bg-blue-900 text-white rounded-lg hover:bg-blue-800"
            onClick={handleApplyTags}
          >
            Apply
          </div>
        </div>
      }
    </div>
  )
}
