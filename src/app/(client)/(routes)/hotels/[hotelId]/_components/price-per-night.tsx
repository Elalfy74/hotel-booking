type PricePerNightProps = {
  price: number;
  originalPrice?: number;
};

export const PricePerNight = ({ price, originalPrice }: PricePerNightProps) => {
  return (
    <div className="flex items-end">
      <h2 className="text-xl font-semibold xl:text-3xl">${price}</h2>

      <span className="text-gray-500">/night</span>
      {originalPrice && <span className="ml-2">${originalPrice}</span>}
    </div>
  );
};
