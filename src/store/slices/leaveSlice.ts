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
    const res = await axios.get<Leave[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/leaves`
    );
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
  const res = await axios.post<Leave>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/leaves`,
    payload
  );
  return res.data;
});

// — Update Status —
export const updateLeaveStatus = createAsyncThunk<
  Leave,
  { id: string; status: "APPROVED" | "REJECTED" }
>("leaves/updateStatus", async ({ id, status }) => {
  const res = await axios.patch<Leave>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/leaves/${id}`,
    { status }
  );
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
