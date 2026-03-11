import { useEffect, useState } from "react";
import api from "../services/api";

const ProjectsPage = () => {

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const fetchProjects = async () => {

    try {

      const res = await api.get("/projects");
      setProjects(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {

    try {

      await api.post("/projects", { name });

      setName("");

      fetchProjects();

    } catch (error) {

      alert("Error creating project");

    }

  };

  const deleteProject = async (id) => {

    try {

      await api.delete(`/projects/${id}`);

      fetchProjects();

    } catch (error) {

      alert("Error deleting project");

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Projects</h2>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={createProject}>
          Create
        </button>

      </div>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {projects.map((project) => (

            <tr key={project.id}>

              <td>{project.id}</td>
              <td>{project.name}</td>

              <td>

                <button
                  onClick={() => deleteProject(project.id)}
                  style={{ background: "red", color: "white" }}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default ProjectsPage;