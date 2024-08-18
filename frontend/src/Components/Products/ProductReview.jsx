import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import {
  MdSentimentSatisfiedAlt,
  MdSentimentDissatisfied,
  MdSentimentVeryDissatisfied,
  MdSentimentNeutral,
  MdSentimentVerySatisfied,
  MdStarRate,
  MdOutlineSentimentVeryDissatisfied,
  MdSend,
  MdOutlineFilterAlt,
} from "react-icons/md";
import Box from "@mui/material/Box";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import "./Review.css";
import CommentCard from "./CommentCard";
import {
  clearErrors,
  createReview,
  getProductReviews,
} from "../../Redux/Actions/reviewsActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { filterReviews } from "../Layouts/filterFunc";

const labels = {
  0: <MdOutlineSentimentVeryDissatisfied style={{ color: "red" }} />,
  0.5: <MdOutlineSentimentVeryDissatisfied style={{ color: "red" }} />,
  1: <MdSentimentVeryDissatisfied style={{ color: "red" }} />,
  1.5: <MdSentimentVeryDissatisfied style={{ color: "red" }} />,
  2: <MdSentimentDissatisfied style={{ color: "orange" }} />,
  2.5: <MdSentimentDissatisfied style={{ color: "orange" }} />,
  3: <MdSentimentNeutral style={{ color: "gold" }} />,
  3.5: <MdSentimentNeutral style={{ color: "gold" }} />,
  4: <MdSentimentSatisfiedAlt style={{ color: "green" }} />,
  4.5: <MdSentimentSatisfiedAlt style={{ color: "green" }} />,
  5: <MdSentimentVerySatisfied style={{ color: "green" }} />,
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
const ProductReview = ({ isAuthenticated, setOpenAlert, id }) => {
  const dispatch = useDispatch();

  const { loading, error, reviews } = useSelector((state) => state.reviews);
  const { user, loading: userLoading } = useSelector((state) => state.auth);

  const [filteredReviews, setFilteredReviews] = useState({});
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState("");
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("Newest First");

  const commentFilter = [
    "Newest First",
    "Oldest First",
    "Positive First",
    "Negative First",
  ];
  const handleChange = (e) => {
    setTitle(e.target.value);
    setFilteredReviews(filterReviews(reviews, e.target.value));
  };

  useEffect(() => {
    if (reviews) {
      setFilteredReviews(filterReviews(reviews, "Newest First"));
    }
  }, [reviews]);

  useEffect(() => {
    dispatch(getProductReviews(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error || "Unknown error, please try again later!", {
        autoClose: 1500,
        theme: "colored",
      });
    }
    dispatch(clearErrors());
  }, [dispatch, error]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setOpenAlert(true);
    } else {
      setOpenAlert(false);
      dispatch(createReview({ comment, rating, productId: id }));
      setFilteredReviews({});
      setComment("");
      setRating(null);
    }
  };
  return (
    <>
      <div className="form-container" style={{ padding: "0 0 20px 0" }}>
        <form
          onSubmit={handleSubmitReview}
          className="form"
          style={{ width: "100%" }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Write a review:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Rating
              name="hover-feedback"
              value={rating}
              precision={0.5}
              getLabelText={getLabelText}
              id="rating"
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <MdStarRate style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {rating !== null && (
              <Box className="expression-icon" sx={{ ml: 2 }}>
                {labels[hover !== -1 ? hover : rating]}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "@media (max-width: 600px)": {
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
              },
            }}
          >
            <TextField
              id="filled-textarea"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              label="Add Review"
              placeholder="What did you like or dislike?"
              multiline
              className="comment"
              variant="outlined"
            />

            <Tooltip title="Send Review">
              <Button
                className="form-btn"
                variant="contained"
                type="submit"
                endIcon={<MdSend />}
                style={{ alignSelf: "center" }}
              >
                Send
              </Button>
            </Tooltip>
          </Box>
        </form>
      </div>
      {!loading &&
        (reviews.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 1,
              width: "100%",
            }}
          >
            <Button endIcon={<MdOutlineFilterAlt />}>Filters</Button>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={title}
              sx={{ width: 200 }}
              onChange={handleChange}
            >
              {commentFilter.map((prod) => (
                <MenuItem key={prod} value={prod}>
                  {prod}
                </MenuItem>
              ))}
            </Select>
            {(filteredReviews.length > 0 ? filteredReviews : reviews).map(
              (review) => {
                let isAuthToEdit = !userLoading && review.userID === user?._id;
                return (
                  <CommentCard
                    key={review._id}
                    review={review}
                    productId={id}
                    isAuthToEdit={isAuthToEdit}
                  />
                );
              }
            )}
          </Box>
        ) : (
          <Typography sx={{ textAlign: "center" }}>
            No reviews have been submitted for this product yet. Be the first to
            add a review!
          </Typography>
        ))}
    </>
  );
};

export default ProductReview;
