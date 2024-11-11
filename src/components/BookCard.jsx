import React from "react";

const BookCard = ({ book }) => {
  // Extract the image URL, assuming the image is in formats like "image/jpeg"
  const imageUrl = book.formats["image/jpeg"] || book.formats["image/png"];

  const handleClick = () => {
    const formats = book.formats;
    if (formats["text/html"]) {
      window.open(formats["text/html"], "_blank");
    } else if (formats["application/pdf"]) {
      window.open(formats["application/pdf"], "_blank");
    } else if (formats["text/plain"]) {
      window.open(formats["text/plain"], "_blank");
    } else {
      alert("No viewable version available");
    }
  };

  return (
    <div
      className=" hover:shadow-lg w-36 h-[162px] cursor-pointer grid mb-32"
      onClick={handleClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={book.title}
          className=" w-full h-full object-cover mb-4  "
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 ">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <p className="text-gray-600">
        {/* {book.authors[0]?.name || "Unknown Author"} */}
      </p>
    </div>
  );
};

export default BookCard;
