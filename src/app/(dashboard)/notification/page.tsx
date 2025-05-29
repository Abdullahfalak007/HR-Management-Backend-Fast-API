"use client";

export const dynamic = "force-dynamic";

import { format } from "date-fns";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { useNotifications } from "./useNotifications";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

export default function NotificationsPage() {
  const { notifications, loading, toggleRead, deleteNotif } =
    useNotifications();

  if (loading) return <Loader />;
  if (notifications.length === 0)
    return <p className="p-6">No notifications</p>;

  return (
    <Suspense>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold flex items-center text-[var(--text-primary)]">
          <Image
            src={assets.icons.bell}
            alt=""
            width={24}
            height={24}
            className="mr-2"
          />
          Notifications
        </h1>

        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`relative flex items-start space-x-3 p-4 rounded-lg ${
                n.read ? "bg-[var(--surface-hover)]" : "bg-[var(--border)]"
              }`}
            >
              <Image
                src={assets.icons.bell}
                alt=""
                width={20}
                height={20}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="text-[var(--text-primary)]">{n.message}</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {format(new Date(n.createdAt), "MMM d, yyyy h:mm a")}
                </p>
              </div>
              <button
                onClick={() => toggleRead(n.id, !n.read)}
                className="p-1 hover:bg-[var(--container-hover)] rounded-full"
                title={n.read ? "Mark as unread" : "Mark as read"}
              >
                <Image
                  src={assets.icons.check}
                  alt={n.read ? "Mark unread" : "Mark read"}
                  width={20}
                  height={20}
                />
              </button>
              <button
                onClick={() => deleteNotif(n.id)}
                className="p-1 text-[var(--error)] hover:bg-[var(--container-hover)] rounded-full"
                title="Delete notification"
              >
                <Image
                  src={assets.icons.delete}
                  alt="Delete"
                  width={16}
                  height={16}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
