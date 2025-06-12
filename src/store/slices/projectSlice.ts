import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Project, ProjectState } from "@/types/types";

const initialState: ProjectState = {
  items: [],
  loading: false,
};

// — Fetch —
export const fetchProjects = createAsyncThunk<Project[], void>(
  "projects/fetchAll",
  async () => {
    const res = await axios.get<Project[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects`
    );
    return res.data;
  }
);

// — Create —
export const createProject = createAsyncThunk<
  Project,
  {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    employeeId: string;
  }
>("projects/create", async (payload) => {
  const res = await axios.post<Project>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
    payload
  );
  return res.data;
});

// — Patch Status —
export const patchProjectStatus = createAsyncThunk<
  Project,
  { id: string; status: "IN_PROGRESS" | "COMPLETED" }
>("projects/patchStatus", async ({ id, status }) => {
  const res = await axios.patch<Project>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`,
    { status }
  );
  return res.data;
});

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      // fetch
      .addCase(fetchProjects.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (s, a: PayloadAction<Project[]>) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchProjects.rejected, () => {
        toast.error("Failed to load projects");
      })

      // create
      .addCase(createProject.fulfilled, (s, a: PayloadAction<Project>) => {
        s.items.unshift(a.payload);
        toast.success("Project created");
      })
      .addCase(createProject.rejected, () => {
        toast.error("Failed to create project");
      })

      // patch status
      .addCase(patchProjectStatus.fulfilled, (s, a: PayloadAction<Project>) => {
        const idx = s.items.findIndex((p) => p.id === a.payload.id);
        if (idx > -1) s.items[idx] = a.payload;
        toast.success(`Project marked ${a.payload.status.toLowerCase()}`);
      })
      .addCase(patchProjectStatus.rejected, () => {
        toast.error("Failed to update project status");
      });
  },
});

export default projectSlice.reducer;
