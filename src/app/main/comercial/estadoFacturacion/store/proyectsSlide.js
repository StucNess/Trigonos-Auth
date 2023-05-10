import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProjects = createAsyncThunk(
  "estadoFacturacionApp/projects/getProjects",
  async () => {
    let ProyectUser = localStorage.getItem("ProyectUser");

    const response = await axios.get(
      `https://trigonosapi.azurewebsites.net/api/Participantes`
    );
    console.log(response.data.data);
    return response.data.data;
  }
);
const projectsAdapter = createEntityAdapter({});
export const {
  selectAll: selectProjects,
  selectEntities: selectProjectsEntities,
  selectById: selectProjectById,
} = projectsAdapter.getSelectors(
  (state) => state.estadoFacturacionApp.projects
);
const projectsSlice = createSlice({
  name: "estadoFacturacionApp/projects",
  initialState: projectsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getProjects.fulfilled]: projectsAdapter.setAll,
  },
});
export default projectsSlice.reducer;
