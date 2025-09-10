"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Gunakan dynamic import untuk memuat komponen dari remote
const RemoteButton = dynamic(
  () => import("shared_components/Button").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <p>Loading Button...</p>,
    // Menangani error saat memuat komponen
    // eslint-disable-next-line react/display-name
    onError: (err) => {
      console.error("Error loading remote component:", err);
      return () => <p>Error loading button component</p>;
    },
  },
);

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-3xl uppercase">starting project</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <p className="text-3xl uppercase">starting project</p>

      <RemoteButton onClick={() => alert("Tombol dari remote diklik!")}>
        Klik Saya!
      </RemoteButton>
    </div>
  );
}