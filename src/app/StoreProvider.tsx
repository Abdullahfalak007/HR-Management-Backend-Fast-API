// "use client";

// import { useRef } from "react";
// import { Provider } from "react-redux";
// import { makeStore, AppStore } from "../store/store";

// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore | null>(null);
//   if (!storeRef.current) {
//     // Create the store instance only once per render
//     storeRef.current = makeStore();
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>;
// }

// src/app/StoreProvider.tsx
"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
