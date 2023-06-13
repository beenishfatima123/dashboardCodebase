import React from "react";
import { Chip, Tooltip, TableCell, TableRow } from "@mui/material";
import ViewIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  resetTicketDetails,
  resetTicketHistory,
  setDetailModalOpen,
} from "../../features/ticketSlice";

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

const Row = (props) => {
  const dispatch = useDispatch();

  const { index, row } = props;

  const { detailModalData } = useSelector((state) => state.tickets);

  return (
    <React.Fragment>
      <TableRow
        hover
        sx={{ "& > *": { borderBottom: "unset", color: "#134696" } }}
        tabIndex={-1}
        key={row.id}
        // onClick={() => {
        //   setOpen(!open);
        //   dispatch(
        //     getTicketHistory({
        //       authToken: loggedInObject?.token,
        //       ticketID: row?.id,
        //       dataURL:
        //         baseUrl + `/users/ticket/?${rowType}=${row?.[rowType].id}`,
        //     })
        //   );
        // }}
        onClick={() => {
          dispatch(resetTicketDetails());
          dispatch(resetTicketHistory());
          dispatch(
            setDetailModalOpen({
              isModalOpen: true,
              clickedIndex: index,
              data: row,
            })
          );
        }}
      >
        {columns.map((column) => {
          const ticket_info = row?.[column.id];
          return column.id === "id" ? (
            <TableCell key={column.id} align={column.align}>
              <Tooltip title="View" placement="top">
                <ViewIcon
                  sx={{ cursor: "pointer", color: "grey" }}
                  onClick={() => {
                    dispatch(
                      setDetailModalOpen({
                        ...detailModalData,
                        isModalOpen: !detailModalData?.isModalOpen,
                      })
                    );
                  }}
                />
              </Tooltip>
            </TableCell>
          ) : column.id === "subject" ? (
            <TableCell key={column.id} align={column.align}>
              {ticket_info?.length > 40
                ? ticket_info?.substring(0, 40).concat("..")
                : ticket_info}
            </TableCell>
          ) : column.id === "status" ? (
            <TableCell key={column.id} align={column.align}>
              <Chip
                label={row?.status === "open" ? "Open" : "Closed"}
                color={row?.status === "open" ? "success" : "error"}
              />
            </TableCell>
          ) : (
            <TableCell key={column.id} align={column.align}>
              {ticket_info}
            </TableCell>
          );
        })}
      </TableRow>


    </React.Fragment>
  );
};

export default Row;
