// // import { AttendanceRecord, AttendanceState } from "@/types/types";
// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const initialState: AttendanceState = {
// //   records: [],
// //   status: "idle",
// // };

// // // Fetch all attendance
// // export const fetchAttendanceRecords = createAsyncThunk(
// //   "attendance/fetchAll",
// //   async () => {
// //     const res = await axios.get<AttendanceRecord[]>("/api/attendance");
// //     return res.data;
// //   }
// // );

// // // Create attendance record
// // export const createAttendance = createAsyncThunk(
// //   "attendance/create",
// //   async (payload: {
// //     employeeId: string;
// //     date: string;
// //     checkIn: string;
// //     checkOut: string;
// //     breakTime?: string;
// //     workHours?: string;
// //     status: string;
// //   }) => {
// //     const res = await axios.post<AttendanceRecord>("/api/attendance", payload);
// //     return res.data;
// //   }
// // );

// // const attendanceSlice = createSlice({
// //   name: "attendance",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchAttendanceRecords.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(
// //         fetchAttendanceRecords.fulfilled,
// //         (state, action: PayloadAction<AttendanceRecord[]>) => {
// //           state.status = "succeeded";
// //           state.records = action.payload;
// //         }
// //       )
// //       .addCase(fetchAttendanceRecords.rejected, (state) => {
// //         state.status = "failed";
// //       })

// //       .addCase(createAttendance.fulfilled, (state, action) => {
// //         state.records.unshift(action.payload);
// //         toast.success("Attendance marked!"); // ← success feedback
// //       })
// //       .addCase(createAttendance.rejected, (_state, action) => {
// //         toast.error("Failed to mark attendance."); // ← error feedback
// //       });
// //   },
// // });

// // export default attendanceSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AttendanceRecord, AttendanceState } from "@/types/types";

// const initialState: AttendanceState = {
//   records: [],
//   status: "idle",
// };

// export const fetchAttendanceRecords = createAsyncThunk(
//   "attendance/fetchAll",
//   async () => {
//     const res = await axios.get<AttendanceRecord[]>("/api/attendance");
//     return res.data;
//   }
// );

// export const createAttendance = createAsyncThunk(
//   "attendance/create",
//   async (payload: {
//     employeeId: string;
//     date: string;
//     checkIn: string;
//     checkOut: string;
//     breakTime?: string;
//     workHours?: string;
//     status: string;
//   }) => {
//     const res = await axios.post<AttendanceRecord>("/api/attendance", payload);
//     return res.data;
//   }
// );

// const attendanceSlice = createSlice({
//   name: "attendance",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAttendanceRecords.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(
//         fetchAttendanceRecords.fulfilled,
//         (state, action: PayloadAction<AttendanceRecord[]>) => {
//           state.status = "succeeded";
//           state.records = action.payload;
//         }
//       )
//       .addCase(fetchAttendanceRecords.rejected, (state) => {
//         state.status = "failed";
//         toast.error("Failed to load attendance records");
//       })

//       .addCase(createAttendance.fulfilled, (state, action) => {
//         state.records.unshift(action.payload);
//         toast.success("Attendance marked successfully");
//       })
//       .addCase(createAttendance.rejected, (_state, action) => {
//         toast.error(action.error.message || "Failed to mark attendance");
//       });
//   },
// });

// export default attendanceSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { AttendanceRecord, AttendanceState } from "@/types/types";

const initialState: AttendanceState = {
  records: [],
  status: "idle",
};

// — Fetch All —
export const fetchAttendanceRecords = createAsyncThunk<
  AttendanceRecord[],
  void
>("attendance/fetchAll", async () => {
  const res = await axios.get<AttendanceRecord[]>("/api/attendance");
  return res.data;
});

// — Create —
export const createAttendance = createAsyncThunk<
  AttendanceRecord,
  {
    employeeId: string;
    date: string;
    checkIn: string;
    checkOut: string;
    breakTime?: string;
    workHours?: string;
    status: string;
  }
>("attendance/create", async (payload) => {
  const res = await axios.post<AttendanceRecord>("/api/attendance", payload);
  return res.data;
});

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      // fetch
      .addCase(fetchAttendanceRecords.pending, (s) => {
        s.status = "loading";
      })
      .addCase(
        fetchAttendanceRecords.fulfilled,
        (s, a: PayloadAction<AttendanceRecord[]>) => {
          s.status = "succeeded";
          s.records = a.payload;
        }
      )
      .addCase(fetchAttendanceRecords.rejected, () => {
        toast.error("Failed to load attendance records");
      })

      // create
      .addCase(
        createAttendance.fulfilled,
        (s, a: PayloadAction<AttendanceRecord>) => {
          s.records.unshift(a.payload);
          toast.success("Attendance marked successfully");
        }
      )
      .addCase(createAttendance.rejected, () => {
        toast.error("Failed to mark attendance");
      });
  },
});

export default attendanceSlice.reducer;
