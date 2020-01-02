import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ActionDialog from "@saleor/components/ActionDialog";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { ListViews } from "@saleor/types";
import { getSortParams } from "@saleor/utils/sort";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import { IFilter } from "@saleor/components/Filter";
import { getFilterQueryParams } from "@saleor/utils/filters";
import useShop from "@saleor/hooks/useShop";
import CustomerListPage from "../../components/CustomerListPage";
import { TypedBulkRemoveCustomers } from "../../mutations";
import { useCustomerListQuery } from "../../queries";
import { BulkRemoveCustomers } from "../../types/BulkRemoveCustomers";
import {
  customerAddUrl,
  customerListUrl,
  CustomerListUrlQueryParams,
  customerUrl,
  CustomerListUrlDialog
} from "../../urls";
import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
  CustomerFilterKeys,
  getFilterQueryParam,
  getFilterOpts
} from "./filter";
import { getSortQueryVariables } from "./sort";

interface CustomerListProps {
  params: CustomerListUrlQueryParams;
}

export const CustomerList: React.FC<CustomerListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const { updateListSettings, settings } = useListSettings(
    ListViews.CUSTOMER_LIST
  );
  const intl = useIntl();
  const shop = useShop();

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );
  const { data, loading, refetch } = useCustomerListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const changeFilters = (filter: IFilter<CustomerFilterKeys>) => {
    reset();
    navigate(
      customerListUrl({
        ...params,
        ...getFilterQueryParams(filter, getFilterQueryParam),
        activeTab: undefined
      })
    );
  };

  const resetFilters = () => {
    reset();
    navigate(
      customerListUrl({
        asc: params.asc,
        sort: params.sort
      })
    );
  };

  const handleSearchChange = (query: string) => {
    reset();
    navigate(
      customerListUrl({
        ...params,
        activeTab: undefined,
        query
      })
    );
  };

  const [openModal, closeModal] = createDialogActionHandlers<
    CustomerListUrlDialog,
    CustomerListUrlQueryParams
  >(navigate, customerListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      customerListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(customerListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.customers.pageInfo),
    paginationState,
    params
  );

  const handleBulkCustomerDelete = (data: BulkRemoveCustomers) => {
    if (data.customerBulkDelete.errors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
      refetch();
      closeModal();
    }
  };

  const handleSort = createSortHandler(navigate, customerListUrl, params);
  const currencySymbol = maybe(() => shop.defaultCurrency, "USD");

  return (
    <TypedBulkRemoveCustomers onCompleted={handleBulkCustomerDelete}>
      {(bulkRemoveCustomers, bulkRemoveCustomersOpts) => (
        <>
          <CustomerListPage
            currencySymbol={currencySymbol}
            currentTab={currentTab}
            filterOpts={getFilterOpts(params)}
            initialSearch={params.query || ""}
            onSearchChange={handleSearchChange}
            onFilterChange={changeFilters}
            onAll={resetFilters}
            onTabChange={handleTabChange}
            onTabDelete={() => openModal("delete-search")}
            onTabSave={() => openModal("save-search")}
            tabs={tabs.map(tab => tab.name)}
            customers={maybe(() => data.customers.edges.map(edge => edge.node))}
            settings={settings}
            disabled={loading}
            pageInfo={pageInfo}
            onAdd={() => navigate(customerAddUrl)}
            onNextPage={loadNextPage}
            onPreviousPage={loadPreviousPage}
            onUpdateListSettings={updateListSettings}
            onRowClick={id => () => navigate(customerUrl(id))}
            onSort={handleSort}
            toolbar={
              <IconButton
                color="primary"
                onClick={() =>
                  openModal("remove", {
                    ids: listElements
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            }
            isChecked={isSelected}
            selected={listElements.length}
            sort={getSortParams(params)}
            toggle={toggle}
            toggleAll={toggleAll}
          />
          <ActionDialog
            open={
              params.action === "remove" && maybe(() => params.ids.length > 0)
            }
            onClose={closeModal}
            confirmButtonState={bulkRemoveCustomersOpts.status}
            onConfirm={() =>
              bulkRemoveCustomers({
                variables: {
                  ids: params.ids
                }
              })
            }
            variant="delete"
            title={intl.formatMessage({
              defaultMessage: "Delete Customers",
              description: "dialog header"
            })}
          >
            <DialogContentText>
              <FormattedMessage
                defaultMessage="Are you sure you want to delete {counter,plural,one{this customer} other{{displayQuantity} customers}}?"
                values={{
                  counter: maybe(() => params.ids.length),
                  displayQuantity: (
                    <strong>{maybe(() => params.ids.length)}</strong>
                  )
                }}
              />
            </DialogContentText>
          </ActionDialog>
          <SaveFilterTabDialog
            open={params.action === "save-search"}
            confirmButtonState="default"
            onClose={closeModal}
            onSubmit={handleTabSave}
          />
          <DeleteFilterTabDialog
            open={params.action === "delete-search"}
            confirmButtonState="default"
            onClose={closeModal}
            onSubmit={handleTabDelete}
            tabName={maybe(() => tabs[currentTab - 1].name, "...")}
          />
        </>
      )}
    </TypedBulkRemoveCustomers>
  );
};
export default CustomerList;
