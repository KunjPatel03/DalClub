import React, { useState, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import axios from "../../Assets/config/axiosConfig";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { DeleteOutline } from "@material-ui/icons";
import { toast } from "react-toastify"


const JobsContainer = styled('div')({
    flex: '8',
    width: '100%',
    display: 'grid',
    gap: '1em',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
});

const TheList = styled('div')({
    width: '100%',
    flex: '4'
});

const ListItem = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

const EditButton = styled('button')(({ theme }) => ({
    border: 'none',
    borderRadius: '10px',
    padding: '5px 10px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    cursor: 'pointer',
    marginRight: '20px',
}));

const MyDeleteOutline = styled(DeleteOutline)({
    color: 'red',
    cursor: 'pointer'
});

const ItemAddButton = styled('button')(({ theme }) => ({
    width: '80px',
    border: 'none',
    padding: '5px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '16px',
    textTransform: 'uppercase'
}));

const ItemTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});


const AdminCareers = () => {

    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get("/careers")
            .then(response => {
                setJobs(response.data.success ? response.data.jobs : [])
            }).catch((err) => {
                setJobs([])
                toast.error(err?.response?.data?.message || "Something went wrong")
            });
    }, []);

    const handleDelete = (id) => {
        
        axios.get(`/careers/deleteJob/${id}`)
            .then(response => {
                setJobs(jobs.filter((item) => item.job_id !== id));
                toast("Job Posting Deleted")
            }).catch((err) => {
                toast.error(err?.response?.data?.message || "Could not delete Job Posting")
            });
    };

    const columns = [
        { field: "job_id", 
        headerName: "Job ID", 
        width: 120 },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            renderCell: (params) => {
                return (
                    <ListItem>
                        {params.row.title}
                    </ListItem>
                );
            },
        },
        {
            field: "job_type",
            headerName: "Job Type",
            width: 160,
        },
        {
            field: "vacancies",
            headerName: "# Vacancies",
            width: 160,
        },
        {
            field: "applicants",
            headerName: "# Applicants",
            width: 160,
            renderCell: () => {
                return (
                    <ListItem>
                        1
                    </ListItem>
                );
            },
        },
        {
            field: "status",
            headerName: "Status",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/editJob/" + params.row.job_id}>
                            <EditButton primary>Edit</EditButton>
                        </Link>
                        <MyDeleteOutline
                            onClick={() => handleDelete(params.row.job_id)}
                        />
                    </>
                );
            },
        },
    ];
    return (
        <JobsContainer>
            <TheList>
                <ItemTitleContainer>
                    <h1>Jobs Catalogue</h1>
                    <Link to="/admin/careers/add">
                        <ItemAddButton>Create</ItemAddButton>
                    </Link>
                </ItemTitleContainer>
                <DataGrid
                    rows={jobs}
                    getRowId={(row) => row.job_id}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={10}
                />
            </TheList>
        </JobsContainer>
    )
}
export default AdminCareers