import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Employee,
  EmployeeState,
  FormState,
  EditableEmployee,
} from "@/types/types";

const initialState: EmployeeState = {
  employees: [],
  status: "idle",
};

// — Fetch All —
export const fetchEmployees = createAsyncThunk<Employee[], void>(
  "employees/fetchAll",
  async () => {
    const res = await axios.get<Employee[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employees`
    );
    return res.data;
  }
);

// — Fetch One —
export const fetchEmployeeById = createAsyncThunk<Employee, string>(
  "employees/fetchById",
  async (id) => {
    const res = await axios.get<Employee>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employees/${id}`
    );
    return res.data;
  }
);

// — Create —
export const createEmployee = createAsyncThunk<Employee, FormState>(
  "employees/create",
  async (data) => {
    const res = await axios.post<Employee>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employees`,
      data
    );
    return res.data;
  }
);

// — Update —
export const updateEmployee = createAsyncThunk<
  Employee,
  { id: string; data: any }
>("employees/update", async ({ id, data }) => {
  const res = await axios.patch<Employee>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/employees/${id}`,
    data
  );
  return res.data;
});

// — Delete —
export const deleteEmployee = createAsyncThunk<string, string>(
  "employees/delete",
  async (id) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employees/${id}`
    );
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      // fetchAll
      .addCase(fetchEmployees.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (s, a: PayloadAction<Employee[]>) => {
        s.status = "succeeded";
        s.employees = a.payload;
      })
      .addCase(fetchEmployees.rejected, () => {
        toast.error("Failed to load employees");
      })

      // fetchById
      .addCase(fetchEmployeeById.fulfilled, (s, a: PayloadAction<Employee>) => {
        const idx = s.employees.findIndex((e) => e.id === a.payload.id);
        if (idx > -1) s.employees[idx] = a.payload;
        else s.employees.push(a.payload);
      })
      .addCase(fetchEmployeeById.rejected, () => {
        toast.error("Failed to load employee details");
      })

      // create
      .addCase(createEmployee.fulfilled, (s, a: PayloadAction<Employee>) => {
        s.employees.push(a.payload);
        toast.success("Employee created successfully");
      })
      .addCase(createEmployee.rejected, () => {
        toast.error("Failed to create employee");
      })

      // update
      .addCase(updateEmployee.fulfilled, (s, a: PayloadAction<Employee>) => {
        const idx = s.employees.findIndex((e) => e.id === a.payload.id);
        if (idx > -1) s.employees[idx] = a.payload;
        toast.success("Employee updated successfully");
      })
      .addCase(updateEmployee.rejected, () => {
        toast.error("Failed to update employee");
      })

      // delete
      .addCase(deleteEmployee.fulfilled, (s, a: PayloadAction<string>) => {
        s.employees = s.employees.filter((e) => e.id !== a.payload);
        toast.success("Employee deleted");
      })
      .addCase(deleteEmployee.rejected, () => {
        toast.error("Failed to delete employee");
      });
  },
});

export default employeeSlice.reducer;
