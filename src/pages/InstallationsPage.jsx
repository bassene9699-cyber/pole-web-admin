import { useEffect, useState } from "react";

import {
  getInstallations,
  validateInstallation,
  rejectInstallation,
  deleteInstallation
} from "../services/installationsService";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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

    await loadInstallations();

  };


  const handleReject = async (id) => {

    const reason = prompt("Reason for rejection");

    if (!reason) return;

    await rejectInstallation(id, reason);

    await loadInstallations();

  };


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this rejected installation?");

    if (!confirmDelete) return;

    await deleteInstallation(id);

    await loadInstallations();

  };


  return (

    <Paper style={{ padding: 20 }}>

      <h2>Installations</h2>

      <InstallationsMap installations={installations} />

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>Pole</TableCell>
            <TableCell>Network</TableCell>
            <TableCell>Worker</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Action</TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {installations.map((inst) => (

            <TableRow key={inst.id}>

              <TableCell>{inst.pole_reference}</TableCell>

              <TableCell>{inst.network_type}</TableCell>

              <TableCell>{inst.installed_by}</TableCell>

              <TableCell>
                {new Date(inst.created_at).toLocaleString()}
              </TableCell>

              <TableCell>{inst.validation_status}</TableCell>

              <TableCell>

                <img
                  src={`http://127.0.0.1:8000/${inst.photo_path}`}
                  width="80"
                  alt="pole"
                />

              </TableCell>

              <TableCell>

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
                      style={{ marginLeft: 10 }}
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

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>

  );

};

export default InstallationsPage;