// import FilterHeading from '@/components/hotels/filter/filter-heading';
// import { DateRangeInput, PassengersInput } from '@/components/shared/search-form/inputs';
// import { Button } from '@/components/ui/button';
// import { optionsList } from '@/data/data';

// import PricePerNight from './PricePerNight';

// function PriceSummary() {
//   return (
//     <div className="mt-5">
//       <h4>Price</h4>
//       <ul className="rounded-xl bg-gray-200 p-5">
//         {new Array(4).fill('').map((item, i) => (
//           <li key={i} className="mb-4 flex items-center justify-between capitalize ">
//             <span>1 nights</span>
//             <span>$500</span>
//           </li>
//         ))}
//       </ul>
//       <div className="my-5 flex items-center justify-between">
//         <span>Total Payments</span>
//         <span>$300</span>
//       </div>
//       <Button className="w-full">Book Now</Button>
//     </div>
//   );
// }

// const BookingSummary = () => {
//   return (
//     <div className="w-full rounded-xl bg-white px-5 py-6 shadow-sm xl:px-10">
//       {/* Heading */}
//       <div className="mb-5 flex items-center justify-between">
//         <PricePerNight price={148} originalPrice={155} />
//         <p className="rounded-full bg-primary p-2 text-sm uppercase text-white">20% off</p>
//       </div>
//       {/*Check in checkout */}
//       <DateRangeInput />
//       <div className="my-5"></div>
//       <PassengersInput />
//       <div className="mt-5">
//         <FilterHeading label="Extra Features" />
//         <CheckboxList items={optionsList} />
//       </div>
//       <PriceSummary />
//     </div>
//   );
// };

// export default BookingSummary;
