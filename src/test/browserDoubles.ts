import { vi } from "vitest";

export function installDialogElementDoubles() {
  if (typeof HTMLDialogElement === "undefined") return;

  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
  }

  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
      this.removeAttribute("open");
    };
  }
}

export function installMatchMediaDouble() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

export function installResizeObserverDouble(onDisconnect?: () => void) {
  class ResizeObserverStub {
    observe = vi.fn();
    disconnect = vi.fn(() => {
      onDisconnect?.();
    });

    constructor(_callback: ResizeObserverCallback) {
      void _callback;
    }
  }

  vi.stubGlobal("ResizeObserver", ResizeObserverStub);
  return ResizeObserverStub;
}