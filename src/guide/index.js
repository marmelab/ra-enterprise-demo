import React, { useReducer, createContext, useContext } from "react";
import { useRedirect, useNotify } from "react-admin";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { makeStyles } from "@material-ui/core/styles";

import Tooltip from "./Tooltip";

const StateContext = React.createContext();
const DispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "start": {
      return {
        ...state,
        run: true,
        stepIndex: 0,
        activeGuide: action.payload.guide,
      };
    }
    case "stop": {
      return { ...state, run: false, stepIndex: 0, activeGuide: null };
    }
    case "next": {
      if (!state.activeGuide || !state.run) {
        return state;
      }
      if (state.stepIndex > state.guides[state.activeGuide].steps.length) {
        return state;
      }
      return { ...state, stepIndex: state.stepIndex + 1 };
    }
    case "previous": {
      if (!state.activeGuide || !state.run) {
        return state;
      }
      if (state.stepIndex - 1 < 0) {
        return state;
      }
      return { ...state, stepIndex: state.stepIndex - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const GuideProvider = ({ guides = {}, children }) => {
  const redirect = useRedirect();
  const notify = useNotify();

  const tools = {
    redirect,
    notify,
  };

  const [state, dispatch] = useReducer(reducer, {
    run: false,
    stepIndex: 0,
    activeGuide: null,
    guides,
  });

  const actions = {
    start: (guide) => {
      const { before } = state.guides[guide];
      if (before) {
        before(tools);
        setTimeout(() => {
          dispatch({ type: "stop" });
          dispatch({ type: "start", payload: { guide } });
        }, 1000);
      }
      dispatch({ type: "stop" });
      dispatch({ type: "start", payload: { guide } });
    },
    stop: () => {
      const { after } = state.guides[state.activeGuide];
      if (after) {
        after(tools);
        setTimeout(() => {
          dispatch({ type: "stop" });
        }, 1000);
      }
      dispatch({ type: "stop" });
      dispatch({ type: "stop" });
    },
    next: () => dispatch({ type: "next" }),
    previous: () => dispatch({ type: "previous" }),
  };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={actions}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useGuide = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useGuide must be used within a GuideProvider");
  }
  return context;
};

const usePlayback = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("usePlayback must be used within a GuideProvider");
  }
  return context;
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Joyride error", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

const Guide = () => {
  const { run, stepIndex, activeGuide, guides } = useGuide();
  const { start, stop, next, previous } = usePlayback();
  const redirect = useRedirect();
  const notify = useNotify();

  const tools = { redirect, notify };

  if (!activeGuide) {
    return null;
  }
  const { steps } = guides[activeGuide];

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type, step } = data;

    const target = document.querySelector(step.target);

    switch (type) {
      case EVENTS.STEP_BEFORE:
        const beforeFunction = steps[index].before;
        if (beforeFunction) {
          beforeFunction({ ...tools, target });
        }
        break;
      case EVENTS.STEP_AFTER:
        const afterFunction = steps[index].after;
        if (afterFunction) {
          afterFunction({ ...tools, target });
          setTimeout(() => {
            // Update state to advance the tour
            if (action === ACTIONS.PREV) {
              previous();
              return;
            }
            next();
          });
          break;
        }
        // Update state to advance the tour
        if (action === ACTIONS.PREV) {
          previous();
          break;
        }
        next();
        break;
      case EVENTS.TARGET_NOT_FOUND:
        next();
        break;
      case EVENTS.TOUR_END:
      case STATUS.FINISHED:
      case STATUS.SKIPPED:
        // Need to set our running state to false, so we can restart if we click start again.
        stop();
        break;
      case EVENTS.TOOLTIP_CLOSE:
        break;
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  if (!run) {
    return null;
  }

  let joyrideProps = {};
  if (steps[stepIndex]) {
    joyrideProps = steps[stepIndex].joyrideProps;
  }

  return (
    <ErrorBoundary>
      <Joyride
        steps={steps}
        callback={handleJoyrideCallback}
        run={true}
        stepIndex={stepIndex}
        continuous
        showProgress
        showSkipButton
        {...joyrideProps}
        disableCloseOnEsc
        disableOverlayClose
        spotlightClicks
        tooltipComponent={Tooltip}
      />
    </ErrorBoundary>
  );
};

export { Guide, GuideProvider, useGuide, usePlayback };
