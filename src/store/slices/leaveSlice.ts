// // import { Leave, LeaveState } from "@/types/types";
// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// // import axios from "axios";

// // const initialState: LeaveState = {
// //   items: [],
// //   loading: false,
// // };

// // export const fetchLeaves = createAsyncThunk("leaves/fetchAll", async () => {
// //   const res = await axios.get<Leave[]>("/api/leaves");
// //   return res.data;
// // });

// // export const createLeave = createAsyncThunk(
// //   "leaves/create",
// //   async (payload: {
// //     employeeId: string;
// //     reason: string;
// //     startDate: string;
// //     endDate: string;
// //   }) => {
// //     const res = await axios.post<Leave>("/api/leaves", payload);
// //     return res.data;
// //   }
// // );

// // export const updateLeaveStatus = createAsyncThunk(
// //   "leaves/updateStatus",
// //   async ({ id, status }: { id: string; status: "APPROVED" | "REJECTED" }) => {
// //     const res = await axios.patch<Leave>(`/api/leaves/${id}`, { status });
// //     return res.data;
// //   }
// // );

// // const leaveSlice = createSlice({
// //   name: "leaves",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchLeaves.pending, (s) => {
// //         s.loading = true;
// //       })
// //       .addCase(fetchLeaves.fulfilled, (s, a: PayloadAction<Leave[]>) => {
// //         s.loading = false;
// //         s.items = a.payload;
// //       })
// //       .addCase(fetchLeaves.rejected, (s, a) => {
// //         s.loading = false;
// //         s.error = a.error.message;
// //       })

// //       .addCase(createLeave.fulfilled, (s, a: PayloadAction<Leave>) => {
// //         s.items.unshift(a.payload);
// //       })

// //       .addCase(updateLeaveStatus.fulfilled, (s, a: PayloadAction<Leave>) => {
// //         const idx = s.items.findIndex((l) => l.id === a.payload.id);
// //         if (idx !== -1) s.items[idx] = a.payload;
// //       });
// //   },
// // });

// // export default leaveSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Leave, LeaveState } from "@/types/types";

// const initialState: LeaveState = {
//   items: [],
//   loading: false,
// };

// export const fetchLeaves = createAsyncThunk("leaves/fetchAll", async () => {
//   const res = await axios.get<Leave[]>("/api/leaves");
//   return res.data;
// });

// export const createLeave = createAsyncThunk(
//   "leaves/create",
//   async (payload) => {
//     const res = await axios.post<Leave>("/api/leaves", payload);
//     return res.data;
//   }
// );

// export const updateLeaveStatus = createAsyncThunk(
//   "leaves/updateStatus",
//   async ({ id, status }: { id: string; status: "APPROVED" | "REJECTED" }) => {
//     const res = await axios.patch<Leave>(`/api/leaves/${id}`, { status });
//     return res.data;
//   }
// );

// const leaveSlice = createSlice({
//   name: "leaves",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeaves.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLeaves.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchLeaves.rejected, (state, action) => {
//         state.loading = false;
//         toast.error("Failed to load leave requests");
//       })

//       .addCase(createLeave.fulfilled, (state, action) => {
//         state.items.unshift(action.payload);
//         toast.success("Leave requested successfully");
//       })
//       .addCase(createLeave.rejected, (action) => {
//         toast.error("Failed to request leave");
//       })

//       .addCase(updateLeaveStatus.fulfilled, (state, action) => {
//         const idx = state.items.findIndex((l) => l.id === action.payload.id);
//         if (idx > -1) state.items[idx] = action.payload;
//         toast.success(`Leave ${action.payload.status.toLowerCase()}`);
//       })
//       .addCase(updateLeaveStatus.rejected, (action) => {
//         toast.error("Failed to update leave status");
//       });
//   },
// });

// export default leaveSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Leave, LeaveState } from "@/types/types";

const initialState: LeaveState = {
  items: [],
  loading: false,
};

// — Fetch —
export const fetchLeaves = createAsyncThunk<Leave[], void>(
  "leaves/fetchAll",
  async () => {
    const res = await axios.get<Leave[]>("/api/leaves");
    return res.data;
  }
);

// — Create —
export const createLeave = createAsyncThunk<
  Leave,
  {
    employeeId: string;
    reason: string;
    startDate: string;
    endDate: string;
  }
>("leaves/create", async (payload) => {
  const res = await axios.post<Leave>("/api/leaves", payload);
  return res.data;
});

// — Update Status —
export const updateLeaveStatus = createAsyncThunk<
  Leave,
  { id: string; status: "APPROVED" | "REJECTED" }
>("leaves/updateStatus", async ({ id, status }) => {
  const res = await axios.patch<Leave>(`/api/leaves/${id}`, { status });
  return res.data;
});

const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      // fetch
      .addCase(fetchLeaves.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchLeaves.fulfilled, (s, a: PayloadAction<Leave[]>) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchLeaves.rejected, (s) => {
        s.loading = false;
        toast.error("Failed to load leave requests");
      })

      // create
      .addCase(createLeave.fulfilled, (s, a: PayloadAction<Leave>) => {
        s.items.unshift(a.payload);
        toast.success("Leave request submitted");
      })
      .addCase(createLeave.rejected, () => {
        toast.error("Failed to submit leave request");
      })

      // update status
      .addCase(updateLeaveStatus.fulfilled, (s, a: PayloadAction<Leave>) => {
        const idx = s.items.findIndex((l) => l.id === a.payload.id);
        if (idx > -1) s.items[idx] = a.payload;
        toast.success(`Leave ${a.payload.status.toLowerCase()}`);
      })
      .addCase(updateLeaveStatus.rejected, () => {
        toast.error("Failed to update leave status");
      });
  },
});

export default leaveSlice.reducer;
