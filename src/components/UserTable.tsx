"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { fetchUsers } from "@/store/slices/userSlice";
import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, total, loading, error, page, rowsPerPage } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers({ page: page + 1, perPage: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow hover key={user.id}>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role || "User"}</TableCell>
                <TableCell>
                  <Chip label="Active" color="success" size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) =>
          dispatch({ type: "users/setPage", payload: newPage })
        }
        onRowsPerPageChange={(event) =>
          dispatch({
            type: "users/setRowsPerPage",
            payload: parseInt(event.target.value, 10),
          })
        }
      />
    </Paper>
  );
};

export default UserTable;
