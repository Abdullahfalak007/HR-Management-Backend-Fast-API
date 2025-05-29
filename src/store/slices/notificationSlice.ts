// import { Notification, NotificationState } from "@/types/types";
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState: NotificationState = {
//   items: [],
//   loading: false,
// };

// export const fetchNotifications = createAsyncThunk(
//   "notifications/fetchAll",
//   async () => {
//     const res = await axios.get<Notification[]>("/api/notifications");
//     return res.data;
//   }
// );

// export const markNotificationRead = createAsyncThunk(
//   "notifications/markRead",
//   async ({ id, read }: { id: string; read: boolean }) => {
//     const res = await axios.patch<Notification>(`/api/notifications/${id}`, {
//       read,
//     });
//     return res.data;
//   }
// );

// export const deleteNotification = createAsyncThunk(
//   "notifications/delete",
//   async (id: string) => {
//     await axios.delete(`/api/notifications/${id}`);
//     return id;
//   }
// );

// const notificationSlice = createSlice({
//   name: "notifications",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNotifications.pending, (s) => {
//         s.loading = true;
//       })
//       .addCase(
//         fetchNotifications.fulfilled,
//         (s, a: PayloadAction<Notification[]>) => {
//           s.loading = false;
//           s.items = a.payload;
//         }
//       )
//       .addCase(fetchNotifications.rejected, (s, a) => {
//         s.loading = false;
//         s.error = a.error.message;
//       })

//       .addCase(
//         markNotificationRead.fulfilled,
//         (s, a: PayloadAction<Notification>) => {
//           const idx = s.items.findIndex((n) => n.id === a.payload.id);
//           if (idx !== -1) s.items[idx] = a.payload;
//         }
//       )

//       .addCase(deleteNotification.fulfilled, (s, a: PayloadAction<string>) => {
//         s.items = s.items.filter((n) => n.id !== a.payload);
//       });
//   },
// });

// export default notificationSlice.reducer;
// src/store/slices/notificationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Notification, NotificationState } from "@/types/types";

const initialState: NotificationState = {
  items: [],
  loading: false,
};

export const fetchNotifications = createAsyncThunk<
  Notification[], // returned data
  void // thunk argument
>("notifications/fetchAll", async () => {
  const res = await axios.get<Notification[]>("/api/notifications");
  return res.data;
});

export const markNotificationRead = createAsyncThunk<
  Notification, // returned data
  { id: string; read: boolean } // thunk argument
>("notifications/markRead", async ({ id, read }) => {
  const res = await axios.patch<Notification>(`/api/notifications/${id}`, {
    read,
  });
  return res.data;
});

export const deleteNotification = createAsyncThunk<
  string, // returned payload
  string // argument is the id
>("notifications/delete", async (id) => {
  await axios.delete(`/api/notifications/${id}`);
  return id; // now returns the id correctly
});

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<Notification[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchNotifications.rejected, () => {
        toast.error("Failed to load notifications");
      })

      .addCase(
        markNotificationRead.fulfilled,
        (state, action: PayloadAction<Notification>) => {
          const idx = state.items.findIndex((n) => n.id === action.payload.id);
          if (idx > -1) state.items[idx] = action.payload;
          toast.success(
            action.payload.read ? "Marked as read" : "Marked as unread"
          );
        }
      )
      .addCase(markNotificationRead.rejected, () => {
        toast.error("Failed to update notification");
      })

      .addCase(
        deleteNotification.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter((n) => n.id !== action.payload);
          toast.success("Notification deleted");
        }
      )
      .addCase(deleteNotification.rejected, () => {
        toast.error("Failed to delete notification");
      });
  },
});

export default notificationSlice.reducer;
