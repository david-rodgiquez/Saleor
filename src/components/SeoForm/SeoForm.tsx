import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardTitle from "../CardTitle";
import FormSpacer from "../FormSpacer";

const styles = theme =>
  createStyles({
    addressBar: {
      color: "#006621",
      fontSize: "13px",
      lineHeight: "16px",
      marginBottom: "2px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    container: {
      width: "100%"
    },
    descriptionBar: {
      color: "#545454",
      fontSize: "13px",
      lineHeight: "18px",
      overflowWrap: "break-word"
    },
    helperText: {
      marginBottom: theme.spacing(3)
    },
    label: {
      flex: 1
    },
    labelContainer: {
      "& span": {
        paddingRight: 30
      },
      display: "flex"
    },
    preview: {
      minHeight: theme.spacing(10)
    },
    title: {
      padding: 0
    },
    titleBar: {
      color: "#1a0dab",
      fontSize: "18px",
      lineHeight: "21px",
      overflowWrap: "break-word",
      textDecoration: "none",
      wordWrap: "break-word"
    }
  });

interface SeoFormProps extends WithStyles<typeof styles> {
  description?: string;
  descriptionPlaceholder: string;
  disabled?: boolean;
  loading?: boolean;
  helperText?: string;
  title: string;
  titlePlaceholder: string;
  onChange(event: any);
  onClick?();
}

const SeoForm = withStyles(styles, { name: "SeoForm" })(
  ({
    classes,
    description,
    descriptionPlaceholder,
    disabled,
    helperText,
    loading,
    title,
    titlePlaceholder,
    onChange
  }: SeoFormProps) => {
    const intl = useIntl();
    const [expanded, setExpansionStatus] = React.useState(false);
    const toggleExpansion = () => setExpansionStatus(!expanded);

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({
            defaultMessage: "Search Engine Preview"
          })}
          toolbar={
            <Button color="primary" variant="text" onClick={toggleExpansion}>
              <FormattedMessage
                defaultMessage="Edit website SEO"
                description="button"
              />
            </Button>
          }
        />
        <CardContent>
          {helperText && (
            <Typography
              className={classNames({ [classes.helperText]: expanded })}
            >
              {helperText}
            </Typography>
          )}
          {expanded && (
            <div className={classes.container}>
              <TextField
                name="seoTitle"
                label={
                  <div className={classes.labelContainer}>
                    <div className={classes.label}>
                      <FormattedMessage defaultMessage="Search engine title" />
                    </div>
                    {title.length > 0 && (
                      <span>
                        <FormattedMessage
                          defaultMessage="{numberOfCharacters} of {maxCharacters} characters"
                          description="character limit"
                          values={{
                            maxCharacters: 70,
                            numberOfCharacters: title.length
                          }}
                        />
                      </span>
                    )}
                  </div>
                }
                helperText={intl.formatMessage({
                  defaultMessage:
                    "If empty, the preview shows what will be autogenerated."
                })}
                value={title.slice(0, 69)}
                disabled={loading || disabled}
                placeholder={titlePlaceholder}
                onChange={onChange}
                fullWidth
              />
              <FormSpacer />
              <TextField
                name="seoDescription"
                label={
                  <div className={classes.labelContainer}>
                    <div className={classes.label}>
                      <FormattedMessage defaultMessage="Search engine description" />
                    </div>
                    {description.length > 0 && (
                      <span>
                        <FormattedMessage
                          defaultMessage="{numberOfCharacters} of {maxCharacters} characters"
                          description="character limit"
                          values={{
                            maxCharacters: 300,
                            numberOfCharacters: description.length
                          }}
                        />
                      </span>
                    )}
                  </div>
                }
                helperText={intl.formatMessage({
                  defaultMessage:
                    "If empty, the preview shows what will be autogenerated."
                })}
                value={description ? description.slice(0, 299) : undefined}
                onChange={onChange}
                disabled={loading || disabled}
                fullWidth
                multiline
                placeholder={descriptionPlaceholder}
                rows={10}
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
SeoForm.displayName = "SeoForm";
export default SeoForm;
