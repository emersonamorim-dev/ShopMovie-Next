import AppDesign from "@src/app-design/AppDesign";
import ErrorContent, {
  ErrorContentProps,
} from "@src/error-handling/ErrorContent";
import { StatusCodes } from "http-status-codes";
import { NextPage } from "next";
import React from "react";

type ErrorViewProps = ErrorContentProps;

const ErrorView: NextPage<ErrorViewProps> = (props) => {
  return <ErrorContent {...props} />;
};

(ErrorView as any).Design = AppDesign;

ErrorView.getInitialProps = ({ res, err }) => {
  const statusCode =
    res?.statusCode ?? err?.statusCode ?? StatusCodes.NOT_FOUND;
  const message = err?.message ?? res?.statusMessage ?? "Algo deu errado";
  return { statusCode, message };
};

export default ErrorView;
