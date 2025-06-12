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
  const res = await axios.get<AttendanceRecord[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/attendance`
  );
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
  const res = await axios.post<AttendanceRecord>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/attendance`,
    payload
  );
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
