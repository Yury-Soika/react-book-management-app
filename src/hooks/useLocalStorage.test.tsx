import { renderHook, act } from "@testing-library/react-hooks";
import useLocalStorage from "./useLocalStorage";

describe("useLocalStorage custom hook", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns the initial value if no value is stored in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));
    const [value] = result.current;
    expect(value).toBe("initial");
  });

  it("returns the stored value from localStorage if available", () => {
    window.localStorage.setItem("testKey", JSON.stringify("storedValue"));
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));
    const [value] = result.current;
    expect(value).toBe("storedValue");
  });

  it("updates the stored value when setValue is called", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));
    const [, setValue] = result.current;
    act(() => {
      setValue("updatedValue");
    });
    const [value] = result.current;
    expect(value).toBe("updatedValue");
    expect(JSON.parse(window.localStorage.getItem("testKey") || "")).toBe(
      "updatedValue"
    );
  });

  it("updates the stored value when setValue is called with an object", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", {}));
    const [, setValue] = result.current;
    const mockBook = {
      id: "1",
      bookname: "New book",
      author: "New author",
      price: "10",
      quantity: "5",
    };
    act(() => {
      setValue(mockBook);
    });
    const [value] = result.current;
    expect(value).toEqual(mockBook);
    expect(JSON.parse(window.localStorage.getItem("testKey") || "")).toEqual(
      mockBook
    );
  });
});
