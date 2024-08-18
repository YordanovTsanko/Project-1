//reviews filters
export const filterReviews = (reviews, filter) => {
  switch (filter) {
    case "Newest First":
      return reviews.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    case "Oldest First":
      return reviews.sort(
        (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
      );
    case "Positive First":
      return reviews.sort((a, b) => b.rating - a.rating);
    case "Negative First":
      return reviews.sort((a, b) => a.rating - b.rating);
    default:
      return reviews;
  }
};

export const filterProducts = (products, filter) => {
  switch (filter) {
    case "All":
      return products;

    case "Price Low To High":
      return products.slice().sort((a, b) => a.price - b.price);

    case "Price High To Low":
      return products.slice().sort((a, b) => b.price - a.price);

    case "High Rated":
      return products.slice().sort((a, b) => b.rating - a.rating);

    case "Low Rated":
      return products.slice().sort((a, b) => a.rating - b.rating);

    default:
      return products;
  }
};
