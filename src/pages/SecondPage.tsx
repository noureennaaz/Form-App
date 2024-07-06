import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import DepartmentList from '../components/DepartmentList';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  const SecondPage: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(10);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
      page: 0,
      pageSize: 10,
    });
  
    useEffect(() => {
      const userDetails = localStorage.getItem('userDetails');
      if (!userDetails) {
        navigate('/');
        return;
      }
  
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, [navigate]);
  
    const columns: GridColDef[] = [
      { field: 'userId', headerName: 'User ID', width: 150 },
      { field: 'id', headerName: 'ID', width: 150 },
      { field: 'title', headerName: 'Title', width: 300 },
      { field: 'body', headerName: 'Body', width: 500 },
    ];
  
    return (
      <Box sx={{ width: '100%', paddingTop: '50px' }}>
        <h1>Fetched Data</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataGrid
            rows={posts}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            paginationMode="server"
            pagination
            autoHeight
            page={paginationModel.page}
            onPageChange={(newPage) => setPaginationModel({ ...paginationModel, page: newPage })}
          />
        )}
        <h1>Department List</h1>
        <DepartmentList />
      </Box>
    );
  };
  
  export default SecondPage;