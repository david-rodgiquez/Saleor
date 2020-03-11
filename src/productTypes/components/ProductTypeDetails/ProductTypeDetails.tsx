import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import { commonMessages } from "@saleor/intl";
import { ProductErrorFragment } from "@saleor/attributes/types/ProductErrorFragment";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";

const useStyles = makeStyles(
  {
    root: {
      overflow: "visible"
    }
  },
  { name: "ProductTypeDetails" }
);

interface ProductTypeDetailsProps {
  data?: {
    name: string;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const ProductTypeDetails: React.FC<ProductTypeDetailsProps> = props => {
  const { data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(["name"], errors);

  return (
    <Card className={classes.root}>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          fullWidth
          helperText={getProductErrorMessage(formErrors.name, intl)}
          label={intl.formatMessage({
            defaultMessage: "Product Type Name"
          })}
          name="name"
          onChange={onChange}
          value={data.name}
        />
      </CardContent>
    </Card>
  );
};
ProductTypeDetails.displayName = "ProductTypeDetails";
export default ProductTypeDetails;
