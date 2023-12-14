import { Prisma } from '@prisma/client';
import { type QueryClient } from '@tanstack/react-query';

// import { CountriesTableKeys } from './use-cities-table';

// interface IReValidateAfterDelete {
//   keys: CountriesTableKeys;
//   queryClient: QueryClient;
//   amount?: number;
// }

// export function reValidateAfterDelete({ keys, queryClient, amount = 1 }: IReValidateAfterDelete) {
//   type KeyOfKeys = keyof typeof keys;

//   const keysAsArray = Object.values(keys).map((value) => value[0]) as string[];

//   const keysAsString = new Map<KeyOfKeys, string>();

//   for (const key in keys) {
//     const k = key as KeyOfKeys;
//     keysAsString.set(k, JSON.stringify(keys[k]));
//   }

//   // Remove all queries except the current one
//   queryClient.removeQueries({
//     predicate: (query) => {
//       // If the query is not a country query, return false to not remove it
//       if (!keysAsArray.includes(query.queryKey[0] as string)) return false;

//       const stringQueryKey = JSON.stringify(query.queryKey);

//       let isFound;

//       keysAsString.forEach((value, key) => {
//         if (value === stringQueryKey) {
//           keysAsString.delete(key);
//           isFound = true;
//         }
//       });

//       return !isFound;
//     },
//   });

//   // Update the current Count query locally
//   queryClient.setQueryData<{ data: number; error?: string }>(
//     keys.countriesCountQueryKey,
//     (oldData) => {
//       if (!oldData) return oldData;

//       return {
//         ...oldData,
//         data: oldData.data - amount,
//       };
//     },
//   );

//   // Invalidate the current countries to refetch the data as it should be equal to the page size
//   queryClient.invalidateQueries({
//     queryKey: keys.countriesQueryKey,
//   });
// }

export interface CitiesFilter {
  query: string;
  isFeatured: boolean | undefined;
  countriesFilter?: string[];
}

export function getCitiesWhereFilter(filter: CitiesFilter) {
  let where: Prisma.CityFindManyArgs['where'] = {};

  if (filter.query.trim().length > 0) {
    where.name = { contains: filter.query, mode: 'insensitive' };
  }

  if (filter.isFeatured !== undefined) {
    where.isFeatured = filter.isFeatured;
  }

  if (filter.countriesFilter?.length) {
    where.country = {
      id: {
        in: filter.countriesFilter,
      },
    };
  }

  return where;
}
