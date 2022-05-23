import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="category-listing">
      <Link
        className="category-listing-link"
        to={`/category/${listing.type}/${id}`}
      >
        <img
          className="category-listing-img"
          src={listing.imgUrls[0]}
          alt={listing.name}
        />
        <div className="category-listing-details">
          <p className="category-listing-location">{listing.location}</p>
          <p className="category-listing-name">{listing.name}</p>
          <p className="category-listing-price">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Month"}
          </p>
          <div className="category-listing-infoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="category-listing-infoText">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
            <img src={bathtubIcon} alt="bath" />
            <p className="category-listing-infoText">
              {listing.bedrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className="remove-icon"
          fill="rgb(231,76,60)"
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {onEdit && <EditIcon className="edit-icon" onClick={() => onEdit(id)} />}
    </li>
  );
}

export default ListingItem;
