import { SingleReview } from './single-review';

export const ReviewsList = () => {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Latest Reviews</h1>
      <ul>
        {new Array(3).fill('').map((item, i) => (
          <li key={i} className="mb-10">
            <SingleReview />
          </li>
        ))}
      </ul>
    </div>
  );
};
