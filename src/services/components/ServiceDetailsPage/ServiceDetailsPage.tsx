import React from "react";
import { useIntl } from "react-intl";

import AccountPermissions from "@saleor/components/AccountPermissions";
import AccountStatus from "@saleor/components/AccountStatus";
import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { ShopInfo_shop_permissions } from "@saleor/components/Shop/types/ShopInfo";
import { sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { ServiceDetails_serviceAccount } from "@saleor/services/types/ServiceDetails";
import { UserError } from "@saleor/types";
import { PermissionEnum } from "@saleor/types/globalTypes";
import ServiceInfo from "../ServiceInfo";
import ServiceTokens from "../ServiceTokens";

export interface ServiceDetailsPageFormData {
  hasFullAccess: boolean;
  isActive: boolean;
  name: string;
  permissions: PermissionEnum[];
}
export interface ServiceDetailsPageProps {
  disabled: boolean;
  errors: UserError[];
  permissions: ShopInfo_shop_permissions[];
  saveButtonBarState: ConfirmButtonTransitionState;
  service: ServiceDetails_serviceAccount;
  onBack: () => void;
  onTokenDelete: (id: string) => void;
  onDelete: () => void;
  onTokenCreate: () => void;
  onSubmit: (data: ServiceDetailsPageFormData) => void;
}

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = props => {
  const {
    disabled,
    errors: formErrors,
    permissions,
    saveButtonBarState,
    service,
    onBack,
    onDelete,
    onTokenCreate,
    onTokenDelete,
    onSubmit
  } = props;
  const intl = useIntl();

  const initialForm: ServiceDetailsPageFormData = {
    hasFullAccess: maybe(
      () =>
        permissions.filter(
          perm =>
            maybe(() => service.permissions, []).filter(
              userPerm => userPerm.code === perm.code
            ).length === 0
        ).length === 0,
      false
    ),
    isActive: maybe(() => service.isActive, false),
    name: maybe(() => service.name, ""),
    permissions: maybe(() => service.permissions, []).map(perm => perm.code)
  };
  return (
    <Form
      errors={formErrors}
      initial={initialForm}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ data, change, errors, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.serviceAccounts)}
          </AppHeader>
          <PageHeader title={maybe(() => service.name)} />
          <Grid>
            <div>
              <ServiceInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <ServiceTokens
                tokens={maybe(() => service.tokens)}
                onCreate={onTokenCreate}
                onDelete={onTokenDelete}
              />
            </div>
            <div>
              <AccountPermissions
                data={data}
                disabled={disabled}
                permissions={permissions}
                onChange={change}
              />
              <CardSpacer />
              <AccountStatus
                data={data}
                disabled={disabled}
                onChange={change}
              />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onSave={submit}
            onDelete={onDelete}
          />
        </Container>
      )}
    </Form>
  );
};

ServiceDetailsPage.displayName = "ServiceDetailsPage";
export default ServiceDetailsPage;
