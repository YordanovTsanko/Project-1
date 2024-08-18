import {
  Avatar,
  Box,
  Button,
  Grid,
  Rating,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineSend } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";
import {
  editReview,
  deleteReviews,
} from "../../Redux/Actions/reviewsActions";

const CommentCard = ({ review, productId, isAuthToEdit }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(review.rating);

  const deleteComment = async () => {
    dispatch(deleteReviews(review._id));
  };

  const editComment = async () => {
    dispatch(
      editReview({ comment: editedComment, rating: editedRating }, review._id)
    );
  };

  function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
      sx={{
        backgroundColor: "#1976d",
        boxShadow: "0px 8px 13px rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        margin: "20px auto",
        width: "100%",
        height: "auto",
      }}
    >
      <Grid item>
        <Avatar alt="Customer Avatar" />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: "left" }}>{review.userName}</h4>
        <div style={{ textAlign: "left", marginTop: 10 }}>
          {!edit && (
            <Rating
              name="read-only"
              value={review.rating}
              readOnly
              precision={0.5}
            />
          )}
          {edit && (
            <Rating
              name="simple-controlled"
              value={editedRating}
              precision={0.5}
              onChange={(event, newValue) => setEditedRating(newValue)}
            />
          )}
        </div>
        <p
          style={{
            textAlign: "left",
            wordBreak: "break-word",
            paddingRight: 10,
            margin: "10px 0",
          }}
        >
          {review.comment}
        </p>
        {edit && (
          <TextField
            id="standard-basic"
            value={editedComment}
            label="Edit Review"
            multiline
            className="comment"
            variant="standard"
            sx={{ width: "90%", cursor: "pointer" }}
            onChange={(e) => setEditedComment(e.target.value)}
          />
        )}
        {edit && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              margin: 1,
            }}
          >
            <Button
              sx={{ width: 10, borderRadius: "30px" }}
              variant="contained"
              onClick={editComment}
            >
              <AiOutlineSend />
            </Button>
            <Button
              sx={{ width: 10, borderRadius: "30px" }}
              variant="contained"
              color="error"
              onClick={() => setEdit(false)}
            >
              <GiCancel style={{ fontSize: 15, color: "white" }} />
            </Button>
          </Box>
        )}
        <p style={{ textAlign: "left", color: "gray", margin: "20px 0" }}>
          {formatTimestamp(review.updatedAt)}
        </p>
        {isAuthToEdit && (
          <Box sx={{ height: 20, transform: "translateZ(0px)", flexGrow: 1 }}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
            >
              <SpeedDialAction
                icon={<AiFillEdit />}
                tooltipTitle={"Edit"}
                onClick={() => setEdit(true)}
              />
              <SpeedDialAction
                icon={<AiFillDelete />}
                tooltipTitle={"Delete"}
                onClick={deleteComment}
              />
            </SpeedDial>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default CommentCard;
