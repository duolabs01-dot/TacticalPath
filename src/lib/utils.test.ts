import { expect, test, mock } from "bun:test";

// Mock clsx BEFORE importing cn
mock.module("clsx", () => {
  return {
    clsx: (...inputs: any[]) => {
      // Very simple shim of clsx for testing purposes
      const toVal = (mix: any): string => {
        let k, y, str = '';
        if (typeof mix === 'string' || typeof mix === 'number') {
          str += mix;
        } else if (typeof mix === 'object') {
          if (Array.isArray(mix)) {
            for (k = 0; k < mix.length; k++) {
              if (mix[k]) {
                if (y = toVal(mix[k])) {
                  str && (str += ' ');
                  str += y;
                }
              }
            }
          } else {
            for (k in mix) {
              if (mix[k]) {
                str && (str += ' ');
                str += k;
              }
            }
          }
        }
        return str;
      };

      return inputs
        .flat(Infinity)
        .filter(Boolean)
        .map(toVal)
        .filter(Boolean)
        .join(" ");
    },
  };
});

// Mock tailwind-merge BEFORE importing cn
mock.module("tailwind-merge", () => {
  return {
    twMerge: (input: string) => {
      // Mock twMerge behavior: basic deduplication and simple conflict resolution
      const classes = input.split(/\s+/).filter(Boolean);
      const seen = new Map<string, string>();

      classes.forEach(cls => {
        // Handle basic tailwind prefixes like 'p-', 'm-', 'bg-', etc.
        const match = cls.match(/^((?:.*:)?)([^-]+-).*/);
        if (match) {
          const prefix = match[1] + match[2];
          seen.set(prefix, cls);
        } else {
          seen.set(cls, cls);
        }
      });

      return Array.from(seen.values()).join(" ");
    },
  };
});

// Import cn using await import to ensure mocks are applied
const { cn } = await import("./utils");

test("cn concatenates strings", () => {
  expect(cn("btn", "btn-primary")).toBe("btn btn-primary");
});

test("cn handles conditional classes", () => {
  expect(cn("btn", true && "btn-active", false && "hidden")).toBe("btn btn-active");
});

test("cn handles null and undefined", () => {
  expect(cn("btn", null, undefined, "active")).toBe("btn active");
});

test("cn handles object inputs", () => {
  expect(cn("btn", { "btn-primary": true, "btn-large": false })).toBe("btn btn-primary");
});

test("cn handles array inputs", () => {
  expect(cn(["btn", "active"], "extra")).toBe("btn active extra");
});

test("cn merges tailwind classes", () => {
  // Our mock twMerge should handle 'p-2 p-4' by taking the last one
  expect(cn("p-2", "p-4")).toBe("p-4");
  expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
});
