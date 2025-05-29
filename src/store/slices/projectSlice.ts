// // import { Project, ProjectState } from "@/types/types";
// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// // import axios from "axios";

// // const initialState: ProjectState = {
// //   items: [],
// //   loading: false,
// // };

// // export const fetchProjects = createAsyncThunk("projects/fetchAll", async () => {
// //   const res = await axios.get<Project[]>("/api/projects");
// //   return res.data;
// // });

// // export const createProject = createAsyncThunk(
// //   "projects/create",
// //   async (payload: {
// //     title: string;
// //     description?: string;
// //     startDate: string;
// //     endDate: string;
// //     employeeId: string;
// //   }) => {
// //     const res = await axios.post<Project>("/api/projects", payload);
// //     return res.data;
// //   }
// // );

// // export const patchProjectStatus = createAsyncThunk(
// //   "projects/patchStatus",
// //   async ({
// //     id,
// //     status,
// //   }: {
// //     id: string;
// //     status: "IN_PROGRESS" | "COMPLETED";
// //   }) => {
// //     const res = await axios.patch<Project>(`/api/projects/${id}`, { status });
// //     return res.data;
// //   }
// // );

// // const projectSlice = createSlice({
// //   name: "projects",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchProjects.pending, (s) => {
// //         s.loading = true;
// //       })
// //       .addCase(fetchProjects.fulfilled, (s, a: PayloadAction<Project[]>) => {
// //         s.loading = false;
// //         s.items = a.payload;
// //       })
// //       .addCase(fetchProjects.rejected, (s, a) => {
// //         s.loading = false;
// //         s.error = a.error.message;
// //       })

// //       .addCase(createProject.fulfilled, (s, a: PayloadAction<Project>) => {
// //         s.items.unshift(a.payload);
// //       })

// //       .addCase(patchProjectStatus.fulfilled, (s, a: PayloadAction<Project>) => {
// //         const idx = s.items.findIndex((p) => p.id === a.payload.id);
// //         if (idx !== -1) s.items[idx] = a.payload;
// //       });
// //   },
// // });

// // export default projectSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Project, ProjectState } from "@/types/types";

// const initialState: ProjectState = {
//   items: [],
//   loading: false,
// };

// export const fetchProjects = createAsyncThunk("projects/fetchAll", async () => {
//   const res = await axios.get<Project[]>("/api/projects");
//   return res.data;
// });

// export const createProject = createAsyncThunk(
//   "projects/create",
//   async (payload) => {
//     const res = await axios.post<Project>("/api/projects", payload);
//     return res.data;
//   }
// );

// export const patchProjectStatus = createAsyncThunk(
//   "projects/patchStatus",
//   async ({
//     id,
//     status,
//   }: {
//     id: string;
//     status: "IN_PROGRESS" | "COMPLETED";
//   }) => {
//     const res = await axios.patch<Project>(`/api/projects/${id}`, { status });
//     return res.data;
//   }
// );

// const projectSlice = createSlice({
//   name: "projects",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProjects.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchProjects.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchProjects.rejected, () => {
//         toast.error("Failed to load projects");
//       })

//       .addCase(createProject.fulfilled, (state, action) => {
//         state.items.unshift(action.payload);
//         toast.success("Project created successfully");
//       })
//       .addCase(createProject.rejected, (action) => {
//         toast.error("Failed to create project");
//       })

//       .addCase(patchProjectStatus.fulfilled, (state, action) => {
//         const idx = state.items.findIndex((p) => p.id === action.payload.id);
//         if (idx > -1) state.items[idx] = action.payload;
//         toast.success(`Project marked ${action.payload.status.toLowerCase()}`);
//       })
//       .addCase(patchProjectStatus.rejected, (action) => {
//         toast.error("Failed to update project status");
//       });
//   },
// });

// export default projectSlice.reducer;

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
    const res = await axios.get<Project[]>("/api/projects");
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
  const res = await axios.post<Project>("/api/projects", payload);
  return res.data;
});

// — Patch Status —
export const patchProjectStatus = createAsyncThunk<
  Project,
  { id: string; status: "IN_PROGRESS" | "COMPLETED" }
>("projects/patchStatus", async ({ id, status }) => {
  const res = await axios.patch<Project>(`/api/projects/${id}`, { status });
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
