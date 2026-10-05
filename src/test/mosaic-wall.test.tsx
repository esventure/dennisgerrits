import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MosaicWall, { getMobilePhotoLayout } from "@/components/MosaicWall";
import { guestPhotos } from "@/assets/guests";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("mobile guest photos", () => {
  it("uses five rows on mobile", () => {
    expect(getMobilePhotoLayout(guestPhotos).rows).toBe(5);
  });

  it("shows exactly 50 unique photos on mobile", () => {
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
    expect(sources).toHaveLength(50);
    expect(new Set(sources).size).toBe(50);
    expect(sources.every((src) => guestPhotos.includes(src ?? ""))).toBe(true);
  });
});