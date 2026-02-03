const ImageGallery = ({ images, mainImage, setMainImage }) => {
  return (
    <>
      <div className="rounded-lg overflow-hidden aspect-[3/4] bg-gray-100">
        <img src={mainImage} className="w-full h-full object-cover" />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setMainImage(img)}
            className={`w-16 h-20 border rounded-md overflow-hidden ${
              mainImage === img
                ? "border-[#2F4F4F]"
                : "border-gray-200 opacity-60"
            }`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
