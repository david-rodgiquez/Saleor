import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";
import ImageIcon from "../../icons/Image";
import Dropzone from "../Dropzone";

interface ImageUploadProps {
  children?: (props: { isDragActive: boolean }) => React.ReactNode;
  className?: string;
  disableClick?: boolean;
  isActiveClassName?: string;
  iconContainerClassName?: string;
  iconContainerActiveClassName?: string;
  onImageUpload: (file: File) => void;
}

const useStyles = makeStyles(theme => ({
  containerDragActive: {
    background: fade(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main
  },
  fileField: {
    display: "none"
  },
  imageContainer: {
    background: "#ffffff",
    border: "1px solid #eaeaea",
    borderRadius: theme.spacing(),
    height: 148,
    justifySelf: "start",
    overflow: "hidden",
    padding: theme.spacing(2),
    position: "relative",
    transition: theme.transitions.duration.standard + "s",
    width: 148
  },
  photosIcon: {
    height: "64px",
    margin: "0 auto",
    width: "64px"
  },
  photosIconContainer: {
    padding: theme.spacing(5, 0),
    textAlign: "center"
  },
  uploadText: {
    color: theme.typography.body1.color,
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase"
  }
}));

export const ImageUpload: React.FC<ImageUploadProps> = props => {
  const {
    children,

    className,
    disableClick,
    isActiveClassName,
    iconContainerActiveClassName,
    iconContainerClassName,
    onImageUpload
  } = props;

  const classes = useStyles(props);

  return (
    <Dropzone
      disableClick={disableClick}
      onDrop={files => onImageUpload(files[0])}
    >
      {({ isDragActive, getInputProps, getRootProps }) => (
        <>
          <div
            {...getRootProps()}
            className={classNames({
              [classes.photosIconContainer]: true,
              [classes.containerDragActive]: isDragActive,
              [className]: !!className,
              [isActiveClassName]: !!isActiveClassName && isDragActive
            })}
          >
            <div
              className={classNames({
                [iconContainerClassName]: !!iconContainerClassName,
                [iconContainerActiveClassName]:
                  !!iconContainerActiveClassName && isDragActive
              })}
            >
              <input {...getInputProps()} className={classes.fileField} />
              <ImageIcon className={classes.photosIcon} />
              <Typography className={classes.uploadText}>
                <FormattedMessage
                  defaultMessage="Drop here to upload"
                  description="image upload"
                />
              </Typography>
            </div>
          </div>
          {children && children({ isDragActive })}
        </>
      )}
    </Dropzone>
  );
};
ImageUpload.displayName = "ImageUpload";
export default ImageUpload;
