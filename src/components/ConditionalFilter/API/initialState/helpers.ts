import { ApolloQueryResult } from "@apollo/client";
import {
  _GetChannelOperandsQuery,
  _SearchAttributeOperandsQuery,
  _SearchCategoriesOperandsQuery,
  _SearchCollectionsOperandsQuery,
  _SearchProductTypesOperandsQuery,
} from "@dashboard/graphql";

import { createOptionsFromAPI } from "../Handler";
import { InitialState } from "../InitialStateResponse";
import { InitialAPIResponse } from "./types";

const isChannelQuery = (
  query: InitialAPIResponse,
): query is ApolloQueryResult<_GetChannelOperandsQuery> =>
  "channels" in query.data;

const isCollectionQuery = (
  query: InitialAPIResponse,
): query is ApolloQueryResult<_SearchCollectionsOperandsQuery> =>
  "collections" in query.data;

const isCategoryQuery = (
  query: InitialAPIResponse,
): query is ApolloQueryResult<_SearchCategoriesOperandsQuery> =>
  "categories" in query.data;

const isProductTypeQuery = (
  query: InitialAPIResponse,
): query is ApolloQueryResult<_SearchProductTypesOperandsQuery> =>
  "productTypes" in query.data;

const isAttributeQuery = (
  query: InitialAPIResponse,
): query is ApolloQueryResult<_SearchAttributeOperandsQuery> =>
  "attributes" in query.data;

export const createInitialStateFromData = (
  data: InitialAPIResponse[],
  channel: string[],
) =>
  data.reduce<InitialState>(
    (acc, query) => {
      if (isChannelQuery(query)) {
        return {
          ...acc,
          channel: (query.data?.channels ?? [])
            .filter(({ slug }) => channel.includes(slug))
            .map(({ id, name, slug }) => ({ label: name, value: id, slug })),
        };
      }

      if (isCollectionQuery(query)) {
        return {
          ...acc,
          collection: createOptionsFromAPI(
            query.data?.collections?.edges ?? [],
          ),
        };
      }

      if (isCategoryQuery(query)) {
        return {
          ...acc,
          category: createOptionsFromAPI(query.data?.categories?.edges ?? []),
        };
      }

      if (isProductTypeQuery(query)) {
        return {
          ...acc,
          producttype: createOptionsFromAPI(
            query.data?.productTypes?.edges ?? [],
          ),
        };
      }

      if (isAttributeQuery(query)) {
        return {
          ...acc,
          attribute:
            query.data?.attributes?.edges.reduce(
              (acc, { node }) => ({
                ...acc,
                [node.slug ?? ""]: {
                  choices: createOptionsFromAPI(node.choices?.edges ?? []),
                  slug: node?.slug,
                  value: node?.id,
                  label: node?.name,
                  inputType: node?.inputType,
                },
              }),
              {},
            ) ?? {},
        };
      }

      return acc;
    },
    {
      channel: [],
      collection: [],
      category: [],
      producttype: [],
      attribute: {},
    },
  );
