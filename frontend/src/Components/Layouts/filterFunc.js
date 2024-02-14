//reviews filters
const filterReviews = (reviews, option) => {
  switch (option) {
    case "Newest First":
      return reviews
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case "Oldest First":
      return reviews
        .slice()
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case "Positive First":
      return reviews.slice().sort((a, b) => b.rating - a.rating);
    case "Negative First":
      return reviews.slice().sort((a, b) => a.rating - b.rating);
    default:
      return reviews;
  }
};

export { filterReviews };
