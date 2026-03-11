import { useEffect, useState } from "react";

import {
  getInstallations,
  validateInstallation,
  rejectInstallation,
  deleteInstallation
} from "../services/installationsService";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { DataGrid } from "@mui/x-data-grid";

import InstallationsMap from "../components/maps/InstallationsMap";


const InstallationsPage = () => {

  const [installations, setInstallations] = useState([]);


  const loadInstallations = async () => {

    const data = await getInstallations();

    setInstallations(data);

  };


  useEffect(() => {

    loadInstallations();

  }, []);


  const handleValidate = async (id) => {

    await validateInstallation(id);

    loadInstallations();

  };


  const handleReject = async (id) => {

    const reason = prompt("Reason for rejection");

    if (!reason) return;

    await rejectInstallation(id, reason);

    loadInstallations();

  };


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this rejected installation?");

    if (!confirmDelete) return;

    await deleteInstallation(id);

    loadInstallations();

  };


  const columns = [

    { field: "pole_reference", headerName: "Pole", flex: 1 },

    { field: "network_type", headerName: "Network", width: 120 },

    { field: "installed_by", headerName: "Worker", flex: 1 },

    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) =>
        new Date(params.value).toLocaleString()
    },

    { field: "validation_status", headerName: "Status", width: 140 },

    {
      field: "photo",
      headerName: "Photo",
      width: 120,
      renderCell: (params) => (

        <img
          src={`http://127.0.0.1:8000/${params.row.photo_path}`}
          width="70"
          alt="pole"
        />

      )
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 260,
      renderCell: (params) => {

        const inst = params.row;

        return (

          <div style={{ display: "flex", gap: 8 }}>

            {inst.validation_status === "PENDING" && (

              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleValidate(inst.id)}
                >
                  Validate
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleReject(inst.id)}
                >
                  Reject
                </Button>
              </>

            )}

            {inst.validation_status === "REJECTED" && (

              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(inst.id)}
              >
                Delete
              </Button>

            )}

          </div>

        );

      }
    }

  ];


  return (

    <Paper style={{ padding: 20 }}>

      <h2>Installations</h2>

      <InstallationsMap installations={installations} />

      <div style={{ height: 500, marginTop: 20 }}>

        <DataGrid
          rows={installations}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
          }}
        />

      </div>

    </Paper>

  );

};

export default InstallationsPage;