//reviews filters
export const filterReviews = (reviews, filter) => {
  switch (filter) {
    case "Newest First":
      return reviews.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    case "Oldest First":
      return reviews.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    case "Positive First":
      return reviews.sort((a, b) => b.rating - a.rating);
    case "Negative First":
      return reviews.sort((a, b) => a.rating - b.rating);
    default:
      return reviews;
  }
};

