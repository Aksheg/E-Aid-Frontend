import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import "./DoctorList.css";
import Modal from "../Modal/Modal";
import { Button } from "../../pages/Login/button";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;

const DoctorList: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [allDoctors, setAllDoctors] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName: "doctor-table-header",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      headerClassName: "doctor-table-header",
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
      headerClassName: "doctor-table-header",
    },
    {
      field: "specialty",
      headerName: "Specialization",
      width: 130,
      editable: true,
      headerClassName: "doctor-table-header",
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "phone",
      width: 180,
      editable: true,
      headerClassName: "doctor-table-header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
      headerClassName: "doctor-table-header",
      renderCell: (params: any) => (
        <StatusCell onClick={() => handleStatusCellClick(params)}>
          {params.value}
        </StatusCell>
      ),
    },
  ];

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/alldoctors`);
        const data = response.data.allDoctors;
        setAllDoctors(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setAllDoctors]);

  const handleVerifyDoctor = async () => {
    await axios.post(`${baseUrl}/auth/verify-doctor/${selectedDoctor.id}`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleStatusCellClick = (params: GridValueGetterParams) => {
    setOpenModal(true);
    setSelectedDoctor(params.row);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <DoctorContainer>
      <div className="tablegrid-container">
        <DataGrid
          rows={allDoctors}
          columns={columns}
          initialState={{
            pagination:
              allDoctors.length === 0
                ? {}
                : {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
          }}
          pageSizeOptions={[10, 20]}
        />
      </div>
      {openModal && (
        <Modal
          modalBackground="doctorModal"
          handleCloseModal={handleCloseModal}
          children={
            <div className="popupContent">
              <h3>
                You are about to{" "}
                {selectedDoctor.status === "verified" ? `unverify` : `verify`} a
                doctor
              </h3>
              <p>{`Name: ${selectedDoctor.fullName}`}</p>
              <p>{`Email: ${selectedDoctor.email}`}</p>
              <p>Do you wish to continue?</p>
              <div className="btns">
                <Button btnText="Yes" onClick={handleVerifyDoctor} />
                <Button btnText="No" onClick={handleCloseModal} />
              </div>
            </div>
          }
          modalContainer="popup"
          modalBtn="closeBtn"
        />
      )}
    </DoctorContainer>
  );
};

export default DoctorList;

const DoctorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 83vw;
  height: 100vh;
  margin-left: 15.5rem;
  background-color: #f6f6f6;
  overflow: auto;

  .doctorModal {
    margin-left: -15.5rem;
  }

  .popup {
    width: fit-content;
    height: 15rem;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .popupContent {
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .btns {
    width: 70%;
    display: flex;
    justify-content: space-between;
  }

  .btns button {
    color: #e0e0e0;
    background-color: #eb5757;
    border: 1px solid #eb5757;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    width: 4rem;
  }

  .btns button:hover {
    color: #eb5757;
    background-color: #fff;
  }

  .closeBtn {
    margin-right: 1rem;
    border-radius: 50%;
    color: #eb5757;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #fff;
    display: none;
    justify-content: center;
    align-items: center;
    font-size: large;
  }
`;

const StatusCell = styled.div`
  cursor: pointer;
  /* Additional styles for StatusCell */
`;
