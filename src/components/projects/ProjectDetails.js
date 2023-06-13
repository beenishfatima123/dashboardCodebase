import React, { useEffect, useRef, useState } from "react";
import CustomField from "../../customComponents/customField/CustomField";
import { makeStyles } from "@mui/styles";
import { Button, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "3% 10% 0% 10%",
  },
  innerContainer: {
    width: "100%",
    margin: "10px 0px",
    position: "relative",
  },
  attachedImage: {
    width: "100px",
    height: "100px",
    margin: "10px 10px 10px 0px",
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

const ProjectDetails = ({
  content,
  edit,
  delImageIds,
  delImage,
  contIds,
  delContIds,
}) => {
  const classes = useStyles();
  const inputFile = useRef(null);

  const [imageIndex, setImageIndex] = useState(null);

  const deleteRow = (index, id, nid) => {
    edit((prev) => {
      delContIds([...new Set([...contIds, {id, nid}])]);
      return {
        ...prev,
        content: prev?.content?.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              edited: true,
              softDelete: true,
            };
          } else return elem;
        }),
      };
    });
  };
  const UndoDeleteRow = (index, contentId) => {
    edit((prev) => {
      const newIds = contIds.filter((con) => con.id != contentId);
      delContIds(newIds);
      return {
        ...prev,
        content: prev?.content?.map((elem, elemPosition) => {
          if (elem.id === contentId) {
            return {
              ...elem,
              softDelete: false,
            };
          } else return elem;
        }),
      };
    });
  };
  const deleteImage = (isNew, pos, index, imageId) => {
    edit((prev) => {
      return {
        ...prev,
        content: prev?.content?.map((elem, elemPosition) => {
          if (!isNew && elemPosition === index) {
            delImage([
              ...delImageIds,
              { contentId: elem.id, imageId: imageId },
            ]);
            return {
              ...elem,
              files: elem?.files?.filter((file, at) => pos !== at),
            };
          } else if (isNew && elemPosition === index) {
            return {
              ...elem,
              newFiles: elem?.newFiles?.filter((file, at) => pos !== at),
            };
          } else return elem;
        }),
      };
    });
  };
  const addImages = (e) => {
    edit((prev) => {
      return {
        ...prev,
        content: prev?.content?.map((elem, elemPosition) => {
          if (elemPosition === imageIndex) {
            const selectedFiles = e.target.files;
            const selectedFilesArray = Array.from(selectedFiles);
            const imagesArray = selectedFilesArray.map((file) => {
              return {
                id: elem?.newFiles ? elem?.newFiles?.length : 0,
                file: file,
              };
            });
            return {
              ...elem,
              newFiles: elem?.newFiles?.length
                ? [...elem?.newFiles, ...imagesArray]
                : imagesArray,
              edited: true,
            };
          } else return elem;
        }),
      };
    });
  };
  const addRow = () => {
    const _content = [...content, { nid: content.length, id: content.length, title: "", body: "" }];
    edit((prev) => {
      return { ...prev, content: _content };
    });
  };
  return (
    <div className={classes.paper}>
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/x-png,image/jpeg"
        multiple
        ref={inputFile}
        onChange={addImages}
      />

      {content?.map((item, index) => (
        <div
          key={index}
          className={classes.innerContainer}
          style={
            item?.softDelete === true
              ? {
                  border: "1",
                  padding: "20px",
                  borderStyle: "dashed",
                  borderColor: "red",
                }
              : { borderWidth: "1", padding: "20px", borderStyle: "blue" }
          }
        >
          {item?.softDelete === true && (
            <IconButton
              sx={{ position: "absolute", top: -10, right: -10, p: 0 }}
              onClick={() => UndoDeleteRow(index, item?.id, item?.nid)}
            >
              <CheckCircleIcon color="error" fontSize="small" />
            </IconButton>
          )}
          <div key={index} className={classes.innerContainer}>
            <IconButton
              sx={{ position: "absolute", top: -10, right: -10, p: 0 }}
              onClick={() => deleteRow(index, item?.id, item?.nid)}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
            <CustomField
              name="title"
              label="Title"
              placeholder={item?.title}
              value={item?.title}
              onChange={(e) => {
                edit((prev) => {
                  return {
                    ...prev,
                    content: prev?.content?.map((elem, elemPosition) => {
                      if (elemPosition === index) {
                        return {
                          ...elem,
                          title: e.target.value,
                          edited: true,
                        };
                      } else return elem;
                    }),
                  };
                });
              }}
            />
            <CustomField
              name="body"
              label="Description"
              placeholder={item?.body}
              value={item?.body}
              multiline
              minRows={4}
              onChange={(e) =>
                edit((prev) => {
                  return {
                    ...prev,
                    content: prev?.content?.map((elem, elemPosition) => {
                      if (elemPosition === index) {
                        return {
                          ...elem,
                          body: e.target.value,
                          edited: true,
                        };
                      } else return elem;
                    }),
                  };
                })
              }
            />
            <div className={classes.imageContainer}>
              <IconButton
                onClick={() => {
                  if (inputFile) {
                    inputFile?.current?.click();
                    setImageIndex(index);
                  }
                }}
              >
                <PhotoCamera fontSize="large" style={{ color: "#014493" }} />
              </IconButton>

              {item?.files?.map((image, pos) => (
                <div key={pos} style={{ position: "relative" }}>
                  <img
                    src={
                      image?.id
                        ? `https://api.zeerac.com/` + image?.file
                        : URL.createObjectURL(image)
                    }
                    className={classes.attachedImage}
                  />
                  <IconButton
                    sx={{ position: "absolute", top: -5, right: -5, p: 0 }}
                    onClick={() => deleteImage(false, pos, index, image?.id)}
                  >
                    <CancelIcon fontSize="small" style={{ color: "#014493" }} />
                  </IconButton>
                </div>
              ))}
              {item?.newFiles?.map((image, pos) => (
                <div key={pos} style={{ position: "relative" }}>
                  <img
                    src={URL.createObjectURL(image?.file)}
                    className={classes.attachedImage}
                  />
                  <IconButton
                    sx={{ position: "absolute", top: -5, right: -5, p: 0 }}
                    onClick={() => deleteImage(true, pos, index, image?.id)}
                  >
                    <CancelIcon fontSize="small" style={{ color: "#014493" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="outlined"
        endIcon={
          <AddCircleIcon fontSize="small" style={{ color: "#014493" }} />
        }
        onClick={addRow}
      >
        Add Fields
      </Button>
    </div>
  );
};

export default ProjectDetails;

