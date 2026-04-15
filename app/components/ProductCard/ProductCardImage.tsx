"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = {
  imageUrl: string;
  name: string;
  available: boolean;
  priority: boolean;
};

export default function ProductCardImage({
  imageUrl,
  name,
  available,
  priority,
}: Readonly<Props>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group relative mb-2 aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-bicrise-dust sm:mb-3"
        aria-label={`Ampliar foto de ${name}`}
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          className={`object-cover transition-transform group-hover:scale-[1.02] ${available ? "" : "grayscale"}`}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />
        {available === false ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-bicrise-brown/55">
            <span className="rounded-lg bg-bicrise-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-bicrise-brown sm:text-sm">
              Esgotado
            </span>
          </div>
        ) : null}
      </button>

      <dialog
        ref={dialogRef}
        className="m-auto max-h-[90vh] w-[min(92vw,40rem)] max-w-none rounded-2xl border border-bicrise-sand bg-bicrise-white p-3 shadow-2xl backdrop:bg-bicrise-brown/45"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex max-h-[min(85vh,40rem)] flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <p className="min-w-0 pr-2 text-sm font-semibold leading-snug text-bicrise-brown sm:text-base">
              {name}
            </p>
            <button
              type="button"
              onClick={close}
              className="shrink-0 rounded-full bg-bicrise-sand/60 px-2.5 py-1 text-sm font-bold leading-none text-bicrise-brown transition-colors hover:bg-bicrise-sand"
              aria-label="Fechar ampliação"
            >
              ✕
            </button>
          </div>
          <div className="relative aspect-square w-full min-h-[200px] overflow-hidden rounded-xl bg-bicrise-sand/15">
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
    </>
  );
}
