import { PageHeadingProps } from "../types";

const PageHeading: React.FC<PageHeadingProps> = ({
  children,
  extraClasses
}) => {
  const classes = "prose lg:prose-xl " + extraClasses;

  return <div className={classes}>{children}</div>;
};

export default PageHeading;
