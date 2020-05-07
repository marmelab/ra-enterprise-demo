import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const JoyrideTooltipContainer = ({
  tooltipProps,
  continuous,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  index,
  isLastStep,
  step,
}) => {
  const {
    content,
    hideBackButton,
    locale,
    showSkipButton,
    title,
    styles,
  } = step;
  const { back, close, last, next, skip } = locale;
  const output = {
    primary: close,
  };

  if (continuous) {
    if (isLastStep) {
      output.primary = last;
    } else {
      output.primary = next;
    }
  }

  if (showSkipButton && !isLastStep) {
    output.skip = <Button {...skipProps}>{skip}</Button>;
  }

  if (!hideBackButton && index > 0) {
    output.back = (
      <Button {...backProps}>
        {back}
      </Button>
    );
  }

  output.close = (
    <IconButton
      {...closeProps}
      size="small"
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <div key="JoyrideTooltip" style={styles.tooltip} {...tooltipProps}>
      <div style={styles.tooltipContainer}>
        {output.close}
        {title && <h4 style={styles.tooltipTitle}>{title}</h4>}
        {content && <div style={styles.tooltipContent}>{content}</div>}
      </div>
      <div style={styles.tooltipFooter}>
        {output.skip}
        {output.back}
        <Button variant="contained" color="primary" {...primaryProps}>
          {output.primary}
        </Button>
      </div>
    </div>
  );
};

JoyrideTooltipContainer.propTypes = {
  backProps: PropTypes.object.isRequired,
  closeProps: PropTypes.object.isRequired,
  continuous: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  primaryProps: PropTypes.object.isRequired,
  skipProps: PropTypes.object.isRequired,
  step: PropTypes.object.isRequired,
};

export default JoyrideTooltipContainer;
