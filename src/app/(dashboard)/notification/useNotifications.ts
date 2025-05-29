import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  fetchNotifications,
  markNotificationRead,
  deleteNotification,
} from "@/store/slices/notificationSlice";

export function useNotifications() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((s) => s.notifications.items);
  const loading = useAppSelector((s) => s.notifications.loading);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const toggleRead = (id: string, read: boolean) => {
    dispatch(markNotificationRead({ id, read }));
  };
  const deleteNotif = (id: string) => {
    dispatch(deleteNotification(id));
  };

  return { notifications, loading, toggleRead, deleteNotif };
}
