import { act, render, waitFor } from "@testing-library/react";
import * as framerMotion from "framer-motion";
import {
  motionValue,
  useReducedMotion,
} from "framer-motion";
import {
  createRef,
  useEffect,
  type RefObject,
} from "react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { ScrollContainerContext } from "@/context/ScrollContainerContext";
import { useYarnProgress } from "@/hooks/useYarnProgress";
import { installResizeObserverDouble } from "@/test/browserDoubles";

const scrollYProgress = motionValue(0);
const pathnameMock = vi.fn(() => "/integration-test");

vi.mock("next/navigation", () => ({
  usePathname: () => pathnameMock(),
}));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress }),
    useReducedMotion: vi.fn(() => false),
  };
});

function defineScrollMetrics(
  element: HTMLElement,
  clientHeight: number,
  scrollHeight: number,
) {
  Object.defineProperty(element, "clientHeight", {
    configurable: true,
    get: () => clientHeight,
  });
  Object.defineProperty(element, "scrollHeight", {
    configurable: true,
    get: () => scrollHeight,
  });
}

async function flushSyncMode() {
  await act(async () => {
    window.dispatchEvent(new Event("resize"));
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function YarnProgressProbe({
  onMount,
}: {
  onMount: (values: ReturnType<typeof useYarnProgress>) => void;
}) {
  const values = useYarnProgress();
  useEffect(() => {
    onMount(values);
  }, [onMount, values]);
  return null;
}

function renderWithScrollContainer(
  mainRef: RefObject<HTMLElement | null>,
  onMount: (values: ReturnType<typeof useYarnProgress>) => void,
) {
  return render(
    <ScrollContainerContext.Provider value={mainRef}>
      <main ref={mainRef as RefObject<HTMLDivElement>} id="app-main-scroll" />
      <YarnProgressProbe onMount={onMount} />
    </ScrollContainerContext.Provider>,
  );
}

describe("useYarnProgress", () => {
  beforeEach(() => {
    scrollYProgress.set(0);
    pathnameMock.mockReturnValue("/integration-test");
    vi.mocked(useReducedMotion).mockReturnValue(false);
    installResizeObserverDouble();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should pin progress to 1 when reduced motion is preferred", async () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    const mainRef = createRef<HTMLDivElement>();
    let captured: ReturnType<typeof useYarnProgress> | undefined;

    const { container } = render(
      <ScrollContainerContext.Provider value={mainRef}>
        <main ref={mainRef} />
        <YarnProgressProbe
          onMount={(values) => {
            captured = values;
          }}
        />
      </ScrollContainerContext.Provider>,
    );

    const main = container.querySelector("main");
    expect(main).toBeTruthy();
    defineScrollMetrics(main!, 600, 600);
    await flushSyncMode();

    await waitFor(() => {
      expect(captured).toBeDefined();
    });

    expect(captured!.pathDraw.get()).toBe(1);
    expect(captured!.yarnRotate.get()).toBe(0);
    expect(captured!.yarnScale.get()).toBe(1);
  });

  it("should drive autoplay when scroll height is within slop", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const mainRef = createRef<HTMLDivElement>();
    let captured: ReturnType<typeof useYarnProgress> | undefined;

    renderWithScrollContainer(mainRef, (values) => {
      captured = values;
    });

    const main = mainRef.current;
    expect(main).toBeTruthy();
    defineScrollMetrics(main!, 500, 520);
    await flushSyncMode();

    await waitFor(() => {
      expect(captured).toBeDefined();
      expect(captured!.pathDraw.get()).toBeLessThan(0.05);
    });

    await act(async () => {
      vi.advanceTimersByTime(3000);
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(captured!.pathDraw.get()).toBeGreaterThan(0.9);
    });
  });

  it("should follow scrollYProgress when the main container is scrollable", async () => {
    const mainRef = createRef<HTMLDivElement>();
    let captured: ReturnType<typeof useYarnProgress> | undefined;

    renderWithScrollContainer(mainRef, (values) => {
      captured = values;
    });

    const main = mainRef.current;
    expect(main).toBeTruthy();
    defineScrollMetrics(main!, 500, 2000);
    await flushSyncMode();

    await waitFor(() => expect(captured).toBeDefined());

    await act(async () => {
      scrollYProgress.set(0.42);
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(captured!.pathDraw.get()).toBeGreaterThan(0.35);
      expect(captured!.pathDraw.get()).toBeLessThan(0.55);
    });
  });

  it("should use global scroll when ScrollContainerContext is absent", async () => {
    let captured: ReturnType<typeof useYarnProgress> | undefined;
    render(
      <YarnProgressProbe
        onMount={(values) => {
          captured = values;
        }}
      />,
    );
    await waitFor(() => expect(captured).toBeDefined());
    await waitFor(
      () => {
        expect(captured!.pathDraw.get()).toBeGreaterThan(0.99);
      },
      { timeout: 3000 },
    );
  });

  it("should pin progress to 1 when scroll container ref is missing", async () => {
    const nullRef = { current: null };
    let captured: ReturnType<typeof useYarnProgress> | undefined;

    render(
      <ScrollContainerContext.Provider value={nullRef}>
        <YarnProgressProbe
          onMount={(values) => {
            captured = values;
          }}
        />
      </ScrollContainerContext.Provider>,
    );

    await waitFor(() => expect(captured).toBeDefined());
    await waitFor(
      () => {
        expect(captured!.pathDraw.get()).toBeGreaterThan(0.99);
      },
      { timeout: 3000 },
    );
  });

  it("should resync yarn mode when pathname changes", async () => {
    const mainRef = createRef<HTMLDivElement>();
    let captured: ReturnType<typeof useYarnProgress> | undefined;

    const view = renderWithScrollContainer(mainRef, (values) => {
      captured = values;
    });

    defineScrollMetrics(mainRef.current!, 500, 520);
    await flushSyncMode();

    pathnameMock.mockReturnValue("/catalogo");
    view.rerender(
      <ScrollContainerContext.Provider value={mainRef}>
        <main ref={mainRef} id="app-main-scroll" />
        <YarnProgressProbe
          onMount={(values) => {
            captured = values;
          }}
        />
      </ScrollContainerContext.Provider>,
    );
    await flushSyncMode();

    await waitFor(() => expect(captured!.pathDraw.get()).toBeLessThan(0.2));
  });

  it("should disconnect resize observer and stop autoplay on unmount", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const stop = vi.fn();
    vi.spyOn(framerMotion, "animate").mockReturnValue({
      stop,
    } as ReturnType<typeof framerMotion.animate>);

    const disconnectSpy = vi.fn();
    installResizeObserverDouble(disconnectSpy);

    const mainRef = createRef<HTMLDivElement>();
    const view = renderWithScrollContainer(mainRef, () => undefined);

    defineScrollMetrics(mainRef.current!, 500, 520);
    await flushSyncMode();

    view.unmount();
    expect(disconnectSpy).toHaveBeenCalled();
    expect(stop).toHaveBeenCalled();
  });
});