import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";

const useStyles = makeStyles(
  theme => ({
    grid: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "ProductVariantStock" }
);

interface ProductVariantStockProps {
  errors: {
    quantity?: string;
    sku?: string;
  };
  sku: string;
  quantity: number;
  stockAllocated?: number;
  loading?: boolean;
  onChange(event: any);
}

const ProductVariantStock: React.FC<ProductVariantStockProps> = props => {
  const { errors, sku, quantity, stockAllocated, loading, onChange } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Stock",
          description: "product variant stock, section header"
        })}
      />
      <CardContent>
        <div className={classes.grid}>
          <div>
            <TextField
              error={!!errors.quantity}
              name="quantity"
              value={quantity}
              label={intl.formatMessage({
                defaultMessage: "Inventory",
                description: "product variant stock"
              })}
              helperText={
                errors.quantity
                  ? errors.quantity
                  : !!stockAllocated
                  ? intl.formatMessage(
                      {
                        defaultMessage: "Allocated: {quantity}",
                        description: "variant allocated stock"
                      },
                      {
                        quantity: stockAllocated
                      }
                    )
                  : undefined
              }
              onChange={onChange}
              disabled={loading}
              fullWidth
            />
          </div>
          <div>
            <TextField
              error={!!errors.sku}
              helperText={errors.sku}
              name="sku"
              value={sku}
              label={intl.formatMessage({
                defaultMessage: "SKU (Stock Keeping Unit)"
              })}
              onChange={onChange}
              disabled={loading}
              fullWidth
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
ProductVariantStock.displayName = "ProductVariantStock";
export default ProductVariantStock;
