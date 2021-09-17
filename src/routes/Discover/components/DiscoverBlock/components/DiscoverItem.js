import React from "react";
import "../styles/_discover-item.scss";

export default function DiscoverItem({ images, name, icons }) {
  return (
    <div className="discover-item animate__animated animate__fadeIn">
      <div
        className="discover-item__art"
        style={{
          backgroundImage: images
            ? `url(${images[0].url})`
            : `url(${icons[0].url})`,
        }}
      />
      <p className="discover-item__title">{name}</p>
    </div>
  );
}
