export const getWishlist = () => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  if (!user) return [];

  return JSON.parse(
    localStorage.getItem(
      `wishlist_${user.id}`
    )
  ) || [];
};

export const toggleWishlist = (product) => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please Login First");
    return [];
  }

  const wishlist = getWishlist();

  const exists = wishlist.find(
    item => item.id === product.id
  );

  let updatedWishlist;

  if (exists) {

    updatedWishlist = wishlist.filter(
      item => item.id !== product.id
    );

  } else {

    updatedWishlist = [
      ...wishlist,
      product
    ];
  }

  localStorage.setItem(
    `wishlist_${user.id}`,
    JSON.stringify(updatedWishlist)
  );

  return updatedWishlist;
};

export const isInWishlist = (id) => {

  const wishlist = getWishlist();

  return wishlist.some(
    item => item.id === id
  );
};