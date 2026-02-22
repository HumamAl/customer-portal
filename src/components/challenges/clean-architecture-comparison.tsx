import { BeforeAfter } from "./before-after";

export function CleanArchitectureComparison() {
  return (
    <BeforeAfter
      before={{
        label: "Typical MVP Rush",
        items: [
          "Spaghetti code, no clear boundaries",
          "Business logic mixed into UI components",
          "No consistent patterns — each dev does it differently",
          "Tech debt compounds with every sprint",
        ],
      }}
      after={{
        label: "Clean Architecture MVP",
        items: [
          "Consistent patterns across every module",
          "Clear separation: UI, logic, data layers",
          "New devs productive in days, not weeks",
          "Easy to extend without breaking existing features",
        ],
      }}
    />
  );
}
