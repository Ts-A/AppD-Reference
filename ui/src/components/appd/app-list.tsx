import AppCard from "./app-card";

export default function AppList() {
  const appDRecords = Array(5).fill(null);

  return (
    <div className="w-full flex-1 overflow-y-auto px-4 space-y-3 py-2 mb-5">
      {appDRecords.map((_, index) => (
        <AppCard key={index} />
      ))}
    </div>
  );
}
