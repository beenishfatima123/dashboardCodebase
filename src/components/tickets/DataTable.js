import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "../../customComponents/Loader";
import { baseUrl } from "../constants/baseUrls";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getAllTickets } from "../../features/ticketSlice";
import Row from "./Row";
import TicketDetails from "./TicketDetails";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "left",
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 50,
    align: "left",
  },
  {
    id: "subject",
    label: "Subject",
    minWidth: 80,
    align: "center",
  },
  {
    id: "country",
    label: "Country",
    minWidth: 80,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
    align: "center",
  },
  {
    id: "id",
    label: "Action",
    minWidth: 50,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles((theme) => ({
  thead: {
    backgroundColor: "lightgray",
    "& th:first-child": {
      borderRadius: "22px 0 0 0",
    },
    "& th:last-child": {
      borderRadius: "0 22px 0 0",
    },
  },
  row: {
    "&:last-child": {
      borderRadius: "22px 22px 22px 22px",
    },
    "&:first-child": {
      borderTop: "5px solid black",
    },
  },
}));

const DataTable = ({ navigateTo, type, ticketType }) => {
  const classes = useStyles();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const { allTickets, allTicketsApiInfo, detailModalData } = useSelector(
    (state) => state.tickets
  );

  const [clickedIndex, setClickedIndex] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!allTickets)
      dispatch(
        getAllTickets({
          authToken: loggedInObject?.token,
          dataURL: baseUrl + `/users/ticket/?type=${ticketType}`,
        })
      );
    // eslint-disable-next-line
  }, [ticketType]);

  const handlePrevClick = () => {
    dispatch(
      getAllTickets({
        dataURL: allTickets?.result?.previous.replace("http://", "https://"),
        authToken: loggedInObject?.token,
      })
    );
  };

  const handleNextClick = () => {
    dispatch(
      getAllTickets({
        dataURL: allTickets?.result?.next.replace("http://", "https://"),
        authToken: loggedInObject?.token,
      })
    );
  };

  return (
    <>
      <Box
        sx={{
          margin: "20px 2%",
          flexGrow: 1,
          backgroundColor: "rgb(244, 246, 248)",
          border: "1px solid #707070",
          borderRadius: "24px",
        }}
      >
        <div style={{ width: "100%" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead classes={{ root: classes.thead }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#014493",
                        color: "white",
                      }}
                    >
                      <b> {column.label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {allTicketsApiInfo?.loading ? (
                <TableBody>
                  <TableRow hover tabIndex={-1}>
                    <TableCell colSpan={8}>
                      <Loader />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {allTickets?.result?.count > 0 ? (
                    allTickets?.result?.results?.map((row, index) => {
                      return (
                        <Row
                          index={index}
                          row={row}
                          rowType={type}
                          navigateTo={navigateTo}
                          clickedIndex={clickedIndex}
                          setClickedIndex={setClickedIndex}
                        />
                      );
                    })
                  ) : (
                    <TableRow hover tabIndex={-1}>
                      <TableCell colSpan={8}>No result</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </Box>
      {/* Navigation Buttons */}
      {allTickets?.result && (
        <div className="pagination justify-content-center mt-4 mb-4">
          <Button
            variant="contained"
            startIcon={<ArrowBackIosNewIcon />}
            onClick={handlePrevClick}
            disabled={allTickets?.result?.previous !== null ? false : true}
          >
            {" "}
            Previous{" "}
          </Button>
          <div
            style={{ width: "5px", height: "auto", display: "inline-block" }}
          ></div>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
            onClick={handleNextClick}
            disabled={allTickets?.result?.next !== null ? false : true}
          >
            {" "}
            Next{" "}
          </Button>
        </div>
      )}
      {detailModalData?.isModalOpen && (
        <TicketDetails
          // data={allTickets?.result?.results[clickedIndex]}
          data={detailModalData?.data}
          open={open}
          setOpen={setOpen}
          navigateTo={navigateTo}
        />
      )}
    </>
  );
};

export default DataTable;
