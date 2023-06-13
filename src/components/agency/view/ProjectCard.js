import React, { useState , useMemo} from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../constants/baseUrls";
import { currencyFormatInitials } from "../../constants/helperFunctions";
import { setProjectDetails } from "../../../features/projectSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "space-between",
    margin: "5px",
    cursor: "pointer",
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    zIndex: 10,
    alignSelf: "flex-end",
    margin: "3%",
  },
  priceTitle: {
    fontSize: 22,
    color: "white",
    margin: 0,
  },
  price: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const ProjectCard = ({ project, large }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [hovering, setHovering] = useState(false);

  const style = useMemo(() => {
    if (large)
      return {
        height: 580,
        maxWidth: "100%",
      };
    else
      return {
        height: 280,
        width: window.innerWidth > 1200 ? 415 : "100%",
      };
  }, [large, window.innerWidth]);

  const openProjectDetails = () => {
    dispatch(setProjectDetails(project));
    history.push(`/project/${project?.id}`);
  };
  return (
    <div
      className={classes.container}
      style={style}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={openProjectDetails}
    >
      <img
        src={`${baseUrl}/${project?.feature_photo}`}
        alt=""
        className={classes.background}
        style={{
          WebkitFilter: hovering
            ? "none"
            : "grayscale(100%)" /* Safari 6.0 - 9.0 */,
          filter: hovering ? "none" : "grayscale(100%)",
        }}
      />
      <div className={classes.priceContainer}>
        <p className={classes.priceTitle}>Price Starting From</p>
        <span className={classes.price}>
          {currencyFormatInitials(project?.price || 5000000, "PKR")}
        </span>
      </div>
      <div
        className={classes.priceContainer}
        style={{ alignSelf: "flex-start" }}
      >
        <span className={classes.price}>{project?.title}</span>
        <p className={classes.priceTitle}>
          {" "}
          {`${project?.city}, ${project?.country}`}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
