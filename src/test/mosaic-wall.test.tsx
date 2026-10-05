import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MosaicWall from "@/components/MosaicWall";
import { guestPhotos } from "@/assets/guests";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("mobile guest photos", () => {
  it("makes every approved photo available exactly once, beyond the six-by-six frame", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal("ResizeObserver", class {
      observe() {}
      disconnect() {}
    });
    const { container } = render(<MosaicWall photos={guestPhotos} />);
    const sources = [...container.querySelectorAll("img")].map((image) => image.getAttribute("src"));
    expect(guestPhotos.length).toBeGreaterThan(36);
    expect(sources).toHaveLength(guestPhotos.length);
    expect(new Set(sources).size).toBe(guestPhotos.length);
    expect(new Set(sources)).toEqual(new Set(guestPhotos));
  });
});