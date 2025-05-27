import {
  Typography_default,
  typographyClasses_default
} from "./chunk-QKF4T67R.js";
import {
  useSlot
} from "./chunk-GAJNNT7Y.js";
import {
  useDefaultProps
} from "./chunk-6LEI4MCI.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  require_jsx_runtime,
  require_prop_types,
  styled_default
} from "./chunk-GPCJ25HW.js";
import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/material/esm/CardHeader/CardHeader.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/material/esm/CardHeader/cardHeaderClasses.js
function getCardHeaderUtilityClass(slot) {
  return generateUtilityClass("MuiCardHeader", slot);
}
var cardHeaderClasses = generateUtilityClasses("MuiCardHeader", ["root", "avatar", "action", "content", "title", "subheader"]);
var cardHeaderClasses_default = cardHeaderClasses;

// node_modules/@mui/material/esm/CardHeader/CardHeader.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    avatar: ["avatar"],
    action: ["action"],
    content: ["content"],
    title: ["title"],
    subheader: ["subheader"]
  };
  return composeClasses(slots, getCardHeaderUtilityClass, classes);
};
var CardHeaderRoot = styled_default("div", {
  name: "MuiCardHeader",
  slot: "Root",
  overridesResolver: (props, styles) => {
    return [{
      [`& .${cardHeaderClasses_default.title}`]: styles.title
    }, {
      [`& .${cardHeaderClasses_default.subheader}`]: styles.subheader
    }, styles.root];
  }
})({
  display: "flex",
  alignItems: "center",
  padding: 16
});
var CardHeaderAvatar = styled_default("div", {
  name: "MuiCardHeader",
  slot: "Avatar",
  overridesResolver: (props, styles) => styles.avatar
})({
  display: "flex",
  flex: "0 0 auto",
  marginRight: 16
});
var CardHeaderAction = styled_default("div", {
  name: "MuiCardHeader",
  slot: "Action",
  overridesResolver: (props, styles) => styles.action
})({
  flex: "0 0 auto",
  alignSelf: "flex-start",
  marginTop: -4,
  marginRight: -8,
  marginBottom: -4
});
var CardHeaderContent = styled_default("div", {
  name: "MuiCardHeader",
  slot: "Content",
  overridesResolver: (props, styles) => styles.content
})({
  flex: "1 1 auto",
  [`.${typographyClasses_default.root}:where(& .${cardHeaderClasses_default.title})`]: {
    display: "block"
  },
  [`.${typographyClasses_default.root}:where(& .${cardHeaderClasses_default.subheader})`]: {
    display: "block"
  }
});
var CardHeader = React.forwardRef(function CardHeader2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCardHeader"
  });
  const {
    action,
    avatar,
    component = "div",
    disableTypography = false,
    subheader: subheaderProp,
    subheaderTypographyProps,
    title: titleProp,
    titleTypographyProps,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    disableTypography
  };
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps: {
      title: titleTypographyProps,
      subheader: subheaderTypographyProps,
      ...slotProps
    }
  };
  let title = titleProp;
  const [TitleSlot, titleSlotProps] = useSlot("title", {
    className: classes.title,
    elementType: Typography_default,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      variant: avatar ? "body2" : "h5",
      component: "span"
    }
  });
  if (title != null && title.type !== Typography_default && !disableTypography) {
    title = (0, import_jsx_runtime.jsx)(TitleSlot, {
      ...titleSlotProps,
      children: title
    });
  }
  let subheader = subheaderProp;
  const [SubheaderSlot, subheaderSlotProps] = useSlot("subheader", {
    className: classes.subheader,
    elementType: Typography_default,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      variant: avatar ? "body2" : "body1",
      color: "textSecondary",
      component: "span"
    }
  });
  if (subheader != null && subheader.type !== Typography_default && !disableTypography) {
    subheader = (0, import_jsx_runtime.jsx)(SubheaderSlot, {
      ...subheaderSlotProps,
      children: subheader
    });
  }
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    className: classes.root,
    elementType: CardHeaderRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      component
    },
    ownerState
  });
  const [AvatarSlot, avatarSlotProps] = useSlot("avatar", {
    className: classes.avatar,
    elementType: CardHeaderAvatar,
    externalForwardedProps,
    ownerState
  });
  const [ContentSlot, contentSlotProps] = useSlot("content", {
    className: classes.content,
    elementType: CardHeaderContent,
    externalForwardedProps,
    ownerState
  });
  const [ActionSlot, actionSlotProps] = useSlot("action", {
    className: classes.action,
    elementType: CardHeaderAction,
    externalForwardedProps,
    ownerState
  });
  return (0, import_jsx_runtime.jsxs)(RootSlot, {
    ...rootSlotProps,
    children: [avatar && (0, import_jsx_runtime.jsx)(AvatarSlot, {
      ...avatarSlotProps,
      children: avatar
    }), (0, import_jsx_runtime.jsxs)(ContentSlot, {
      ...contentSlotProps,
      children: [title, subheader]
    }), action && (0, import_jsx_runtime.jsx)(ActionSlot, {
      ...actionSlotProps,
      children: action
    })]
  });
});
true ? CardHeader.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display in the card header.
   */
  action: import_prop_types.default.node,
  /**
   * The Avatar element to display.
   */
  avatar: import_prop_types.default.node,
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `title` text, and optional `subheader` text
   * with the Typography component.
   * @default false
   */
  disableTypography: import_prop_types.default.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types.default.shape({
    action: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    avatar: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    content: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    subheader: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
    title: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types.default.shape({
    action: import_prop_types.default.elementType,
    avatar: import_prop_types.default.elementType,
    content: import_prop_types.default.elementType,
    root: import_prop_types.default.elementType,
    subheader: import_prop_types.default.elementType,
    title: import_prop_types.default.elementType
  }),
  /**
   * The content of the component.
   */
  subheader: import_prop_types.default.node,
  /**
   * These props will be forwarded to the subheader
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.subheader` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  subheaderTypographyProps: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The content of the component.
   */
  title: import_prop_types.default.node,
  /**
   * These props will be forwarded to the title
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.title` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  titleTypographyProps: import_prop_types.default.object
} : void 0;
var CardHeader_default = CardHeader;

export {
  getCardHeaderUtilityClass,
  cardHeaderClasses_default,
  CardHeader_default
};
//# sourceMappingURL=chunk-ZRFT24QA.js.map
