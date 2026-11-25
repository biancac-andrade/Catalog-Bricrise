"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { brandClasses } from "@/design-system/brandTokens";

type QuickViewHandlers = {
  onOpen: () => void;
};

type Props = {
  imageUrl: string;
  name: string;
  renderTrigger: (handlers: QuickViewHandlers) => ReactNode;
};

export default function ProductQuickView({
  imageUrl,
  name,
  renderTrigger,
}: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <>
      {renderTrigger({ onOpen: handleOpen })}
      {isOpen ? (
        <dialog
          ref={dialogRef}
          className="m-auto max-h-[90vh] w-[min(92vw,40rem)] max-w-none rounded-2xl border border-[#D9C9BA] bg-[#F7F8F3] p-3 shadow-2xl backdrop:bg-[#735E53]/45"
          onClose={handleClose}
          onClick={(event) => {
            if (event.target === dialogRef.current) handleClose();
          }}
        >
          <div className="flex max-h-[min(85vh,40rem)] flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <p
                className={`min-w-0 pr-2 text-sm font-semibold leading-snug text-[#735E53] sm:text-base ${brandClasses.heading}`}
              >
                {name}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className={`shrink-0 rounded-full bg-[#D9C9BA]/60 px-2.5 py-1 text-sm font-bold leading-none text-[#735E53] transition-colors hover:bg-[#D9C9BA] ${brandClasses.heading}`}
                aria-label="Fechar ampliação"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-square w-full min-h-[200px] overflow-hidden rounded-xl bg-[#F2F2F0]">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 92vw, 40rem"
              />
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  );
}