"use client";

import { useEffect, useState } from "react";
import AppCard from "./app-card";

export default function AppList() {
  const [appDRecords, setAppDRecords] = useState([]);

  const getRecords = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/appd/v2/apps/", {
        method: "GET",
      }).then((res) => res.json());
      setAppDRecords(response.applications);
    } catch (error) {
      console.log(error);
      // TODO: Send a error toast
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="w-full flex-1 overflow-y-auto px-4 space-y-3 py-2 mb-5">
      {appDRecords.map((data, index) => (
        <AppCard data={data} key={index} />
      ))}
    </div>
  );
}
