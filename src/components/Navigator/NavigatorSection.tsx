import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { GetItemPropsOptions } from "downshift";
import React from "react";

import Hr from "../Hr";
import { QuickSearchAction } from "./types";

interface NavigatorSectionProps {
  getItemProps: (options: GetItemPropsOptions) => any;
  highlightedIndex: number;
  label: string;
  items: QuickSearchAction[];
  offset: number;
}

const useStyles = makeStyles(
  theme => ({
    item: {
      "&&&&": {
        color: theme.palette.text.secondary,
        fontWeight: 400
      },
      margin: theme.spacing(1, 0)
    },
    label: {
      paddingLeft: theme.spacing(2),
      textTransform: "uppercase"
    },
    root: {
      "&:not(:last-child)": {
        marginBottom: theme.spacing(3)
      },
      margin: theme.spacing(2, 0),
      padding: theme.spacing(0, 1)
    }
  }),
  {
    name: "NavigatorSection"
  }
);

const NavigatorSection: React.FC<NavigatorSectionProps> = props => {
  const { getItemProps, highlightedIndex, label, items, offset } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography
        className={classes.label}
        variant="body2"
        color="textSecondary"
      >
        {label}
      </Typography>
      <Hr />
      {items.map((item, itemIndex) => {
        const index = offset + itemIndex;
        const itemProps = getItemProps({
          index,
          item
        });

        return (
          <MenuItem
            {...itemProps}
            className={classes.item}
            selected={highlightedIndex === index}
            key={[item.label, item.type].join(":")}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </div>
  );
};

NavigatorSection.displayName = "NavigatorSection";
export default NavigatorSection;
